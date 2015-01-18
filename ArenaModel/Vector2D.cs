using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArenaModel
{
    public class Vector2D
    {
        public int X { get; private set; }
        public int Y { get; private set; }

        public Vector2D(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}
