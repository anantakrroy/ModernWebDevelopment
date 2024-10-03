import React from 'react';
import ReactDOM from 'react-dom/client';

import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  // handle button clicks - dispatch actions to store
  const handleGood = () => {
    store.dispatch({
      type: 'GOOD',
    });
  };

  const handleOk = () => {
    store.dispatch({ type: 'OK' });
  };

  const handleBad = () => {
    store.dispatch({ type: 'BAD' });
  };

  const handleReset = () => {
    store.dispatch({ type: 'ZERO' });
  };

  return (
    <div>
      <button onClick={handleGood}>good</button>
      <button onClick={handleOk}>ok</button>
      <button onClick={handleBad}>bad</button>
      <button onClick={handleReset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
