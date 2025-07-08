import { createSlice, current } from "@reduxjs/toolkit"
import { addUsers, deleteUser, exportUser, fetchUser, updateUser } from "./UserAPI";

const initialState = {
    users: [],
    export: {
        exportData: [],
        exportType: "current",
        exportLoading: false,
    },
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,

}

const UserSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        setExportType: (state, action) => {
            state.export.exportType = action.payload
        },
        setCurrentPageUsers: (state, action) => {
            state.export.exportData = action.payload
        },
        setExportLoading: (state, action) => {
            state.export.exportLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                const response = action.payload.data
                if (response.code !== 404) {
                    state.users = response.data
                    state.page = response.page
                    state.totalPages = response.totalPages

                     state.export.exportData = response.data
                } else {
                    state.users = []
                    state.page = 1
                    state.totalPages = 1
                }

            })
            .addCase(exportUser.fulfilled, (state, action) => {
                state.export.exportData = action.payload.data
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
export const { setExportType, setCurrentPageUsers, setExportLoading } = UserSlice.actions
export default UserSlice.reducer;