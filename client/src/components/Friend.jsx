import React, {useState, useEffect} from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Friend = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [param, setParam] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (param === null || param.length === 0) {
          setSearchResults([]);
        } else {
          const res = await axios.get(`/api/getUsers?username=${param}`);
          setSearchResults(res.data);
        }
      } catch (error) {
        console.error('Error searching users via api', error);
      }
    };
    fetchData();
  }, [param]);

  const handleUserInput = (e) => {
    const searchVal = e.target.value.replace(/\s/g, '');
    setParam(searchVal);
  };

  const renderSearchResults = () => {
    const results = searchResults.map((result) => {
      return (
        <Link to="/friendPortfolio" key={result.username}>
          <li key={result.id} onClick={() => {
            props.handleFriendClick(result.username);
          }}>
            <div className="fr-search-result">
              <div className="fr-left-side">
                <p className="fr-username">{result.username}</p>
                <p className="fr-user-holdings">{!result.holdings ? 'No stocks held' : result.holdings}</p>
              </div>
              <div className="fr-right-side">
                <span className="fr-user-rank-header">Rank</span>
                <p className="fr-user-rank-number">{result.user_rank}</p>
              </div>
            </div>
          </li>
        </Link>
      );
    });
    return (
      <section className="fr-results">
        <ul>
          {results}
        </ul>
      </section>
    );
  };

  return (
    <React.Fragment>
      <section className="fr-page">
        <nav className="fr-nav">
          <input
            className="fr-search-input"
            type="search"
            placeholder="Search by username"
            onChange={handleUserInput}
          />
        </nav>
        { renderSearchResults() }
      </section>
    </React.Fragment>
  );
};

export default Friend;