import React from 'react';
import LeaderboardListElement from './LeaderboardListElement.jsx';

const LeaderboardList = (props) => {
  return (
    <div className="leaderboard-map">
      {props.list.map((element, index) => (
        <LeaderboardListElement
          key={element.id}
          id={element.id}
          initialBalance={1000000}
          rank={(index + 1)}
          index={index}
          username={element.username}
          cashPosition={Number(element.cash_position)}
          portfolioValue={Number(element.portfolio_value)}
          watchingUser={element.watching_user}
          addFriend={props.addFriend}
          handleFriendClick={props.handleFriendClick}/>
      ))}
    </div>
  );
};

export default LeaderboardList;