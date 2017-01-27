namespace :github_notification do
  task followers: :environment do
    begin
      require 'date'
      require 'json'     
      ping_url = "https://#{ENV["APP_NAME"]}.herokuapp.com/"
      per_page = 100
      mailed_today = []
      curl_statement = "curl -s "
      notifications = Notification.all
      notifications.each do |notification|
        begin
          username = notification.username
          olddata = notification.data
          access_token = notification.token
          newdata , foll = [] , []
          email = JSON.parse(`#{curl_statement} 'https://api.github.com/user?access_token=#{access_token}'`)["email"].to_s
          puts email
          api_link = "https://api.github.com/user/followers"
          begin
            n = `#{curl_statement} -i '#{api_link}?access_token=#{access_token}&per_page=#{per_page.to_s}'`.split(">; rel=")[1].split("&page=")[1].to_i 
          rescue
            n = 1
          end
          puts n
          for i in (1..n)
            foll += JSON.parse(`#{curl_statement} '#{api_link}?access_token=#{access_token}&per_page=#{per_page.to_s}&page=#{i.to_s}'`)
          end
          foll.each do |f|
            newdata.push(f["login"])
            puts f["login"]
          end
          notification.update({data: newdata})
          if ((newdata-olddata) + (olddata-newdata)) == []
            mailed_today.push({"username" => username, "mailed" => false})
          else
            Mailer.notification_mailer(olddata.uniq,newdata.uniq,Date.today.strftime("%d/%m/%Y"),username,email).deliver_now 
            puts "Mail sent"
            mailed_today.push({"username" => username, "mailed" => true})
          end
        rescue Exception => e 
          Mailer.report_error(e,Date.today.strftime("%d/%m/%Y"),"athityakumar@gmail.com").deliver_now
          puts "Error #{e}"
        end
        `curl -s #{ping_url}`
      end
      Mailer.admin_mailer(mailed_today,Date.today.strftime("%d/%m/%Y"),"athityakumar@gmail.com").deliver_now
    end
  end
end
