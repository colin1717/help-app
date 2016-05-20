json.array!(@projects) do |project|
  json.extract! project, :id, :name, :summary, :location, :owner_id
  json.url project_url(project, format: :json)
end
