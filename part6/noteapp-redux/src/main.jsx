import { createRoot } from 'react-dom/client'
import {createStore} from 'redux'
import noteReducer from './reducers/noteReducer'
import App from './App.jsx'
import {Provider} from 'react-redux'
import './index.css'

const store = createStore(noteReducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)