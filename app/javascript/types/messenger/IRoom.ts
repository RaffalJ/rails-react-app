import { IRoomMessage } from './IRoomMessage';

export interface IRoom {
  id: string;
  name: string;
  updated_at: string;
  relationships: {
    room_messages: IRoomMessage[],
  }
}
