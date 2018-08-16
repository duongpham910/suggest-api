Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :faquestions do
        get "suggest_tag", on: :collection
      end
    end
  end
end
