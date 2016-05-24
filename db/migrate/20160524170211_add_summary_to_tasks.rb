class AddSummaryToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :summary, :string
  end
end
