import React from 'react';
import { connect } from 'react-redux';
import './Categories.css';

const CategoriesMenu = ({ categories }) => (
    <ul className='category-list'>
        {categories.map(({ name, path }) => (
            <li key={path} className='category'>{name}</li>
        ))}
    </ul>);

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps)(CategoriesMenu);