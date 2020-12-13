import React from "react";
import UserPanel from "./UserPanel";
import Favorited from "./Favorited";
import ChatRoom from "./ChatRoom";
import DirectMessage from "./DirectMessage";

const SidePanel = () => {
  return (
    <div
      style={{
        backgroundColor: "#7B83EB",
        padding: "2rem",
        minHeight: "100vh",
        color: "white",
        minWidth: "265px",
      }}
    >
      <UserPanel />
      <Favorited />
      <ChatRoom />
      <DirectMessage />
    </div>
  );
};

export default SidePanel;
