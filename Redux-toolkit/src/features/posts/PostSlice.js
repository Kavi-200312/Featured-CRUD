import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { deletePost, updatePost, addPost, fetchPosts } from "./PostAPI";

const intialState = {
  posts: [],
  error: null,
  loading: false,
  counter: 0,
};

const commonThunks = [fetchPosts];
// const commonThunks = [fetchPosts, addPost, updatePost, deletePost];
// Custom matcher function
const isAnyPostPendingAction = (action) =>
  action.type.startsWith("posts/") && action.type.endsWith("/pending");

const isAnyPostRejectedAction = (action) =>
  action.type.startsWith("posts/") && action.type.endsWith("/rejected");

const isAnyPostFullfilledAction = (action) =>
  action.type.startsWith("posts/") && action.type.endsWith("/fullfilled");

const postSlice = createSlice({
  name: "posts",
  initialState: intialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts = [...state.posts, action.payload.data];
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updated = action.payload.data;
        const index = state.posts.findIndex((post) => post.id === updated.id);
        if (index !== -1) {
          state.posts[index] = updated;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.data.id
        );
      })

      .addMatcher(isAnyPostFullfilledAction, (state) => {
        state.loading = false;
      })

      .addMatcher(isPending(...commonThunks), (state) => {
        state.loading = true;
      })

      .addMatcher(isAnyPostRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        console.log(
          "Error: ",
          action.payload?.message || "Something went wrong"
        );
      });
  },
});

export const { decrement, increment } = postSlice.actions;
export default postSlice.reducer;
