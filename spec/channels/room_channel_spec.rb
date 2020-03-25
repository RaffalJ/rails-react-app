require 'rails_helper'

RSpec.describe RoomChannel, type: :channel do
  let(:user) { create(:user) }
  let(:room) { create(:room) }
  let(:room_message) { create(:room_message) }

  before { stub_connection user_id: user.id }

  describe('.subscribed') do
    it('subscribes to a stream when a valid room id is provided') do
      subscribe(room_id: room.id)

      expect(subscription).to be_confirmed
      expect(subscription).to have_stream_for(room)
    end

    it('rejects when no room id is provided') do
      subscribe

      expect(subscription).to be_rejected
    end
  end

  describe('#received') do
    before do
      subscribe(room_id: room.id)
    end

    let(:data) { { data: { message: 'message' } } }

    it('handles message from a client and creates a new message') do
      allow(subscription).to receive(:createRoomMessage).and_return(room_message)
      expect(RoomChannel).to receive(:broadcast_to).with(room, room_message)
      subscription.receive(data)
    end
  end
end
