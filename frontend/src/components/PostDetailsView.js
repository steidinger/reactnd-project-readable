import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { addVoteForPost, deletePost, fetchComments } from '../actions';
import { visibleComments } from '../selectors';
import VoteControl from './VoteControl';
import Comments from './Comments';

import './PostDetailsView.css';

class PostDetailsView extends React.Component {

    componentDidMount() {
        if (this.props.post && this.props.post.id) {
            this.props.dispatch(fetchComments(this.props.post));
        }
    }

    componentWillReceiveProps(nextProps) {
        const prevPostId = this.props.post && this.props.post.id;
        if (nextProps.post && nextProps.post.id && nextProps.post.id !== prevPostId) {
            this.props.dispatch(fetchComments(nextProps.post));
        }
    }

    render() {
        if (!this.props.post) {
            return <div className="post">Not found</div>;
        }

        const {
            post: {
                id,
                title,
                body,
                author,
                category,
                voteScore,
                timestamp
            },
            comments,
            onVote,
            onDelete
        } = this.props;

        return (
            <div>
            <div className="post">
                <h1 className="post__title">{title}</h1>
                <p className="post__body">{body}</p>
                <div className="post__author">by: {author}</div>
                <div className="post__category">in: {category}</div>
                <div className="post__date">{moment(timestamp).format()}</div>
                <VoteControl className="post__vote-score" value={voteScore} onVote={vote => onVote(id, vote)}/>
                <div className="post__actions">
                    <Link to={`/${category}/${id}/edit`}>Edit Post</Link>
                    <button type="button" onClick={() => onDelete(id)}>Delete</button>
                </div>
            </div>
            <Comments className="post__comments" comments={comments} post_id={id} />
            </div>
    )
    };
}

const mapStateToProps = (state, { match}) => {
    const post = state.posts[match.params.post_id];
    const comments = post ? visibleComments(state, post) : [];
    return { post, comments};
}

const mapDispatchToProps = (dispatch, { history }) => ({
    onVote: (post_id, vote) => dispatch(addVoteForPost(post_id, vote)),
    onDelete: (id) => { 
        dispatch(deletePost(id)); 
        history.push('/'); 
    }, 
    dispatch 
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);