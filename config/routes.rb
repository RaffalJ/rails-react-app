Rails.application.routes.draw do
  root to: 'main#main'
  match '*path' => 'main#main', via: [:get], constraints: lambda { |request|
    request.params[:format].nil? &&
    !request.params[:path].starts_with?('api/') &&
    !request.params[:path].starts_with?('users')
  }

  mount ActionCable.server, at: '/cable'

  devise_for :users

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :rooms do
        resources :room_messages, controller: 'rooms/messages', only: :index
      end
      resources :users, only: [] do
        collection do
          get :current_logged_in_user
        end
      end
    end
  end
end
