import React from 'react';
import {connect} from 'react-redux';

const CategoriesMenu = ({categories}) => (
<ul>
    {categories.map(({name,path}) => <li key={path}>{name}</li>)}
</ul>);

const mapStateToProps = ({categories}) => ({categories});

export default connect(mapStateToProps)(CategoriesMenu);