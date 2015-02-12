using ArenaModel.States;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ArenaModel
{
	public class Player
	{
		private PlayerState _currentState;

		public string Id { get; private set; }
		[JsonConverter(typeof(StringEnumConverter))]
		public PlayerStatus Status { get { return _currentState.Status; } }
		public ArenaObject Token { get; private set; }

		public Player(string id)
		{
			Id = id;
			Token = new ArenaObject(new Vector2D(0, 0), new Vector2D(10, 10));
			_currentState = new Ready(this);
		}

		public bool IsReady()
		{
			return Status == PlayerStatus.Ready;
		}

		public void NextState()
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
