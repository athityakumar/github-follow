source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5'

# Use mysql as the database for Active Record
gem 'mysql2', '>= 0.3.13', '< 0.5'

gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use Nokogiri gem for using mechanize
gem 'nokogiri', '~> 1.6.7.2'

# Use Mechanize gem for follow/unfollow in Inbound
gem 'mechanize', '~> 2.7.5'

# Jquery Datatable.
gem 'jquery-datatables-rails', '~> 3.4'

# For pagination
gem 'will_paginate', '~> 3.1'
gem 'will_paginate-bootstrap', '~> 1.0', '>= 1.0.1'

# Kick out synchronous delaying guys and process as queues, asynchronously!
gem 'sidekiq'

# Sidekiq strategy to support a granular queue control – limiting, pausing, blocking, querying.
gem 'sidekiq-limit_fetch'

# Adds a Redis::Namespace class which can be used to namespace calls to Redis. This is useful when using a single instance of Redis with multiple, different applications.
gem 'redis-namespace'

# if you require 'sinatra' you get the DSL extended to Object
gem 'sinatra', :require => nil

# Rails Cron
gem 'whenever', '~> 0.9.4', require: false

# Convert Non Char to Ascii
gem 'unidecoder'

group :production do 
  
  # To enable html compression
  gem 'htmlcompressor'
  
  # For Apache Rails engine
  gem 'passenger'

end

group :development do

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  
end