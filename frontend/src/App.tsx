import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { Router ,BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import {ConnectedRouter} from 'connected-react-router'
// import './config/ReactotronConfig'

import Routes from './routes'

import history from './services/browserhistory'

import { store, persistor } from './store'

import GlobalStyle from './styles/global'

function App () {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router  history={history}>
        {/* <ConnectedRouter history={history}> */}

          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        {/* </ConnectedRouter> */}
        
        </Router >
      </PersistGate>
    </Provider>
  )
}

export default App
