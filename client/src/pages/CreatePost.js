import React from 'react';
import { useState } from 'react';
import { supabase } from '../client';
import './CreatePost.css'; // Adjust the path if needed

const CreatePost = () => {
    const [post, setPost] = useState({ title: "", description: "", image: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const createPost = async (event) => {
        event.preventDefault();

        const postData = { title: post.title };

        if (post.description.trim() !== '') {
            postData.description = post.description;
        }

        if (post.image.trim() !== '') {
            postData.image = post.image;
        }

        await supabase.from('Posts').insert(postData);

        window.location = "/";
    };

    return (
        <div className="create-post-container">
            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" onChange={handleChange} />

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" onChange={handleChange}></textarea>

                <label htmlFor="image">Image-url</label>
                <input type="text" id="image" name="image" onChange={handleChange} />

                <button type="submit" className="submitButton">Submit</button>
            </form>
        </div>
    );
};

export default CreatePost;