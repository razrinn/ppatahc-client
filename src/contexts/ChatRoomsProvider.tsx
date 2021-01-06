import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Contact, useContacts } from "./ContactProvider";
import { useSocket } from "./SocketProvider";

export interface ChatRoom {
  recipients: Contact[];
  messages: Message[];
  selected?: boolean;
}

interface Message {
  sender: string;
  text: string;
  senderName?: string;
  isMine?: boolean;
}

interface Props {
  userId: string;
}

interface MessageParam {
  recipients: Contact[];
  sender: string;
  text: string;
}

interface InitialState {
  chatRooms: ChatRoom[];
  addChatRooms(recipients: Contact[]): void;
  selectedChatRoom?: ChatRoom;
  selectChatRoom(idx: number): void;
  sendMessage(recipients: Contact[], text: string): void;
}

const ChatRoomsContext = React.createContext<InitialState>({
  chatRooms: [],
  addChatRooms: () => {},
  selectedChatRoom: undefined,
  selectChatRoom: () => {},
  sendMessage: () => {},
});

export const useChatRooms = () => {
  return React.useContext(ChatRoomsContext);
};

export const ChatRoomsProvider: React.FC<Props> = ({ userId, children }) => {
  const [chatRooms, setChatRooms] = useLocalStorage<ChatRoom[] | undefined>(
    "chatrooms",
    []
  );
  const [selectedChatRoomIdx, setSelectedChatRoomIdx] = useState(0);
  const { contacts } = useContacts();
  const { socket } = useSocket();
  const addChatRooms = (recipients: Contact[]) => {
    setChatRooms((prevState) => [
      ...(prevState as ChatRoom[]),
      { recipients, messages: [] },
    ]);
  };

  const formattedChatRooms = (chatRooms as ChatRoom[]).map(
    (chatRoom, index) => {
      const messages = chatRoom.messages.map((message) => {
        const contact = contacts.find((ct) => ct.id === message.sender);
        const senderName = (contact && contact.name) || message.sender;
        const isMine = userId === message.sender;
        return { ...message, senderName, isMine };
      });
      const selected = index === selectedChatRoomIdx;
      return { ...chatRoom, messages, selected };
    }
  );

  const addMessageToChatRoom = useCallback(
    ({ recipients, text, sender }: MessageParam) => {
      const newMessage: Message = { sender, text };
      setChatRooms((prev) => {
        let madeAnyChange = false;
        const newChatRoom = (prev as ChatRoom[]).map((chatRoom) => {
          if (chatRoomEqual(chatRoom.recipients, recipients)) {
            madeAnyChange = true;
            return {
              ...chatRoom,
              messages: [...chatRoom.messages, newMessage],
            };
          }
          return chatRoom;
        });
        if (madeAnyChange) {
          return newChatRoom;
        } else {
          return [
            { recipients, messages: [newMessage] },
            ...(prev as ChatRoom[]),
          ];
        }
      });
    },
    [setChatRooms]
  );

  const sendMessage = (recipients: Contact[], text: string) => {
    socket?.emit("send-message", { recipients, text, sender: userId });
    addMessageToChatRoom({
      recipients: recipients,
      text: text,
      sender: userId,
    });
  };

  const value = {
    chatRooms: formattedChatRooms,
    addChatRooms,
    selectedChatRoom: formattedChatRooms[selectedChatRoomIdx],
    selectChatRoom: setSelectedChatRoomIdx,
    sendMessage,
  };

  useEffect(() => {
    if (socket === null || typeof socket === "undefined") {
      return;
    }
    socket.on("receive-message", addMessageToChatRoom);
    return () => {
      socket.off("receive-message");
    };
  }, [socket, addMessageToChatRoom]);

  return (
    <ChatRoomsContext.Provider value={value}>
      {children}
    </ChatRoomsContext.Provider>
  );
};

const chatRoomEqual = (a: Contact[], b: Contact[]): boolean => {
  if (a.length !== b.length) return false;
  const sortedA = [...a];
  sortedA.sort(customSort);
  const sortedB = [...b];
  sortedB.sort(customSort);

  return sortedA.every(
    (recipient, index) => recipient.id === sortedB[index].id
  );
};

const customSort = (x: Contact, y: Contact) => {
  if (x.id < y.id) {
    return -1;
  }
  if (x.id > y.id) {
    return 1;
  }
  return 0;
};
