class Task < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

  validates :name, length: { minimum: 2, maximum: 50}
  validates :time_commitment, numericality: true, presence: true
  validates :summary, length: { minimum: 2, maximum: 200 }

  state_machine :state, initial: :open do

    event :claim do
      transition :open => :claimed
    end

    event :review do
      transition :claimed => :reviewed
    end

    event :complete do
      transition :reviewed => :completed
    end
  end

end
