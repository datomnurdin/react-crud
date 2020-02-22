import React from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';

class App extends React.Component{

  constructor(){
    super()
    this.state = {
      users: [],
      newUserData:{
        username:"",
        email:"",
        phone_number:"",
        skillsets:"",
        hobby:""
      },
      editUserData:{
        userId:"",
        username:"",
        email:"",
        phone_number:"",
        skillsets:"",
        hobby:""
      },
      newUserModal: false,
      editUserModal: false
    }
  }

  loadUser(){
    axios.get('http://localhost:3000/users').then((response) => {
      console.log(response.data)
      this.setState({
        users: response.data
      })
    })
  }

  componentWillMount(){
    this.loadUser()
  }

  toggleNewUserModal(){
    this.setState({
      newUserModal: !this.state.newUserModal
    })
  }

  toggleEditUserModal(){
    this.setState({
      editUserModal: !this.state.editUserModal
    })
  }

  addUser(){
    axios.post('http://localhost:3000/user', this.state.newUserData).then((response) => {
      let {users} = this.state;
      this.loadUser()

        this.setState({ users, newUserModal: false, newUserData:{
          username:"",
          email:"",
          phone_number:"",
          skillsets:"",
          hobby:""
          }
        })
    })
  }

  updateUser(){
    let { userId, username, email, phone_number, skillsets, hobby } = this.state.editUserData

    axios.put("http://localhost:3000/user", { 
      userId,
      username,
      email,
      phone_number,
      skillsets,
      hobby
    }).then((response) => {
      this.loadUser()

        this.setState({ editUserModal: false, editUserData:{
          userId,
          username:"",
          email:"",
          phone_number:"",
          skillsets:"",
          hobby:""
        }
      })
    })
  }

  editUser(userId, username, email, phone_number, skillsets, hobby){
    this.setState({
      editUserData: { userId, username, email, phone_number, skillsets, hobby }, editUserModal: ! this.state.editUserModal
    })
  }

  deleteUser(userId){
    axios.delete("http://localhost:3000/user/"+userId).then((response) => {
      this.loadUser()
    })
  }

  render(){
    let users = this.state.users.map((user) => {
      return(
          <tr key={user.userId}>
            <td>{user.userId}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone_number}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.editUser.bind(this, user.userId, user.username, user.email, user.phone_number, user.skillsets, user.hobby)}>Edit</Button>
              <Button color="danger" size="sm" onClick={this.deleteUser.bind(this,user.userId)}>Delete</Button>
            </td>
          </tr>
      )
    })
    return (
      <div className="App container">
        <h1>Complete Developer Network</h1>
        <Button className="my-3" color="primary" onClick={this.toggleNewUserModal.bind(this)}>Register as Freelancer</Button>
        
        <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>Add new user</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input id="username" value={this.state.newUserData.username} 
              onChange={(e) => {
                let { newUserData } = this.state
                newUserData.username = e.target.value
                this.setState({ newUserData })
              }}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input id="email" value={this.state.newUserData.email} 
              onChange={(e) => {
                let { newUserData } = this.state
                newUserData.email = e.target.value
                this.setState({ newUserData })
              }}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="phone_number">Phone Number</Label>
              <Input id="phone_number" value={this.state.newUserData.phone_number} 
              onChange={(e) => {
                let { newUserData } = this.state
                newUserData.phone_number = e.target.value
                this.setState({ newUserData })
              }}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="skillsets">Skillsets</Label>
              <Input id="skillsets" value={this.state.newUserData.skillsets} 
              onChange={(e) => {
                let { newUserData } = this.state
                newUserData.skillsets = e.target.value
                this.setState({ newUserData })
              }}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="hobby">Hobby</Label>
              <Input id="hobby" value={this.state.newUserData.hobby} 
              onChange={(e) => {
                let { newUserData } = this.state
                newUserData.hobby = e.target.value
                this.setState({ newUserData })
              }}></Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addUser.bind(this)}>Add User</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit user</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input id="username" value={this.state.editUserData.username} 
              onChange={(e) => {
                let { editUserData } = this.state
                editUserData.username = e.target.value
                this.setState({ editUserData })
              }}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input id="email" value={this.state.editUserData.email} 
              onChange={(e) => {
                let { editUserData } = this.state
                editUserData.email = e.target.value
                this.setState({ editUserData })
              }}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="phone_number">Phone Number</Label>
              <Input id="phone_number" value={this.state.editUserData.phone_number} 
              onChange={(e) => {
                let { editUserData } = this.state
                editUserData.phone_number = e.target.value
                this.setState({ editUserData })
              }}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="skillsets">Skillsets</Label>
              <Input id="skillsets" value={this.state.editUserData.skillsets} 
              onChange={(e) => {
                let { editUserData } = this.state
                editUserData.skillsets = e.target.value
                this.setState({ editUserData })
              }}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="hobby">Hobby</Label>
              <Input id="hobby" value={this.state.editUserData.hobby} 
              onChange={(e) => {
                let { editUserData } = this.state
                editUserData.hobby = e.target.value
                this.setState({ editUserData })
              }}></Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateUser.bind(this)}>Update User</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default App;
