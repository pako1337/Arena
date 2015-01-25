using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArenaModel
{
    public class ArenaObject
    {        
        public string Id { get; private set; }
        public Vector2D Position { get; private set; }
        public Vector2D Size { get; set; }

        public ArenaObject(string id, Vector2D position, Vector2D size)
        {
            Id = id;
            Position = position;
            Size = size;
        }

        public void Move(int x, int y)
        {
            Position.Move(x, y);
        }
    }
}
