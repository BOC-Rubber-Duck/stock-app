import React, {useState} from 'react';
import {ImUserPlus, ImUsers} from "react-icons/im";
import './Leaderboard.css';

const LeaderboardListElement = (props) => {
  // Declare a new state variable, which we'll call "count"
  //const [count, setCount] = useState(0);

  return (
    <div className="leaderboard-element">
      <div className="leaderboard-rank">
        <h2>{props.rank}</h2>
      </div>
      <div className="leaderboard-username">
        <h2>{props.username}</h2>
      </div>
      <div className="leaderboard-balance">
        <h2>{props.balance}</h2>
      </div>
      <div className="leadership-friend">
        <h2>{props.friend}</h2>
      </div>
    </div>
  );
}

export default LeaderboardListElement;