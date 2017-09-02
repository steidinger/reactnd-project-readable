import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Categories.css';

const CategoriesMenu = ({ categories }) => (
    <ul className='category-list'>
        <li key="all" className="category">
            <NavLink to="/">Show All</NavLink>
        </li>
        {categories.map(({ name, path }) => (
            <li key={path} className="category">
                <NavLink to={`/${path}`}>{name}</NavLink>
            </li>
        ))}
    </ul>);

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps)(CategoriesMenu);