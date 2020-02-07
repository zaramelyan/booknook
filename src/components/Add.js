import React from 'react';  //remember to import!!
import { addBook } from '../services/books';

class Add extends React.Component {
   state = {
       title: '',
       coverImage: '',
       author: '',
       summary: ''
   }

    handleChangeForm(field, event) {
        this.setState({
            [field]: event.target.value,
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const book = this.state;
        const newBook = await addBook(book)
        
        const { history } = this.props;
        history.push(`/details/${newBook.id}`);
    }

    handleChangeView() {
        const { history } = this.props;
        history.push('/')
    }

  render() {
      return (
          <div>
        <form className="book-form" action="api/books" method="POST">
  <label htmlFor="title">
      Title:
      <input id="title" type="text" name="title" value={this.state.title} onChange={this.handleChangeForm.bind(this, "title")} />
  </label>
  <br />
  <label htmlFor="author">
      Author:
      <input id="author" type="text" name="author" value={this.state.author} onChange={this.handleChangeForm.bind(this, "author")}  />
  </label>
  <br />
  <label htmlFor="cover">
      Cover:
      <input id="cover" type="text" name="coverImage" value={this.state.coverImage} onChange={this.handleChangeForm.bind(this, "coverImage")} />
  </label>
  <br />
  <label htmlFor="summary">
      Summary:
      <input id="summary" type="text" name="summary" value={this.state.summary} onChange={this.handleChangeForm.bind(this, "summary")} />
  </label>
  </form> 

  <br />
  <button onClick={this.handleSubmit.bind(this)}>Add book</button>
  <button onClick={this.handleChangeView.bind(this)}>Cancel</button>
          </div>
      )
  }
}




export default Add; //remember to export!!