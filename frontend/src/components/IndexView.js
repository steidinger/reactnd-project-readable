import React from 'react';
import { connect } from 'react-redux';
import CategoriesMenu from './CategoriesMenu';
import Posts from './Posts';
import SortOrderSelector from './SortOrderSelector';

const IndexView = ({activeCategory}) => (
  <div>
    <CategoriesMenu />
    <SortOrderSelector />
    <Posts activeCategory={activeCategory} />
  </div>
);

const mapStateToProps = (state, { match }) => ({
  activeCategory: match.params.category ? match.params.category : undefined
});

export default connect(mapStateToProps)(IndexView);

