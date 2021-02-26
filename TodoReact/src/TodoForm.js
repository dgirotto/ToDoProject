import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

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
