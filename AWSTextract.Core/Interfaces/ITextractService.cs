using AWSTextract.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace AWSTextract.Core.Interfaces
{
    public interface ITextractService
    {
        Task<TextExtractResultModel> ExtractTextFromFileAsync(byte[] fileBytes, List<string> featureTypes);
    }
}