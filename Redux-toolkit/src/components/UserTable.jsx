import { useDispatch, useSelector } from "react-redux"
import { deleteUser } from "../features/user/UserAPI"
import { setEdit } from "../features/user/UserSlice"

const UserTable = () => {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.users)
    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Address</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users && users?.length !== 0 ? (
                    users.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>
                                <button className='edit-btn Btn'
                                    onClick={() => dispatch(setEdit({
                                        state: true,
                                        id: item?._id,
                                        data: item
                                    }))}
                                >Edit
                                </button>
                                <button
                                    className='delete-btn Btn'
                                    onClick={() => dispatch(deleteUser(item._id))}>
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>

                        <td colSpan={5} className="no-data">No user found</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default UserTable
