import { useForm } from "react-hook-form"
import { addUsers, updateUser } from "../features/user/UserAPI";
import { useDispatch, useSelector } from "react-redux";
import { setEdit } from "../features/user/UserSlice";
import { useEffect } from "react";
import { toastLimtter } from "../utlis/commonFunc";

const UserForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control
    } = useForm()
    const dispatch = useDispatch()

    const { actions: { edit } } = useSelector((state) => state.users)


    useEffect(() => {
        if (edit.state) {
            const data = edit?.data
            setValue("name", data?.name);
            setValue("email", data?.email);
            setValue("phone", data?.phone);
            setValue("address", data?.address);
        }
    }, [edit])
    const onSubmit = async (data) => {
        console.log(data, "form data's");
        // dispatch + unwrap to catch success/failure
        console.log(edit, "edit.state?????????????");

        if (edit.state) {
            const response = await dispatch(updateUser({ userinfo: data, id: edit.id })).unwrap();
            toastLimtter("User update successfully", "success")
            dispatch(setEdit({}))
            reset();
        } else {
            const response = await dispatch(addUsers(data)).unwrap();
            toastLimtter("User added successfully", "success")
            reset();
        }
    }
    return (
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

                    <button type='submit'>{edit?.state ? "Update" : "Submit"}</button>
                    {edit.state && <div onClick={() => {
                        reset()
                        dispatch(setEdit({}))
                    }}>Cancel</div>}
                </div>
            </form>
        </div>
    )
}

export default UserForm
