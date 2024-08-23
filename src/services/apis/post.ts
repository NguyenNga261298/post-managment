// services/api/postService.ts
import axios from 'axios';

const API_URL = 'https://training-program.dev.tekoapis.net/api/v1/posts';

export const getPosts = async (page: number = 1, pageSize: number = 12) => {
  const response = await axios.get(`${API_URL}?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

export const getPostDetail = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPost = async (postData: {title: string, description: string}) => {
  const response = await axios.post(API_URL, postData);
  return response.data;
};

export const updatePost = async (id: number, postData: {title: string, description: string}) => {
  const response = await axios.put(`${API_URL}/${id}`, postData);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
