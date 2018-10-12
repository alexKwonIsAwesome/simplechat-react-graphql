import React from 'react';
import styled from 'styled-components';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import MessageInput from '../../components/MessageInput';
import MessageList from '../../components/MessageList';

class Chat extends React.Component {
  state = {
    nickname: '',
    message: '',
  }

  componentDidMount() {
    const nickname = window.prompt('닉네임을 입력해 주세요');
    if (nickname) {
      this.setState({ nickname });
    } else {
      window.alert('닉네임을 입력하셔야 채팅에 참여하실 수 있습니다');
      this.props.history.push('/');
    }
  }

  handleMessageChange = (e) => {
    const { value } = e.target;
    this.setState({ message: value });
  }

  handleSend = (mutate) => () => {
    const { nickname, message } = this.state;

    if (message !== '') {
      mutate({ variables: { nickname, message }});
      this.setState({ message: '' });
    }
  }
  

  render() {
    const { message } = this.state;
    return (
      <Wrapper>
        <Mutation
          mutation={gql`
            mutation AddMessage($nickname: String!, $message: String!) {
              addMessage(nickname: $nickname, message: $message) {
                id
                nickname
                message
              }
            }
          `}
        >
          {(mutate, { data }) => {
            return (
              <MessageInput
                message={message}
                onChange={this.handleMessageChange}
                onSend={this.handleSend(mutate)}
              />
            );
          }}
        </Mutation>

        <Content>
          <Query
            query={gql`
              query GetMessages {
                messages {
                  id
                  nickname
                  message
                }
              }
            `}
          >
            {({ loading, error, data, subscribeToMore }) => {
              if (loading) return null;
              if (error) return null;

              const { messages } = data;
              return (
                <MessageList
                  messages={messages}
                  subscribeToMore={subscribeToMore}
                />
              );
            }}
          </Query>
        </Content>
      </Wrapper>
    )
  }
};

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.div`
  height: calc(100% - 5rem);
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 0rem 1.6rem;
  padding-top: 2rem;
`;

export default Chat;