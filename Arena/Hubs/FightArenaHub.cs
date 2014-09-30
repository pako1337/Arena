using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Arena.Hubs
{
    public class FightArenaHub : Hub
    {
        public void Register()
        {
            Clients.AllExcept(Context.ConnectionId).NewUser(Context.ConnectionId);
        }

        public void MoveUser(int x, int y)
        {
            Clients.AllExcept(Context.ConnectionId).MoveUser(Context.ConnectionId, x, y);
        }
    }
}