import { Dispatch, SetStateAction } from "react";
import { Location, History } from "history";

interface User {
  email: string;
  phone?: number;
}

export interface DashboardContainerProps {
  location: Location<User>;
  history: History;
}

export interface Todo {
  key?: string;
  task?: string;
  date?: string;
  status?: string;
  email?: string;
  number?: string;
}

export interface DashboardComponentProps {
  todos: Todo[];
  todo: Todo;
  setTodo: Dispatch<SetStateAction<{}>>;
  addTodo: (e: any) => void;
  removeTodo: (key: string | undefined) => void;
  checkTodo: (key: string | undefined, action: string) => void;
  list: string;
  setList: Dispatch<SetStateAction<String>>;
  submitTodos: () => void;
  submited: boolean;
}
