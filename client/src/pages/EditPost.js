import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './CreatePost.css'; // Reuse the same CSS as CreatePost

const EditPost = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const navigate = useNavigate(); // For navigation after actions
    const [post, setPost] = useState({ title: '', description: '', image: '' });

    // Fetch the post data when the component mounts
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('Posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    throw error;
                }

                setPost(data); // Set the fetched post data
            } catch (error) {
                console.error('Error fetching post:', error.message);
            }
        };

        fetchPost();
    }, [id]);

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle post update
    const updatePost = async (event) => {
        event.preventDefault();

        try {
            const { error } = await supabase
                .from('Posts')
                .update({
                    title: post.title,
                    description: post.description,
                    image: post.image,
                })
                .eq('id', id);

            if (error) {
                throw error;
            }

            navigate('/'); // Redirect to the homepage after updating
        } catch (error) {
            console.error('Error updating post:', error.message);
        }
    };

    // Handle post deletion
    const deletePost = async () => {
        try {
            const { error } = await supabase
                .from('Posts')
                .delete()
                .eq('id', id);

            if (error) {
                throw error;
            }

            navigate('/'); // Redirect to the homepage after deleting
        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
    };

    return (
        <div className="create-post-container">
            <form onSubmit={updatePost}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                ></textarea>

                <label htmlFor="image">Image-url</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={post.image}
                    onChange={handleChange}
                />

                <div className="button-group">
                    <button type="submit" className="submitButton">
                        Update
                    </button>
                    <button type="submit" className="deleteButton"
                        onClick={deletePost}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;
