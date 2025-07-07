import { useEffect, useState } from "react";
import DataCall from "../../../../lib/module/data.call";

export default function BotMessageSender() {
  const [messageType, setMessageType] = useState("text");
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // 사용자 선택 상태 추가

  const [sendToAll, setSendToAll] = useState(false); // 전체 유저에게 보내기 상태 추가
  const [users, setUsers] = useState<any[]>([]);

  const handleMessageTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageType(e.target.value);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value); // 사용자 선택 변경 처리
  };

  const handleSendToAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendToAll(e.target.checked); // 전체 유저에게 보내기 변경 처리
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await DataCall.getInstance().getUserListForMessage();
      setUsers(response.data.user);
    };
    fetchUsers();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <label>
          <input
            type="radio"
            name="messageType"
            value="text"
            checked={messageType === "text"}
            onChange={handleMessageTypeChange}
          />
          Send text only
        </label>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          margin: "8px 0",
        }}
      >
        <label
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            margin: "8px 0",
          }}
        >
          Select User:
          <select
            value={selectedUser || ""}
            onChange={handleUserChange}
            style={{
              border: "2px solid #ccc",
              borderRadius: "4px",
              padding: "12px",
              width: "100%",
            }}
          >
            <option value="">Select a user</option>
            {users.map((user: any) => (
              <option key={user.telegram_id} value={user.telegram_id}>
                {user.username}
              </option>
            ))}
          </select>
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            margin: "8px 0",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            checked={sendToAll}
            onChange={handleSendToAllChange}
            style={{ marginRight: "8px" }}
          />
          Send to all users
        </label>
      </div>
      <textarea
        placeholder="Enter your message."
        style={{
          border: "2px solid #ccc",
          borderRadius: "4px",
          padding: "12px",
          margin: "8px 0",
          width: "100%",
          height: "200px",
        }}
      />
      <button
        onClick={() => {
          const message = document.querySelector("textarea")?.value;
          if (message) {
            if (sendToAll) {
              DataCall.getInstance().sendMessageToUser(
                users.map((user) => user.telegram_id),
                message,
                messageType
              );
            } else {
              DataCall.getInstance().sendMessageToUser(
                selectedUser || "",
                message,
                messageType
              );
            }
          }
        }}
        style={{
          backgroundColor: "#4CAF50",

          color: "white",
          padding: "14px 20px",
          border: "none",
          borderRadius: "4px",

          cursor: "pointer",
          margin: "8px 0",
          width: "100%",
          height: "50px",
        }}
      >
        Send
      </button>
    </div>
  );
}
