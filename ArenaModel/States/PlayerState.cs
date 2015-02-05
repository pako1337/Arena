using System;

namespace ArenaModel.States
{
	internal abstract class PlayerState
	{
		private Player _player;

		public abstract PlayerStatus Status { get; }

		public PlayerState(Player player)
		{
			_player = player;
		}

		public virtual bool CanMove()
		{
			return false;
		}

		public virtual void Move(int x, int y) { }

		public PlayerState ChangeState(PlayerStatus playerStatus)
		{
			throw new NotImplementedException();
		}
	}

	internal class NotReadyState : PlayerState
	{
		public override PlayerStatus Status
		{
			get { return PlayerStatus.NotReady; }
		}

		public NotReadyState(Player player)
			: base(player)
		{

		}
	}
}
