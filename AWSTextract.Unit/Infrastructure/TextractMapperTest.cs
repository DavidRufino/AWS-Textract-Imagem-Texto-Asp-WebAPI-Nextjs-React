using Amazon.Textract.Model;
using AWSTextract.Infrastructure.Mappers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text.Json;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AWSTextract.Unit.Infrastructure
{
    public class TextractMapperTest
    {
        private readonly HttpClient _httpClient;

        public TextractMapperTest()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task TextractResult()
        {
            Debug.WriteLine("TextractResult start");

            var response = await _httpClient.GetAsync("http://localhost:3000/resultsample.json");
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var documentDeserialize = JsonSerializer.Deserialize<AnalyzeDocumentResponse>(jsonResponse);

            var test = new TextractResponseMapper();
            var result = test.MapToResultModel(documentDeserialize);

            Debug.WriteLine("jsonString result:");
            string jsonString = JsonSerializer.Serialize(result);
            Debug.WriteLine(jsonString);

        }

    }
}
