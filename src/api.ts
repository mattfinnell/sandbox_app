import axios from "axios";
import { ThingType } from "./Thing";

const api = axios.create({ baseURL: "http://localhost:8000/api/examples" });

export const createThing = (newThing: { name: string; description: string }) =>
  api.post("/", newThing).then((res) => res.data);

export const readThings = () => api.get("/").then((res) => res.data);

export const updateThing = (thing: ThingType) =>
  api
    .put(`/${thing.id}`, { name: thing.name, description: thing.description })
    .then((res) => res.data);

export const deleteThing = (id: number) =>
  api.delete(`/${id}`).then((res) => res.data);
