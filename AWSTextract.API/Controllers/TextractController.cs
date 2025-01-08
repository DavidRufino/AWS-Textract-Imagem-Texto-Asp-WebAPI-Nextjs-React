using AWSTextract.Core.DTOs;
using AWSTextract.Core.Entities;
using AWSTextract.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AWSTextract.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TextractController : ControllerBase
    {
        private readonly ITextractService _textractService;

        // Constructor that gets the TextractService via DI
        public TextractController(ITextractService textractService)
        {
            _textractService = textractService;
        }

        // É necessário configurar o Swagger para suportar o envio de arquivos com IFormFile
        // POST method to extract text from an external URL
        [ApiExplorerSettings(IgnoreApi = true)] // Hides from Swagger
        [HttpPost("extract-text-from-file")]
        public async Task<IActionResult> ExtractTextFromUrl([FromForm] IFormFile? file, [FromForm] string? fileUrl, [FromForm] List<string> featureTypes)
        {
            if (file == null && string.IsNullOrEmpty(fileUrl))
                return BadRequest("Você deve fornecer um arquivo ou um URL de arquivo.");

            if (featureTypes == null)
                return BadRequest("Nenhum FeatureType fornecido.");

            try
            {
                // Get the document content from file or URL
                byte[]? fileContent = null;

                if (file != null)
                {
                    using (var stream = new MemoryStream())
                    {
                        await file.CopyToAsync(stream);  // Copy file content to memory stream
                        fileContent = stream.ToArray();  // Convert stream to byte array
                    }
                }
                else if (!string.IsNullOrEmpty(fileUrl))
                {
                    using (var httpClient = new HttpClient())
                    {
                        try
                        {
                            // Fetch the file content as byte array
                            fileContent = await httpClient.GetByteArrayAsync(fileUrl);
                        }
                        catch (Exception ex)
                        {
                            return BadRequest("Falha ao baixar o arquivo do URL fornecido");
                        }
                    }
                }

                // Check the size of the file content
                if (fileContent?.Length > 0) Debug.WriteLine($"Tamanho do conteúdo do arquivo: {fileContent.Length} bytes");
                else Debug.WriteLine("O conteúdo do arquivo está vazio ou não foi carregado.");

                if (fileContent == null) return BadRequest("Nenhum arquivo carregado.");

                var extractedText = await _textractService.ExtractTextFromFileAsync(fileContent, featureTypes);
                return Ok(new { Textract = extractedText });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
