import api from "../lib/api";
import type { User, UserInput } from "../types/user";

export async function getUsers(): Promise<User[]> {
  const res = await api.get<User[]>("/users");
  return res.data;
}

export async function getUser(id: string): Promise<User> {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
}

export async function createUser(data: UserInput): Promise<User> {
  const res = await api.post<User>("/users", data);
  return res.data;
}

export async function updateUser(
  id: string,
  data: UserInput
): Promise<User> {
  const res = await api.put<User>(`/users/${id}`, data);
  return res.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}
