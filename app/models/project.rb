class Project < ActiveRecord::Base
  has_many :tasks, dependent: :destroy
  belongs_to :owner, class_name: "User"
  has_many :users, through: :tasks, class_name: "User"

  validates :name, length: { minimum: 2, maximum: 50}
  validates :summary, length: { maximum: 500 }, presence: true
  validates :location, length: { minimum: 2, maximum: 30 }
end
