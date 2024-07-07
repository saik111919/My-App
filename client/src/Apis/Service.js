import { BASE_URL } from "../Constent";
import { client } from "./client";

export const AddTransactions = (body) => {
    return client.post(`${BASE_URL}/api/manageTransactions`, body);
};
export const GetTransactions = () => {
    return client.get(`${BASE_URL}/api/`);
};

export const DeleteTransactions = (id) => {
    return client.delete(`${BASE_URL}/api/manageTransactions/${id}`);
};