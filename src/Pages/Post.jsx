import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import storage from "../Appwrite/Storage";
import databases from "../Appwrite/Databases";
import { Btn } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databases.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        databases.deletePost(post.$id).then((status) => {
            if (status) {
                storage.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 px-4">

            <div className="w-full mb-6">
                <h1 className="text-5xl font-bold">{post.title}</h1>
            </div>

            <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                <img
                    src={storage.getFileView  (post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl"
                />

                {isAuthor && (
                    <div className="absolute right-6 top-2 flex space-x-4">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Btn className="mr-3 bg-green-500 hover:bg-green-600">
                                Edit
                            </Btn>
                        </Link>
                        <Btn className="bg-red-500 hover:bg-red-600" onClick={deletePost}>
                            Delete
                        </Btn>
                    </div>
                )}
            </div>

            <div className="text-start text-lg">
                {parse(post.content)}
            </div>

        </div>
    ) : null;
}
