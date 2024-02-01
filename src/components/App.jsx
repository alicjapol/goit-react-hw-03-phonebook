// App.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
export class App extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
      })
    ),
  };

  state = {
    contacts: [],
    filter: '',
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  filteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  removeContact = id => {
    const newList = this.state.contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: newList });
    this.saveContacts(newList);
  };

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    this.saveContacts([...this.state.contacts, newContact]);
  };

  getContacts = () => {
    try {
      const storedContacts = JSON.parse(localStorage.getItem('contacts'));
      if (storedContacts) {
        this.setState({ contacts: storedContacts });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  saveContacts = contacts => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  componentDidMount() {
    this.getContacts();
  }
  // async componentDidMount() {
  //   const contactValue = await this.addContact;
  //   const save = (key, contactValue) => {
  //     try {
  //       const contactStorage = JSON.stringify(contactValue);
  //       localStorage.setItem(key, contactStorage);
  //     } catch (error) {
  //       console.error('Set state error: ', error.message);
  //     }
  //   };
  // }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onAddContact={this.addContact}
          contacts={this.state.contacts}
        />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleChange} />
        <ContactList
          contacts={this.filteredContacts()}
          onRemove={this.removeContact}
        />
      </div>
    );
  }
}
