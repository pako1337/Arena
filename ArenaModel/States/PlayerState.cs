using System;

namespace ArenaModel.States
{
	internal abstract class PlayerState
	{
		protected Player Player;

		public abstract PlayerStatus Status { get; }

		public PlayerState(Player player)
		{
			Player = player;
		}

		public virtual bool CanMove()
		{
			return false;
		}

		public virtual void Move(int x, int y) { }

		public abstract PlayerState NextState();
	}
}
