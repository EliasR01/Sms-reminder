import React from "react";
import { Button, Input } from "@material-ui/core";
import { Container, Wrapper, Form, Text, Error } from "./styledComponents";

interface HomeComponentProps {
  login: any;
  setEmail: any;
  error: string;
}

const HomeComponent = ({ login, setEmail, error }: HomeComponentProps) => {
  return (
    <Container>
      <Wrapper>
        <Form onSubmit={login}>
          <Text>Enter email</Text>
          <Input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error ? <Error>{error}</Error> : null}
          <Button type="submit">Login</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default HomeComponent;
