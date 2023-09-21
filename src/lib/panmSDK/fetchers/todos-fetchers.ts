import { nativeFetcher } from '../utility/fetch-handling-utility';

export type Todo = {
  id: string;
  title?: string;
  isDone: boolean;
  todo?: string;
};

export type TodosPaginated = {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  previousPage: number | null;
  nextPage: number | null;
};

export const getTodos = async (): Promise<{ todos: Todo[] }> => {
  let queryURL = 'http://localhost:3000/api/todos';
  return await nativeFetcher(queryURL);
};

export const getTodosPaginated = async (page?: number, limit?: number): Promise<TodosPaginated> => {
  const baseURL = 'http://localhost:3000';
  let queryURL = `${baseURL}/api/todos?`;
  const urlQueryParams = {
    page: page,
    limit: limit
  };
  const qs: URLSearchParams = new URLSearchParams(urlQueryParams as unknown as URLSearchParams);
  queryURL = queryURL + qs;
  return await nativeFetcher(queryURL);
};

export const getTodoById = async (id: string) => {
  let queryURL = `http://localhost:3000/api/todos/${id}`;
  return await nativeFetcher(queryURL);
};

export const getPublicTodos = async (): Promise<{ todos: Todo[] }> => {
  let queryURL = 'https://dummyjson.com/todos?limit=3';
  return await nativeFetcher(queryURL);
};

export const getPublicTodoById = async (id: string) => {
  let queryURL = `https://dummyjson.com/todos/${id}`;
  return await nativeFetcher(queryURL);
};
