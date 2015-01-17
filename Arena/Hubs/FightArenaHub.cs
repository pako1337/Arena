using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections.Concurrent;
using System.Threading;

namespace Arena.Hubs
{
    public class FightArenaHub : Hub
    {
        private SpinLock _lock = new SpinLock();
        private static List<string> _users = new List<string>();

        public void Register()
        {
            List<string> presentUsers = null;
            bool lockTaken = false;
            try
            {
                _lock.Enter(ref lockTaken);
                presentUsers = _users.ToList();
                _users.Add(Context.ConnectionId);
            }
            finally
            {
                if (lockTaken) _lock.Exit();
            }

            if (presentUsers != null)
            {
                presentUsers.ForEach(u => Clients.Client(Context.ConnectionId).NewUser(u));
            }

            Clients.AllExcept(Context.ConnectionId).NewUser(Context.ConnectionId);
        }

        public void MoveUser(int x, int y)
        {
            Clients.AllExcept(Context.ConnectionId).MoveUser(Context.ConnectionId, x, y);
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            bool lockTaken = false;
            try
            {
                _lock.Enter(ref lockTaken);
                if (_users.Contains(Context.ConnectionId))
                    _users.Remove(Context.ConnectionId);
            }
            finally
            {
                if (lockTaken) _lock.Exit();
            }

            Clients.All.UserExit(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }
    }
}