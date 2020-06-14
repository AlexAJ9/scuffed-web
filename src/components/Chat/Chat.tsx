import React, { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar";
import { USER_PROFILE } from "../Profile/userProfileQueries";
import Message from "./Message";
import { useQuery } from "@apollo/client";
export default function Chat() {
  const id = localStorage.getItem("user-id");
  const user = useQuery(USER_PROFILE, { variables: { id } });

  const [receiverState, setReceiverState] = useState({
    receiverUsername: "",
  });

  const setSelectedUsername = (username: any) => {
    setReceiverState((receiverState: any) => {
      return { receiverUsername: username };
    });
  };

  return (
    <div className="chat-page">
      <UserSidebar
        username={user?.data?.getUserInfo.username}
        selectedUsername={setSelectedUsername}
      />
      <Message
        username={user?.data?.getUserInfo.username}
        receiverUsername={receiverState.receiverUsername}
      />
    </div>
  );
}
