import React from 'react';
import {ImUserPlus, ImUsers} from 'react-icons/im';
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
        <Router>
          <Link to="/friendPortfolio" key={props.username}>
            <h2 onClick={() => {
              props.handleFriendClick(props.username);
            }}>{props.username}</h2>
          </Link>
        </Router>
      </div>
      <div className="leaderboard-balance">
        <h2>${Number(props.balance).toFixed(2)}</h2>
      </div>
      <div className="leadership-friend" onClick={props.addFriend.bind(this, props.username, props.index, props.watchingUser)}>
        {props.watchingUser === null
          ? <div className="leaderboard-not-friend"><ImUserPlus /></div>
          : <div className="leaderboard-friend"><ImUsers /></div>
        }
      </div>
    </div>
  );
};

export default LeaderboardListElement;