import React from 'react';

const VoteControl = ({onVote, ...rest}) => (
    <div {...rest}>
        <button className="upvote" onClick={() => onVote(+1)}>Upvote</button>
        <button className="downvote" onClick={() => onVote(-1)}>Downvote</button>
    </div>
);

export default VoteControl;