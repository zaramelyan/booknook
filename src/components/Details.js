import React from 'react';  //remember to import!!
import { getBookById, deleteBookById } from '../services/books';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: null,
            isLoading: false,
            error: null,
        }
    }

async componentDidMount() {
    const { id } = this.props.match.params;
    try {
        this.setState({ isLoading: true });
        const book = await getBookById(id);
        this.setState({ book, isLoading: false });
        } catch (error) {
            this.setState({ error });
        }
}

handleChangeView(bookId) {
    // const { changeView } = this.props;
    // changeView(view, { id: bookId });

    const { history } = this.props;
    history.push(`/details/${bookId}`)
}

handleEditView() {
    const { history } = this.props;
    const { id } = this.props.match.params;
    history.push(`/edit/${id}`)
}

handleOtherView() {
    // const { changeView } = this.props;
    // changeView(view, { id: bookId });

    const { history } = this.props;
    history.push(`/`)
}

async handleDelete() {
    const { id } = this.props.match.params;
    await deleteBookById(id);
    const { history } = this.props;
    history.push('/')
}

    render() {
        const { book, isLoading, error } = this.state;
        if (error) {
            return (
                <div>
                    <p>Oops! Something went wrong!</p>
                    <pre>{error.message}</pre>
                    <button>Retry</button>
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

        if (!book) {
            return (
                <div><p>Couldn't find your book! Sadface.</p></div>
            )
        }
    
        
        return ( 
            <div className="main">
            <div className="summary">
            <button onClick={this.handleOtherView.bind(this)}>Back to overview</button>
            <h1>{book.title}</h1>
            <img src={book.coverImage} alt="book cover" />
            <h2>{book.author}</h2>
            <p>{book.summary}</p>
            <button onClick={this.handleEditView.bind(this)}>Edit</button>
            <button onClick={this.handleDelete.bind(this)}>Delete</button>
            </div>
            </div>
            
        );
    }
}

export default Details; //remember to export!!