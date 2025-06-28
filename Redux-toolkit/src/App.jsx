
import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './features/posts/PostSlice';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect, useState } from 'react';
import { addUsers, deleteUser, fetchUser, updateUser } from './features/user/UserAPI';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from "react-paginate"
let count = 0

export const App = () => {
  const dispatch = useDispatch()
  const { users, page, totalPages } = useSelector((state) => state.users)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("")

  console.log(users, "users>>>>>>>>>>>>>>");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control
  } = useForm()

  const [edit, setEdit] = useState({ state: false, id: "" })


  const onSubmit = async (data) => {
    try {
      console.log(data, "form data's");
      // dispatch + unwrap to catch success/failure
      console.log(edit, "edit.state?????????????");

      if (edit.state) {
        const response = await dispatch(updateUser({ userinfo: data, id: edit.id })).unwrap();
        toast.success("User update successfully");
        setEdit({})
        reset();
      } else {
        const response = await dispatch(addUsers(data)).unwrap();
        toast.success("User added successfully");
        reset();
      }
    } catch (error) {

    }

  }
  const handleEdit = (user) => {
    console.log(user, "handleEdit");

    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("address", user.address);
    setEdit({ state: true, id: user?._id })

    //  window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 500)
    return () => clearInterval(timeout)
  }, [searchTerm])

  useEffect(() => {
    dispatch(fetchUser({
      page: currentPage,
      limit: 10,
      searchTerm: debouncedTerm
    }))
  }, [currentPage, debouncedTerm])

  count++
  return (
    <div className='app-main-container'>
      {/* Header */}
      <header className="page-header">
        <h1>User Management Dashboard</h1>
        <p>You can add, update, or delete user records below. Click on "Edit" to modify a user.</p>
      </header>
      {/* Users */}
      <section>

        <div className="User-deails">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Signup Form</h1>
            <div className="input-groups">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id='name'
                {
                ...register('name', {
                  required: {
                    value: true,
                    message: "Name is required"
                  },
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "Name must contain only letters",
                  }
                })
                } />
            </div>
            {errors?.name?.message && <p className='error-message'>{errors?.name?.message}</p>}
            <div className="input-groups">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id='email'
                // placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  }
                })} />
            </div>
            {errors?.email?.message && <p className='error-message'>{errors?.email?.message}</p>}
            <div className="input-groups">
              <label htmlFor="phone">phone</label>
              <input
                type="number"
                id='phone'
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Phone number is required"
                  },
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit mobile number starting with 6-9",
                  }
                })} />
            </div>
            {errors?.phone?.message && <p className='error-message'>{errors?.phone?.message}</p>}
            <div className="input-groups">
              <label htmlFor="address">Address</label>
              <textarea
                rows={4}
                id="address"
                {...register("address", {
                  required: {
                    value: true,
                    message: "address number is required"
                  },
                  maxLength: {
                    value: 100,
                    message: "The contains maximum 100 characters"
                  }
                })} ></textarea>
            </div>
            {errors?.address?.message && <p className='error-message'>{errors?.address?.message}</p>}
            <div className="btns">

              <button type='submit'>{edit.state ? "Update" : "Submit"}</button>
              {edit.state && <div onClick={() => {
                reset()
                setEdit({})
              }}>Cancel</div>}
            </div>
          </form>
          <DevTool control={control} />
        </div>

        <div className="user-table-container">
          <div className="search-container">
            <input
              className='search-input'
              type="text"
              placeholder='Search...'
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            />
          </div>
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
                      <button className='edit-btn Btn' onClick={() => handleEdit(item)}>Edit</button>
                      <button className='delete-btn Btn' onClick={() => dispatch(deleteUser(item._id))}>Delete</button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>

                  <td colSpan={5} className="no-data">No user found</td>
                </tr>
              )}
            </tbody>
            <div className="pagination">
              <button className='prev'></button>
              {/* <div className='totalpages'>{users?.}/{}</div> */}
              <button className='next'></button>
            </div>
          </table>
          <ReactPaginate
            onPageChange={(e) => setCurrentPage(e.selected + 1)}
            breakLabel="..."
            nextLabel=">"
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="<"
            containerClassName="awesome-pagination"
            pageClassName="page-item"
            activeClassName="active"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            renderOnZeroPageCount={null}
          />
        </div>
      </section>



      <Toaster />
      {/* <p>{counter}</p>
      <button onClick={() => {dispatch(increment())}}>increment</button>
      <button onClick={() => {dispatch(decrement())}}>decrement</button>
      {loading && <h1>Loading...</h1>}
      <form>
        in
      </form>
      <div>
        {posts && posts.length !== 0 ?(posts.map((item)=>{

          return(
          <div></div>
        )
        }
        
        )):(<>No data found</>)}
        </div> */}

    </div>
  )
}

