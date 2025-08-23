import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
})

export async function getTasks() {
  const res = await api.get("/tasks");
  return res.data; 
}

export async function createTask(task) {
  const res = await api.post("/tasks", task);
  return res.data;
}

export async function updateTask(id, updates) {
  const res = await api.patch(`/tasks/${id}`, updates);
  return res.data;
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);
}
