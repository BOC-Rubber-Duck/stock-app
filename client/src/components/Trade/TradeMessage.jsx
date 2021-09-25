import React from 'react';

const TradeMessage = (props) => {
  if (props.message === null) return null;

  return (
    <div className="trade-message">
      {props.message}
    </div>
  );
};

export default TradeMessage;