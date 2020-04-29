import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IRoom } from '../../../types/messenger/IRoom';

interface IMessengerState {
  messenger: {
    rooms: IRoom[];
    roomsError: string;
  }
}

export default function RoomList() {
  const rooms = useSelector((state: IMessengerState) => state.messenger.rooms);
  const roomsError = useSelector((state: IMessengerState) => state.messenger.roomsError);

  console.log('errors: ', roomsError);
  if (rooms.loading) return <></>

  const Room = ({ room }) => (
    <li>
      <Link to={`/messenger/${room.id}/${room.name}`}>{room.name}</Link>
    </li>
  );

  const roomsList: IRoom[] = rooms.map((room: IRoom) => (
    <Room key={room.id} room={room} />
  ));

  return(
    <>
      {roomsList}
    </>
  );
}
