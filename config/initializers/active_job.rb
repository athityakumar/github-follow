if Rails.env.production?
  ActiveJob::Base.queue_adapter = :sidekiq
else
  ActiveJob::Base.queue_adapter = :inline
end
