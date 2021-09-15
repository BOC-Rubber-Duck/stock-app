/* eslint-disable max-len */
import React from 'react';

const Friend = (props) => {
  return (
    <React.Fragment>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <section className="fr-page">
        <nav className="fr-nav">
          <input className="fr-search-input" type="search" placeholder="Search by username" />
          <button className="fr-button-cancel" type="button">Cancel</button>
        </nav>
        <section className="fr-results">
          <ul>
            <li>
              <div className="fr-search-result">
                <p className="fr-username fr-is-friend">Rubber Duck</p>
                <p className="fr-portfolio-value">$5</p>
              </div>
              <nav className="fr-result-nav">
                <span className="fr-view-user-profile material-icons-round">arrow_forward_ios</span>
              </nav>
            </li>
            <li>
              <div className="fr-search-result">
                <p className="fr-username">Wood Duck</p>
                <p className="fr-portfolio-value">$5,467</p>
              </div>
              <nav className="fr-result-nav">
                <span className="fr-view-user-profile material-icons-round">arrow_forward_ios</span>
              </nav>
            </li>
            <li>
              <div className="fr-search-result">
                <p className="fr-username">Platinum Duck</p>
                <p className="fr-portfolio-value">$685,423</p>
              </div>
              <nav className="fr-result-nav">
                <span className="fr-view-user-profile material-icons-round">arrow_forward_ios</span>
              </nav>
            </li>
            <li>
              <div className="fr-search-result">
                <p className="fr-username">Diamond Duck</p>
                <p className="fr-portfolio-value">$1,523,678</p>
              </div>
              <nav className="fr-result-nav">
                <span className="fr-view-user-profile material-icons-round">arrow_forward_ios</span>
              </nav>
            </li>
            <li>
              <div className="fr-search-result">
                <p className="fr-username">This is a really super-long user name and what happens when it gets longer</p>
                <p className="fr-portfolio-value">$242,523,543,678</p>
              </div>
              <nav className="fr-result-nav">
                <span className="fr-view-user-profile material-icons-round">arrow_forward_ios</span>
              </nav>
            </li>

          </ul>
        </section>
      </section>
    </React.Fragment>
  );
};

export default Friend;