import React from 'react';
import { useSelector } from 'react-redux';

import { Loader } from '../../../services/utils/loader-animation';

export function MessageList() {
  const currentUser = useSelector(state => state.currentUser.currentUser);
  const messages = useSelector(state => state.messenger.messages);

  if ((messages as any).loading) {
    return (
      <div className='messenger-chatRoom-messageList'>
        <div className='messenger-chatRoom-messageContainer'>
          <Loader />
        </div>
      </div>
    );
  }

  const twoDigitFilter = (n: number) => ("0" + n).slice(-2);

  const messageList = (messages.length == 0) ?
    'No messages here yet ...' :
    messages.map(message => {
      if (messages.length === 0) {
        return 'No messages here yet ...';
      }

      const classNameUserS = (currentUser.id === message.user_id) ?
        'messenger-chatRoom-messageList-messageContainer-currentUser':
        'messenger-chatRoom-messageList-messageContainer-otherUser';

      const date = new Date(`${message.created_at}`);
      const time =
        `${twoDigitFilter(date.getHours())}:${twoDigitFilter(date.getMinutes())}:${twoDigitFilter(date.getSeconds())}`;

      return(
        <div className='messenger-chatRoom-messageList-messageContainer' key={message.id}>
          <li className={classNameUserS}>
            {message.message}

            <div className='messenger-chatRoom-messageList-messageContainer-createdAtField'>
              {time}
            </div>
          </li>
        </div>
      );
    }
  );

  return(
    <div className='messenger-chatRoom-messageList'>
      {messageList}
    </div>
  );
}
