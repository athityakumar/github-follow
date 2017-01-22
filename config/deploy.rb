require "bundler/capistrano"
require "whenever/capistrano"
require "capistrano/sidekiq"

# Used in SSHKit.
default_run_options[:pty] = true

# Capistrano will ssh into the server and clone the repo using your local user’s ssh keys
# Note:
# Add a few lines to the ~/.ssh/config file on your local machine. We’re deploying to example.com, so we’ll need these lines:
# Host *example.com
#   ForwardAgent yes
ssh_options[:forward_agent] = true

# To set the shell to bash for run in capistrano
set :default_shell, '/bin/bash -l'

# Update the Cronjob require 'whenever/capistrano'
set :whenever_command, "bundle exec whenever"

# App Name
set :application, 'pipecandy'

# Add a repository to access (For Git Users)
set :scm, :git

# Git Repository
set :repository, 'git@github.com:Ideas2IT/pipecandy-web.git'

# If you need to touch public/images, public/javascripts, and public/stylesheets on each deploy
# set :normalize_asset_timestamps, %{public/images public/javascripts public/stylesheets}
set :normalize_asset_timestamps, false

# Improve Performance with Remote Cache
set :deploy_via, :remote_cache

# By default, Capistrano will try to use sudo to do certain operations (setting up your servers, restarting your application, etc.). If you are on a shared host, sudo might be unavailable to you, or maybe you just want to avoid using sudo.
set :use_sudo, false

# Set the user on our server that we want Capistrano to run commands
set :user, "ubuntu"

# Role Declaration for single staging server
server "54.153.35.230", :app, :web, :db, :primary => true

# Deploy Location
set :deploy_to, "/home/ubuntu/public_html"

# Enable sidekiq after deploying the app
set :pty,  false
set :sidekiq_role, :app
set :sidekiq_config, "#{current_path}/config/sidekiq.yml"
set :sidekiq_env, "production"

# The last n releases are kept for possible rollbacks.
set :keep_releases, 5

# set the banch to deploy
set :branch, "master"

# If you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"
after "deploy", "deploy:cleanup"
after "deploy:migrations", "deploy:cleanup"

namespace :deploy do
  # The "restart" task is built into Capistrano and will be executed by Capistrano automatically after your deployment is complete
  task :restart, roles: :app, except: {no_release: true} do
    run "touch #{current_path}/tmp/restart.txt"
  end
end