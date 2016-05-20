json.array!(@tasks) do |task|
  json.extract! task, :id, :name, :time_commitment, :status, :date_needed, :user_id, :project_id
  json.url task_url(task, format: :json)
end
