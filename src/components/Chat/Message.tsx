import React, { useState, useEffect, useRef } from "react";

import TextField from "@material-ui/core/TextField";
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from "@apollo/client";
import {
  MESSAGE_QUERY,
  CREATE_MESSAGE_MUTATION,
  MESSAGE_SUBSCRIPTION,
} from "./chatQueries";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
export default function Message(props: any) {
  const chatBox = useRef(null);
  const messages = useQuery(MESSAGE_QUERY);
  const [message, setMessage] = useState("");
  const client = useApolloClient();

  const handleShow = () => {
    props.setStyle();
  };
  const [sendMessage, result] = useMutation(CREATE_MESSAGE_MUTATION, {
    onError: (error) => {
      console.log(error);
    },
  });

  const { username, receiverUsername } = props;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendMessage({
      variables: {
        senderUsername: username,
        receiverUsername: receiverUsername,
        message,
      },
    });
  };
  const updateCacheWith = (message: any) => {
    //@ts-ignore
    const includedIn = (set, object) =>
      set.map((p: any) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: MESSAGE_QUERY });
    if (!includedIn(dataInStore.messages, message)) {
      client.writeQuery({
        query: MESSAGE_QUERY,
        data: { messages: dataInStore.messages.concat(message) },
      });
    }
  };
  useSubscription(MESSAGE_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      updateCacheWith(subscriptionData.data.newMessage);
      console.log(subscriptionData);
      console.log(22);
    },
  });
  const handleChange = async (e: any) => {
    setMessage(e.target.value);
  };
  return (
    <Container maxWidth="sm">
      <div className="personal-chat" style={props.style}>
        <div className="chats-header">
          <div className="back-button" onClick={handleShow}>
            <div className="bar1" />
            <div className="bar2" />
            <div className="bar3" />
          </div>
        </div>
        <div className="all-messages">
          {messages?.data?.messages.map((item: any) =>
            (item.senderUsername === username &&
              item.receiverUsername === receiverUsername) ||
            (item.senderUsername === receiverUsername &&
              item.receiverUsername === username) ? (
              <div
                key={item.id}
                className={item?.user?.map((a: any) =>
                  a.username === receiverUsername ? "receiver" : "sender"
                )}
              >
                <div className="sender-name">
                  {item?.user?.map((x: any) => x.name)}
                </div>
                {item.message}{" "}
                {/* <span className="time"> {moment(item.timestamp).fromNow()}</span> */}
              </div>
            ) : (
              ""
            )
          )}
        </div>
        {receiverUsername ? (
          <form
            onSubmit={(e) => handleSubmit(e)}
            ref={chatBox}
            className="chat-box"
          >
            <TextField
              style={{ margin: 10 }}
              placeholder={"Say something to " + receiverUsername}
              fullWidth
              name="message"
              value={message}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <Button type="submit" color="primary">
              Send
            </Button>
          </form>
        ) : (
          <div className="select-message">
            Select a logged in user from the left panel
          </div>
        )}
      </div>
    </Container>
  );
}
