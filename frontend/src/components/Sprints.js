import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sprints = () => {
    const [sprints, setSprints] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/sprints')
            .then(response => {
                setSprints(response.data);
            })
            .catch(error => {
                console.error('Error fetching sprints:', error);
            });
    }, []);

    return (
        <div>
            <h1>Sprints</h1>
            <ul>
                {sprints.map(sprint => (
                    <li key={sprint.id}>{sprint.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Sprints;