import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutationQuery } from '../queries/queries';



function AddBook(props) {

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const { loading, error, data } = useQuery(getAuthorsQuery);
    //data: addBookData Rename data to addBookData in object destructuring
    const [addBookMutation, { data: addBookData }] = useMutation(addBookMutationQuery);

    const displayAuthors = () => {
        if (loading) return <option disabled>Loading authors...</option>;
        // if (error) return <p>Error :</p>;
        return data.authors.map(author => {
            return (<option key={author.id} value={author.id}>{author.name}</option>)
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        addBookMutation({
            variables: {
                name,
                genre,
                authorId
            }
        });
    }

    return (


        <form id='add-book' onSubmit={submitForm}>
            <div className='field'>
                <label>Book name:</label>
                <input type='text' onChange={e => setName(e.target.value)} />
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input type='text' onChange={e => setGenre(e.target.value)} />
            </div>
            <div className='field'>
                <label>Author:</label>
                <select onChange={e => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>


    )
}

export default AddBook


