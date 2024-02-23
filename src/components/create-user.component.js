import React, { Component } from 'react';
import axios from 'axios'

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "currentUser",
        }
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }
        console.log(user);

        axios.post('http://localhost:8080/users/add', user)
            .then(res => console.log(res.data));

        this.setState({ username: "" });
    }
    render() {
        return (
            <div>
                <h3>Create User</h3>
                <div className='container' onSubmit={this.onSubmit}>
                    <form>
                        <div className='form-group'>
                            <label>Username</label>
                            <input className='form-control' type='text' required
                                value={this.state.username} onChange={this.onChangeUsername}></input>
                        </div>
                        <br></br>
                        <div className='form-group'>
                            <input type="submit" className='btn btn-primary' value="Create User"></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}