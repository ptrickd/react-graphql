import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';

//components
import BookDetails from './BookDetails';

function BookList() {
    const [selected, setSelected] = useState(null);
    const { loading, error, data } = useQuery(getBooksQuery);
    const displayBooks = () => {
        if (loading) return <p>Loading books...</p>;
        if (error) return <p>Error :</p>;
        return data.books.map(book => {
            return (
                <li
                    key={book.id}
                    onClick={e => setSelected(book.id)}
                >{book.name}</li>
            )
        })
    }
    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={selected} />
        </div>
    )
}

export default BookList
