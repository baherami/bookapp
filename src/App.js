import React, { Component } from 'react';
import {Route,Link } from 'react-router-dom';
import './App.css';
import Shelf from './shelf'
import * as BooksAPI from './BooksAPI'
import Search from './search'
class App extends Component {
  state={
    books:[]
  }
  componentDidMount() {
      BooksAPI.getAll().then((data) => this.setState({
        books:data
      }))
    }
  moveBooktoAnotherShelf=(book,shelf)=>{
    BooksAPI.update(book,shelf).then(BooksAPI.getAll().then((data) => this.setState({
      books:data
    })))

  }
  render() {
    const currentBookStatus={
              currentlyReading:'Currently Reading',
              wantToRead:'Want to Read',
              read:'Read'
    }
    return (
      <div className="App">
        <Route exact path="/" render={()=>(
          <div>
            {Object.keys(currentBookStatus).map(s=>(<Shelf onBookChange={this.moveBooktoAnotherShelf} key={s} shelfName={s} shelfBooks={this.state.books}/>))}

            <Link to="/search" className="open-search">
              <p>Add a book</p>
            </Link>

          </div>
        )}/>
        <Route path="/search" render={()=><Search onBookChange={this.moveBooktoAnotherShelf}/>}/>
      </div>
    );
  }
}

export default App;
