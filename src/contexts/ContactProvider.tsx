import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface Contact {
  id: string;
  name: string;
}

interface InitialState {
  contacts: Contact[];
  addContact(contact: Contact): void;
}

const ContactsContext = React.createContext<InitialState>({
  contacts: [],
  addContact: () => {},
});

export const useContacts = () => {
  return React.useContext(ContactsContext);
};

export const ContactProvider: React.FC = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage<Contact[]>("contacts", []);
  const addContact = ({ id, name }: Contact) => {
    setContacts((prev) => [...prev, { id, name }]);
  };
  return (
    <ContactsContext.Provider value={{ contacts, addContact }}>
      {children}
    </ContactsContext.Provider>
  );
};
