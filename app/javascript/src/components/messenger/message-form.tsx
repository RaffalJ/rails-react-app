import React from 'react';

export function MessageForm(props) {
  const { onSubmit, setCurrentMessage, currentMessage } = props;

  return (
    <div className='messenger-chatRoom-messageForm'>
      <form onSubmit={onSubmit}>
        <input
          name="currentMessage"
          type="currentMessage"
          placeholder='Type message ...'
          value={currentMessage}
          onChange={e => setCurrentMessage(e.target.value)}
        />
        <button className="messenger-chatRoom-messageForm-button"> Send </button>
      </form>
    </div>
  );
}
