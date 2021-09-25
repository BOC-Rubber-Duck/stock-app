import React from 'react';
import { useHistory } from "react-router-dom";

function ExitButton() {
  let history = useHistory();

  function handleClick() {
    history.push('/');
  }

  return (
    <button type="button" id="exit-button" onClick={handleClick}>
      EXIT
    </button>
  );
}

export default ExitButton;