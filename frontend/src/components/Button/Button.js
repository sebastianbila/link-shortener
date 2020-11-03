import React from 'react';
import PropTypes from 'prop-types'
import './Button.scss'

const Button = props => {
    const {type, text, onClick} = props

    return (
        <button
            className="button"
            type={type || "button"}
            onClick={onClick}
            {...props}>
            {text}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
