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
        result = ::Rooms::Create.new.call(permitted_params)
        result.success && render(:create, locals: { room: result.success }, status: :ok)
        result.failure && (head :bad_request)
      end

      private

      def permitted_params
        params.require(:room).permit(:name)
      end
    end
  end
end
