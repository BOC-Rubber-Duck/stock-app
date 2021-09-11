import React, {useState, useEffect} from 'react';
import './Leaderboard.css';
import LeaderboardListElement from './LeaderboardListElement.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const LeaderboardList = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [user] = useState('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A12');
  const [hasMore, setHasMore] = useState(true);


  const fetchList = () => {
    // Make a request for a user with a given ID
    console.log('list being fetched');
    const entries = 2;
    const offset = page * entries;
    setPage(page + 1);
    axios.get(`${process.env.SERVER}/leaders`, {params: {user: user, offset: offset, entries: entries}})
      .then(function(response) {
        // handle success
        console.log('response:', response);
        setList(list.concat(response.data));
        if (response.data.length === 0) {
          setHasMore(false);
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    const container = document.getElementById("container");
    if ((container.scrollHeight === container.offsetHeight) && hasMore === true) {
      fetchList();
    }
  }, [list]);

  return (
    <div id="container">
      <InfiniteScroll
        scrollableTarget={'container'}
        dataLength={list.length}
        next={fetchList}
        hasMore={hasMore}
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
            key={element.id}
            rank={(index + 1)}
            username={element.username}
            balance={element.cash_position}
            friend={element.watching_user}/>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default LeaderboardList;