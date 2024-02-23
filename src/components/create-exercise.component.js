import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/users/')
            .then(res => {
                if (res.data.length > 0)
                    this.setState({
                        users: res.data.map((user) => user.username),
                        username: res.data[0].username
                    });
            });
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value });
    }
    onChangeDescription(e) {
        this.setState({ description: e.target.value });
    }
    onChangeDuration(e) {
        this.setState({ duration: e.target.value });
    }
    onChangeDate(date) {
        this.setState({ date: date });
    }
    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }

        console.log(exercise);
        axios.post('http://localhost:8080/exercises/add', exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create Exercise Log</h3>
                <div className='container'>
                    <form onSubmit={this.onSubmit}>
                        <div className='form-group'>
                            <label>Username</label>
                            <select ref='userInput' className='form-control' required
                                value={this.state.username} onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map((user) => {
                                        return <option value={user} key={user}>{user}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Description</label>
                            <input type='text' className='form-control' placeholder='Exercise description'
                                value={this.state.description} onChange={this.onChangeDescription}></input>
                        </div>
                        <div className='form-group'>
                            <label>Duration (minutes)</label>
                            <input type='number' className='form-control'
                                value={this.state.duration} onChange={this.onChangeDuration}></input>
                        </div>
                        <div className='form-group'>
                            <label>Date</label>
                            <div>
                                <DatePicker selected={this.state.date} onChange={this.onChangeDate}
                                    className='form-control' required></DatePicker>
                            </div>
                        </div>
                        <br></br>
                        <div className='form-group'>
                            <input type="submit" className='btn btn-primary' value="Create Exercise Log"></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}