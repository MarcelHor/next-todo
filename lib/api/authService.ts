import axios from "axios";

const API_URL = "https://next-todo-red.vercel.app" +
    "/api";

interface RegisterProps {
    name: string;
    password: string;
    email: string;
    confirmPassword: string;
}


export const registerService = async (data: RegisterProps) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Unknown error');
    }
}