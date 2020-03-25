import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from '../reducers';
import Main from '../main';

const store = createStore(reducer);

const MainWithProvider = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <MainWithProvider />,
    document.body.appendChild(document.createElement('div')),
  )
})
