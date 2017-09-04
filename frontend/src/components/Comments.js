import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { addVoteForComment } from '../actions';
import VoteControl from './VoteControl';

import './Comments.css';

const Comments = ({ comments, onVote }) => (
    <div>
        {comments.map(({id, author, body, voteScore, timestamp}) =>
            <div className="comment" key={id}>
                <div className="comment__body">{body}</div>
                <div className="comment__author">{author}</div>
                <div className="comment__vote-score">
                    <VoteControl value={voteScore} onVote={vote => onVote(id, vote)} />
                </div>
                <div className="comment_timestamp">{moment(timestamp).fromNow()}</div>
            </div>
        )}
    </div>
)

const mapStateToProps = (state, { comments }) => ({ comments });

const mapDispatchToProps = (dispatch) => ({
    onVote: (id, vote) => dispatch(addVoteForComment(id, vote))
})
export default connect(mapStateToProps, mapDispatchToProps)(Comments);