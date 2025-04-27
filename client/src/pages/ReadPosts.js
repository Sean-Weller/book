import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'; // Importing the Supabase client

const ReadPosts = () => {
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [posts, setPosts] = useState([]); // State for posts
    const [sortBy, setSortBy] = useState('created_at'); // State for sorting

    // Fetch posts from Supabase
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('Posts') // Specify the table
                    .select() // Select all records
                    .order(sortBy, { ascending: sortBy !== 'created_at' }); // Sort descending for 'created_at', ascending for 'upvotes'

                if (error) {
                    throw error;
                }

                setPosts(data); // Set the fetched data to state
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        };

        fetchPosts(); // Call the fetch function when the component mounts
    }, [sortBy]); // Dependency array includes sortBy to fetch posts when sortBy changes

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle sorting change
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    // Handle upvote functionality
    const handleUpvote = async (postId) => {
        try {
            // Find the post to upvote
            const postToUpdate = posts.find((post) => post.id === postId);

            if (!postToUpdate) return;

            // Increment the upvotes
            const updatedUpvotes = postToUpdate.upvotes + 1;

            // Update the upvotes in the Supabase database
            const { error } = await supabase
                .from('Posts')
                .update({ upvotes: updatedUpvotes })
                .eq('id', postId);

            if (error) {
                throw error;
            }

            // Update the local state
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId ? { ...post, upvotes: updatedUpvotes } : post
                )
            );
        } catch (error) {
            console.error('Error upvoting post:', error.message);
        }
    };

    // Filter posts based on the search query
    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="ReadPosts">
            <div className="controls">
                <select value={sortBy} onChange={handleSortChange} className="sort-dropdown">
                    <option value="created_at">Sort by: Created Time</option>
                    <option value="upvotes">Sort by: Upvotes</option>
                </select>
                <br />
                <input
                    type="text"
                    placeholder="Search Posts"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
            </div>
            <br />
            {filteredPosts.length > 0 ? (
                <div className="card-container">
                    {filteredPosts.map((post) => (
                        <Card
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            created_at={post.created_at}
                            url={post.url}
                            upvotes={post.upvotes}
                            onUpvote={handleUpvote} // Pass the upvote handler
                        />
                    ))}
                </div>
            ) : (
                <h2>No Posts Found 😞</h2>
            )}
        </div>
    );
};

export default ReadPosts;


