import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { visiblePosts } from '../selectors';
import { addVote, deletePost } from '../actions';
import VoteControl from './VoteControl';

import './Posts.css';

const Posts = ({ posts, onVote, onDelete}) => (
    <ol className="post-list">
        {posts.map(({ id, title, category, timestamp, author, voteScore, comments }) => (
            <li key={id} className="post-list__post">
                <span className="post-list__post-title">
                    <Link to={`/${category}/${id}`}>{title}</Link>
                </span>
                <span className="post-list__author">{author}</span>
                <span className="post-list__vote-score">
                    <VoteControl value={voteScore} onVote={vote => onVote(id, vote)}/>
                </span>
                <span className="post-list__category">{category}</span>
                <span className="post-list__comments-count">{comments.length}</span>
                <span className="post-list__date">{moment(timestamp).fromNow()}</span>
                <span className="post-list__actions">
                    <Link to={`/${category}/${id}/edit`}>Edit</Link>
                    <button type="button" onClick={() => onDelete(id)}>Delete</button>
                </span>
            </li>
        ))}
    </ol>
);

const mapStateToProps = (state, { activeCategory }) => ({ posts: visiblePosts(state, activeCategory)});

const mapDispatchToProps = (dispatch) => ({
    onVote: (id, vote) => dispatch(addVote(id, vote)),
    onDelete: (id) => dispatch(deletePost(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));