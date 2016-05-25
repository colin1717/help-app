class Task < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

  validates :name, length: { minimum: 2, maximum: 50}
  validates :time_commitment, numericality: true, presence: true
  validates :summary, length: { minimum: 2, maximum: 200 }

  def open!
    self.state = 'opened'
  end

  def claim!
    self.state = 'claimed'
    self.save
  end

  def complete!
    self.state = 'completed'
    self.save
  end

end
