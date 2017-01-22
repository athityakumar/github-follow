class Notification < ActiveRecord::Base

    serialize :data, Array

end
