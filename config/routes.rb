Rails.application.routes.draw do
  root 'home#index'
  get    "/admin"                         => "admin#index",            as: :admin
  get    "*unmatched_route"               => "home#no_route_match_error"
end
