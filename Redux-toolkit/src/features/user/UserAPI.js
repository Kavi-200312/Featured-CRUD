import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiList } from "../../utlis/ApiList";
import apiClient from "../../utlis/Axios";
import toast from "react-hot-toast";


export const addUsers = createAsyncThunk("users/addUser", async (userinfo, { rejectWithValue }) => {
    try {
        const newUser = await apiClient.post(ApiList.addUser, userinfo)
        return newUser
    } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Failed to add user. Please try again.")
        return rejectWithValue(error)
    }
})


export const fetchUser = createAsyncThunk("user/fetchUser", async ({ page, limit ,searchTerm}, { rejectWithValue }) => {
    try {
        const allUsers = await apiClient.get(`${ApiList.getUser}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`)
        return allUsers
    } catch (error) {
         console.log(error , "FETCHuSER....................");
         toast.error(error?.data?.message || "Failed to fetch user")
        return rejectWithValue(error)
    }
})


export const updateUser = createAsyncThunk("user/updateUser", async ({ userinfo, id }, { rejectWithValue }) => {
    try {
        console.log(userinfo, id ,"userinfo, id========================================");
        
        const updatedUser = await apiClient.put(`${ApiList.updateUser}/${id}`, userinfo)
        return updatedUser
    } catch (error) {
         toast.error(error?.data?.message || "Failed to update user. Please try again.")
        return rejectWithValue(error)
    }
})
export const deleteUser = createAsyncThunk("user/deleteUser", async (id, { rejectWithValue }) => {
    try {
        const deletedUser = await apiClient.delete(`${ApiList.deleteUser}/${id}`)
        return deletedUser
    } catch (error) {
         toast.error(error?.data?.message || "Failed to delete user. Please try again.")
        return rejectWithValue(error)
    }
})