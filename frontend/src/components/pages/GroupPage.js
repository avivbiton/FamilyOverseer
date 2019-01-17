import React, { Component } from 'react'
import { connect } from "react-redux";

// icons
import addIcon from "../../images/add-icon.png";
import removeIcon from "../../images/remove-icon.png";
import editIcon from "../../images/edit-icon.png";

import { getGroupInformation } from "../../redux/actions/groupActions";
import LoadingSpinner from '../common/LoadingSpinner';

const iconStyle = { width: "35px", height: "35px" }

class GroupPage extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true
        };

    }

    componentDidMount() {
        const groupId = this.props.match.params.id;
        this.setState({ groupId: groupId })

        this.props.getGroupInformation(groupId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ error: nextProps.errors.error })
        } else {
            this.setState({ currentGroup: nextProps.groups.currentGroup });
        }

        this.setState({ isLoading: false });
    }

    onAddTaskClicked() {
        // TODO: Add modular for creating tasks?
    }

    renderTask(task, index) {
        return (
            <tr index={index}>
                <td>{task.text}</td>
                <td>{task.startDate}</td>
                <td>{task.completed ? "Yes" : "No"}</td>
                <td>{task.dueDate}</td>
                <td>
                    <button className="btn btn-default">
                        <img src={editIcon} alt="edit" />
                    </button>
                    <button className="btn btn-default">
                        <img src={removeIcon} alt="remove" />
                    </button>
                </td>
            </tr>
        )
    }


    renderPage() {
        const group = this.props.groups.currentGroup;


        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="display-3 mb-4">
                            {group.name}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-11">
                        <button className="btn btn-default" onClick={this.onAddTaskClicked.bind(this)}>
                            <img src={addIcon} alt="Add" style={iconStyle} />
                            <span className="lead align-middle">Add Task</span>
                        </button>
                    </div>
                    <div className="col-md mt-3 text-muted">
                        {group.activeTasks.length} Tasks
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-dark table-hover">
                            <thead>
                                <th>Task</th>
                                <th>Start</th>
                                <th>Completed</th>
                                <th>Due</th>
                            </thead>
                            <tbody>
                                {group.activeTasks.map((task, index) => this.renderTask(task, index))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="text-center display-2">
                    <LoadingSpinner />
                </div>
            )
        }

        if (this.state.error) {
            return (
                <div className="container">
                    <div className="text-center display-2">
                        ERROR 404
                        </div>
                    <div className="text-center display-3 mt-2">
                        {this.state.error}
                    </div>
                    <div className="text-center mt-5">
                        <button className="btn btn-info btn-lg" onClick={() => this.props.history.push("/")}>
                            Return Home
                        </button>
                    </div>
                </div>
            )
        }

        return this.renderPage();
    }
}


const mapStateToProps = state => ({
    errors: state.errors,
    groups: state.groups
});

export default connect(mapStateToProps, { getGroupInformation })(GroupPage);
