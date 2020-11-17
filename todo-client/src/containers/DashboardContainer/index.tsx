import React, { useState, useEffect } from "react";
import DashboardComponent from "../../components/DashboardComponent/index";
import { DashboardContainerProps, Todo } from "../../interfaces";
import axios from "axios";

const DashboardContainer = ({ location, history }: DashboardContainerProps) => {
  const [todo, setTodo] = useState<Todo>({
    date: "2020-11-08T06:30",
    task: "",
  });
  const [todoList, setTodoList] = useState<Todo[]>([{}]);
  const [list, setList] = useState<string>("Pending");
  const [submited, setSubmited] = useState<boolean>(false);
  const propState = location?.state;

  function addTodo(e: any): void {
    if (submited) {
      setSubmited(false);
    }
    e.preventDefault();
    if (todo.task != "") {
      const key = Math.floor(Math.random() * Date.now()).toString();
      const todos: Todo = { ...todo, status: "Pending" };
      const data: Todo = { ...todos, key };
      const withEmail: Todo = { ...data, email: propState.email };
      const newTodo: Todo = { ...withEmail, number: "04247519745" };
      console.log(newTodo);
      setTodoList([...todoList, newTodo]);
      setTodo({ date: "2020-11-08T06:30", task: "" });
    }
  }

  function removeTodo(key: string): void {
    if (submited) {
      setSubmited(false);
    }
    setTodoList(todoList.filter((value: Todo) => value.key !== key));
  }

  function checkTodo(key: string | undefined, action: string): void {
    if (submited) {
      setSubmited(false);
    }
    const updatedTodo = todoList.map((value: Todo) =>
      value.key === key
        ? {
            ...value,
            status: action,
          }
        : value
    );
    setTodoList(updatedTodo);
  }

  function submit(): void {
    setSubmited(false);
    axios.post(`http://localhost:4000/add`, todoList).then((response) => {
      if (response.status === 200) {
        setSubmited(true);
      }
    });
  }

  useEffect(() => {
    let fetched: boolean = false;

    if (propState === undefined) {
      history.push("/");
    }

    if (!fetched) {
      axios({
        url: `http://localhost:4000/query?email=${propState.email}`,
        method: "GET",
      })
        .then((response) => {
          if (response.status === 200) {
            if (response.data) {
              setTodoList(response.data);
            }
            console.log("Successfully fetched!");
          }
        })
        .catch(() => {
          history.push("/");
        });
    }
    fetched = false;
  }, []);

  return (
    <DashboardComponent
      todos={todoList}
      setTodo={setTodo}
      addTodo={addTodo}
      todo={todo}
      removeTodo={removeTodo}
      checkTodo={checkTodo}
      list={list}
      setList={setList}
      submitTodos={submit}
      submited={submited}
    />
  );
};

export default DashboardContainer;
