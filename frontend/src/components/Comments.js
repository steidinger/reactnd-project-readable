import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  addComment,
  addVoteForComment,
  deleteComment,
  editComment,
  editCommentFinished,
  saveComment,
  formValidationFailed
} from '../actions';
import VoteControl from './VoteControl';
import FormValidationErrors from './FormValidationErrors';

import './Comments.css';

class Comments extends React.Component {

  // assign arrow function to instance variable to capture this (avoids binding)
  handleChange = (field, value) => {
    const changedComment = {...this.props.currentlyEditedComment, [field]: value};
    this.props.onEdit(changedComment);
  };

  render() {
    const {
      className,
      comments,
      currentlyEditedComment = undefined,
      onVote,
      onAddComment,
      onDelete,
      onEdit,
      onSave,
      onCancel
    } = this.props;
    const isAddingComment = currentlyEditedComment && !currentlyEditedComment.id;
    const editedId = currentlyEditedComment && currentlyEditedComment.id;

    return (
      <div className={className}>
        <h2>Comments</h2>
        {comments.length === 0 && <div>No comments yet</div>}
        {comments.map((comment) =>
          <div className="comment" key={comment.id}>
            {comment.id === editedId &&
            <form className="comment__body">
              <FormValidationErrors />
              <input
                value={currentlyEditedComment.body}
                onChange={(event) => this.handleChange('body', event.target.value)}
              />
              <button className="button" type="button" onClick={() => onSave(currentlyEditedComment)}>Save</button>
              <button className="button" type="button" onClick={onCancel}>Cancel</button>
            </form>
            }
            {comment.id !== editedId &&
            <div className="comment__body">{comment.body}</div>
            }
            <div className="comment__author">{comment.author}</div>
            <div className="comment__vote-score">
              <VoteControl value={comment.voteScore} onVote={vote => onVote(comment.id, vote)}/>
            </div>
            <div className="comment__date">{moment(comment.timestamp).fromNow()}</div>
            {comment.id !== editedId && <div className="comment__actions">
              <button type="button" className="button" onClick={() => onEdit(comment)}>Edit</button>
              <button type="button" className="button" onClick={() => onDelete(comment)}>Delete</button>
            </div>
            }
          </div>
        )}
        {!isAddingComment && <button type="button" className="button" onClick={onAddComment}>Add Comment</button>}
        {isAddingComment &&
        <form className="comment-form">
          <h2>Add new comment</h2>
          <FormValidationErrors />
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
            <button type="button" className="button" onClick={() => onSave(currentlyEditedComment)}>Save</button>
            <button type="button" className="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
        }
      </div>
    )
  }
}

const validateComment = (comment) => {
  let messages = [];
  if (!comment.body || comment.body.trim() === '') {
    messages.push('Comment text is missing');
  }
  if (!comment.author || comment.author.trim() === '') {
    messages.push('Author is missing');
  }
  return (messages.length > 0) ? messages : null;
};

const mapStateToProps = (state, {comments, post_id}) => ({
  comments,
  post_id,
  currentlyEditedComment: state.postsApp.currentlyEditedComment
});

const mapDispatchToProps = (dispatch, {post_id}) => ({
  onVote: (id, vote) => dispatch(addVoteForComment(id, vote)),
  onAddComment: () => dispatch(editComment({parentId: post_id})),
  onEdit: (comment) => dispatch(editComment(comment)),
  onCancel: () => dispatch(editCommentFinished()),
  onDelete: (comment) => dispatch(deleteComment(comment.id)),
  onSave: (comment) => {
    const validationErrors = validateComment(comment);
    if (validationErrors) {
      dispatch(formValidationFailed(validationErrors));
    }
    else {
      dispatch(editCommentFinished());
      if (!comment.id) {
        dispatch(addComment(comment))
      }
      else {
        dispatch(saveComment(comment));
      }
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
