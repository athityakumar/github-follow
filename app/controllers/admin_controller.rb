class AdminController < ApplicationController
  def index
    require 'net/http'
    require 'json'
    if !params[:code].nil? 
      @code = params[:code] 
      begin 
        @code = params[:code]
        @client_id = ENV["CLIENT_ID"]
        @client_secret = ENV["CLIENT_SECRET"]
        @redirect_uri = ENV["REDIRECT_URI"]
        @access_token = Net::HTTP.get(URI.parse("https://github.com/login/oauth/access_token?client_id=#{@client_id}&redirect_uri=#{@redirect_uri}&client_secret=#{@client_secret}&code=#{@code}"))
        @access_token = @access_token.split("&")[0].gsub("access_token=","")
        data = JSON.parse(`curl -s 'https://api.github.com/user?access_token=#{@access_token}'`)
        @username = data["login"].to_s
        @name = data["name"].to_s
        @email = data["email"].to_s       
        db=Notification.all.where({username: @username})
        (db.count>0) ? db.update_all(token: @access_token) : Notification.create({username: @username,token: @access_token, data: []})
      rescue Exception => e
        @access_token = e
      end
      session[:access_token] = @access_token
      session[:username] = @username
      session[:name] = @name
      session[:email] = @email
      redirect_to "/admin"
    else
      if session[:access_token].nil?
        redirect_to "/"
      else
        @username = session[:username]
        @name = session[:name]
        @email = session[:email]
      end
    end
  end
end
