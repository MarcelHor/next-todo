import axios from 'axios';
import {API_URL} from "@/utils/Api";

export const createTodoList = async (title: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/todo-list`, { title }, {
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
        const response = await axios.delete(`${API_URL}/api/todo-list/`, {
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
        const response = await axios.post(`${API_URL}/api/todo-list/${todoListId}`, { text }, {
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
        const response = await axios.delete(`${API_URL}/api/todo-list/${todoListId}/`, {
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

export const updateTodoItem = async (todoListId: number, todoId: number, text: string, isCompleted: boolean) => {
    try {
        const response = await axios.put(`${API_URL}/api/todo-list/${todoListId}/`, { todoId, text, isCompleted }, {
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
