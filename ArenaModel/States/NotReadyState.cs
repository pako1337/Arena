using System;

namespace ArenaModel.States
{
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

		public override PlayerState NextState()
		{
			return new ReadyState(Player);
		}
	}
}
