import { createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import { ApiList } from "../../utlis/ApiList";
import apiClient from "../../utlis/Axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(ApiList.fetchPost);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(ApiList.addPost,post);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({data , id}, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(ApiList.updatePost + `/${id}`,data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(ApiList.deletePost+ `/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
