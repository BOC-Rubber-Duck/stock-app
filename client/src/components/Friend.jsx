import React, {useState, useEffect} from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';

const Friend = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [param, setParam] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (param === null) {
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
    setParam(!e.target.value ? null : e.target.value);
  };

  const renderSearchResults = () => {
    const results = searchResults.map((result) => {
      return (
        <li key={result.id}>
          <div className="fr-search-result">
            <p className="fr-username fr-is-friend">{result.username}</p>
          </div>
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
        </nav>
        { renderSearchResults() }
      </section>
    </React.Fragment>
  );
};

export default Friend;