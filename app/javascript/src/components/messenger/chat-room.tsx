import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

import consumer from "../../../channels/consumer";
import { fetchMessages, createSocket } from './actions';
import { MessageList } from './message-list';
import { MessageForm } from './message-form';

let roomChannel: typeof consumer;

export default function ChatRoom() {
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState(String);
  let { roomId } = useParams();

  useEffect(() => {
    roomChannel = createSocket(roomId, consumer, dispatch);
    fetchMessages(dispatch, roomId);
    return () => {
      consumer.subscriptions.remove(roomChannel);
    };
  }, [roomId]);

  const handleForm = (e: any) => {
    e.preventDefault();
    roomChannel.send({
      message: currentMessage,
    });
    setCurrentMessage('');
  }

  return (
    <div className='messenger-chatRoom'>
      <MessageList />
      <MessageForm onSubmit={handleForm} setCurrentMessage={setCurrentMessage} currentMessage={currentMessage}/>
    </div>
  );
}
