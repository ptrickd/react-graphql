import React from 'react'
import { useQuery, gql } from '@apollo/client';


const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);
    const displayBooks = () => {
        if (loading) return <p>Loading books...</p>;
        if (error) return <p>Error :</p>;
        return data.books.map(book => {
            return (
                <li key={book.id}>{book.name}</li>
            )
        })
    }
    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
        </div>
    )
}

export default BookList
