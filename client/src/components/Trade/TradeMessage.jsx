import React from 'react';

const TradeMessage = (props) => {
  if (props.message === null || props.message === '') return null;

  return (
    <div className="trade-message">
      {props.message}
    </div>
  );
};

export default TradeMessage;