import axios from 'axios';

const API_URL = "http://localhost:3000/api";

export const createTodoList = async (title: string) => {
    try {
        const response = await axios.post(`${API_URL}/todo-list`, { title }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error : any) {
        throw new Error(error.response?.data?.error || 'Unknown error');
    }
}

export const deleteTodoList = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/todo-list/`, {
            data: { id },
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error : any) {
        throw new Error(error.response?.data?.error || 'Unknown error');
    }
}

export const createTodoItem = async (todoListId: number, text: string) => {
    try {
        const response = await axios.post(`${API_URL}/todo-list/${todoListId}`, { text }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error : any) {
        throw new Error(error.response?.data?.error || 'Unknown error');
    }
}

export const deleteTodoItem = async (todoListId: number, todoId: number) => {
    try {
        const response = await axios.delete(`${API_URL}/todo-list/${todoListId}/`, {
            data: { "todoId": todoId },
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error : any) {
        throw new Error(error.response?.data?.error || 'Unknown error');
    }
}
