import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

// export class TodoItem extends Component {
//     state = {
//         item: this.props.item,
//         open: false
//     };

//     render() {
//         return (
//             <div onClick={() => this.setState({ open: !this.state.open })}>

//             </div>
//         );
//     }
// }


class TodoManager extends Component {
    state = {
        todoItems: [
            {
                id: 1,
                title: "Item 1",
                content: "Item 1 content",
                dueDate: null,
                completionDate: "10-11-2011",
                isOpen: true
            },
            {
                id: 2,
                title: "Item 2",
                content: "Item 2 content",
                dueDate: null,
                completionDate: null,
                isOpen: false
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

    render() {
        return (
            <>
                <h1 className="title">TODO MANAGER</h1>
                <div className="item-container">
                    {this.state.todoItems && this.state.todoItems.length > 0 ? (
                        this.state.todoItems.map(item => (
                            <Paper
                                key={item.id}
                                onClick={() => this.selectItem(item.id)}
                                className="item">
                                <div className="item-header">
                                    <div>
                                        {item.completionDate ?
                                            <CheckCircleRoundedIcon className="icon complete" /> :
                                            <CancelRoundedIcon className="icon incomplete" />}
                                        <span style={{ marginLeft: "10px" }}>{item.title}</span>
                                    </div>
                                    <IconButton aria-label="expand row" size="small">
                                        {item.isOpen ?
                                            <KeyboardArrowUpIcon className="icon" /> :
                                            <KeyboardArrowDownIcon className="icon" />}
                                    </IconButton>
                                </div>
                                {item.isOpen && (
                                    <div className="item-body">
                                        {item.content}
                                    </div>
                                )}
                            </Paper>
                        ))
                    ) :
                        <p>No items yet!</p>
                    }
                </div>
            </>
        );
    }
}

export default TodoManager;