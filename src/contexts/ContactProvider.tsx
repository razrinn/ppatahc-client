import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Contact {
  id: string;
  name: string;
}

interface InitialState {
  contacts: Contact[];
  addContact(contact: Contact): void;
}

const ContactsContext = React.createContext<InitialState | undefined>(
  undefined
);

export const useContacts = () => {
  return React.useContext(ContactsContext);
};

export const ContactProvider: React.FC = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const addContact = ({ id, name }: Contact) => {
    setContacts((prev: Contact[]) => [...prev, { id, name }]);
  };
  return (
    <ContactsContext.Provider value={{ contacts, addContact }}>
      {children}
    </ContactsContext.Provider>
  );
};
