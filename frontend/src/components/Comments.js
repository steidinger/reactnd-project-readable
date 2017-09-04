import React from 'react';
import moment from 'moment';
import VoteControl from './VoteControl';

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

export default Comments;