import React, { Component } from 'react';

export default class ExercisesList extends Component {
    render() {
        return (
            <div>
                <h3>Exercises List</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Description</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Someday</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}