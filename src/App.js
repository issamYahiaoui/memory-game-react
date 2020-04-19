import React from 'react';
import { Provider } from 'react-redux'
import RootContainer from './containers'
import store from './redux/createStore'

import './App.scss';

function App() {



  return (
      <Provider store={store}>
          <RootContainer />
      </Provider>
  );
}
export default App;
