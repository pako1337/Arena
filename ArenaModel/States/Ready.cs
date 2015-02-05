using System;

namespace ArenaModel.States
{
	internal class Ready : PlayerState
	{
		public override PlayerStatus Status
		{
			get { return PlayerStatus.Ready; }
		}

		public Ready(Player player)
			: base(player)
		{

		}

		public override void Move(int x, int y)
		{
		}

		public override PlayerState NextState()
		{
			return new DoingTurn(Player);
		}
	}
}
