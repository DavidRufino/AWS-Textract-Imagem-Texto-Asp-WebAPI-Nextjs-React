using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AWSTextract.Core.Common
{
    public abstract class BaseEntity
    {
        public List<string>? FeatureTypes { get; set; }
    }
}
