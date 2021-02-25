import React, { Component } from "react";

import { TodoService } from "./services/todo.service"

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

export class TodoForm extends Component {

    render() {
        return (
            <form noValidate autoComplete="off">
                <div className="todo-form">
                    <TextField
                        required
                        name="title"
                        label="Title"
                        variant="outlined"
                        value={this.props.formValues.title}
                        onChange={this.props.handleFormChange}
                        className="input-field"
                    />
                    <TextField
                        multiline
                        rowsMax={4}
                        name="description"
                        label="Description"
                        variant="outlined"
                        value={this.props.formValues.description}
                        onChange={this.props.handleFormChange}
                    />
                    <TextField
                        type="date"
                        label="Due Date"
                        name="dueDate"
                        variant="outlined"
                        value={this.props.formValues.dueDate}
                        onChange={this.props.handleFormChange}
                    />
                    <div className="button-container">
                        <Button
                            disabled={!this.props.formValues.title || this.props.formValues.title.trim() === ''}
                            onClick={this.props.addTodoItem}
                            variant="contained"
                            color="primary"
                            className="button"
                            style={{ marginRight: "10px" }}>
                            ADD
                    </Button>
                        <Button
                            onClick={this.props.resetFormFields}
                            variant="contained"
                            color="secondary"
                            className="button"
                            style={{ background: "#3e3e3e" }}>
                            RESET
                    </Button>
                        <div className="spacer" />
                        <Button
                            onClick={this.props.showFormToggle}
                            variant="contained"
                            color="secondary"
                            className="button">
                            CANCEL
                    </Button>
                    </div>
                </div>
            </form>
        );
    }
}

export class TodoItem extends Component {
    state = {
        item: this.props.item,
        open: false,
        isEditing: false,
        formValues: {
            title: "",
            description: "",
            dueDate: "",
            isComplete: false
        }
    };

    componentDidMount() {
        this.setFormValues();
    }

    componentWillReceiveProps(newProps) {
    }

    setFormValues = () => {
        this.setState({
            formValues: {
                title: this.state.item.title,
                description: this.state.item.description,
                dueDate: this.state.item.dueDate,
                isComplete: this.state.item.isComplete
            }
        });
    }

    updateTodoItem = () => {
        console.log(this.state.formValues);
        // TodoService.updateTodoItem(this.state.formValues);
    }

    editTodoItem = event => {
        this.setState({ isEditing: !this.state.isEditing });
        event.stopPropagation();
    }

    toggleCompletion = event => {
        let newFormValues = this.state.formValues;
        newFormValues.isComplete = !newFormValues.isComplete;

        // this.setState({
        //     formValues: newFormValues
        // }, () => {
        //     this.updateTodoItem();
        // });

        this.setState({ formValues: newFormValues });
        this.updateTodoItem();

        event.stopPropagation();
    }

    render() {
        return (
            <Box p={2}
                onClick={() => this.setState({ open: !this.state.open })}
                className="item"
                style={{ cursor: "pointer" }}>
                {!this.state.isEditing ?
                    <>
                        <div className="item-header">
                            <div>
                                {this.state.item.isComplete ?
                                    <CheckCircleRoundedIcon className="icon complete" /> :
                                    <CancelRoundedIcon className="icon incomplete" />}
                                <span style={{ marginLeft: "10px" }}>{this.state.item.title}</span>
                            </div>
                            <IconButton aria-label="expand row" size="small">
                                {this.state.open ?
                                    <KeyboardArrowUpIcon className="icon" /> :
                                    <KeyboardArrowDownIcon className="icon" />}
                            </IconButton>
                        </div>
                        {this.state.open && (
                            <div className="item-body">
                                {this.state.item.description && (
                                    <div className="body-content">
                                        <h3 className="body-title">DESCRIPTION</h3>
                                        {this.state.item.description}
                                    </div>
                                )}
                                <div className="body-content">
                                    <h3 className="body-title">DUE DATE</h3>
                                    {this.state.item.dueDate}
                                </div>
                                <div className="button-container">
                                    <Button
                                        onClick={this.toggleCompletion}
                                        variant="contained"
                                        color="primary"
                                        className="button"
                                        style={{ marginRight: "10px", background: this.state.item.isComplete ? "#e71c1c" : "#0a8e0a" }}>
                                        {this.state.item.isComplete ? "INCOMPLETE" : "COMPLETE"}
                                    </Button>
                                    <div className="spacer" />
                                    <Button
                                        onClick={this.editTodoItem}
                                        variant="contained"
                                        color="primary"
                                        className="button"
                                        style={{ background: "#ffaa0e" }}>
                                        EDIT
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                    :
                    <>
                        <div className="button-container">
                            <Button
                                // onClick={this.resetFormFields}
                                variant="contained"
                                color="primary"
                                className="button">
                                SAVE
                            </Button>
                            <div className="spacer" />
                            <Button
                                // onClick={this.showFormToggle}
                                variant="contained"
                                color="secondary"
                                className="button">
                                CANCEL
                            </Button>
                        </div>
                    </>
                }
            </Box>
        );
    }
}

class TodoManager extends Component {
    state = {
        showForm: false,
        formValues: {
            title: "",
            description: "",
            dueDate: new Date().toISOString().slice(0, 10)
        },
        todoItems: [
            {
                id: 1,
                title: "Item 1",
                description: "Item 1 content",
                dueDate: "10-12-2021",
                isComplete: true
            },
            {
                id: 2,
                title: "Item 2",
                description: "Item 2 content",
                dueDate: "11-19-2021",
                isComplete: false
            },
        ]
    }

    showFormToggle = () => {
        this.resetFormFields();
        this.setState({ showForm: !this.state.showForm })
    }

    addTodoItem = () => {
        alert("SUBMITTING");
    }

    resetFormFields = () => {
        this.setState({
            formValues: {
                title: "",
                description: "",
                dueDate: new Date().toISOString().slice(0, 10)
            }
        });
    }

    handleFormChange = event => {
        const newFormValues = Object.assign(
            this.state.formValues,
            { [event.target.name]: event.target.value }
        );

        this.setState({
            formValues: newFormValues
        });
    }

    render() {
        return (
            <>
                <h1 className="title">TODO MANAGER</h1>
                <div className="item-container">
                    {this.state.todoItems && this.state.todoItems.length > 0 ? (
                        <>
                            <h2 className="subtitle">MY TODO LIST</h2>
                            {this.state.todoItems.map(item => (
                                <TodoItem key={item.id} item={item} />
                            ))}
                        </>
                    ) :
                        <p style={{ textAlign: "center", paddingBottom: "15px" }}>You don't have any items yet! Add one below.</p>
                    }
                </div>
                <div className="form-container">
                    {!this.state.showForm ?
                        <Button
                            onClick={this.showFormToggle}
                            variant="contained"
                            color="secondary"
                            className="button"
                            style={{ background: "#0a8e0a" }}>
                            NEW ITEM
                        </Button>
                        :
                        <Box p={2} className="item">
                            <TodoForm
                                formValues={this.state.formValues}
                                handleFormChange={this.handleFormChange}
                                resetFormFields={this.resetFormFields}
                                showFormToggle={this.showFormToggle}
                                addTodoItem={this.addTodoItem} />
                        </Box>
                    }
                </div>
            </>
        );
    }
}

export default TodoManager;