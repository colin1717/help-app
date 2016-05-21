class Task < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

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
