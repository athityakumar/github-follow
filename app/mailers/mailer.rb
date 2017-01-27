class Mailer < ApplicationMailer
 
    def notification_mailer olddata , newdata , todate , username , email
        @addnot = (newdata-olddata).uniq
        @remnot = (olddata-newdata).uniq
        @count = newdata.uniq.count
        @username = username
        mail(to: email, subject: "GitHub Follower App Notifications | Dated #{todate}")
    end

    def report_error error , todate , email 
        @error = error
        mail(to: email, subject: "GitHub Follower Error | Dated #{todate}")
    end

    def admin_mailer mailed_today , todate , email
        @mailed = mailed_today
        mail(to: email, subject: "GitHub Follower Admin Notifications | Dated #{todate}")
    end

end
