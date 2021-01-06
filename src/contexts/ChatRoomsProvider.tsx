import React, { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Contact } from "./ContactProvider";

export interface ChatRoom {
  recipients: Contact[];
  messages: [];
  selected?: boolean;
}

interface InitialState {
  chatRooms: ChatRoom[];
  addChatRooms(recipients: Contact[]): void;
  selectedChatRoom?: ChatRoom;
  selectChatRoom(idx: number): void;
}

const ChatRoomsContext = React.createContext<InitialState>({
  chatRooms: [],
  addChatRooms: () => {},
  selectedChatRoom: undefined,
  selectChatRoom: () => {},
});

export const useChatRooms = () => {
  return React.useContext(ChatRoomsContext);
};

export const ChatRoomsProvider: React.FC = ({ children }) => {
  const [chatRooms, setChatRooms] = useLocalStorage("chatrooms", []);
  const [selectedChatRoomIdx, setSelectedChatRoomIdx] = useState(0);
  const addChatRooms = (recipients: Contact[]) => {
    setChatRooms((prev: ChatRoom[]) => [...prev, { recipients, messages: [] }]);
  };
  const formattedChatRooms = (chatRooms as ChatRoom[]).map(
    (chatRoom, index) => {
      const selected = index === selectedChatRoomIdx;
      return { ...chatRoom, selected };
    }
  );
  const value = {
    chatRooms: formattedChatRooms,
    addChatRooms,
    selectedChatRoom: formattedChatRooms[selectedChatRoomIdx],
    selectChatRoom: setSelectedChatRoomIdx,
  };
  return (
    <ChatRoomsContext.Provider value={value}>
      {children}
    </ChatRoomsContext.Provider>
  );
};
