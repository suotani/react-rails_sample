class Api::UsersController < ApplicationController
  protect_from_forgery :except => [:create, :update]
    
  def index
    @users = User.order("created_at DESC")
  end
  
  def create
    @user = User.new(user_params)
    respond_to do |format|
      if @user.save
        format.json {render json: {msg: "登録に成功しました"}, status: :ok}
      else
        format.json {render json: {errors: @user.errors.full_messages, msg: "登録に失敗しました"}, status: :bad_request}
      end
    end
  end
  
  def update
    @user = User.find(params[:id])
    @user.attributes = user_params
    respond_to do |format|
      if @user.save
        format.json {render json: {msg: "更新に成功しました。"}, status: :ok}
      else
        format.json {render json: {errors: @user.errors.full_messages, msg: "更新に失敗しました"}, status: :bad_request}
      end
    end
  end
  
  def destroy
    @user = User.find(params[:id])
    user_name = @user.name
    @user.delete
    respond_to do |format|
      format.json {render json: {msg: "#{user_name}を削除しました"}, status: :ok}
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:name, :email)
  end
end