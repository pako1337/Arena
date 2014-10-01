using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections.Concurrent;

namespace Arena.Hubs
{
    public class FightArenaHub : Hub
    {
        private static ConcurrentBag<string> _users = new ConcurrentBag<string>();

        public void Register()
        {
            _users.Add(Context.ConnectionId);

            _users.ToList()
                .Where(u => u != Context.ConnectionId)
                .Select(u => Clients.Client(Context.ConnectionId).NewUser(u))
                .ToList();

            Clients.AllExcept(Context.ConnectionId).NewUser(Context.ConnectionId);
        }

        public void MoveUser(int x, int y)
        {
            Clients.AllExcept(Context.ConnectionId).MoveUser(Context.ConnectionId, x, y);
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            Clients.All.UserExit(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }
    }
}