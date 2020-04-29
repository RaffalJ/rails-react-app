import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import { fetchRooms } from './actions';
import ChatRoom from './chat-room';
import RoomForm from './room-form';
import RoomList from './room-list';
import './styles.scss';

export default function Container() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRooms(dispatch);
  }, []);

  return (
    <div className='messenger'>
      <div className='messenger-roomsList'>
        <RoomList />
      </div>

      <Switch>
        <Redirect from='/messenger' to='/messenger/newRoom' exact/>
        <Route path="/messenger/newRoom" component={RoomForm}/>
        <Route path="/messenger/:roomId/:roomName" component={ChatRoom} />
      </Switch>
    </div>
  );
}
