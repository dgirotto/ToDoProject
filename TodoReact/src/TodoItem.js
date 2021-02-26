import React, { Component } from "react";
import { TodoForm } from "./TodoForm";
import { TodoService } from "./services/todo.service";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

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
                                        MODIFY
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