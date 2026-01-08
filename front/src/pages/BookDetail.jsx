
import { useEffect, useState } from 'react'
import './BookDetail.css'
import { getBookById } from '../services/books.service'
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getBookById(id)
      .then((response) => {
        const apiBook = response;
        setBook(apiBook)
      })
      .catch((error) => {
        console.error('Error fetching book detail:', error)
      })
  }, [id])

  if (!book) {
    return <p>Loading</p>
  }

  return (
    <div className="book-detail-container">
      <div className="book-detail-content">
        <h2>{book.title}</h2>
        <h3>{book.author} - {book.year}</h3>
      </div>
    </div>
  )
}

export default BookDetail
