using System;

namespace ArenaModel.States
{
	internal class ReadyState : PlayerState
	{
		public override PlayerStatus Status
		{
			get { return PlayerStatus.Ready; }
		}

		public ReadyState(Player player)
			: base(player)
		{

		}

		public override bool CanMove()
		{
			return true;
		}

		public override void Move(int x, int y)
		{
			Player.Token.Move(x, y);
		}

		public override PlayerState ChangeState(PlayerStatus playerStatus)
		{
			throw new NotImplementedException();
		}
	}
}
