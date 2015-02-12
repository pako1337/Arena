using System;
using System.Collections.Generic;
using System.Linq;

namespace ArenaModel
{
	public class ArenaObject
	{
		private Stack<Vector2D> _movePath = new Stack<Vector2D>();

		public string Id { get; private set; }
		public Vector2D Position { get; private set; }
		public Vector2D Size { get; private set; }
		public IEnumerable<Vector2D> MovePath { get { return _movePath.Reverse(); } }

		public ArenaObject(Vector2D position, Vector2D size)
		{
			Id = Guid.NewGuid().ToString();
			Position = position;
			Size = size;
		}

		public void AddMovePoint(int x, int y)
		{
			_movePath.Push(new Vector2D(x, y));
		}

		public void Move()
		{
			//Position = _movePath.Pop();
			//_movePath.Clear();
		}
	}
}
