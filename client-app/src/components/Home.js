import React, { useState, useEffect } from "react";
import BookService from "../services/book.service";
const Home = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    BookService.findAll(0, 10).then(
      (response) => {
        console.log(response)
        setContent(response.data.message);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <div className="container">
      <header className="jumbotron">
        {/* <h3>{content}</h3> */}
        Home
      </header>
    </div>
  );
};
export default Home;