import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Button from 'react-bootstrap/Button';
import { SearchFormProps } from '../App';

const SearchForm = ({ id, value, onInputChange, onFormSubmit, button, placeholder } : SearchFormProps) => {
    return (
        <form onSubmit={onFormSubmit}>
            <input 
              type="text"
              id={id}
              value={value}
              onChange={onInputChange}
              placeholder={placeholder}/>
            <Button variant={button} type="submit">Search Players</Button>{' '}
        </form>
    );
}

export default SearchForm;