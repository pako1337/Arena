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
        private static ConcurrentDictionary<string, Player> _players = new ConcurrentDictionary<string,Player>();

        public void Register()
        {
            var player = new Player()
            {
                PlayerToken = new ArenaObject(new Vector2D(0, 0), new Vector2D(10, 10))
            };
            
            _players.AddOrUpdate(Context.ConnectionId, player, (key, p) => p);

            Clients.Client(Context.ConnectionId).NewUser(_players.Values);
            Clients.AllExcept(Context.ConnectionId).NewUser(new[] { player });
        }

        public void MarkAsReady()
        {
            Player player;
            if (_players.TryGetValue(Context.ConnectionId, out player))
            {
                player.IsReady = true;
            }
        }

        public void MoveUser(int x, int y)
        {
            Player player;
            if (_players.TryGetValue(Context.ConnectionId, out player))
            {
                if (!player.IsReady)
                    return;

                player.PlayerToken.Move(x, y);
                Clients.All.UpdatePlayer(player.PlayerToken);
            }
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            if (_players.ContainsKey(Context.ConnectionId))
            {
                Player disconnectedPlayerObject;
                _players.TryRemove(Context.ConnectionId, out disconnectedPlayerObject);
                Clients.All.UserExit(disconnectedPlayerObject.PlayerToken.Id);
            }

            return base.OnDisconnected(stopCalled);
        }
    }
}