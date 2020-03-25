import React from 'react';

export default function RoomForm(props) {
  const { onSubmit, newRoomName, setNewRoomName } = props;

  return(
    <div className='messenger-roomForm'>
      <h2> Create new room</h2>
      <form onSubmit={onSubmit}>
        <input
          name="currentMessage"
          className='messenger-roomForm-input'
          type="currentMessage"
          placeholder='Type new room name'
          value={newRoomName}
          onChange={e => setNewRoomName(e.target.value)}
        />
        <button className='messenger-roomForm-button'> Send </button>
      </form>
    </div>
  );
}
