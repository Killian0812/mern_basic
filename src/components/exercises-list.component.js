import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.min.js';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-buttons-dt';

function Exercise(props) {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td style={{ textAlign: 'center' }}>{props.exercise.duration}</td>
            <td style={{ textAlign: 'center' }}>{props.exercise.date.substring(0, 10)}</td>
            <td style={{ textAlign: 'center' }}>{props.exercise.level}</td>
            <td style={{ textAlign: 'center' }}>
                <Link to={"/edit/" + props.exercise._id}><button className="btn btn-primary">Edit</button></Link>
                &nbsp;|&nbsp;<button className="btn btn-danger" onClick={() => { props.deleteFunction(props.exercise._id) }}>Delete</button>
            </td>
        </tr>
    )
}

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.ExercisesList = this.ExercisesList.bind(this);
        this.toolToggle = this.toolToggle.bind(this);
        this.startTables = this.startTables.bind(this);

        this.state = {
            exercises: [],
            usingAdvancedTool: 0
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

    startTables() {
        return <table id="dtBasicExample" className="table table-hover table-bordered table-sm" cellSpacing="0" width="100%">
            <thead className="table-light">
                <tr>
                    <th className='align-middle' scope="col" style={{ height: 45, width: 150 }}>Username</th>
                    <th className='align-middle' scope="col" style={{ height: 45, width: 200 }}>Description</th>
                    <th className='align-middle' scope="col" style={{ height: 45, width: 100, textAlign: 'center' }}>Duration</th>
                    <th className='align-middle' scope="col" style={{ height: 45, width: 150, textAlign: 'center' }}>Date</th>
                    <th className='align-middle' scope="col" style={{ height: 45, width: 100, textAlign: 'center' }}>Priority</th>
                    <th className='align-middle' scope="col" style={{ height: 45, width: 200 }}></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.ExercisesList()
                }
            </tbody>
        </table>
    }

    initDataTables() {
        $('#toolButton').addClass('btn btn-primary active');
        $('#dtBasicExample').DataTable({
            layout: {
                top2Start: 'pageLength',
                top2End: 'search',
                // Not showing
                topStart: {
                    buttons: ['print']
                },
                topEnd: null
            },
            "language": {
                "lengthMenu": "Show _MENU_ Exercises per page",
                "zeroRecords": "No Exercise available",
                "info": "Showing _START_ to _END_ of _TOTAL_ Exercises",
                "infoEmpty": "No Exercise found",
                "search": "Find Exercise: ",
            },
            // Default data per page
            pageLength: 10,
            columnDefs: [
                // Left align the header content of column 1
                { className: "dt-head-left", targets: [0, 1] },
                { className: "dt-head-center", targets: [2, 3, 4] },
                { className: "dt-body-center", targets: [2, 3, 4] },
                { width: '100px', targets: [2, 4] },
                { width: '150px', targets: [0, 3] },
                { width: '200px', targets: [1, 5] },
                { "orderable": false, "targets": [5] }
            ],
        });
        $('.dataTables_length').addClass('bs-select');
    }

    destroyDataTables() {
        $('#toolButton').removeClass();
        $('#toolButton').addClass('btn btn-primary');
        $('#dtBasicExample').DataTable().destroy();
    }

    toolToggle() {
        this.setState({ usingAdvancedTool: 1 - this.state.usingAdvancedTool });
        console.log(this.state.usingAdvancedTool);
        if (this.state.usingAdvancedTool === 0)
            this.initDataTables();
        else
            this.destroyDataTables();
    }

    componentDidMount() {
        this.setState({ usingAdvancedTool: 0 });
        console.log(this.state.usingAdvancedTool);
        axios.get('http://localhost:8080/exercises/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({ exercises: res.data });
                }
            });
    }

    render() {
        return (
            <div>
                <h3>Exercises List</h3>
                <div className='table-responsive'>
                    <table id="dtBasicExample" className="table table-hover table-bordered table-sm" cellSpacing="0" width="100%">
                        <thead className="table-light">
                            <tr>
                                <th className='align-middle' scope="col" style={{ height: 45, width: 150 }}>Username</th>
                                <th className='align-middle' scope="col" style={{ height: 45, width: 200 }}>Description</th>
                                <th className='align-middle' scope="col" style={{ height: 45, width: 100, textAlign: 'center' }}>Duration</th>
                                <th className='align-middle' scope="col" style={{ height: 45, width: 150, textAlign: 'center' }}>Date</th>
                                <th className='align-middle' scope="col" style={{ height: 45, width: 100, textAlign: 'center' }}>Priority</th>
                                <th className='align-middle' scope="col" style={{ height: 45, width: 200 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.ExercisesList()
                            }
                        </tbody>
                    </table>
                    <button id="toolButton" className='btn btn-primary' onClick={this.toolToggle}>Advanced Tool</button>
                </div>
            </div>
        )
    }
}