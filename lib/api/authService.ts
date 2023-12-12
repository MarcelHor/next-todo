import axios from "axios";
import { API_URL } from "@/utils/Api";

interface RegisterProps {
    name: string;
    password: string;
    email: string;
    confirmPassword: string;
}


export const registerService = async (data: RegisterProps) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, data, {
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