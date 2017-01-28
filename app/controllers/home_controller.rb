class HomeController < ApplicationController
  def index
    unless session[:access_token].nil?
      redirect_to "/admin/"
    end
  end
end