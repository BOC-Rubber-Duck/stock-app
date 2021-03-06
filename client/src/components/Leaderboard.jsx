import React from 'react';
import LeaderboardList from './LeaderboardList.jsx';
import Usercard from './Portfolio/Usercard.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import {TiRefreshOutline, TiArrowDownThick, TiArrowUpThick} from "react-icons/ti";
import axios from 'axios';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.scrollContainer = React.createRef();
    this.state = {
      list: [],
      page: 0,
      hasMore: true,
      friendsMode: 'Leaderboard',
      entries: 10,
      previousList: [],
      offset: -1
    };
    this.addFriend = this.addFriend.bind(this);
    this.fetchList = this.fetchList.bind(this);
    this.toggleFriendList = this.toggleFriendList.bind(this);
    this.refreshList = this.refreshList.bind(this);
  }

  addFriend(watchedUserUsername, index, friendStatus) {
    if (friendStatus === null) {
      axios.post(`/api/postFriend`, {watching_user_id: this.props.user.id, watched_username: watchedUserUsername}, {cancelToken: source.token})
        .then((response) => {
          const friendAdd = this.state.list;
          friendAdd[index].watching_user = this.props.user.id;
          this.setState({list: friendAdd});
        })
        .catch((error) => {
          // Would like to put a console.log in here, but it's throwing the Jest tests.
        });
    } else {
      axios.delete(`/api/deleteFriend`, {data: {watching_user_id: this.props.user.id, watched_username: watchedUserUsername}, cancelToken: source.token})
        .then((response) => {
          const friendAdd = this.state.list;
          friendAdd[index].watching_user = null;
          this.setState({list: friendAdd});
        })
        .catch((error) => {
        });
    }
  }

  fetchList() {
    var list = this.state.list;
    const entries = this.state.entries;
    const offset = this.state.page * entries;
    if (this.props.user && this.props.user.id.length > 0) {
      this.setState({page: (this.state.page + 1)}, () => {
        axios.get(`/api/get${this.state.friendsMode}`, {params: {userId: this.props.user.id, offset: offset, entries: entries}, cancelToken: source.token})
          .then((response) => {
            if (typeof(response.data.results) === 'object') {
              if (response.data.results === this.state.previousList) {
                this.setState({hasMore: false});
              } else {
                if (response.data.offset > this.state.offset) {
                  this.setState({list: list.concat(response.data.results), previousList: response.data.results, offset: response.data.offset});
                }
              }
              if (response.data.results.length < this.state.entries) {
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
      });
    }
  }

  toggleFriendList() {
    if (this.state.friendsMode === 'Leaderboard') {
      this.setState({friendsMode: 'Friendboard'});
    } else {
      this.setState({friendsMode: 'Leaderboard'});
    }
    this.setState({list: [], page: 0, hasMore: true, previousList: [], offset: -1});
  }

  refreshList() {
    this.setState({list: [], page: 0, hasMore: true, previousList: [], offset: -1}, () => {
      this.fetchList();
    });
  }

  componentDidMount() {
    const container = this.scrollContainer;
    if ((container.scrollHeight === container.offsetHeight) && this.state.hasMore === true) {
      this.fetchList();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const container = this.scrollContainer;
    if ((container.scrollHeight === container.offsetHeight) && (this.state.hasMore === true) && (this.state.previousList !== prevState.previousList)) {
      this.fetchList();
    }
  }

/*   componentWillUnmount() {
    source.cancel('Operation canceled by the user.');
    this.setState({list: [], page: 0, hasMore: true, previousList: []});
  } */

  render() {
    return (
      <div className="leaderboard-container" id="leaderboard-container">
        <div className="leaderboard-usercard">
          <Usercard user={this.props.user} self={true}/>
        </div>
        <div className="leaderboard-list">
          <div className="list-header">
            <form>
              Leaderboard&nbsp;&nbsp;<input type="range" id="friend-slider" name="friend-slider" min="0" max="1" value={this.state.friendsMode === 'Leaderboard'
                ? 0
                : 1
              } step="1" onChange={this.toggleFriendList} />
              <label htmlFor="friend-slider">&nbsp;&nbsp;Display Friends</label>
            </form>
          </div>
          <div id="container" ref={this.scrollContainer}>
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
                <p className="leaderboard-pull-down"><TiRefreshOutline /><TiArrowDownThick />&nbsp;Pull down to refresh!</p>
              }
              releaseToRefreshContent={
                <p className="leaderboard-pull-down"><TiArrowUpThick />&nbsp;Release to refresh!</p>
              }
            >
              <LeaderboardList addFriend={this.addFriend} list={this.state.list} handleFriendClick={this.props.handleFriendClick}/>
            </InfiniteScroll>
          </div>
          <div id="leaderboard-bottom-nav-space">
          </div>
        </div>
      </div>
    );
  }
};

export default Leaderboard;