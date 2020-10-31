import React from 'react';
import { Row, Col, FormInput, Button } from 'shards-react';
import { gql, useMutation } from '@apollo/client';

const MessageForm = ({ state, setState }) => {
  const POST_MESSAGE = gql`
    mutation($user: String!, $content: String!) {
      postMessage(user: $user, content: $content)
    }
  `;

  const [postMessage] = useMutation(POST_MESSAGE);

  const handleSendMessage = () => {
    if (state.content.length > 0) {
      postMessage({ variables: state });
    }
    setState({
      ...state,
      content: '',
    });
  };

  return (
    <Row>
      <Col xs={2} style={{ padding: 0 }}>
        <FormInput
          label='User'
          value={state.user}
          onChange={(e) =>
            setState({
              ...state,
              user: e.target.value,
            })
          }
        />
      </Col>
      <Col xs={8}>
        <FormInput
          label='Content'
          value={state.content}
          onChange={(e) =>
            setState({
              ...state,
              content: e.target.value,
            })
          }
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              handleSendMessage();
            }
          }}
        />
      </Col>
      <Col xs={2} style={{ padding: 0 }}>
        <Button onClick={() => handleSendMessage()}>Send</Button>
      </Col>
    </Row>
  );
};

export default MessageForm;
