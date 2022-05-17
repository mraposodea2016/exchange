Rails.application.routes.draw do
  root "transactions#index"
  get "/transactions", to: "transactions#index"
end
