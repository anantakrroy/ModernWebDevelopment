import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from 'redux';
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import App from './App.jsx'
import './index.css'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

function App() {
  return (
  <>
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
    <h1>Vite + React</h1>
    <div className="card">
      <button onClick={(event) => store.dispatch({ type: "INCREMENT" })}>  + 
        
      </button>
      <button onClick={(event) => store.dispatch({ type: "DECREMENT" })}> -  
      </button>
      <button onClick={(event) => store.dispatch({ type: "ZERO" })}> Zero  
      </button>
      <p>
        count is {store.getState()}
      </p>
    </div>
    <p className="read-the-docs">
      Click on the Vite and React logos to learn more
    </p>
  </>
);
}

const root = createRoot(document.getElementById("root"));

const renderApp = () => {
root.render(<App />);
};

renderApp();
store.subscribe(renderApp);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
