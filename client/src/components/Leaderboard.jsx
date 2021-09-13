import React from 'react';
import LeaderboardList from './LeaderboardList.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 0,
      user: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
      hasMore: true,
      friendsMode: 'leaders'
    };
    this.addFriend = this.addFriend.bind(this);
    this.fetchList = this.fetchList.bind(this);
    this.toggleFriendList = this.toggleFriendList.bind(this);
    this.refreshList = this.refreshList.bind(this);
  }

  addFriend(watchedUser, index, friendStatus) {
    if (friendStatus === null) {
      axios.put(`/addfriend`, null, {params: {watching_user: this.state.user, watched_user: watchedUser}})
        .then((response) => {
          const friendAdd = this.state.list;
          friendAdd[index].watching_user = this.state.user;
          this.setState({list: friendAdd});
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios.put(`/deletefriend`, null, {params: {watching_user: this.state.user, watched_user: watched_user}})
        .then((response) => {
          const friendAdd = this.state.list;
          friendAdd[index].watching_user = null;
          this.setState({list: friendAdd});
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  fetchList() {
    var list = this.state.list;
    const entries = 2;
    const offset = this.state.page * entries;
    this.setState({page: (this.state.page + 1)});
    axios.get(`/${this.state.friendsMode}`, {params: {user: this.state.user, offset: offset, entries: entries}})
      .then((response) => {
        this.setState({list: list.concat(response.data)});
        if (response.data.length === 0) {
          this.setState({hasMore: false});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleFriendList() {
    if (this.state.friendsMode === 'leaders') {
      this.setState({friendsMode: 'friends'});
    } else {
      this.setState({friendsMode: 'leaders'});
    }
    this.setState({list: [], page: 0, hasMore: true});
  }

  refreshList() {
    this.setState({list: [], page: 0, hasMore: true});
    this.fetchList();
  }

  componentDidMount() {
    const container = document.getElementById("container");
    if ((container.scrollHeight === container.offsetHeight) && this.state.hasMore === true) {
      this.fetchList();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const container = document.getElementById("container");
    if ((container.scrollHeight === container.offsetHeight) && (this.state.hasMore === true) && (this.state.list !== prevState.list)) {
      this.fetchList();
    }
  }
  render() {
    return (
      <div className="leaderboard-container" id="leaderboard-container">
        <div id="list">
          <div id="list-header">
            <form>
              <input type="range" id="friend-slider" name="friend-slider" min="0" max="1" value={this.state.friendsMode === 'leaders'
                ? 0
                : 1
              } step="1" onChange={this.toggleFriendList} />
              <label htmlFor="friend-slider">Display Friends</label>
            </form>
          </div>
          <div id="container">
            <InfiniteScroll
              scrollableTarget={'container'}
              dataLength={this.state.list.length}
              next={this.fetchList}
              hasMore={this.hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // Pull-down-to-refresh Functionality
              refreshFunction={this.refreshList}
              pullDownToRefresh={true}
              pullDownToRefreshThreshold={50}
              pullDownToRefreshContent={
                <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
              }
              releaseToRefreshContent={
                <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
              }
            >
              <LeaderboardList loggedIn={this.state.user} addFriend={this.addFriend} list={this.state.list}/>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
};

export default Leaderboard;