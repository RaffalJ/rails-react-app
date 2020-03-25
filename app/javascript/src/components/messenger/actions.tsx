import { Dispatch } from 'redux';

import { API } from '../../../services/api';
import { IRoomPayload } from '../../../types/messenger/IRoomPayload';
import { IRoomMessage } from '../../../types/messenger/IRoomMessage';

export const fetchRooms = async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'rooms-loading', loading: true });
    const payload = (await API.fetchRooms()).data;
    dispatch({ type: 'rooms-success', payload });
  } catch(error) {
    dispatch({ type: 'rooms-failure', error: error.message });
  }
}

export const createRoom = async (dispatch: Dispatch, payload: IRoomPayload) => {
  try {
    const response = await API.createRoom(payload);
    const success = (response.status === 200 || response.status === 204) ? true : false;
    if (success) dispatch({ type: 'rooms-add', payload: response.data });
    else throw Error('Invalid response');
  } catch(error) {
    dispatch({ type: 'rooms-failure', error: error.message });
  }
}

export const fetchMessages = async (dispatch: Dispatch, roomId: string) => {
  try {
    dispatch({ type: 'messages-loading', loading: true });
    const payload = (await API.fetchMessages(roomId)).data;
    dispatch({ type: 'messages-success', payload });
  } catch(error) {
    dispatch({ type: 'messages-failure', error: error.message });
  }
}

export const createSocket = (roomId: string, consumer: any, dispatch: Dispatch) => {
  return consumer.subscriptions.create({ channel: "RoomChannel", room_id: roomId }, {
    connected() {
      console.log('Connected to room id: ', roomId);
    },
    disconnected() {
      console.log('Disconnected');
    },
    received(payload: IRoomMessage) {
      dispatch({ type: 'messages-add', payload });
    }
  });
}
