import React from 'react';
import {connect} from 'react-redux';
import {sortPosts} from '../actions';

const SortOrderSelector = ({sortField, onSetSortOrder}) => {
    return (
        <select value={sortField} onChange={(event) => onSetSortOrder(event.target.value)}>
            <option value="author">Author</option>
            <option value="category">Category</option>
            <option value="timestamp">Time Posted</option>
            <option value="voteScore">Vote Score</option>
        </select>
    )
}

const mapStateToProps = (state) => ({
    sortField: state.postsApp.sortField
});

const mapDispatchToProps = (dispatch) => ({
    onSetSortOrder: sortField => dispatch(sortPosts(sortField))
})

export default connect(mapStateToProps, mapDispatchToProps)(SortOrderSelector);