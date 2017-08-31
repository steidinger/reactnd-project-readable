import React from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions';
import { visibleComments } from '../selectors';

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
                title,
                body,
                author,
                category,
                voteScore,
                timestamp
            },
            comments
        } = this.props;

        const hasComments = comments.length > 0;

        return (
            <div className="post">
                <h1 className="post__title">{title}</h1>
                <p className="post__body">{body}</p>
                <div className="post__author">{author}</div>
                <div className="post__category">{category}</div>
                <div className="voteScore">{voteScore}</div>
                <h2>Comments</h2>
                {hasComments && comments.map(comment => (
                    <div className="comment" key={comment.id}>{comment.body}</div>
                ))}
                {!hasComments && <div>no comments yet</div>}
            </div>
        )
    };
}

const mapStateToProps = (state, { match }) => {
    const post = state.posts[match.params.post_id];
    const comments = post ? visibleComments(state, post) : [];
    return { post, comments };
}

export default connect(mapStateToProps)(PostDetailsView);