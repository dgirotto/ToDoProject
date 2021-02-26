import React, { Component } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { TodoService } from "./services/todo.service"

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
                            onClick={this.props.saveTodoItem}
                            variant="contained"
                            color="primary"
                            className="button">
                            {this.props.isEditForm ? "UPDATE" : "ADD"}
                        </Button>
                        <Button
                            onClick={this.props.resetFormFields}
                            variant="contained"
                            color="secondary"
                            className="button"
                            style={{ marginLeft: "10px", background: "#3e3e3e" }}>
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
        showForm: false,
        formValues: {
            id: 0,
            title: "",
            description: "",
            dueDate: "",
            isComplete: false
        }
    };

    componentDidMount() {
        this.setFormFields();
    }

    componentWillReceiveProps(newProps) {
        this.setState({ item: newProps.item }, () => {
            this.setFormFields();
        });
    }

    setFormFields = () => {
        this.setState({
            formValues: {
                id: this.state.item.id,
                title: this.state.item.title,
                description: this.state.item.description,
                dueDate: this.state.item.dueDate,
                isComplete: this.state.item.isComplete
            }
        });
    }

    showFormToggle = () => {
        this.setFormFields();
        this.setState({ showForm: !this.state.showForm })
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

    updateTodoItem = () => {
        TodoService.updateTodoItem(this.state.item.id, this.state.formValues)
            .then(() => {
                this.props.getTodoItems();
                this.setState({
                    showForm: false
                });
            })
            .catch(() => {
                alert("Unable to update item!");
            });
    }

    editTodoItem = event => {
        this.setState({ showForm: !this.state.showForm });
        event.stopPropagation();
    }

    toggleCompletion = event => {
        let newFormValues = this.state.formValues;
        newFormValues.isComplete = !newFormValues.isComplete;

        this.setState({ formValues: newFormValues }, () => {
            this.updateTodoItem();
        });
        event.stopPropagation();
    }

    render() {
        return (
            <Box p={2}
                onClick={() => !this.state.showForm && this.setState({ open: !this.state.open })}
                className="item"
                style={{ cursor: "pointer" }}>
                {!this.state.showForm ?
                    <>
                        <div className="item-header">
                            <span>{this.state.item.title}</span>
                            <div>
                                {this.state.item.isComplete ?
                                    <span className="badge complete">COMPLETED</span> :
                                    <span className="badge incomplete">NOT COMPLETED</span>
                                }
                                <IconButton aria-label="expand row" size="small">
                                    {this.state.open ?
                                        <KeyboardArrowUpIcon className="icon" /> :
                                        <KeyboardArrowDownIcon className="icon" />}
                                </IconButton>
                            </div>
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
                    <TodoForm
                        isEditForm={true}
                        formValues={this.state.formValues}
                        resetFormFields={this.setFormFields}
                        showFormToggle={this.showFormToggle}
                        handleFormChange={this.handleFormChange}
                        saveTodoItem={this.updateTodoItem}
                    />
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
        todoItems: null
    }

    componentDidMount() {
        this.getTodoItems();
    }

    addTodoItem = () => {
        TodoService.addTodoItem(this.state.formValues)
            .then(() => {
                this.resetFormFields();
                this.getTodoItems();
                this.setState({
                    showForm: false
                });
            })
            .catch(() => {
                alert("Unable to add item!");
            });
    }

    getTodoItems = () => {
        TodoService.getTodoItems()
            .then(res => {
                res.data.forEach(item => {
                    item.dueDate = item.dueDate.slice(0, 10);
                });
                this.setState({ todoItems: res.data });
            })
            .catch(() => {
                alert("Unable to retrieve items!");
            });
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

    showFormToggle = () => {
        this.resetFormFields();
        this.setState({ showForm: !this.state.showForm })
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
                            {this.state.todoItems.map(item => (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    getTodoItems={this.getTodoItems}
                                />
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
                            ADD TODO
                        </Button>
                        :
                        <Box p={2} className="item">
                            <TodoForm
                                isEditForm={false}
                                formValues={this.state.formValues}
                                resetFormFields={this.resetFormFields}
                                showFormToggle={this.showFormToggle}
                                handleFormChange={this.handleFormChange}
                                saveTodoItem={this.addTodoItem}
                            />
                        </Box>
                    }
                </div>
            </>
        );
    }
}

export default TodoManager;