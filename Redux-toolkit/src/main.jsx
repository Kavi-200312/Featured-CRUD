import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.jsx'
import { Store } from './app/Stroe.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
  </Provider>
)
