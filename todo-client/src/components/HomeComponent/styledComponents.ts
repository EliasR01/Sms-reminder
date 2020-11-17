import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  jusitfy-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: auto;
`;

export const Text = styled.span`
  margin-bottom: 15px;
`;

export const Error = styled.span`
  color: red;
  font-size: 0.7em;
`;

export const Form = styled.form`
  width: 50%;
  height: 50%;
  margin: auto;
  display: flex;
  border-radius: 5px;
  background: radial-gradient(
    circle,
    rgba(236, 241, 245, 1) 26%,
    rgba(218, 227, 228, 1) 78%
  );
  box-shadow: 3px 3px 5px 6px rgba(0, 0, 0, 0.4);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
