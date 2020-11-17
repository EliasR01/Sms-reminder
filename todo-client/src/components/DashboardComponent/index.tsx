import React from "react";
import { DashboardComponentProps, Todo } from "../../interfaces";

import {
  Box,
  Container,
  Input,
  Button,
  TextField,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import {
  UseBoxStyles,
  UseContainerStyles,
  UseInputStyles,
  UseTextFieldStyles,
  UseButtonStyles,
  UseAvatarStyles,
} from "./styles";
import { Span, Div } from "./styledComponents";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";

const DashboardComponent = ({
  todos,
  setTodo,
  addTodo,
  todo,
  removeTodo,
  list,
  checkTodo,
  setList,
  submitTodos,
  submited,
}: DashboardComponentProps) => {
  const containerStyles = UseContainerStyles();
  const upperBoxStyles = UseBoxStyles({
    startColumn: 2,
    endColumn: 2,
    startRow: 1,
    endRow: 1,
    margin: "auto",
  });
  const bottomBoxStyles = UseBoxStyles({
    startColumn: 1,
    endColumn: 4,
    startRow: 2,
    endRow: 2,
    margin: "0 0 3% 0",
  });
  const inputStyles = UseInputStyles();
  const textFieldStyles = UseTextFieldStyles();
  const buttonStyles = UseButtonStyles();
  const avatarStyles = UseAvatarStyles();
  const pendingTodos = todos.filter(
    (value: Todo) => value.status === "Pending"
  );
  const completedTodos = todos.filter(
    (value: Todo) => value.status === "Completed"
  );
  const expiredTodos = todos.filter(
    (value: Todo) => value.status === "Expired"
  );

  const render =
    list === "Pending"
      ? pendingTodos
      : list === "Completed"
      ? completedTodos
      : expiredTodos;

  const action = list;

  const bottomBox = (
    <Box className={bottomBoxStyles.root}>
      <Div>{submited ? <Span>Submited!</Span> : null}</Div>
      <Button onClick={() => setList("Pending")} disabled={list === "Pending"}>
        Pending
      </Button>
      <Button
        onClick={() => setList("Completed")}
        disabled={list === "Completed"}
      >
        Completed
      </Button>
      <Button onClick={() => setList("Expired")} disabled={list === "Expired"}>
        Expired
      </Button>
      <>
        <List>
          {render.map((todo: Todo) => (
            <ListItem key={todo.key}>
              <ListItemAvatar>
                <Avatar
                  className={avatarStyles.root}
                  onClick={() => checkTodo(todo.key, action)}
                >
                  <LabelImportantIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Task: " />
              <ListItemText primary={todo.task} />
              <ListItemText primary="Time: " />
              <ListItemText primary={todo.date} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeTodo(todo.key)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </>
      <Button onClick={submitTodos}>Submit</Button>
    </Box>
  );

  return (
    <Container className={containerStyles.root}>
      <Box className={upperBoxStyles.root}>
        <form onSubmit={addTodo}>
          <Div>
            <Span>Add a task</Span>
            <Input
              placeholder="Enter task"
              onChange={(e: any) => {
                setTodo({ ...todo, task: e.target.value });
              }}
              value={todo.task}
              className={inputStyles.root}
            />
            <TextField
              id="datetime-local"
              label="Set date and time"
              type="datetime-local"
              value={todo.date}
              InputLabelProps={{ shrink: true }}
              onChange={(e: any) => {
                setTodo({ ...todo, date: e.target.value });
              }}
              className={textFieldStyles.root}
            />
            <Button type="submit" className={buttonStyles.root}>
              <AddIcon />
            </Button>
          </Div>
        </form>
      </Box>
      <br />
      {todos.length > 1 ? bottomBox : null}
    </Container>
  );
};

export default DashboardComponent;
