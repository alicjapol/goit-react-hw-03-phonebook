// ContactForm.jsx
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
      })
    ),
  };

  state = {
    name: '',
    number: '',
  };

  loginInputId = nanoid();

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });


  };

  handleSubmit = evt => {
    evt.preventDefault();
    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };
    const isDuplicate = this.props.contacts.some(
      contact =>
        contact.name.toLowerCase() === this.state.name.toLowerCase() ||
        contact.number === this.state.number
    );

    if (isDuplicate) {
      alert('Contact with the same name or number already exists!');
      return;
    }
    this.setState({ name: '', number: '' });

    if (this.props.onAddContact) {
      this.props.onAddContact(newContact);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              value={this.state.name}
              required
            />
          </label>
          <label>
            Number
            <input
              onChange={this.handleChange}
              value={this.state.number}
              type="tel"
              name="number"
              required
            />
          </label>

          <button type="submit">Add contact</button>
        </form>
      </div>
    );
  }
}
