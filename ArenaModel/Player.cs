using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArenaModel.States;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ArenaModel
{
	public class Player
	{
		private PlayerState _currentState;

		[JsonConverter(typeof(StringEnumConverter))]
		public PlayerStatus Status { get { return _currentState.Status; } }
		public ArenaObject Token { get; private set; }

		public Player()
		{
			Token = new ArenaObject(new Vector2D(0, 0), new Vector2D(10, 10));
			_currentState = new NotReadyState(this);
		}

		public void MarkAsReady()
		{
			_currentState = _currentState.NextState();
		}

		public bool CanMove()
		{
			return _currentState.CanMove();
		}

		internal void Move(int x, int y)
		{
			_currentState.Move(x, y);
		}
	}
}
