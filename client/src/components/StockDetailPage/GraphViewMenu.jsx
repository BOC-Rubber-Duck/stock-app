import React from 'react';

const GraphViewMenu = (props) => {
  const views = props.views.map((view) => {
    <button className={`view-${view}`} value={view}>{view}</button>;
  });
  return (
    <div className='GraphViewMenu'>{views}</div>
  );
};

// GraphViewMenu.propTypes = {
//   views: PropTypes.array
// };
export default GraphViewMenu;