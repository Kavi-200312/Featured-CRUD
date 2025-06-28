import { createSlice } from "@reduxjs/toolkit"
import { addUsers, deleteUser, fetchUser, updateUser } from "./UserAPI";

const initialState = {
    users: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
}

const UserSlice = createSlice({
    name: "Users",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                const response = action.payload.data
                if (response.code !== 404) {
                    state.users = response.data
                    state.page = response.page
                    state.totalPages = response.totalPages
                }else{
                    state.users = []
                    state.page = 1
                    state.totalPages = 1
                }

            })
            .addCase(addUsers.fulfilled, (state, action) => {
                if (state.users.length < 10) {
                    state.users = [...state.users, action.payload.data]
                }
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                let updated = action.payload.data
                const index = state.users.findIndex((user) => user?._id === updated?._id)

                if (index !== -1) {
                    state.users[index] = updated
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const deletedUserId = action.payload.data.id
                state.users = state.users.filter((user) => user._id !== deletedUserId)
            })
    }

})

export default UserSlice.reducer;