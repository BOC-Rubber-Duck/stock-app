import React from 'react';
import {ImUserPlus, ImUsers} from 'react-icons/im';
import {Link} from "react-router-dom";

const LeaderboardListElement = (props) => {
  return (
    <div className="leaderboard-element">
      <div className="leaderboard-rank">
        <h2>{(props.index + 1)}</h2>
      </div>
      <div className="leaderboard-username">
        <Link to="/portfolio">
          <h2>{props.username}</h2>
        </Link>
      </div>
      <div className="leaderboard-balance">
        <h2>${Number(props.balance).toFixed(2)}</h2>
      </div>
      <div className="leadership-friend" onClick={props.addFriend.bind(this, props.id, props.index, props.username)}>
        {props.watchingUser === null
          ? <div className="leaderboard-not-friend"><ImUserPlus /></div>
          : <div className="leaderboard-friend"><ImUsers /></div>
        }
      </div>
    </div>
  );
};

export default LeaderboardListElement;