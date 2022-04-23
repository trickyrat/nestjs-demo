import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/books"

const findAll = (skipCount, maxResultCount, sort) => {
  return axios.get(API_URL, {
    params: {
      skipCount: skipCount,
      maxResultCount: maxResultCount,
      sort: sort
    },
    headers: {
      Authorization: authHeader()
    }
  });
};


const findOne = (id) => {
  return axios.get(API_URL + `/${id}`, {
    headers: {
      Authorization: authHeader()
    }
  });
};

const update = (id, title, price) => {
  return axios.put(API_URL + `/${id}`, {
    data: {
      title: title,
      price: price
    },
    headers: {
      Authorization: authHeader()
    }
  })
};

const remove = (id) => {
  return axios.delete(API_URL + `/${id}`, {
    headers: {
      Authorization: authHeader()
    }
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
    headers: {
      Authorization: authHeader()
    }
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