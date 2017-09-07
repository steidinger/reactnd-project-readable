import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import './Categories.css';

const CategoriesMenu = ({categories}) => (
  <ul className="category-menu">
    {categories.map(({name, path}) => (
      <li key={path} className="category-menu-item">
        <NavLink to={`/${path}`}>
          {name}
        </NavLink>
      </li>
    ))}
  </ul>);

const mapStateToProps = ({categories}) => ({categories});

export default withRouter(connect(mapStateToProps)(CategoriesMenu));