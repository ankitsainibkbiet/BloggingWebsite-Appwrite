import React, { useCallback, useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import storage from '../../Appwrite/Storage'
import databases from '../../Appwrite/Databases'
import { useSelector } from 'react-redux'
import { Input, Btn, RTE, Select } from '../index'
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {

    const navigate = useNavigate()
    const [error, setError] = useState('')
    const userData = useSelector(state => (state.auth.userData))
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post ? post.title : '',
            slug: post ? post.slug : '',
            content: post ? post.content : '',
            status: post ? post.status : 'active'
        }  // all these will show initially when there is no post 
    })

    const submit = async (data) => {
        setError('')
        if (post) {
            const file = data.image[0] ? await storage.uploadFile(data.image[0]) : null // we can directly access the image which is stored in out input form by react-form-hook

            if (file) {
                await storage.deleteFile(data.featuredImage)
            }

            const updatedPost = await databases.updatePost(post.slug, {
                title: data.title,
                content: data.content,
                featuredImage: file ? file.$id : post.featuredImage, // Keep the existing image if no new file is uploaded
                status: data.status
            })

            if (updatedPost) {
                navigate(`/post/${post.$id}`)
            }else{
                console.log('error in update')
            }

        } else {
            const newFile = data.image[0] ? await storage.uploadFile(data.image[0]) : null

            if (newFile) {
                try {
                    const dbPost = await databases.createPost({ ...data, featuredImage: newFile.$id, userId: userData.$id });
                    if (dbPost) {
                        // navigate(`/post/${dbPost.$id}`);
                        navigate(`/`);
                    }
                } catch (error) {
                    setError(error.message)
                }
            }
        }
    }

    const slugTransformation = useCallback((value) => {
        if (value && typeof value === 'string') {
            return (
                value
                    .trim()
                    .toLowerCase()
                    .replace(/ /g, '-') // this is called regex, {//g} is global check, {^} negation in regex
            )
        }
    }, [])

    useEffect(() => {
        const subscription = watch((values, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransformation(values.title))
            }
        })
        return () => {
            subscription.unsubscribe()   // use callback function for this syntax 
        }
    }, [watch, slugTransformation, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex">

            <div className="left w-2/3">
                <Input
                    label='Title'
                    placeholder='Title'
                    {...register('title', {
                        required: true
                    })}
                />
                <Input
                    label='Slug'
                    placeholder='Slug'
                    {...register('slug', {
                        required: true
                    })}
                    onInput={(e) => {
                        setValue('slug', slugTransformation(e.currentTarget.value))
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className='bg-white w-[98%] m-auto'
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full my-4">
                        <img
                            src={storage.getFileView  (post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                />
                <Btn type="submit" className={`${post ? "bg-green-500 hover:bg-green-600" : undefined} w-full`}>
                    {post ? "Update" : "Submit"}
                </Btn>

                {error && <p className="text-red-600 text-start">ERROR :- {error}</p>}
            </div>

        </form>
    )
}

export default PostForm