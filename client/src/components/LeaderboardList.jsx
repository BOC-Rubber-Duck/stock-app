import React from 'react';
import LeaderboardListElement from './LeaderboardListElement.jsx';

const LeaderboardList = (props) => {
  return (
    <div className="leaderboard-map">
      {props.list.map((element, index) => (
        <LeaderboardListElement
          key={element.id}
          id={element.id}
          rank={(index + 1)}
          index={index}
          username={element.username}
          balance={element.cash_position}
          watchingUser={element.watching_user}
          addFriend={props.addFriend}/>
      ))}
    </div>
  );
};

export default LeaderboardList;