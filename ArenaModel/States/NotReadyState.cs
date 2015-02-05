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

		public override PlayerState ChangeState(PlayerStatus playerStatus)
		{
			if (playerStatus != PlayerStatus.Ready)
				throw new InvalidOperationException();

			return new ReadyState(Player);
		}
	}
}
