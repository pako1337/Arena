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
		private ConcurrentQueue<string> _playOrder = new ConcurrentQueue<string>();

		public Guid Id { get; private set; }
		public IEnumerable<Player> Players { get { return _players.Values; } }
		public IEnumerable<string> PlayOrder { get { return _playOrder.ToList(); } }

		public Arena()
		{
			Id = Guid.NewGuid();
		}

		public Player RegisterPlayer(string id)
		{
			var player = new Player();

			_players.TryAdd(id, player);
			_playOrder.Enqueue(id);

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
					player.Move(x, y);

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

				return disconnectedPlayerObject.Token.Id;
			}

			throw new InvalidOperationException("Player with id " + id + " does not exist");
		}

		public bool RoundFinished()
		{
			return _players.Values.All(p => p.IsReady());
		}
	}
}
