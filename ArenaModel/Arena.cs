using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArenaModel
{
    public class Arena
    {
        private ConcurrentDictionary<string, Player> _players = new ConcurrentDictionary<string, Player>();
        public Guid Id { get; private set; }
        public IEnumerable<Player> Players { get { return _players.Values; } }

        public Arena()
        {
            Id = Guid.NewGuid();
        }

        public Player RegisterPlayer(string id)
        {
            var player = new Player()
            {
                PlayerToken = new ArenaObject(new Vector2D(0, 0), new Vector2D(10, 10))
            };

            _players.TryAdd(id, player);

            return player;
        }

        public Player MarkPlayerAsReady(string id)
        {
            Player player;
            if (_players.TryGetValue(id, out player))
            {
                player.MarkAsReady();
                return player;
            }

            throw new InvalidOperationException("Player with id " + id + " does not exist");
        }

        public Player MoveUser(string id, int x, int y)
        {
            Player player;
            if (_players.TryGetValue(id, out player))
            {
                if (player.CanMove())
                    player.PlayerToken.Move(x, y);

                return player;
            }

            throw new InvalidOperationException("Player with id " + id + " does not exist");
        }

        public string RemovePlayer(string id)
        {
            if (_players.ContainsKey(id))
            {
                Player disconnectedPlayerObject;
                _players.TryRemove(id, out disconnectedPlayerObject);

                return disconnectedPlayerObject.PlayerToken.Id;
            }

            throw new InvalidOperationException("Player with id " + id + " does not exist");
        }
    }
}
