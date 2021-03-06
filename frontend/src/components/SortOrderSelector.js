import React from 'react';
import {connect} from 'react-redux';
import {sortPosts} from '../state/actions/posts';

const SortOrderSelector = ({sortField, onSetSortOrder}) => {
  return (
    <label className="sort-order-selector">
      <span>Sort posts by</span>
      <select value={sortField} onChange={(event) => onSetSortOrder(event.target.value)}>
        <option value="author">Author</option>
        <option value="category">Category</option>
        <option value="timestamp">Time Posted</option>
        <option value="voteScore">Vote Score</option>
      </select>
    </label>
  );
};

const mapStateToProps = (state) => ({
  sortField: state.postsApp.sortField
});

const mapDispatchToProps = (dispatch) => ({
  onSetSortOrder: sortField => dispatch(sortPosts(sortField))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortOrderSelector);