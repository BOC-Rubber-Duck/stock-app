import React from 'react';
import {ImUserPlus, ImUsers} from 'react-icons/im';
import './Leaderboard.css';

const LeaderboardListElement = (props) => {
  return (
    <div className="leaderboard-element">
      <div className="leaderboard-rank">
        <h2>{(props.index + 1)}</h2>
      </div>
      <div className="leaderboard-username">
        <h2>{props.username}</h2>
      </div>
      <div className="leaderboard-balance">
        <h2>{props.balance}</h2>
      </div>
      <div className="leadership-friend" onClick={props.addFriend.bind(this, props.id, props.index, props.watchingUser)}>
        {props.watchingUser === null
          ? <ImUserPlus />
          : <ImUsers />
        }
      </div>
    </div>
  );
};

export default LeaderboardListElement;