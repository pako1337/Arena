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
		private ConcurrentQueue<Player> _playOrder = new ConcurrentQueue<Player>();
		private ConcurrentQueue<Player> _finishedPlayers = new ConcurrentQueue<Player>();

		public Guid Id { get; private set; }
		public IEnumerable<Player> Players { get { return _players.Values; } }

		public Arena()
		{
			Id = Guid.NewGuid();
		}

		public Player RegisterPlayer(string id)
		{
			var player = new Player(id);

			_players.TryAdd(id, player);
			_finishedPlayers.Enqueue(player);

			if (_players.Count == 1)
				AdvanceRound();

			return player;
		}

		public Player MarkPlayerAsReady(string id)
		{
			Player player = GetCurrentPlayer();
			if (player.Id == id && player.Status == PlayerStatus.DoingTurn)
			{
				player.NextState();
				AdvanceRound();
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

		public Player RemovePlayer(string id)
		{
			if (_players.ContainsKey(id))
			{
				Player disconnectedPlayerObject;
				_players.TryRemove(id, out disconnectedPlayerObject);

				var currentPlayer = GetCurrentPlayer();
				if (currentPlayer == null)
					AdvanceRound();
				else if (currentPlayer.Id == id)
				{
					_playOrder.TryDequeue(out disconnectedPlayerObject);
					AdvanceRound();
				}

				return disconnectedPlayerObject;
			}

			throw new InvalidOperationException("Player with id " + id + " does not exist");
		}

		private void AdvanceRound()
		{
			lock (_playOrder)
			{
				Player player;
				if (_playOrder.Count > 0)
				{
					_playOrder.TryDequeue(out player);
					_finishedPlayers.Enqueue(player);
				}

				if (RoundIsFinished())
				{
					BuildNewRoundPlayOrder();
				}

				player = GetCurrentPlayer();
				player.NextState();
			}
		}

		private bool RoundIsFinished()
		{
			return _playOrder.Count == 0;
		}

		private void BuildNewRoundPlayOrder()
		{
			Player player;
			while (_finishedPlayers.TryDequeue(out player))
			{
				if (_players.ContainsKey(player.Id))
					_playOrder.Enqueue(player);
			}
		}

		private Player GetCurrentPlayer()
		{
			Player player;

			while (_playOrder.TryPeek(out player) && !_players.ContainsKey(player.Id))
				_playOrder.TryDequeue(out player);

			return player;
		}
	}
}
