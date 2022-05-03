import axios from "axios";

const API_URL = "http://localhost:3000/api/books"

const findAll = (skipCount, maxResultCount, sort) => {
  return axios.get(API_URL, {
    params: {
      skipCount: skipCount,
      maxResultCount: maxResultCount,
      sort: sort
    },
    withCredentials: true,
  });
};


const findOne = (id) => {
  return axios.get(API_URL + `/${id}`, {
    withCredentials: true,
  });
};

const update = (id, title, price) => {
  return axios.put(API_URL + `/${id}`, {
    data: {
      title: title,
      price: price
    },
    withCredentials: true,
  })
};

const remove = (id) => {
  return axios.delete(API_URL + `/${id}`, {
    withCredentials: true,
  })
};

const insert = (title, price, publish_date, authorId) => {
  return axios.post(API_URL, {
    data: {
      title: title,
      price: price,
      publish_date: publish_date,
      authorId: authorId
    },
    withCredentials: true,
  });
};

const BookService = {
  findAll,
  findOne,
  update,
  remove,
  insert,
};

export default BookService;