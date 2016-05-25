class Task < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

  validates :name, length: { minimum: 2, maximum: 50}
  validates :time_commitment, numericality: true, presence: true
  validates :summary, length: { minimum: 2, maximum: 200 }

  attr_accessor :state
  state_machine :state, initial: :open do

    state :open
    state :claimed
    state :completed

    event :claim do
      transition :open => :claimed
    end

    event :complete do
      transition :claimed => :completed
    end

    state :open do
      def open?
        true
      end
    end

    state :claimed do
      def claimed?
        true
      end
    end

    state :completed do
      def completed?
        true
      end
    end

  end
end
