using Amazon.Runtime;
using Amazon.Textract;
using Amazon.Textract.Model;
using AWSTextract.Core.Entities;
using AWSTextract.Core.Interfaces;
using AWSTextract.Infrastructure.Mappers;
using System.Diagnostics;

namespace AWSTextract.Infrastructure.Services
{
    public class TextractService : ITextractService
    {
        private readonly IAmazonTextract _textractClient;

        /// <summary>
        /// Construtor que recebe o cliente da AWS Textract.
        /// </summary>
        /// <param name="textractClient">Cliente da AWS Textract injetado pela DI.</param>
        public TextractService(IAmazonTextract textractClient)
        {
            _textractClient = textractClient;
        }

        /// <summary>
        /// Método que processa um documento enviado para o Textract e retorna os dados analisados.
        /// </summary>
        /// <param name="documentBytes">Os bytes do documento (PDF ou imagem).</param>
        /// <returns>Uma lista com o texto extraído do documento.</returns>
        public async Task<TextExtractResultModel> ExtractTextFromFileAsync(byte[] fileBytes, List<string> featureTypes)
        {
            Debug.WriteLine("ExtractTextFromFileAsync Start");
            
            // Cria a requisição para o Textract com o documento como byte array.
            var request = new AnalyzeDocumentRequest
            {
                Document = new Document
                {
                    Bytes = ConvertStreamToByteArray(fileBytes)
                },
                FeatureTypes = featureTypes
            };

            try
            {
                // Faz a chamada assíncrona para a AWS Textract e recebe a resposta.
                var response = await _textractClient.AnalyzeDocumentAsync(request);

                var mapper = new TextractResponseMapper();
                var result = mapper.MapToResultModel(response);
                return result;
            }
            catch (AmazonServiceException ex)
            {
                Debug.WriteLine($"Service error: {ex.Message}");
                Debug.WriteLine($"Error code: {ex.ErrorCode}");
                Debug.WriteLine($"Request ID: {ex.RequestId}");
                throw;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Unexpected error: {ex.Message}");
                throw;
            }
        }

        private MemoryStream ConvertStreamToByteArray(byte[] fileBytes)
        {
            using (var memoryStream = new MemoryStream(fileBytes))
                return memoryStream;
        }

    }
}
