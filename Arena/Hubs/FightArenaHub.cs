using Microsoft.AspNet.SignalR;
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
		}

		public void MarkAsReady()
		{
			var arena = _arenaRepository.GetArena();
			var turnEnded = arena.MarkPlayerAsReady(Context.ConnectionId);
			Clients.All.TurnEnded();
			UpdateAllPlayers(arena);
		}

		public void MoveUser(int x, int y)
		{
			var arena = _arenaRepository.GetArena();
			var player = arena.MoveUser(Context.ConnectionId, x, y);
			UpdateAllPlayers(arena);
		}

		public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
		{
			var arena = _arenaRepository.GetArena();
			arena.RemovePlayer(Context.ConnectionId);
			Clients.All.UserExit(Context.ConnectionId);
			UpdateAllPlayers(arena);

			return base.OnDisconnected(stopCalled);
		}

		private void UpdateAllPlayers(Arena arena)
		{
			Clients.All.UpdatePlayer(arena.Players);
		}
	}
}