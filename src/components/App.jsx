import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App () {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const handleChange = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const removeContact = id => {
    const newList = contacts.filter(contact => contact.id !== id);
    setContacts(newList);
    saveContacts(newList);
  };

  const addContact = newContact => {
    setContacts(prevContacts => [...prevContacts, newContact]);
    saveContacts([...contacts, newContact]);
  };

  const getContacts = () => {
    try {
      const storedContacts = JSON.parse(localStorage.getItem('contacts'));
      if (storedContacts) {
        setContacts(storedContacts);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const saveContacts = contacts => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
    <h1>Phonebook</h1>
    <ContactForm
      onAddContact={addContact}
      contacts={contacts}
    />

    <h2>Contacts</h2>
    <Filter value={filter} onChange={handleChange} />
    <ContactList
      contacts={filteredContacts()}
      onRemove={removeContact}
    />
  </div>
  );
};

