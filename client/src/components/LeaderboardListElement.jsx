import React from 'react';
import {ImUserPlus, ImUsers} from 'react-icons/im';
import {BsGraphUp, BsGraphDown} from "react-icons/bs";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const LeaderboardListElement = (props) => {
  return (
    <div className="leaderboard-element">
      <div className="leaderboard-rank">
        <h2>{(props.index + 1)}</h2>
      </div>
      <div className="leaderboard-username">
        <Link to="/friendPortfolio" key={props.username}>
          <h2 onClick={() => {
            props.handleFriendClick(props.username);
          }}>{props.username}</h2>
        </Link>
      </div>
      <div className="leaderboard-balance">
        {(props.cashPosition + props.portfolioValue) >= props.initialBalance
          ? <div><span className="positive-gain-icon"><BsGraphUp /></span>
            <span className="leaderboard-gain-text">&nbsp;{((((props.cashPosition + props.portfolioValue) - props.initialBalance) / props.initialBalance) * 100)}%</span>
            <span className="positive-gain">&nbsp;Gained</span></div>
          : <div><span className="negative-gain-icon"><BsGraphDown /></span>
            <span className="leaderboard-gain-text">&nbsp;{((((props.cashPosition + props.portfolioValue) - props.initialBalance) / props.initialBalance) * 100)}%</span>
            <span className="negative-gain">&nbsp;Lost</span></div>
        }
      </div>
      <div className="leaderboard-friend-toggle" onClick={props.addFriend.bind(this, props.username, props.index, props.watchingUser)}>
        {props.watchingUser === null
          ? <div className="leaderboard-not-friend"><ImUserPlus /></div>
          : <div className="leaderboard-friend"><ImUsers /></div>
        }
      </div>
    </div>
  );
};

export default LeaderboardListElement;