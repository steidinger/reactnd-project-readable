import React from 'react';
import CategoriesMenu from './CategoriesMenu';
import Posts from './Posts';
import SortOrderSelector from './SortOrderSelector';

const IndexView = () => (
    <div>
    <CategoriesMenu />
    <SortOrderSelector />
    <Posts />
  </div>
);

export default IndexView;

