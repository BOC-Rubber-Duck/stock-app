import React, {useState} from 'react';
import './Leaderboard.css';
import LeaderboardListElement from './LeaderboardListElement.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const LeaderboardList = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [list, setList] = useState([]);


  const fetchList = (user = null, page = 1) => {
    // Make a request for a user with a given ID
    axios.get(`${process.env.DB}/leaderboard?user=${user}page=${page}`)
      .then(function(response) {
        // handle success
        console.log(response);
        setList(list.concat(response));
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={list.length}
        next={fetchList}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        /* refreshFunction={this.refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
        } */
      >
        {list.map((element, index) => (
          <LeaderboardListElement
            key={element.username}
            rank={(index + 1)}
            username={element.username}
            balance={element.balance}
            friend={element.friend}/>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default LeaderboardList;