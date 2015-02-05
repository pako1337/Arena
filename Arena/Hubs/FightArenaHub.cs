using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections.Concurrent;
using System.Threading;
using ArenaModel;

namespace ArenaUI.Hubs
{
	public class FightArenaHub : Hub
	{
		private ArenaRepository _arenaRepository = new ArenaRepository();

		public void Register()
		{
			var arena = _arenaRepository.GetArena();
			var player = arena.RegisterPlayer(Context.ConnectionId);

			Clients.Client(Context.ConnectionId).NewUser(arena.Players);
			Clients.AllExcept(Context.ConnectionId).NewUser(new[] { player });

			StartNextTurnIfAvailable(arena);
		}

		public void MarkAsReady()
		{
			var arena = _arenaRepository.GetArena();
			var player = arena.MarkPlayerAsReady(Context.ConnectionId);
			Clients.All.PlayerStatusChanged(player);
			StartNextTurnIfAvailable(arena);
		}

		public void MoveUser(int x, int y)
		{
			var arena = _arenaRepository.GetArena();
			var player = arena.MoveUser(Context.ConnectionId, x, y);
			Clients.All.UpdatePlayer(player);
		}

		public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
		{
			var arena = _arenaRepository.GetArena();
			string tokenId = arena.RemovePlayer(Context.ConnectionId);
			Clients.All.UserExit(tokenId);
			StartNextTurnIfAvailable(arena);

			return base.OnDisconnected(stopCalled);
		}

		private void StartNextTurnIfAvailable(Arena arena)
		{
			if (arena.AdvanceRound())
			{
				Player current = arena.GetCurrentPlayer();
				Clients.All.UpdatePlayer(current);
			}
		}
	}
}