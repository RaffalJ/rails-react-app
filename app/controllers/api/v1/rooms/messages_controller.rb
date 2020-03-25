module Api
  module V1
    module Rooms
      class MessagesController < BaseController
        def index
          render(:index, locals: { room_messages: Room.find(params[:room_id]).room_messages }, status: :ok)
        end
      end
    end
  end
end
