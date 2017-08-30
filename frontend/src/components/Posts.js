import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { visiblePosts } from '../selectors';
import './Posts.css';

const Posts = ({ posts }) => (
    <ol className='post-list'>
        {posts.map(({ id, title, category, timestamp, author, voteScore }) => (
            <li key={id} className='post'>
                <span className='post__title'>
                    <Link to={`/${category}/${id}`}>{title}</Link>
                </span>
                <span className='post__author'>{author}</span>
                <span className='post__vote-score'>{voteScore}</span>
                <span className='post__category'>{category}</span>
            </li>
        ))}
    </ol>
);

const mapStateToProps = (state) => ({ posts: visiblePosts(state) });

export default connect(mapStateToProps)(Posts);