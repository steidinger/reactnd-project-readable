import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import moment from 'moment';
import {addVoteForPost, deletePost, fetchComments} from '../state/actions';
import {visibleComments} from '../state/selectors';
import VoteControl from '../components/VoteControl';
import Comments from '../components/Comments';

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
    if (!this.props.isLoading && !this.props.post) {
      return <Redirect to="/" />;
    }
    if (this.props.isLoading) {
      return <div>Loading...</div>;
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
      <main>
        <div className="post">
          <h1 className="post__title">{title}</h1>
          <p className="post__body">{body}</p>
          <div className="post__author">by: {author}</div>
          <div className="post__category">in: {category}</div>
          <div className="post__date">{moment(timestamp).format()}</div>
          <VoteControl className="post__vote-score" value={voteScore} onVote={vote => onVote(id, vote)} />
          <div className="post__actions">
            <Link className="button" to={`/${category}/${id}/edit`}>Edit Post</Link>
            <button type="button" className="button" onClick={() => onDelete(id)}>Delete</button>
          </div>
        </div>
        <Comments className="post__comments" comments={comments} post_id={id} />
      </main>
    );
  }
}

const mapStateToProps = ({posts, comments: allComments, postsApp: {isLoadingPosts: isLoading}}, {match}) => {
  const post = posts[match.params.post_id];
  const comments = post ? visibleComments(allComments, post) : [];
  return {post, comments, isLoading};
};

const mapDispatchToProps = (dispatch, {history}) => ({
  onVote: (postId, vote) => dispatch(addVoteForPost(postId, vote)),
  onDelete: (id) => {
    dispatch(deletePost(id));
    history.push('/');
  },
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);