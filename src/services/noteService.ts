import axios from "axios";
import type { Note, FetchNotesParams, FetchNotesResponse } from "../types/note";

const apiClient = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = import.meta.env.VITE_NOTEHUB_TOKEN;
  return config;
});

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await apiClient.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
    },
  });
  return response.data;
};

export type NewNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await apiClient.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await apiClient.delete<Note>(`/notes/${id}`);
  return response.data;
};
