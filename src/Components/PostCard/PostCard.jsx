import React from "react";
import { Link } from "react-router-dom";
import storage from "../../Appwrite/Storage";
import parse from 'html-react-parser'  // use to convert html tag in text for tinymce

function PostCard({ $id, title, featuredImage, content }) {
    return (
        
        <Link to={`/post/${$id}`}>
            {console.log(storage.getFileView  (featuredImage))}
            <div className='w-full bg-gray-100 rounded-xl p-4 max-h-[310px]'>

                <h2
                    className='text-xl font-bold pb-2'
                >{title}</h2>

                <div className='w-full justify-center flex'>
                    <img src={storage.getFileView  (featuredImage)} alt={title}
                        className='rounded-xl max-w-[320px] max-h-[190px]' />
                </div>

                <div className="pt-2 px-2 line-clamp-2 text-start">{parse(content)}</div>

            </div>
        </Link>
    )
}

export default PostCard