import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Discussions = () => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/discussions')
            .then(response => {
                setDiscussions(response.data);
            })
            .catch(error => {
                console.error('Error fetching discussions:', error);
            });
    }, []);

    return (
        <div>
            <h1>Discussions</h1>
            <ul>
                {discussions.map(discussion => (
                    <li key={discussion.id}>{discussion.topic}</li>
                ))}
            </ul>
        </div>
    );
};

export default Discussions;