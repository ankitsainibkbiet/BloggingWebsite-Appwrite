import React, { useState } from "react";
import { Input, Btn, Logo } from '../index'
import { useForm } from 'react-hook-form'
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/Auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Slice/AuthSlice";

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('') // use this for displaying login error like wrong password or email 

    const signup = async (data) => {
        setError('')
        try {
            const session = await authService.createAccount(data)
            if (session) {
                console.log('navigate')
                const user = await authService.getCurrentUser()
                if (user) {
                    dispatch(login(user))
                    console.log('navigate')
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)  // select message property
        }
    }

    return (
        <div className="bg-gray-200 w-[35%] ml-[33%] rounded-lg p-5 py-10">

            <div className="flex justify-center">
                <Logo />
            </div>

            <div>
                <h2 className="text-center text-2xl font-bold mt-3 leading-tight">Sign up to your account </h2>
                <p className="mt-2 text-center text-base text-black/60 mb-3">Already have any account ? <span className="font-semibold"><Link to='/login'>Login</Link></span></p>
            </div>
            {error && <p className="text-red-500 text-xl p-2 m-1">{error}</p>}

            <form onSubmit={handleSubmit(signup)}>
                <Input
                    label='Name :'
                    type='text'
                    placeholder = 'Your Name'
                    {...register('name', {
                        required: true
                    })}
                />
                <Input
                    label='Email :'
                    type='email'
                    placeholder='Email Address'
                    {...register('email', {
                        required: true
                    })}
                />
                <Input
                    label='Password :'
                    type='password'
                    placeholder='Password'
                    {...register('password', {
                        required: true
                    })}
                />
                <Btn
                    children={'Create Account'}
                    type="submit"
                />
            </form>
        </div>
    )
}
export default Signup