import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    addComment,
    addVoteForComment,
    editComment,
    editCommentFinished,
    saveComment
} from '../actions';
import VoteControl from './VoteControl';

import './Comments.css';

class Comments extends React.Component {

    handleChange = (field, value) => {
        const changedComment = { ...this.props.currentlyEditedComment, [field]: value };
        console.log(changedComment);
        this.props.onEdit(changedComment);
    }

    render() {
        const { comments, currentlyEditedComment = undefined, onVote, onAddComment, onSave, onCancel } = this.props;
        const isAddingComment = currentlyEditedComment && !currentlyEditedComment.id;

        return (
            <div>
                {comments.map(({ id, author, body, voteScore, timestamp }) =>
                    <div className="comment" key={id}>
                        <div className="comment__body">{body}</div>
                        <div className="comment__author">{author}</div>
                        <div className="comment__vote-score">
                            <VoteControl value={voteScore} onVote={vote => onVote(id, vote)} />
                        </div>
                        <div className="comment_timestamp">{moment(timestamp).fromNow()}</div>
                    </div>
                )}
                {!isAddingComment && <button type="button" onClick={onAddComment}>Add Comment</button>}
                {isAddingComment &&
                    <form className="comment-form">
                        <h2>Add new comment</h2>
                        <div className="form-row">
                            <label htmlFor="comment_body">Comment</label>
                            <input id="comment_body"
                                value={currentlyEditedComment.body}
                                onChange={(event) => this.handleChange('body', event.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="comment_author">Author</label>
                            <input id="comment_author"
                                value={currentlyEditedComment.author}
                                onChange={(event) => this.handleChange('author', event.target.value)}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={() => onSave(currentlyEditedComment)}>Save</button>
                            <button type="button" onClick={onCancel}>Cancel</button>
                        </div>
                    </form>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, { comments, post_id }) => ({
    comments,
    post_id,
    currentlyEditedComment: state.postsApp.currentlyEditedComment
});

const mapDispatchToProps = (dispatch, { post_id }) => ({
    onVote: (id, vote) => dispatch(addVoteForComment(id, vote)),
    onAddComment: () => dispatch(editComment({ parentId: post_id })),
    onEdit: (comment) => dispatch(editComment(comment)),
    onCancel: () => dispatch(editCommentFinished()),
    onSave: (comment) => {
        if (!comment.id) {
            dispatch(addComment(comment))
        }
        else {
            dispatch(saveComment(comment));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);