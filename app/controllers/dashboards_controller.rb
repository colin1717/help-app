class DashboardsController < ApplicationController

  def show
    @projects = Project.limit(4)
  end

end
