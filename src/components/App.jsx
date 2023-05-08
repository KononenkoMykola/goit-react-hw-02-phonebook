import React, { Component } from 'react';
import { Container } from './App.styled';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addUser = ({ name, number }) => {
    const user = {
      id: nanoid(5),
      name,
      number,
    };

    const existing = this.state.contacts.find(({ name }) => name === user.name);

    if (existing) {
      alert(`${user.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [user, ...prevState.contacts],
    }));
  };

  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  getVisibleItems = () => {
    return this.state.contacts.filter(el =>
      el.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase())
    );
  };

  handleDelete = idUser => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => idUser !== id),
    }));
  };

  render() {
    return (
      <>
        <Container>
          <h2>Phonebook</h2>

          <ContactForm onSubmit={this.addUser} />
        </Container>

        <Container>
          <h2>Contacts</h2>

          <Filter onChange={this.onInputChange} value={this.state.filter} />
          <ContactList
            visibleList={this.getVisibleItems()}
            onDeleteUser={this.handleDelete}
          />
        </Container>
      </>
    );
  }
}

export default App;
