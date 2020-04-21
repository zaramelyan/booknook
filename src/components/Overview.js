import React from 'react';
import { getBooks } from '../services/books'
import { addBook } from '../services/books';

class Overview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            isLoading: false,
            error: null,
            search: '',
            searching: false,
            logging: []
        }
    }

    async componentDidMount() {
    try {
        this.setState({ isLoading: true });
        const books = await getBooks();
        this.setState({ books, isLoading: false });
        } catch (error) {
            this.setState({ error });
        }
    }

    handleBookClick(bookId) {
        const { history } = this.props;
        history.push(`/details/${bookId}`);
        
    }

    handleAddButton() {
        const { history } = this.props;
        history.push('/add');
    }

    handleChangeSearch(event) {
        this.setState({search: event.target.value})
    }

    handleSearch() {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.search}&maxResults=40`)
        .then((response) => {
           return response.json();
         })
       .then((myJson) => {
           this.setState({logging: myJson}) 
            this.setState({searching: true})
           
        })

    }

    handleRetry() {
       window.location.reload()
    }
    
    async handleSubmit(title, author, coverImage, summary) {
        const book = {title, author, coverImage, summary};
        console.log(book)
        const newBook = await addBook(book)
        
        const { history } = this.props;
        history.push(`/details/${newBook.id}`);
    }

    render() {
        const { books, isLoading, error, logging } = this.state;
    if (error) {
        return (
            <div>
                <p>Oops! Something went wrong!</p>
                <pre>{error.message}</pre>
                <button onClick={this.handleRetry}>Retry</button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div>
                <p>Loading books...</p>
            </div>
        )
    }

    if (this.state.searching) {
        console.log(this.state.logging)
        try {
        var test = logging.items.map( elem => {
           
            return(
                <>
            <li className="border" key={elem.id}>{elem.volumeInfo.hasOwnProperty('imageLinks') ?  
            ( <><img src={elem.volumeInfo.imageLinks.smallThumbnail} alt="cover"/><br/></>) : 
            (<p>No image found</p>)} {elem.volumeInfo.title} | {elem.volumeInfo.authors} <br/> 
            <p>{elem.volumeInfo.description} </p> 
            <button onClick={this.handleSubmit.bind(this, elem.volumeInfo.title, elem.volumeInfo.authors, elem.volumeInfo.imageLinks.smallThumbnail, elem.volumeInfo.description)}>Add</button></li>
           
            </>
            )
            
        })
    } catch(error) {
        console.log(error)
        return (
            <p>Couldn't find your book, try to change the search query.</p>
        )
    }
    
    
    }

    const bookElements = books.map((book) => {
        return (
            <li onClick={this.handleBookClick.bind(this, book.id)} key={book.id} className="book">
                {book.title} | {book.author}
            </li>
        )
    });


    return (
        <div className="main">
            <button onClick={this.handleAddButton.bind(this)}>Add new book</button>
            <p>...or search for a book.</p>
                <input type="text" name="search" value={this.state.search} onChange={this.handleChangeSearch.bind(this)}></input>
                <button onClick={this.handleSearch.bind(this)}>Search</button>
                
            <div className="container">
            {books.length && !this.state.searching ? (
           <ul>{bookElements}</ul>
                ) : (!this.state.searching ? (
                <p>No books in the library</p> 
                ) : <ul>{test}</ul>
                )}
    
                </div>
                <div className="legs"></div>
               
        </div>
    );
};
};

export default Overview;