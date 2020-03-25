module Api
  module V1
    class RoomsController < BaseController
      def index
        render(:index, locals: { rooms: Room.all }, status: :ok)
      end

      def show
        render(:show, locals: { room: Room.includes(:room_messages).find(params[:id]) }, status: :ok)
      end

      def create
        @room = Room.new permitted_params

        if @room.save
          render(:create, locals: { room: @room },status: :ok)
        else
          head(status: :bad_request)
        end
      end

      private

      def permitted_params
        params.require(:room).permit(:name)
      end
    end
  end
end
