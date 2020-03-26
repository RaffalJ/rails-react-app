import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect, Switch } from 'react-router-dom';

import { fetchRooms, createRoom } from './actions';
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
  const [newRoomName, setNewRoomName] = useState(String);

  useEffect(() => {
    fetchRooms(dispatch);
  }, []);

  if (rooms.loading) {
    return <></>;
  }

  const handleForm = (e: any) => {
    e.preventDefault();
    createRoom(dispatch, { room: { name: newRoomName } });
    setNewRoomName('');
  }

  const RoomFormRoute = () => {
    return (
      <RoomForm onSubmit={handleForm} setNewRoomName={setNewRoomName} newRoomName={newRoomName}/>
    );
  }

  return (
    <div className='messenger'>
      <div className='messenger-roomsList'>
        <RoomList rooms={rooms}/>
      </div>

      <Switch>
        <Redirect from='/messenger' to='/messenger/newRoom' exact/>
        <Route path="/messenger/newRoom" render={RoomFormRoute}/>
        <Route path="/messenger/:roomId" component={ChatRoom} />
      </Switch>
    </div>
  );
}
