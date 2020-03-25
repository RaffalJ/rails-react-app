import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import { fetchRooms, createRoom } from './actions';
import ChatRoom from './chat-room';
import RoomForm from './room-form';
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
    createRoom(dispatch, {room: { name: newRoomName }});
    setNewRoomName('');
  }

  const roomsList: IRoom[] = rooms.map((room: IRoom) => {
    return (
      <li key={room.id} className='test'>
        <Link to={`/messenger/${room.id}`}>{room.name}</Link>
      </li>
    );
  });

  const RoomFormRoute = () => {
    return (
      <RoomForm onSubmit={handleForm} setNewRoomName={setNewRoomName} newRoomName={newRoomName}/>
    );
  }

  return (
    <div className='messenger'>
      <div className='messenger-roomsList'>
        {roomsList}
      </div>

      <Switch>
        <Redirect from='/messenger' to='/messenger/newRoom' exact/>
        <Route path="/messenger/newRoom" render={RoomFormRoute}/>
        <Route path="/messenger/:roomId" component={ChatRoom} />
      </Switch>
    </div>
  );
}
