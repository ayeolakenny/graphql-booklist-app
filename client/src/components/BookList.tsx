import { FC, useState } from "react";
import { useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries'
import { BookDetails } from "./BookDetails";

export const BookList: FC<{}> = () => {

    const [selected, setSelected] = useState<string>("")

    const { loading, error, data } = useQuery(getBooksQuery);

    const displayBooks = (): any => {
        if(loading){
            return <option disabled>Loading Books...</option>
        }else if(error){
            return <option disabled>Could not fetch books</option>
        }else{
            return data.books.map((book: any) => {
                return <li key={book.id} onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent> ) => setSelected(book.id)} value={book.id}>{book.name}</li>
            })
        }
    }

    return(
        <div>
            <ul id="book-list">
                { displayBooks() }
            </ul>
            <BookDetails bookids={selected}/>
        </div>
    )

}

