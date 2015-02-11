using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArenaModel.States
{
	internal class DoingTurn : PlayerState
	{
		public override PlayerStatus Status
		{
			get { return PlayerStatus.DoingTurn; }
		}

		public DoingTurn(Player player)
			: base(player)
		{ }

		public override bool CanMove()
		{
			return true;
		}

		public override void Move(int x, int y)
		{
			Player.Token.AddMovePoint(x, y);
		}

		public override PlayerState NextState()
		{
			Player.Token.Move();
			return new Ready(Player);
		}
	}
}
