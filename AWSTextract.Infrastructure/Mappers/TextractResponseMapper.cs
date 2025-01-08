using Amazon.Textract.Model;
using Amazon.Textract;
using AWSTextract.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AWSTextract.Infrastructure.Mappers
{
    public class TextractResponseMapper
    {
        // Mapeia a resposta do Textract para o modelo de resultado
        public TextExtractResultModel MapToResultModel(AnalyzeDocumentResponse response)
        {
            // Criamos um novo modelo com os dados extraídos
            var result = new TextExtractResultModel
            {
                // Extraímos o texto bruto (o texto simples do documento)
                ExtractedText = ExtractRawText(response.Blocks),
                // Extraímos as tabelas encontradas no documento
                Tables = ExtractTables(response.Blocks),
                // Extraímos os campos de formulário (se existirem) do documento
                Forms = ExtractFormFields(response.Blocks)
            };

            // Retorna o resultado mapeado
            return result;
        }

        // Função para extrair o texto simples do documento
        private string ExtractRawText(List<Block> blocks)
        {
            var textBuilder = new StringBuilder();

            // Itera por todos os blocos e pega apenas as linhas de texto
            foreach (var block in blocks)
            {
                if (block.BlockType == BlockType.LINE)
                {
                    // Adiciona a linha ao texto final
                    textBuilder.AppendLine(block.Text);
                }
            }

            // Retorna o texto extraído
            return textBuilder.ToString();
        }

        // Função para extrair as tabelas do documento
        private List<TableModel> ExtractTables(List<Block> blocks)
        {
            var tables = new List<TableModel>();

            // Filtra os blocos que representam tabelas
            var tableBlocks = blocks.Where(b => b.BlockType == BlockType.TABLE).ToList();

            foreach (var tableBlock in tableBlocks)
            {
                var tableModel = new TableModel();

                // Pega as células da tabela através das relações do tipo CHILD
                var cellBlocks = tableBlock.Relationships?
                    .Where(rel => rel.Type == RelationshipType.CHILD)
                    .SelectMany(rel => rel.Ids)
                    .Select(id => blocks.First(b => b.Id == id && b.BlockType == BlockType.CELL))
                    .ToList();

                if (cellBlocks != null)
                {
                    // Agrupa as células por linha (RowIndex) para manter a ordem
                    var rows = cellBlocks.GroupBy(c => c.RowIndex)
                                         .OrderBy(g => g.Key)
                                         .ToList();

                    foreach (var row in rows)
                    {
                        var rowData = new List<string>();

                        // Ordena as células da linha pela coluna (ColumnIndex)
                        var orderedCells = row.OrderBy(c => c.ColumnIndex).ToList();

                        foreach (var cell in orderedCells)
                        {
                            // Pega o texto da célula, que pode vir de blocos do tipo WORD
                            // Método que garante que o texto será extraído corretamente
                            var cellText = GetTextForBlock(cell, blocks);
                            // Adiciona o texto da célula à linha
                            rowData.Add(cellText);
                        }

                        // Adiciona a linha à tabela
                        tableModel.Rows.Add(rowData);
                    }
                }

                // Adiciona a tabela ao resultado final
                tables.Add(tableModel);
            }

            return tables; // Retorna todas as tabelas extraídas
        }

        // Função para extrair campos de formulários do documento
        private List<FormModel> ExtractFormFields(List<Block> blocks)
        {
            var formFields = new List<FormModel>();
            var keyBlocks = blocks.Where(b => b.BlockType == BlockType.KEY_VALUE_SET && b.EntityTypes.Contains("KEY")).ToList();

            foreach (var keyBlock in keyBlocks)
            {
                // Pega o texto da chave do campo do formulário
                var keyText = GetTextForBlock(keyBlock, blocks);

                // Encontra o bloco correspondente ao valor da chave
                var valueBlockId = keyBlock.Relationships?
                    .FirstOrDefault(r => r.Type == "VALUE")?
                    .Ids?.FirstOrDefault();

                var valueBlock = blocks.FirstOrDefault(b => b.Id == valueBlockId);
                var valueText = valueBlock != null ? GetTextForBlock(valueBlock, blocks) : "";

                // Se a chave tiver texto, criamos o campo de formulário
                if (!string.IsNullOrEmpty(keyText))
                {
                    formFields.Add(new FormModel
                    {
                        Name = keyText,
                        Value = valueText
                    });
                }
            }

            // Retorna todos os campos de formulário encontrados
            return formFields;
        }

        // Função auxiliar para pegar o texto de um bloco e seus filhos relacionados
        private string GetTextForBlock(Block block, List<Block> blocks)
        {
            // Se o bloco for nulo, não faz nada
            if (block == null) return "";

            // Se o bloco já tiver texto, retornamos direto
            if (!string.IsNullOrEmpty(block.Text))
            {
                return block.Text;
            }

            // Se não tiver texto, procuramos os textos nos blocos filhos (por exemplo, de tipo WORD ou LINE)
            if (block.Relationships != null)
            {
                var childBlockIds = block.Relationships
                    .Where(r => r.Type == "CHILD")
                    .SelectMany(r => r.Ids)
                    .ToList();

                var childBlocks = blocks.Where(b => childBlockIds.Contains(b.Id));
                // Junta o texto de todos os filhos
                return string.Join(" ", childBlocks.Select(b => b.Text));
            }

            // Retorna vazio se não encontrar texto
            return "";
        }
    }
}
