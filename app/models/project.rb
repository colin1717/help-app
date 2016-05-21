class Project < ActiveRecord::Base
  has_many :tasks
  belongs_to :owner, class_name: "User"
  has_many :users, through: :tasks, class_name: "User"
end
