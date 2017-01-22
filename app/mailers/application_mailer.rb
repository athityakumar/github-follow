class ApplicationMailer < ActionMailer::Base
  default from: "github.notifications@gmail.com"
  layout 'mailer'
end
