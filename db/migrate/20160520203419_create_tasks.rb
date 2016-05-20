class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :time_commitment
      t.string :state
      t.datetime :date_needed
      t.integer :user_id
      t.integer :project_id

      t.timestamps null: false
    end
  end
end
