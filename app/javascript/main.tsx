import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Link } from 'react-router-dom';

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
    <div className='main'>
      <BrowserRouter>
        <div id='navbar'>
          <div className='navbar-corner'>
            Ruffy App
          </div>

          <div className='navbar-menu'>
            <ul>
              <li>
                <Link to="/messenger">Messenger</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </div>
        </div>

        <div id='content'>
          <Route path="/messenger" component={Messenger} />
        </div>
      </BrowserRouter>
    </div>
  );
}
