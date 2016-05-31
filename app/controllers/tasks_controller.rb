class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, except: :me
  before_action :set_task, only: [:show, :edit, :update, :destroy, :claim, :complete]


  # GET /tasks
  # GET /tasks.json
  # removed because not using
  # def index
  #   @tasks = Task.where(project_id: @project.id)
  # end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
  end

  # GET /tasks/new
  def new
    @task = @project.tasks.build
    render :layout => nil
  end

  # GET /tasks/1/edit
  def edit
    render :layout => nil
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = @project.tasks.build(task_params)
    @task.open!
    respond_to do |format|
      if @task.save
        format.html { redirect_to ([@project, @task]), notice: 'Task was successfully created.' }
        format.json { render :show, status: :created, location: ([@project, @task]) }
      else
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to ([@project, @task]), notice: 'Task was successfully updated.' }
        format.json { render :show, status: :ok, location: ([@project, @task]) }
      else
        format.html { render :edit }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def claim
    if @task.user_id.blank?
      @task.update_attributes(user_id: current_user.id)
      @task.claim!
    end
    respond_to do |format|
      format.json { render :show, status: :ok, location: ([@project, @task]) }
    end
  end

  def complete
    @task.complete!
    respond_to do |format|
      format.json { render :show, status: :ok, location: ([@project, @task]) }
    end
  end

    # DELETE /tasks/1
    # DELETE /tasks/1.json
    def destroy
      @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def me
    @tasks = Task.where(user_id: current_user.id)
  end

  private
    def set_project
      @project = Project.find(params[:project_id])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = @project.tasks.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:task).permit(:name, :time_commitment, :summary, :date_needed, :user_id, :project_id)
    end


end
