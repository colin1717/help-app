class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :timeoutable
  has_many :tasks
  has_many :projects, through: :tasks
  has_many :owned_projects, class_name: "Project", foreign_key: "owner_id"


  def timeout_in
      1.hour
  end
end
