import React, { useEffect, useState } from "react";
import BookService from '../services/book.service';

const getBookDetail = (book) => {
  return (
    <h1>{book.title}</h1>
  );
}

const deleteBook = (id) => {

}

const renderBooks = (books) => {
  console.log(books);
  if (books && books.length > 0) {
    return (books.map(book => (
      <tr key={book.id}>
        <td>{book.id}</td>
        <td>{book.title}</td>
        <td>{book.publishDate}</td>
        <td><button type="button" className="btn btn-primary" onClick={() => getBookDetail(book)}>Detail</button></td>
        <td><button type="button" className="btn btn-danger" onClick={() => deleteBook(book.id)}>Delete</button></td>
      </tr>
    )));
  }
};

const Book = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    BookService.findAll(0, 10).then(
      (response) => {
        setBooks(response.data.items);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setBooks(_content);
      }
    );
  }, []);
  return (
    <div className="col-md-12">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Publish Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderBooks(books)}
        </tbody>
      </table>
    </div>
  );
};

export default Book;