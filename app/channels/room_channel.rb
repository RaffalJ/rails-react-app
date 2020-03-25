class RoomChannel < ApplicationCable::Channel
  def subscribed
    room = Room.find_by(id: params[:room_id])
    room ? stream_for(room) : reject
  end

  def unsubscribed
  end

  def receive(data)
    room = Room.find params[:room_id]
    room_message = createRoomMessage(room, data['message'])

    RoomChannel.broadcast_to(room, room_message)
  end

  private

  def createRoomMessage(room, message)
    RoomMessage.create(
      message: message,
      user_id: current_user.id,
      room_id: room.id
    )
  end
end
