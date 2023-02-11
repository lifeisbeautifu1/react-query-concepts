import axios from "axios";
import { User } from "../types";

export const getUser = async (id: number) => {
  const { data } = await axios.get<User>(`/users/${id}`);
  return data;
};
