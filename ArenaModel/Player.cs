using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ArenaModel
{
    public class Player
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public PlayerStatus Status { get; set; }
        public ArenaObject PlayerToken { get; set; }

        public void MarkAsReady()
        {
            Status = PlayerStatus.Ready;
        }

        public bool CanMove()
        {
            return Status == PlayerStatus.Ready;
        }
    }
}
