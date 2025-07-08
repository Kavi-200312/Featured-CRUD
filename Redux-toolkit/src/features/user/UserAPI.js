import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiList } from "../../utlis/ApiList";
import apiClient from "../../utlis/Axios";
import { toastLimtter } from "../../utlis/commonFunc";


export const addUsers = createAsyncThunk("users/addUser", async (userinfo, { rejectWithValue }) => {
    try {
        const newUser = await apiClient.post(ApiList.addUser, userinfo)
        return newUser.data
    } catch (error) {
        console.log(error);
        toastLimtter(error?.data?.message || "Failed to add user. Please try again.", "error")
        return rejectWithValue(error)
    }
})


export const exportUser = createAsyncThunk("user/exportUser",
    async ({ searchTerm, exportType }, { rejectWithValue }) => {
        try {
            const exportedUsers = await apiClient
                .get(`${ApiList.exportUsers}?searchTerm=${searchTerm}&exportType=${exportType}`)
            return exportedUsers.data
        } catch (error) {
            console.log(error, "exportedUsers....................");
            toastLimtter(error?.data?.message || "Failed to export Users.", "error")
            return rejectWithValue(error)
        }
    })
export const fetchUser = createAsyncThunk("user/fetchUser", async ({ page, limit, searchTerm }, { rejectWithValue }) => {
    try {
        const allUsers = await apiClient.get(`${ApiList.getUser}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`)
        return allUsers.data
    } catch (error) {
        console.log(error, "FETCHuSER....................");
        toastLimtter(error?.data?.message || "Failed to fetch users.", "error")
        return rejectWithValue(error)
    }
})


export const updateUser = createAsyncThunk("user/updateUser", async ({ userinfo, id }, { rejectWithValue }) => {
    try {
        console.log(userinfo, id, "userinfo, id========================================");

        const updatedUser = await apiClient.put(`${ApiList.updateUser}/${id}`, userinfo)
        return updatedUser.data
    } catch (error) {
        toastLimtter(error?.data?.message || "Failed to update user. Please try again.", "error")
        return rejectWithValue(error)
    }
})
export const deleteUser = createAsyncThunk("user/deleteUser", async (id, { rejectWithValue }) => {
    try {
        const deletedUser = await apiClient.delete(`${ApiList.deleteUser}/${id}`)
        return deletedUser.data
    } catch (error) {
        toastLimtter(error?.data?.message || "Failed to delete user. Please try again.", "error")
        return rejectWithValue(error)
    }
})