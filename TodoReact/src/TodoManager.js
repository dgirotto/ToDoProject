import React, { Component } from "react";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { TodoService } from "./services/todo.service";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

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