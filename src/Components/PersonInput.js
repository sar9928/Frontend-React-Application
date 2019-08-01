import React from 'react';
import Axios from 'axios';

// react component
export default class PersonInput extends React.Component{ 
    state = {
        name: '',
        email: ''
    }

    // checks if you have added in a name
    nameChange = event => {
        this.setState({ 
            name: event.target.value});
    }

    // checks if you have added in a email
    emailChange = event => {
        this.setState({ 
            email: event.target.value});
    }

    // Function for validating user after pressing submit
    handleSubmit = event => {
        event.preventDefault();

        let email = this.state.email;
        
        /* Tried adding in and getting data from new created users */
        // const request = new Request('https://jsonplaceholder.typicode.com/users', options);
        // const response = fetch(request);
        // const status = response.status;

        // if(status === 201) {
        //     this.fetchAll();
        //}

        if(!this.state.name.match(' ')) {
            document.getElementById("errorMessage").innerHTML = "Please add in first and last name";
        }

        else if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false) {
            document.getElementById("errorMessage").innerHTML = "Invalid email";

        }
        else if(this.state.name === "" || this.state.email === "") {
            document.getElementById("errorMessage").innerHTML = "Invalid name or email";
        }
        else {
            const user = {
                name: this.state.name,
                email: this.state.email
            }
            Axios
                .post(`https://jsonplaceholder.typicode.com/users`, { user })
                .then(res =>{
                    // Checker to see if data was created
                    console.log(res);
                    console.log(res.data);
                })
            document.getElementById("errorMessage").innerHTML = "";
        }
    };
    
    // Output to screen
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Full Name: </label>
                <input type="text" name="name" onChange={this.nameChange} />

                <label>Email: </label>
                <input type="text" email="email" onChange={this.emailChange} />
                
                <button type="submit">Add User</button>
                <br />
                <br />
                <label id="errorMessage"></label>
            </form>
            
        );
    }
}