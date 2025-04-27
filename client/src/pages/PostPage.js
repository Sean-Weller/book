import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import './PostPage.css';

const PostPage = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null); // State for the post data
    const [loading, setLoading] = useState(true); // State for loading
    const [comment, setComment] = useState(''); // State for the comment input
    const [comments, setComments] = useState([]); // State for comments

    // Fetch the post data when the component mounts
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('Posts') // Query the "Posts" table
                    .select('*') // Select all columns
                    .eq('id', id) // Filter by the post ID
                    .single(); // Expect a single result

                if (error) {
                    throw error;
                }

                setPost(data); // Set the fetched post data
            } catch (error) {
                console.error('Error fetching post:', error.message);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchPost();
    }, [id]);

    // Handle upvote functionality
    const handleUpvote = async () => {
        if (!post) return;

        try {
            const updatedUpvotes = post.upvotes + 1;

            const { error } = await supabase
                .from('Posts')
                .update({ upvotes: updatedUpvotes })
                .eq('id', id);

            if (error) {
                throw error;
            }

            setPost({ ...post, upvotes: updatedUpvotes }); // Update the local state
        } catch (error) {
            console.error('Error updating upvotes:', error.message);
        }
    };

    // Handle adding a comment
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment('');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading message while fetching data
    }

    if (!post) {
        return <div>Post not found.</div>; // Show an error message if the post is not found
    }

    return (
        <div className="PostPage">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div className="post-actions">
                <Link to={`/edit/${post.id}`}>
                    <button className="action-button">Edit</button>
                </Link>
                <button className="action-button" onClick={handleUpvote}>
                    👍 Upvotes: {post.upvotes}
                </button>
            </div>
            <h2>Comments</h2>
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button className="action-button" type="submit">Submit</button>
            </form>
            <ul className="comments-list">
                {comments.map((c, index) => (
                    <li key={index}>{c}</li>
                ))}
            </ul>
            {/* Remove or define filteredPosts */}
        </div>
    );
};

export default PostPage;