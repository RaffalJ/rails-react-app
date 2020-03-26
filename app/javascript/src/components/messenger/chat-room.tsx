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
  let { roomId, roomName } = useParams();

  useEffect(() => {
    roomChannel = createSocket(roomId, consumer, dispatch);
    fetchMessages(dispatch, roomId);
    return () => {
      consumer.subscriptions.remove(roomChannel);
    };
  }, [roomId]);

  const onSubmit = (e: any) => {
    roomChannel.send({
      message: e,
    });
  }

  return (
    <div className='messenger-content'>
      <h2>{roomName}</h2>
      <MessageList />
      <MessageForm onSubmit={onSubmit}/>
    </div>
  );
}
