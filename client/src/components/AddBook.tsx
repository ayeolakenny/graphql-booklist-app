import { FC, useState } from "react";
import { useQuery, useMutation } from '@apollo/client'
import { getAuthorsQuery, addBookMutation ,getBooksQuery } from '../queries/queries'

export const AddBook: FC<{}> = () => {

    const { loading, error, data } = useQuery(getAuthorsQuery)
    
    const displayAuthors = (): any => {
        if(loading){
            return ( <option disabled>Loading Authors...</option> )
        }else if(error){
            return <option disabled>Could not fetch authors</option>
        }else{
            return data.authors.map((author: any) => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    } 
     
    const [name, setName] = useState<string>("")
    const [genre, setGenre] = useState<string>("")
    const [authorid, setAuthorId] = useState<string>("")

    const [addBook, { error: err}] = useMutation(addBookMutation, { refetchQueries: [{ query: getBooksQuery }]})
    if(err) console.log(err);

    const submitForm = (e: any) => { 
        e.preventDefault()
        addBook({ variables: { name, genre, authorid }})
    }
    return(
        <form id="add-book" onSubmit={submitForm}>

            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={e => setName(e.target.value)} value={name}/>
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={e => setGenre(e.target.value)} value={genre}/>
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={e => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    { displayAuthors() }
                </select>
            </div>

            <button>+</button>
        </form>
    )
}