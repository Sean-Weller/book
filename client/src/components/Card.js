import React, { useState } from 'react';
import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const [upvotes, setUpvotes] = useState(props.upvotes || 0); // Initialize upvotes state

  // Function to handle upvote button click
  const handleUpvote = async (event) => {
    event.stopPropagation(); // Prevent event propagation
    setUpvotes(upvotes + 1); // Increment upvotes locally

    // Call the parent upvote handler if provided
    if (props.onUpvote) {
      props.onUpvote(props.id);
    }
  };

  return (
    <div className="Card">
      <div className="card-header">
        <Link to={'edit/' + props.id}>
          <img className="moreButton" alt="edit button" src={more} />
        </Link>
      </div>
      <div className="card-body">
        <Link to={`/post/${props.id}`}>
          <h2 className="title">{props.title}</h2>
        </Link>
        <Link to={`/post/${props.id}`}>
          <p className="created_at">Time Posted: {new Date(props.created_at).toLocaleString()}</p>
        </Link>
      </div>
      <div className="card-footer">
        <button className="action-button" onClick={handleUpvote}>
          👍 Upvotes: {upvotes}
        </button>
      </div>
    </div>
  );
};

export default Card;