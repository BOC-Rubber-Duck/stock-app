import React from 'react';

const Friend = (props) => {
  return (
    <section className="friend">
      <nav>
        <input type="search" placeholder="Search by username" />
        <button type="reset"></button>
        <button type="button">Cancel</button>
      </nav>
      <section className="fr-results">
        <ul>
          <li>
            <p className="fr-username fr-is-friend">Rubber Duck</p>
            <p className="fr-portfolio-value">$5</p>
            <span className="fr-view-user-profile"></span>
          </li>
          <li>
            <p className="fr-username">Wood Duck</p>
            <p className="fr-portfolio-value">$5,467</p>
            <span className="fr-view-user-profile"></span>
          </li>
          <li>
            <p className="fr-username">Platinum Duck</p>
            <p className="fr-portfolio-value">$685,423</p>
            <span className="fr-view-user-profile"></span>
          </li>
          <li>
            <p className="fr-username">Diamond Duck</p>
            <p className="fr-portfolio-value">$1,523,678</p>
            <span className="fr-view-user-profile"></span>
          </li>
        </ul>
      </section>
    </section>
  );
};

export default Friend;