import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { IRoom } from '../../../types/messenger/IRoom';

export default function RoomList(props) {
  const { rooms } = props;
  const [chosen, setChosen] = useState(String);

  const Room = ({ room, active, onClick }) => (
    <li className={ active ? 'active' : ''} onClick={onClick} >
      <Link to={`/messenger/${room.id}`}>{room.name}</Link>
    </li>
  );

  const roomsList: IRoom[] = rooms.map((room: IRoom) => (
    <Room key={room.id} room={room} active={room.id === chosen} onClick={() => setChosen(room.id)}/>
  ));

  return(
    <>
      {roomsList}
    </>
  );
}
