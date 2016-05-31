class DashboardsController < ApplicationController

  def show
    @projects = Project.limit(6)
  end

end
