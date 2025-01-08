using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AWSTextract.Core.Entities
{
    public class TableModel
    {
        public List<List<string>> Rows { get; set; } = new List<List<string>>();
    }
}
