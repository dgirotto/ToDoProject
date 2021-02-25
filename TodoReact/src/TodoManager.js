import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

export class TodoItem extends Component {
    state = {
        item: this.props.item,
        open: false
    };

    render() {
        return (
            <Box p={2}
                onClick={() => this.setState({ open: !this.state.open })}
                className="item"
                style={{ cursor: "pointer" }}>
                <div className="item-header">
                    <div>
                        {this.state.item.completionDate ?
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
                        {this.state.item.content}
                    </div>
                )}
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
                content: "Item 1 content",
                dueDate: null,
                completionDate: "10-11-2011"
            },
            {
                id: 2,
                title: "Item 2",
                content: "Item 2 content",
                dueDate: null,
                completionDate: null
            },
        ]
    }

    selectItem = (id) => {
        // this.setState
        alert(id);
    }

    checkItem = (e) => {
        console.log(e);
    }

    showFormToggle = () => {
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
        console.log(event.target.name);
        console.log(event.target.value);

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
                            <form noValidate autoComplete="off">
                                <div className="todo-form">
                                    <TextField
                                        required
                                        name="title"
                                        label="Title"
                                        variant="outlined"
                                        value={this.state.formValues.title}
                                        onChange={this.handleFormChange}
                                        className="input-field"
                                    />
                                    <TextField
                                        multiline
                                        rowsMax={4}
                                        name="description"
                                        label="Description"
                                        variant="outlined"
                                        value={this.state.formValues.description}
                                        onChange={this.handleFormChange}
                                    />
                                    <TextField
                                        type="date"
                                        label="Due Date"
                                        name="dueDate"
                                        variant="outlined"
                                        value={this.state.formValues.dueDate}
                                        onChange={this.handleFormChange}
                                    />
                                    <div className="button-container">
                                        <Button
                                            disabled={!this.state.formValues.title || this.state.formValues.title.trim() === ''}
                                            onClick={this.addTodoItem}
                                            variant="contained"
                                            color="primary"
                                            className="button"
                                            style={{ marginRight: "10px" }}>
                                            ADD
                                        </Button>
                                        <Button
                                            onClick={this.resetFormFields}
                                            variant="contained"
                                            color="secondary"
                                            className="button"
                                            style={{ background: "#3e3e3e" }}>
                                            RESET
                                        </Button>
                                        <div className="spacer" />
                                        <Button
                                            onClick={this.showFormToggle}
                                            variant="contained"
                                            color="secondary"
                                            className="button">
                                            CLOSE
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Box>
                    }
                </div>
            </>
        );
    }
}

export default TodoManager;