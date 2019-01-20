import React, { Component } from 'react'
import { connect } from "react-redux";
import Moment from 'react-moment';

// icons
import addIcon from "../../images/add-icon.png";
import removeIcon from "../../images/remove-icon.png";
import editIcon from "../../images/edit-icon.png";
import leaveIcon from "../../images/sign-out.svg";

import { getGroupInformation, createGroupTask, completeGroupTask, editGroupTask, leaveGroup, archiveCompletedTasks } from "../../redux/actions/groupActions";
import LoadingSpinner from '../common/LoadingSpinner';
import { InputControl } from '../common/FormControls';
import { formatDateForInput } from '../../utilis';

const iconStyle = { width: "35px", height: "35px" }

class GroupPage extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            modalLoading: false,
            editMode: false
        };

    }

    componentDidMount() {
        const groupId = this.props.match.params.id;
        const date = new Date(Date.now());

        this.setState({
            groupId: groupId,
            errors: {},
            taskText: "",
            isDue: false,
            taskDate: formatDateForInput(date)
        })

        this.props.getGroupInformation(groupId);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors, modalLoading: false });

        this.setState({ isLoading: false });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    clearTaskModal() {
        this.setState({
            taskText: "",
            taskDate: formatDateForInput(new Date(Date.now())),
            editMode: false
        });
    }

    onAddTaskClicked() {
        const due = this.state.isDue ? this.state.taskDate : undefined;
        this.setState({ modalLoading: true });
        this.props.createGroupTask(this.state.groupId, this.state.taskText, due, () => {
            this.closeModal();
        });
    }

    closeModal() {
        document.getElementById("closeModalBtn").click();
    }
    onCompleteTaskClicked(task) {
        this.props.completeGroupTask(this.state.groupId, task._id);
    }

    onEditTaskClicked(task) {

        let date;
        if (typeof task.dueDate !== "undefined")
            date = formatDateForInput(new Date(task.dueDate));
        else
            date = formatDateForInput(new Date(Date.now()));

        this.setState({
            editMode: true,
            taskText: task.text,
            taskDate: date,
            editTask: task._id
        })

    }

    onSaveTaskClicked() {
        const due = this.state.isDue ? this.state.taskDate : undefined;
        this.setState({ modalLoading: true });
        this.props.editGroupTask(this.state.groupId, this.state.editTask, this.state.taskText, due, () => {
            this.closeModal();
        });
    }


    onLeaveGroupClicked() {

        if (window.confirm("Are you sure you want to leave this group?")) {
            this.props.leaveGroup(this.state.groupId, () => {
                this.props.history.push("/dashboard");
            });
        }

    }

    onArchiveCompletedClicked() {
        if (window.confirm("Archive all completed tasks?")) {
            this.props.archiveCompletedTasks(this.state.groupId);
        }
    }

    renderTask(task, index) {
        let style = task.completed ? { backgroundColor: "green" } : {}
        return (
            <tr style={style} key={index}>
                <td>{task.text}</td>
                <td><Moment format="DD/MM HH:mm">{task.startDate}</Moment></td>
                <td>{task.completed ? "Yes" : "No"}</td>
                <td>
                    {task.dueDate ?
                        <Moment format="DD/MM HH:mm">{task.dueDate}</Moment> :
                        <div className="text-muted">NOT SET</div>}
                </td>
                {task.completed ? <td></td> :
                    <td>
                        <button className="btn btn-default btn-hover" data-toggle="modal" data-target="#addTaskModal" onClick={() => this.onEditTaskClicked(task)}>
                            <img src={editIcon} alt="edit" style={iconStyle} />
                        </button>
                        <button className="btn btn-default btn-hover" onClick={() => this.onCompleteTaskClicked(task)}>
                            <img src={removeIcon} alt="complete" style={iconStyle} />
                        </button>
                    </td>}
            </tr>
        )
    }



    renderTaskModal() {
        return (
            <div className="modal fade" id="addTaskModal" tabIndex="-1" role="dialog" aria-labelledby="addTaskLabelModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addTaskLabelModal">New Task</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <InputControl
                                type="text"
                                text="Description:"
                                id="taskText"
                                name="taskText"
                                value={this.state.taskText}
                                onChange={this.onChange}
                                placeholder="Task Description"
                                error={this.state.errors.text} />
                            <div className="form-group">
                                <input
                                    id="dueCheckbox"
                                    name="dueCheckbox"
                                    type="checkbox"
                                    value={this.state.isDue}
                                    onChange={() => this.setState({ isDue: !this.state.isDue })}
                                    data-toggle="collapse"
                                    data-target="#dueDateCollapse" />
                                <label htmlFor="dueCheckbox" className="mr-2">
                                    Set Due date?
                                </label>
                            </div>
                            <div className="collapse" id="dueDateCollapse">
                                <InputControl
                                    type="datetime-local"
                                    text="Due Date:"
                                    id="taskDate"
                                    name="taskDate"
                                    value={this.state.taskDate}
                                    onChange={this.onChange}
                                    error={this.state.errors.dueDate} />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" id="closeModalBtn" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success"
                                disabled={this.state.modalLoading} onClick={() => {
                                    if (this.state.editMode) {
                                        this.onSaveTaskClicked();
                                    } else {
                                        this.onAddTaskClicked();
                                    }
                                }}>
                                {this.state.editMode ? "Edit" : "Create Task"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderPage() {
        const group = this.props.groups.currentGroup;
        return (
            <div className="container">
                {this.renderTaskModal()}
                <div className="row">
                    <div className="col">
                        <div className="display-3 mb-4">
                            {group.name}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-11">
                        <button type="button" className="btn btn-default" data-toggle="modal" data-target="#addTaskModal"
                            onClick={this.clearTaskModal.bind(this)}>
                            <img src={addIcon} alt="Add" style={iconStyle} />
                            <span className="lead align-middle">Add Task</span>
                        </button>
                        <button type="button" className="btn btn-default"
                            onClick={this.onArchiveCompletedClicked.bind(this)}>
                            <img src={removeIcon} alt="Add" style={iconStyle} />
                            <span className="lead align-middle"> Archive Completed</span>
                        </button>
                        <button type="button" className="btn btn-default"
                            onClick={this.onLeaveGroupClicked.bind(this)}>
                            <img src={leaveIcon} style={iconStyle} alt="leave" />
                            <span className="lead align-middle"> Leave Group</span>
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
                                <tr>
                                    <th>Task</th>
                                    <th>Start</th>
                                    <th>Completed</th>
                                    <th>Due</th>
                                </tr>
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

        if (this.state.errors.error) {
            return (
                <div className="container">
                    <div className="text-center display-2">
                        ERROR 404
                        </div>
                    <div className="text-center display-3 mt-2">
                        {this.state.errors.error}
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

export default connect(mapStateToProps, {
    getGroupInformation, createGroupTask, completeGroupTask, editGroupTask,
    leaveGroup, archiveCompletedTasks
})(GroupPage);
