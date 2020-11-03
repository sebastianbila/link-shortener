import React from 'react';
import {Loader as Load} from "semantic-ui-react";

const Loader = () => {
    return (
        <div className='loader'>
            <Load active size='massive'>Loading</Load>
        </div>
    );
};

export default Loader;
