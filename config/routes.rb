Resources::Application.routes.draw do
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

 
  match 'quick-fast-loans' => redirect("http://www.thepaydayhound.com/quick-fast-loans/")
  match 'jupiter-funding-group' => redirect("http://www.thepaydayhound.com/jupiter-funding-group/")
  match 'great-plains-lending' => redirect("http://www.thepaydayhound.com/great-plains-lending/")
  match 'choosing-a-payday-loan' => redirect("http://www.thepaydayhound.com/choosing-a-payday-loan/")
  match 'no-faxing-payday' => redirect("http://www.thepaydayhound.com/no-faxing-payday/")
  match 'payday-direct' => redirect("http://www.thepaydayhound.com/payday-direct/")
  match 'united-cash-loans' => redirect("http://www.thepaydayhound.com/united-cash-loans/")
  match 'payday-avenue' => redirect("http://www.thepaydayhound.com/payday-avenue/")
  match 'wells-fargo-direct-advance-fridays' => redirect("http://www.thepaydayhound.com/wells-fargo-direct-advance-fridays/")
  match '500-fast-cash' => redirect("http://www.thepaydayhound.com/500-fast-cash/")
  match 'how-payday-loans-work' => redirect("http://www.thepaydayhound.com/how-payday-loans-work/")
  match 'the-payday-hound-official-launch' => redirect("http://www.thepaydayhound.com/the-payday-hound-official-launch/")
  match 'my-payday-loan' => redirect("http://www.thepaydayhound.com/my-payday-loan/")
  match 'my-cash-now' => redirect("http://www.thepaydayhound.com/my-cash-now/")
  match 'aaa-payday-cash' => redirect("http://www.thepaydayhound.com/aaa-payday-cash/")
  match 'one-click-cash' => redirect("http://www.thepaydayhound.com/one-click-cash/")
  match 'payday-max' => redirect("http://www.thepaydayhound.com/payday-max/")
  match 'ameri-cash-advance' => redirect("http://www.thepaydayhound.com/ameri-cash-advance/")
  match 'My-Cash-Now' => redirect("http://www.thepaydayhound.com/My-Cash-Now/")
  match 'ameriloan' => redirect("http://www.thepaydayhound.com/ameriloan/")
  match 'plain-green-loans' => redirect("http://www.thepaydayhound.com/plain-green-loans/")
  match 'east-side-lenders' => redirect("http://www.thepaydayhound.com/east-side-lenders/")
  match 'cash-central' => redirect("http://www.thepaydayhound.com/cash-central/")
  match 'category/uncategorized' => redirect("http://www.thepaydayhound.com/category/uncategorized/")
  match 'payday-one' => redirect("http://www.thepaydayhound.com/payday-one/")
  match 'AmeriLoan' => redirect("http://www.thepaydayhound.com/AmeriLoan/")
  match 'wp-content/uploads/2012/06/Quick-Fast-Loans.pn' => redirect("http://www.thepaydayhound.com/wp-content/uploads/2012/06/Quick-Fast-Loans.pn/")
  match 'wp-content/uploads/2012/06/Choosing-Payday-Loans.jpe' => redirect("http://www.thepaydayhound.com/wp-content/uploads/2012/06/Choosing-Payday-Loans.jpe/")
  match 'integrity-advance' => redirect("http://www.thepaydayhound.com/integrity-advance/")
  match 'payday-loan-requirements' => redirect("http://www.thepaydayhound.com/payday-loan-requirements/")
  match 'Cashnetusa' => redirect("http://www.thepaydayhound.com/Cashnetusa/")
  match 'find-apply-best-payday-loan-state' => redirect("http://www.thepaydayhound.com/find-apply-best-payday-loan-state/")
  match '2012/07' => redirect("http://www.thepaydayhound.com/2012/07/")
  match 'wp-content/uploads/2012/08/No-Faxing-Payday.pn' => redirect("http://www.thepaydayhound.com/wp-content/uploads/2012/08/No-Faxing-Payday.pn/")
  match 'Sonic-Cash' => redirect("http://www.thepaydayhound.com/Sonic-Cash/")
  match '/tag/:name' => redirect("http://www.thepaydayhound.com/tag/%{name}") 

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
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
  #       get 'recent', :on => :collection
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
  # root :to => 'welcome#index'

  root :to => redirect("http://www.thepaydayhound.com/")
  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
