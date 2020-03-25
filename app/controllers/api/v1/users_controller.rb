module Api
  module V1
    class UsersController < BaseController
      def current_logged_in_user
        render(:current_user, locals: { current_user: current_user }, status: :ok)
      end
    end
  end
end
