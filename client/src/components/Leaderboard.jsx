import React from 'react';
import LeaderboardList from './LeaderboardList.jsx';
import Usercard from './Usercard.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    if (props.user) {
      var user = props.user;
    } else {
      var user = {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
        first_name: 'mark',
        last_name: 'zuckerberg',
        username: 'the_zuck',
        email: 'mark_zuckerberg@example.com',
        cash_position: 1000000,
        rank: null,
        portfolioValue: 0
      };
    }
    this.state = {
      list: [],
      page: 0,
      user: user,
      hasMore: true,
      friendsMode: 'Leaderboard'
    };
    this.addFriend = this.addFriend.bind(this);
    this.fetchList = this.fetchList.bind(this);
    this.toggleFriendList = this.toggleFriendList.bind(this);
    this.refreshList = this.refreshList.bind(this);
  }

  addFriend(watchedUserUsername, index, friendStatus) {
    if (friendStatus === null) {
      axios.post(`/api/postFriend`, {watching_user_id: this.state.user.id, watched_username: watchedUserUsername})
        .then((response) => {
          const friendAdd = this.state.list;
          friendAdd[index].watching_user = this.state.user.id;
          this.setState({list: friendAdd});
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios.delete(`/api/deleteFriend`, {data: {watching_user_id: this.state.user.id, watched_username: watchedUserUsername}})
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
    if (this.state.user.id.length > 0) {
      this.setState({page: (this.state.page + 1)});
      axios.get(`/api/get${this.state.friendsMode}`, {params: {username: this.state.user.id, offset: offset, entries: entries}, cancelToken: source.token})
        .then((response) => {
          if (typeof(response.data) === 'object') {
            this.setState({list: list.concat(response.data)});
            if (response.data.length === 0) {
              this.setState({hasMore: false});
            }
          } else {
            this.setState({hasMore: false});
            console.log('Array not returned as response for Leaderboard list.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  toggleFriendList() {
    if (this.state.friendsMode === 'Leaderboard') {
      this.setState({friendsMode: 'Friendboard'});
    } else {
      this.setState({friendsMode: 'Leaderboard'});
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
    if (this.props.user !== prevProps.user) {
      this.refreshList();
    } else {
      if ((container.scrollHeight === container.offsetHeight) && (this.state.hasMore === true) && (this.state.list !== prevState.list)) {
        this.fetchList();
      }
    }
  }

  componentWillUnmount() {
    source.cancel('Operation canceled by the user.');
  }

  render() {
    return (
      <div className="leaderboard-container" id="leaderboard-container">
        <Usercard user={this.state.user} />
        <div id="leaderboard-list">
          <div id="list-header">
            <form>
              Leaderboard&nbsp;&nbsp;<input type="range" id="friend-slider" name="friend-slider" min="0" max="1" value={this.state.friendsMode === 'Leaderboard'
                ? 0
                : 1
              } step="1" onChange={this.toggleFriendList} />
              <label htmlFor="friend-slider">&nbsp;&nbsp;Display Friends</label>
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
                  <b>End of List</b>
                </p>
              }
              // Pull-down-to-refresh Functionality
              refreshFunction={this.refreshList}
              pullDownToRefresh={true}
              pullDownToRefreshThreshold={50}
              pullDownToRefreshContent={
                <p>&#8595; Pull down to refresh</p>
              }
              releaseToRefreshContent={
                <p>&#8593; Release to refresh</p>
              }
            >
              <LeaderboardList addFriend={this.addFriend} list={this.state.list}/>
            </InfiniteScroll>
          </div>
        </div>
        <div id="leaderboard-bottom-nav-space">
        </div>
      </div>
    );
  }
};

export default Leaderboard;