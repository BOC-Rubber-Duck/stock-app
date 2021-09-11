import React from 'react';
import LeaderboardList from './LeaderboardList.jsx';

const Leaderboard = (props) => {
  return (
    <div className="leaderboard-container" id="leaderboard-container">
      Leaderboard Component
      <LeaderboardList />
    </div>
  );
};

export default Leaderboard;