import { createSlice, current } from "@reduxjs/toolkit"
import { addUsers, deleteUser, exportUser, fetchUser, updateUser } from "./UserAPI";
import { DynamicHeaders } from "../../utlis/commonFunc";

const initialState = {
    users: [],
    export: {
        exportData: [],
        exportType: "current",
        exportLoading: false,
        exportHeaders :[]
    },
    actions: {
        edit: { state: false ,id:"", data: {} }
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
        },
        setEdit: (state, action) => {
            state.actions.edit = action.payload
        },
        setPage :(state,action)=>{
            state.page = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                const response = action.payload
                if (response.code !== 404) {
                    state.users = response.data
                    state.page = response.page
                    state.totalPages = response.totalPages

                    //export
                    state.export.exportData = response.data
                    state.export.exportHeaders = DynamicHeaders(response.data)
                } else {
                    state.users = []
                    state.page = 1
                    state.totalPages = 1
                }

            })
            .addCase(exportUser.fulfilled, (state, action) => {
                state.export.exportData = action.payload
            })
            .addCase(addUsers.fulfilled, (state, action) => {
                if (state.users.length < 10) {
                    state.users = [...state.users, action.payload]
                }
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                let updated = action.payload
                const index = state.users.findIndex((user) => user?._id === updated?._id)

                if (index !== -1) {
                    state.users[index] = updated
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const deletedUserId = action.payload.id
                state.users = state.users.filter((user) => user._id !== deletedUserId)
            })
    }

})
export const { setExportType, setCurrentPageUsers, setExportLoading, setEdit ,setPage} = UserSlice.actions
export default UserSlice.reducer;