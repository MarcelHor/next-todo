const API_URL = "http://localhost:3000/api";

export const createTodoList = async (title: string) => {
    try {
        const response = await fetch(`${API_URL}/todo-list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({title})
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const deleteTodoList = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/todo-list/`, {
            body: JSON.stringify({id}),
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }

}

export const createTodoItem = async (todoListId: number, text: string) => {
    try {
        const response = await fetch(`${API_URL}/todo-list/${todoListId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({text})
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const deleteTodoItem = async (todoListId: number, todoId: number) => {
    try {
        const response = await fetch(`${API_URL}/todo-list/${todoListId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({"todoId": todoId})
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}