Rails.application.routes.draw do
  root to: 'users#index'
  get 'users/index'
  
  namespace :api do
    resources :users, only: [:index, :create, :destroy] do
      member do
        post :update
      end
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
