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
        private static Arena arena;

        public void Register()
        {
            if (arena == null)
                arena = new Arena();

            var player = arena.RegisterPlayer(Context.ConnectionId);

            Clients.Client(Context.ConnectionId).NewUser(arena.Players);
            Clients.AllExcept(Context.ConnectionId).NewUser(new[] { player });
        }

        public void MarkAsReady()
        {
            var player = arena.MarkPlayerAsReady(Context.ConnectionId);
            Clients.All.PlayerStatusChanged(player);
        }

        public void MoveUser(int x, int y)
        {
            var player = arena.MoveUser(Context.ConnectionId, x, y);
            Clients.All.UpdatePlayer(player);
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            string tokenId = arena.RemovePlayer(Context.ConnectionId);
            Clients.All.UserExit(tokenId);

            return base.OnDisconnected(stopCalled);
        }
    }
}