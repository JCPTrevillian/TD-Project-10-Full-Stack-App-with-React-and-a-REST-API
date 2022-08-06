import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden =  () => (
    <div className="bounds">
        <h1>Forbidden</h1>
        <p>Sorry, access forbidden.</p>
        <span>
            <Link className="button button-secondary" to="/">Return to List</Link>
        </span>
    </div>
);

export default Forbidden;
