import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';

class MessageList extends React.Component {

  componentDidMount() {
    this.props.subscribeToMore({
      document: gql`
        subscription MessageAdded {
          messageAdded {
            id
            nickname
            message
          }
        }
      `,
      updateQuery: (prev, { subscriptionData }) => {
        return {
          messages: [
            subscriptionData.data.messageAdded,
            ...prev.messages,
          ]
        }
      }
    })
  }

  render() {
    const { messages } = this.props;
    return (
      <div>
        {messages.map((item) => {
          const { id, nickname, message } = item;
          return <Message key={id}><span><strong>{nickname}</strong>{message}</span></Message>
        })}
      </div>
    )
  }
}

const Message = styled.div`
  margin-bottom: 1rem;
  span {
    font-size: 1.6rem;
    font-weight: 400;

    strong {
      font-size: 1.6rem;
      font-weight: 700;
      margin-right: 2rem;
    }
  }
`;

export default MessageList;