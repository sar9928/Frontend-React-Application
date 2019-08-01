import React, { Component } from 'react';
import paginate from 'paginate-array';

// react component
export default class PersonList extends React.Component{ 
    constructor(props) {
    super(props);

    this.state = {
      persons: [],
      size: 5,
      page: 1,
      currentPage: null
    }

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  // Probably should add in componentWillUpdate/componentDidUpdate to check for changes with input

  // Waits for component to mount to DOM
  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(persons => {
        persons.sort((a,b) => a.name.localeCompare(b.name));

        const { page, size } = this.state;

        const currentPage = paginate(persons, page, size);

        this.setState({
          ...this.state,
          persons: persons,
          currentPage
        });

      });
  }

  // After pressing the previous button function
  previousPage() {
    const {  page, size, persons } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrentPage = paginate(persons, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currentPage: newCurrentPage
      });

      if(newPage == 1) {
        document.getElementById("preButton").style.visibility='hidden';
        document.getElementById("nextButton").style.visibility='visible';
      }
      else {
        document.getElementById("preButton").style.visibility='visible';
      }
    }
  }

  // after pressing the next page button
  nextPage() {
    const { currentPage, page, size, persons } = this.state;

    if (page < currentPage.totalPages) {
      const newPage = page + 1;
      const newCurrentPage = paginate(persons, newPage, size);
      this.setState({ ...this.state, page: newPage, currentPage: newCurrentPage });

      if(newPage == currentPage.totalPages) {
        document.getElementById("nextButton").style.visibility='hidden';
        document.getElementById("preButton").style.visibility='visible';
      }
      else {
        document.getElementById("nextButton").style.visibility='visible';
      }
    }
  }

  // Output to screen
  render() {
    const { page, currentPage } = this.state;

    return (
      <div>
        <br />
        <button id="preButton" onClick={this.previousPage}>Previous</button>
        <button id="nextButton" onClick={this.nextPage}>Next</button>
        
        <div>page: {page}</div>
        {currentPage &&
          <ul>
            {currentPage.data.map(person => 
                <div key={person.id}> 
                    <div id="personName">{person.name}</div>
                </div>)}
          </ul>
        }
      </div>

    )
   
  }
}