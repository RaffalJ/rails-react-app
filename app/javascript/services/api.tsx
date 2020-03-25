import axios, { AxiosRequestConfig } from 'axios';

const RESOURCE = 'http://localhost:3000/';
const API_VERSION = 'api/v1/';
const HOST = `${RESOURCE}${API_VERSION}`;

export const ENDPOINTS = {
  currentUser: () => `${HOST}users/current_logged_in_user`,
  MESSENGER: {
    rooms: () => `${HOST}rooms`,
    room: (id: string) => `${HOST}rooms/${id}`,
    messages: (roomId: string) => `${HOST}/rooms/${roomId}/room_messages`,
  },
}

export const API = {
  async get(url: string, params?: Object)                 { return await axios.get(url, params) },
  async post(url: string, payload: any)                   { return await axios.post(url, payload) },
  async patch(url: string, payload: any)                  { return await axios.patch(url, payload) },
  async delete(url: string, config?: AxiosRequestConfig)  { return await axios.delete(url, config) },

  async fetchCurrentUser()              { return this.get(ENDPOINTS.currentUser()) },
  async fetchMessages(roomId: string)   { return this.get(ENDPOINTS.MESSENGER.messages(roomId)) },
  async fetchRooms()                    { return this.get(ENDPOINTS.MESSENGER.rooms()) },
  async createRoom(payload)             { return this.post(ENDPOINTS.MESSENGER.rooms(), payload) },
}
