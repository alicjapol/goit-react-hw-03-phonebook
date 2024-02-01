import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContactList extends Component {
  static propTypes = {
    onRemove: PropTypes.func,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
      })
    ),
  };

  render() {
    const { contacts, onRemove } = this.props;

    return (
      <div>
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              {`${contact.name}: ${contact.number}`}
              <button onClick={() => onRemove(contact.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
