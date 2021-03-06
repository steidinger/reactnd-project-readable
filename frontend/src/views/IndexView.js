import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Posts from '../components/Posts';
import SortOrderSelector from '../components/SortOrderSelector';

const IndexView = ({activeCategory}) => (
  <div>
    <SortOrderSelector />
    <main>
      <Posts activeCategory={activeCategory} />
      <Link className="button" to={`/post/add?category=${activeCategory ? activeCategory : ''}`}>Add New Post</Link>
    </main>
  </div>
);

const mapStateToProps = (state, {match}) => ({
  activeCategory: match.params.category ? match.params.category : undefined
});

export default connect(mapStateToProps)(IndexView);

