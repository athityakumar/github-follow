class Mailer < ApplicationMailer
 
    def notification_mailer addnot , remnot , todate , username , email
        @addnot = addnot
        @remnot = remnot
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
