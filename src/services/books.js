const API_URL = 'http://localhost:3333'

export async function getBooks() {
    return await fetch(`${API_URL}/books`)
        .then((res) => res.json())
}

export async function getBookById(id) {
    return await fetch(`${API_URL}/books/${id}`)
        .then((res) => res.json());
}

export async function addBook(book) {
    return await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        .then((res) => res.json());
}

export async function updateBook(book) {
    return await fetch(`${API_URL}/books/${book.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        .then((res) => res.json());
}

export async function deleteBookById(id) {
    return await fetch(`${API_URL}/books/${id}`, {
            method: 'DELETE',
        })
        .then((res) => res.json());
}

