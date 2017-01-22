class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.text :data 
      t.text :token
      t.text :username
      t.timestamps null: false
    end
  end
end
