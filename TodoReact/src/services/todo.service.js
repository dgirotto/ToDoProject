import axios from "axios";

const apiEndpoint = 'https://localhost:44319/api/TodoItems';

function getTodoItems() {
    const headers = getHeaders();
    return axios.get(
        apiEndpoint,
        { headers }
    );
}

function addTodoItem(body) {
    const headers = getHeaders();
    return axios.post(
        apiEndpoint,
        body,
        { headers }
    );
}

function updateTodoItem(body) {
    const headers = getHeaders();
    return axios.post(
        apiEndpoint,
        body,
        { headers }
    );
}

function getHeaders() {
    return {
        "Content-Type": "application/json"
    };
}

export const TodoService = {
    getTodoItems,
    addTodoItem,
    updateTodoItem
};
