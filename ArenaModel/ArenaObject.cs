using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArenaModel
{
    public class ArenaObject
    {        
        public string Id { get; set; }

        public ArenaObject(string id)
        {
            Id = id;
        }
    }
}
