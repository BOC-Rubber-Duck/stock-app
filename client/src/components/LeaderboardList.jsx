import React, {useState} from 'react';
import './Leaderboard.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const LeaderboardList = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [totalUsers, setTotalUsers] = useState(0);
  const [friends, setFriends] = useState([]);


  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={this.refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {items}
      </InfiniteScroll>
    </div>
  );
}

export default LeaderboardList;