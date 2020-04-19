import React from 'react';
import { Provider } from 'react-redux'
import RootContainer from './containers'
import createStore from './redux/reducers'

import './App.scss';

function App() {
  const store = createStore()
  return (
      <Provider store={store}>
          <RootContainer />
      </Provider>
  );
}
export default App;
