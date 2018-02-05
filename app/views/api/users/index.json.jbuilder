json.http_status response.status
json.users @users do |user|
  json.id user.id
  json.name user.name
  json.email user.email
end
json.last_user_created_at @users.first.created_at.strftime("%Y-%m-%d %H:%M:%S.%N") if @users.present?