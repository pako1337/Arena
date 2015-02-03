using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArenaModel
{
    public class ArenaRepository
    {
        private static Arena _arena;

        public Arena GetArena()
        {
            if (_arena == null)
                _arena = new Arena();

            return _arena;
        }
    }
}
