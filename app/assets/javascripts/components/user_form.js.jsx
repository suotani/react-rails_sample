class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      id: null,
      resurlt: '',
      error_messages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillReceiveProps (props){
    this.setState({
      name: props.selectedUser.name || '',
      email: props.selectedUser.email || '',
      id: props.selectedUser.id || null,
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const id = this.state.id;
    const url = id ? '/api/users/' + id : '/api/users';
    const data = this.state;
    const clickEvent = this.props.onClick;
    const self = this;
    window.superagent
      .post(url)
      .send({name: data.name, email: data.email})
      .end(function(err, res){
        self.setState({result: res.body.msg});
        if(err){
          self.setState({
            error_messages: res.body.errors
          });
        }else{
          self.resetForm();
          clickEvent();
        }
      });
    event.preventDefault();
  }
  
  resetForm(){
    this.setState({
      name: '',
      email: '',
      id: null,
    });
  }

  render() {
    var error_message_list = this.state.error_messages.map((msg, index) => {
      return <p key={msg}>{msg}</p>
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit} autocomplete="off">
          <div>{this.state.result}</div>
          <div>
            <label>
              Name:
              <input type="text" className="name_input" name="name" value={this.state.name} onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="text" className="email_input" name="email" value={this.state.email} onChange={this.handleChange} />
            </label>
          </div>
          <input type="submit" value={this.state.id ? "更新" : "登録"} />
          <button onClick={() => this.resetForm()} type="button">クリア</button>
          <div>
            {error_message_list}
          </div>
        </form>
      </div>
    );
  }
}
