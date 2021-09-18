import React from 'react';
import Stockbar from './Stockbar.jsx';
import Usercard from './Usercard.jsx';
import {Link} from 'react-router-dom';
import getPortfolioData from './helpers/getPortfolioData.js';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        cashBalance: "0",
        username: "",
        portfolioValue: 0,
        userPortfolio: [{
          amount: 0,
          stockName: "",
          ticker_symbol: "",
          valueOwned: 0,
        }]
      }
    };
  }

  componentDidMount() {
    var userCopy = this.props.user;
    getPortfolioData(userCopy).then((expandedUser) => {
      this.setState({
        'user': expandedUser
      });
    }).catch((err) => {
      console.log('error fetching addtl portfolio data', err);
    });
  }

  render() {
    const stocks = this.state.user.userPortfolio;

    const stockbars = stocks.map((stockObject) => {
      return (
        <Link to="/stock-detail-page">
          <Stockbar stock={stockObject} useCase='portfolio' onClick={this.props.onStockClick}/>
        </Link>
      );
    });

    return (
      <div>
        <Usercard user={this.state.user}/>
        <div>{stockbars}</div>
      </div>
    );
  }
}


// const Portfolio = (props) => {
//   console.log('user inside Portfolio:', expandedUser);
//   var expandedUser = {
//     cashBalance: "1000000",
//     email: "mark_zuckerberg@example.com",
//     first_name: "mark",
//     friends: [],
//     last_name: "zuckerberg",
//     portfolioValue: 364720000,
//     userPortfolio: [
//       {
//         amount: 1000000,
//         exchange: "nasdaq",
//         id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23",
//         stockName: "Facebook, Inc.",
//         ticker_symbol: "fb",
//         user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13",
//         valueOwned: 364720000,
//       }
//     ]
//   };
//   // console.log(expandedUser);

//   const stocks = expandedUser.userPortfolio;

//   const stockbars = stocks.map((stockObject) => {
//     return (
//       <Link to="/stock-detail-page">
//         <Stockbar stock={stockObject} useCase='portfolio' onClick={props.onStockClick}/>
//       </Link>
//     );
//   });

//   return (
//     <div>
//       <Usercard user={expandedUser}/>
//       <div>{stockbars}</div>
//     </div>
//   );
// };


export default Portfolio;