import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../context';

export default class Contacts extends Component {
//   deleteContact = id => {
//       const newContacts = this.state.contacts.filter(item => item.id !== id);

//       this.setState({ contacts: newContacts })
//   }

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact </span>List
              </h1>
              {value.contacts.map(item => (
                <Contact
                  key={item.id}
                  contact={item}
                //   deleteClickHandler={this.deleteContact.bind(this, item.id)}
                />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
