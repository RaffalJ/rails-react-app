import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import { fetchRooms } from './actions';
import ChatRoom from './chat-room';
import RoomForm from './room-form';
import RoomList from './room-list';
import { IRoom } from '../../../types/messenger/IRoom';
import './styles.scss';

interface IMessengerState {
  messenger: {
    rooms: IRoom[];
  }
}

export default function Container() {
  const dispatch = useDispatch();
  const rooms = useSelector((state: IMessengerState) => state.messenger.rooms);

  useEffect(() => {
    fetchRooms(dispatch);
  }, []);

  if (rooms.loading) {
    return <></>;
  }

  return (
    <div className='messenger'>
      <div className='messenger-roomsList'>
        <RoomList rooms={rooms}/>
      </div>

      <Switch>
        <Redirect from='/messenger' to='/messenger/newRoom' exact/>
        <Route path="/messenger/newRoom" component={RoomForm}/>
        <Route path="/messenger/:roomId/:roomName" component={ChatRoom} />
      </Switch>
    </div>
  );
}
