import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {
        const {
            emailAddress,
            password,
            errors
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <Form 
                        cancel={this.cancel}
                        submit={this.submit}
                        errors={errors}
                        submitButtonText="SignIn"
                        elements={() => (
                            <React.Fragment>
                                <div>
                                    <input 
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="text"
                                        placeholder="Email Address"
                                        value={emailAddress}
                                        onChange={this.change}
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={this.change}
                                    />
                                </div>
                            </React.Fragment>
                        )}
                    />
                    <p>&nbsp;</p>
                    <p>Want a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }

    // state updates when data input 
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name] : value
            };
        });
    }

    // form 
    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: {pathname: '/'} }
        const { emailAddress, password } = this.state;
        context.actions.signIn(emailAddress, password)
        .then( user => {
            // 400 message 
            if (user === null) {
                this.setState(() => {
                    return { errors: ['Sign-in was unsuccessful'] };
                })
            } else {
                this.props.history.push(from);
            }
        })
        .catch(err => {
            console.log(err);
            this.props.history.push('/error');
        })
    }


    // redirect, main mage 
    cancel = () => {
        this.props.history.push('/');
    }
}