import React from 'react';
import classNames from 'classnames';

const VoteControl = ({ value, onVote, ...rest }) => {
    const voteScoreClass = classNames('vote-score__value', { 'vote-score--positive': value >= 0, 'vote-score--negative': value < 0 });
    return (
        <span {...rest}>
            <span className={voteScoreClass}>
                {value}
            </span>
            <button className="vote-score__upvote" onClick={() => onVote(+1)}>Upvote</button>
            <button className="vote-score__downvote" onClick={() => onVote(-1)}>Downvote</button>
        </span>
    )
};

export default VoteControl;