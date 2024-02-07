import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./style.css";

function CreateAsset() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [author, setAuthor] = useState('');
    const [link, setLink] = useState('');

    const navigate = useNavigate(); // Use useNavigate hook

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission, typically involving setting state or a Redux action
        console.log({ title, description, type, dateCreated, author, link });
        // Redirect back to the assets list page after form submission
        navigate('/assets'); // Use navigate function to redirect
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
            <input type="date" value={dateCreated} onChange={(e) => setDateCreated(e.target.value)} placeholder="Date Created" />
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
            <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link to the asset" />
            <button type="submit">Submit</button>
        </form>
    );
}

export default CreateAsset;
