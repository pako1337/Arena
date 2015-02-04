using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArenaModel
{
    public class Player
    {
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
