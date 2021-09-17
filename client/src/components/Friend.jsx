import React, {useState} from 'react';
import axios from 'axios';

const Friend = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  const getUsers = (param) => {
    return axios.get(`/api/getUsers?username=${param}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error('Error searching users via api', e);
      });
  };

  const handleUserInput = (e) => {
    if (!e.target.value) {
      setSearchResults([]);
    } else {
      getUsers(e.target.value)
        .then((results) => {
          setSearchResults(results);
        })
        .catch((error) => {
          console.error('Error searching users ', e);
        });
    };
  };

  const renderSearchResults = () => {
    const results = searchResults.map((result) => {
      return (
        <li key={result.id}>
          <div className="fr-search-result">
            <p className="fr-username fr-is-friend">{result.username}</p>
            <p className="fr-portfolio-value">$need to calc</p>
          </div>
          <nav className="fr-result-nav">
            <span className="fr-view-user-profile material-icons-round">arrow_forward_ios</span>
          </nav>
        </li>
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
          {/* <button
            className="fr-button-cancel"
            type="button"
            // onClick=what? back to something. leaderboard?
          >
            Cancel
          </button> */}
        </nav>
        { renderSearchResults() }
      </section>
    </React.Fragment>
  );
};

export default Friend;