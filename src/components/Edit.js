import React from "react";
import { getBookById, updateBook } from "../services/books";

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {},
            isLoading: false,
            error: null,
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            this.setState({ isLoading: true })
            const book = await getBookById(id);
            this.setState({ book, isLoading: false })
        } catch(error) {
            this.setState({ error }) //setState trigger rendring
        }
    }


    handleChangeForm(field, event) {
        this.setState({
            book: {
                ...this.state.book,
                [field]: event.target.value, //[parameter] to change parameter/dynamic property name 
            }
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const book = this.state.book
        const updatedBook = await updateBook(book);
        
        const { history } = this.props;
        history.push(`/details/${updatedBook.id}`)
    }

    handleChangeView() {
        const { history } = this.props;
        history.push("/")
    }

    render() {
        return (
            <div>
            <h3>Edit book</h3>
            <form>
                <label htmlFor="title">Title
                    <input type="text" value={this.state.book.title || ""} onChange={this.handleChangeForm.bind(this, "title")} />
                </label>
                <br></br>
                <label htmlFor="author">Author
                    <input name="author" type="text" value={this.state.book.author || ""} onChange={this.handleChangeForm.bind(this, "author")} />
                </label>
                <br></br>
                <label htmlFor="coverImage">Cover image link
                    <input type="text" value={this.state.book.coverImage || ""} onChange={this.handleChangeForm.bind(this, "coverImage")} />
                </label>
                <br></br>
                <label htmlFor="summary">Short summary
                    <input type="text" value={this.state.book.summary || ""} onChange={this.handleChangeForm.bind(this, "summary")} />
                </label>
            </form>
            
            <button type="submit" onClick={this.handleSubmit.bind(this)} >Save Book</button>
            <button onClick={this.handleChangeView.bind(this)}>Cancel</button>
            </div>
        )
    }
}



export default Edit;