using AWSTextract.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AWSTextract.Core.DTOs
{
    public class TextractRequestDto : BaseEntity
    {
        public string? FileUrl { get; set; }
        public List<string>? FeatureTypes { get; set; }
    }
}