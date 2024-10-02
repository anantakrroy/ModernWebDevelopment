import { createStore } from 'redux';

// define reducer function to change state
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

// Create store using createStore of 'redux'
const store = createStore(counterReducer)
// actions are dispatched to the store using 'dispatch' method of store
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'DEREMENT'})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'ZERO'})
store.dispatch({type: 'INCREMENT'})
// get the current state of the store
console.log(store.getState()) 

// use dispatch method to subscribe to current state of store
store.subscribe(() => {
    const storeNow = store.getState()
    console.log('Current store state : ', storeNow)
})