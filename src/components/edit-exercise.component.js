import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: "",
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            level: 0,
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/users/')
            .then(res => {
                if (res.data.length > 0)
                    this.setState({
                        users: res.data.map((user) => user.username),
                    });
            }).catch(err => console.log(err));

        let exerciseId = window.location.pathname.split('/')[2];
        this.setState({ id: exerciseId });

        axios.get('http://localhost:8080/exercises/' + exerciseId)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date),
                    level: res.data.level,
                })
            }).catch(err => console.log(err));
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
    onChangeLevel(e) {
        this.setState({ level: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
            level: this.state.level
        }

        console.log(exercise);
        axios.post('http://localhost:8080/exercises/update/' + this.state.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
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
                        <div className='form-group'>
                            <label>Priority</label>
                            <select className='form-control'
                                value={this.state.level} onChange={this.onChangeLevel}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                        <br></br>
                        <div className='form-group'>
                            <input type="submit" className='btn btn-primary' value="Edit Exercise Log"></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}