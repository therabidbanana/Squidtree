Squidtree::Application.routes.draw do
  get "errors/error_404"

  get "errors/error_500"

  resources :comments, :except => [:index, :show]
  resources :links, :except => [:show]
  resources :users

  match "/login" => redirect("/auth/facebook")
  match "/auth/:provider/callback", :to => "sessions#create"
  get "/auth/failure", :to => "sessions#failure"
  get "/logout", :to => "sessions#destroy"

  resources :blog, :controller => :posts, :as => :posts
  match "/feed" => "posts#index",
      :as => :feed,
      :defaults => { :format => "rss" }

  resources :portfolio, :controller=>"portfolio"

  match "about/" => "pages#about"
  match "contact/" => "contacts#new"
  match "request_access" => "users#request_access"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match "products/:id" => "catalog#view"
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match "products/:id/purchase" => "catalog#purchase", :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get "short"
  #       post "toggle"
  #     end
  #
  #     collection do
  #       get "sold"
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get "recent", :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => "welcome#index"
  root :to=> "pages#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that"s not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ":controller(/:action(/:id(.:format)))"
  match "/404", to: "errors#error_404"
  match "/500", to: "errors#error_500"
  match "/403", to: "errors#error_403"
end
