import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';
import { visiblePosts } from '../selectors';
import './Posts.css';

const Posts = ({ posts }) => (
    <ol className="post-list">
        {posts.map(({ id, title, category, timestamp, author, voteScore, comments }) => (
            <li key={id} className="post-list__post">
                <span className="post-list__post-title">
                    <Link to={`/${category}/${id}`}>{title}</Link>
                </span>
                <span className="post-list__author">{author}</span>
                <span className={classNames('post-list__vote-score', { 
                    'post-list__vote-score--positive': voteScore >= 0, 
                    'post-list__vote-score--negative': voteScore < 0 
                    })}>
                    {voteScore}
                </span>
                <span className="post-list__category">{category}</span>
                <span className="post-list__comments-count">{comments.length}</span>
                <span className="post-list__date">{moment(timestamp).fromNow()}</span>
            </li>
        ))}
    </ol>
);

const mapStateToProps = (state) => ({ posts: visiblePosts(state) });

export default connect(mapStateToProps)(Posts);