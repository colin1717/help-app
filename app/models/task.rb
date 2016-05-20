class Task < ActiveRecord::Base

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
