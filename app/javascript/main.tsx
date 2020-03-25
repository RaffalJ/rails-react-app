import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

import { API } from './services/api';
import Messenger from './src/components/messenger/container';
import './styles.scss';

export default function() {
  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    const payload = (await API.fetchCurrentUser()).data;
    dispatch({ type: 'currentUser-success', payload });
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return(
    <div className='container'>
      <BrowserRouter>
        <div id='navbar'>
          <ul>
            <li>
              <Link to="/messenger">Messenger</Link>
            </li>
          </ul>
        </div>

        <div id='content'>
          <Route path="/messenger" component={Messenger} />
        </div>
      </BrowserRouter>
    </div>
  );
}
