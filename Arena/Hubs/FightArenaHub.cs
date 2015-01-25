using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections.Concurrent;
using System.Threading;
using ArenaModel;

namespace Arena.Hubs
{
    public class FightArenaHub : Hub
    {
        private static ConcurrentDictionary<string, ArenaObject> _users = new ConcurrentDictionary<string, ArenaObject>();

        public void Register()
        {
            var newPlayer = new ArenaObject(Context.ConnectionId, new Vector2D(0, 0), new Vector2D(10, 10));
            List<ArenaObject> presentUsers = null;
            presentUsers = _users.Values.ToList();
            _users.TryAdd(Context.ConnectionId, newPlayer);

            if (presentUsers != null)
            {
                Clients.Client(Context.ConnectionId).NewUser(presentUsers);
            }

            Clients.All.NewUser(new[] { newPlayer });
        }

        public void MoveUser(int x, int y)
        {
            ArenaObject player;
            if (_users.TryGetValue(Context.ConnectionId, out player))
            {
                player.Move(x, y);
                Clients.All.UpdatePlayer(player);
            }
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            if (_users.ContainsKey(Context.ConnectionId))
            {
                ArenaObject disconnectedPlayerObject;
                _users.TryRemove(Context.ConnectionId, out disconnectedPlayerObject);
            }

            Clients.All.UserExit(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }
    }
}