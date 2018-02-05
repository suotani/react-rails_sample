var request = window.superagent;
// var UserForm = require('./user_form.js.jsx')

function UserRow(props) {
  return (
    <tr>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td><button onClick={() => props.onClick()}>選択</button></td>
      <td><button onClick={() => props.userDelete()}>削除</button></td>
    </tr>
  )
}

class UserList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      selected_user: {},
    }
    this.setUsers();
  }
  
  setUsers(){
    const url = '/api/users';
    var current_list = this.state.users;
    const self = this;
    window.superagent
      .get(url)
      .end(function(err, res){
        const data = res.body;
        self.setState({
          users: data.users,
          selected_user: {}
        });
      });
  }
  
  setUser(user){
    this.setState({
      selected_user: user,
    });
  }

  userDelete(id){
    const self = this;
    window.superagent
      .delete('/api/users/' + id)
      .end(function(err, res){
        console.log(res.body.msg);
        self.setUsers();
      });
  }
  
  render(){
    const users = this.state.users;
    const user_table_item = users.map((user, index) =>{
      return (
        <UserRow key={user.id} user={user} onClick={() => this.setUser(user)} userDelete={() => this.userDelete(user.id)}/>
      )
    });
    
    return (
      <div>
        <span className="user_index_item">
          <button onClick={() => this.setUsers()}>更新</button>
          <div className="user_table">
            <table>
              <thead>
                <tr><th>名前</th><th>メールアドレス</th><th/><th/></tr>
              </thead>
              <tbody>
                {user_table_item}
              </tbody>
            </table>
          </div>
        </span>
        <span className="user_index_item user_form">
          <UserForm onClick={() => this.setUsers()} selectedUser={this.state.selected_user} />
        </span>
      </div>
    )
  }
}
