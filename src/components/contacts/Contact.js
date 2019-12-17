import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { Consumer } from '../../context';
import axios from 'axios';

import "@fortawesome/fontawesome-free/css/all.css";

export default class Contact extends Component {
    // state cannot be mutated directly, use setState instead
    state = {
        showContactInfo: false
    };

  onShowClick = () => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  }

  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    dispatch({type: 'DELETE_CONTACT', payload: id});
  }

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
        <Consumer>
            {value => {
                return (
                  <div className="card card-body mb-3">
                    <h4>
                      {name}{" "}
                      <i
                        onClick={this.onShowClick}
                        className="fas fa-sort-down"
                        style={{ cursor: "pointer" }}
                      />
                      <i
                        className="fas fa-times"
                        style={{
                          cursor: "pointer",
                          float: "right",
                          color: "red"
                        }}
                        onClick={this.onDeleteClick.bind(
                          this,
                          id,
                          value.dispatch
                        )}
                      />
                      <Link to={`contact/edit/${id}`}>
                        <i
                          className="fas fa-pencil-alt"
                          style={{
                            cursor: "pointer",
                            float: "right",
                            color: "black",
                            marginRight: "1rem"
                          }}
                        />
                      </Link>
                    </h4>
                    {showContactInfo ? (
                      <ul className="list-group">
                        <li className="list-group-item">Email: {email}</li>
                        <li className="list-group-item">Phone: {phone}</li>
                      </ul>
                    ) : null}
                  </div>
                );
            }}
        </Consumer>
    );
  }
}

// validation
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
//   deleteClickHandler: PropTypes.func.isRequired
};
// default props
Contact.defaultProps = {
  name: "Anonymous",
  email: "No email specified",
  phone: "No phone specified"
};
