import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Exercise(props) {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={"/edit/" + props.exercise._id}><button className="btn btn-primary">Edit</button></Link> | <button className="btn btn-danger" onClick={() => { props.deleteFunction(props.exercise._id) }}>Delete</button>
            </td>
        </tr>
    )
}

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercises: []
        }
    }

    deleteExercise(id) { 
        axios.delete('http://localhost:8080/exercises/' + id)
            .then(res => console.log(res.data));

        this.setState({ exercises: this.state.exercises.filter(el => el._id !== id) });
    }

    ExercisesList() {
        return this.state.exercises.map((el) => {
            return <Exercise exercise={el} key={el._id} deleteFunction={this.deleteExercise}></Exercise>
        })
    }

    componentDidMount() {
        axios.get('http://localhost:8080/exercises/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        exercises: res.data
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <h3>Exercises List</h3>
                <div className='table-responsive'>
                    <table className="table table-hover table-bordered text-center">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Description</th>
                                <th scope="col">Duration (minutes)</th>
                                <th scope="col">Date</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.ExercisesList()
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}