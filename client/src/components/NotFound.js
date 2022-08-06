import React from 'react';
import { Link } from 'react-router-dom';

const NotFound =  () => (
    <div className="bounds">
        <h1> Not Found</h1>
        <p>Page not found.</p>
        <span>
            <Link className="button button-secondary" to="/">Return to List</Link>
        </span>
    </div>
);

export default NotFound;