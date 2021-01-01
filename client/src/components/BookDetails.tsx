import { FC } from "react";
import { useQuery } from '@apollo/client'
import { getBookQuery } from "../queries/queries";

interface IProps { bookids: string}

export const BookDetails: FC<IProps> = ({ bookids }) => {
    const { data} = useQuery(getBookQuery, {
        variables: { id: bookids }
    })

    const displayBookDetails = () => {
        if(data){
        let book = data.book
            return(
                <div>
                    <h2>{ book.name }</h2>
                    <p>{ book.genre }</p>
                    <p>{ book.author.name }</p>
                    <p>All books by this author</p>
                    <ul className="other-books">
                        { book.author.books.map((item: any) => {
                            return <li key={ item.id }>{ item.name }</li>
                        })}
                    </ul>
                </div>
            )
        }else{
            return <div>NO book selected</div>
        }   
    }
    
    return(
        <div id="book-details">
            <p>Output book details here</p>
            { displayBookDetails() }
        </div>
    )
}