import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { IRoom } from '../../../types/messenger/IRoom';

export default function RoomList(props) {
  const { rooms } = props;

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
