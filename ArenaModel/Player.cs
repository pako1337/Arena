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
        public PlayerStatus Status { get; private set; }
        public ArenaObject PlayerToken { get; private set; }

        public Player()
        {
            PlayerToken = new ArenaObject(new Vector2D(0, 0), new Vector2D(10, 10));
        }

        public void MarkAsReady()
        {
            Status = PlayerStatus.Ready;
        }

        public bool CanMove()
        {
            return Status == PlayerStatus.Ready;
        }

        internal void Move(int x, int y)
        {
            PlayerToken.Move(x, y);
        }
    }
}
