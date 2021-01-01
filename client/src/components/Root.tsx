import { FC } from 'react'
import { BookList } from './BookList';
import { AddBook } from './AddBook';

export const Root: FC<{}> = () => {

    
    return(
      <div id="main">
        <h1>Kenny Reading List 📓</h1>
        <BookList />
        <AddBook />
      </div>
    )
}