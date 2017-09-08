import React from 'react';
import {connect} from 'react-redux';
import {addPost, editPost, editPostFinished, formValidationFailed, savePost} from '../state/actions';
import FormValidationErrors from '../components/FormValidationErrors';

class PostEditView extends React.Component {

  handleChange = (field, value) => {
    const {post} = this.props;
    const updatedPost = {...post, [field]: value};
    if (this.props.onEdit) {
      this.props.onEdit(updatedPost);
    }
  };

  componentWillUnmount() {
    if (this.props.onExit) {
      this.props.onExit();
    }
  }

  render() {
    const {post, categories, formValidationErrors, onSave, onCancel} = this.props;
    const isNewPost = !post.id;

    return (
      <main>
        <form className="post-form">
          <h1>Edit Post</h1>
          <FormValidationErrors messages={formValidationErrors}/>
          <div className="form-row">
            <label htmlFor="post_id">Title</label>
            <input id="post_id" value={post.title} onChange={(e) => this.handleChange('title', e.target.value)}/>
          </div>

          <div className="form-row">
            <label htmlFor="post_body">Text</label>
            <textarea id="post_body" value={post.body} onChange={(e) => this.handleChange('body', e.target.value)}/>
          </div>

          <div className="form-row">
            <label htmlFor="post_author">Author</label>
            <input id="post_author" value={post.author} onChange={(e) => this.handleChange('author', e.target.value)}
                  disabled={!isNewPost}/>
          </div>

          <div className="form-row">
            <label htmlFor="post_category">Category</label>
            {categories &&
            <select id="post_category"
                    value={post.category}
                    onChange={(e) => this.handleChange('category', e.target.value)} disabled={!isNewPost}
            >
              <option value="">-- Select category</option>
              {categories.map(category => (
                <option key={category.path} value={category.name}>
                  {category.name}
                </option>))
              }
            </select>}
          </div>
          <div className="form-actions">
            <button type="button" className="button" onClick={() => onSave(post)}>Save</button>
            <button type="button" className="button" onClick={() => onCancel(post)}>Cancel</button>
          </div>
        </form>
      </main>
    )
  };
}

const validatePost = (post) => {
  let messages = [];
  if (!post.title || post.title.trim() === '') {
    messages.push('Title is missing');
  }
  if (!post.body || post.body.trim() === '') {
    messages.push('Text is missing');
  }
  if (!post.author || post.author.trim() === '') {
    messages.push('Author is missing');
  }
  if (!post.category || post.category.trim() === '') {
    messages.push('Category must be selected');
  }
  return (messages.length > 0) ? messages : null;
};

const mapStateToProps = (state, {match, location}) => {
  const defaultCategory = (/category=(\w+)/.exec(location.search) || [])[1];
  const post = state.postsApp.currentlyEditedPost || state.posts[match.params.post_id] || {category: defaultCategory};
  return {
    post,
    categories: state.categories,
    formValidationErrors: state.postsApp.formValidationErrors
  };
};

const mapDispatchToProps = (dispatch, {history}) => ({
  onEdit: (post) => dispatch(editPost(post)),
  onExit: () => dispatch(editPostFinished()),
  onSave: (post) => {
    const validationErrors = validatePost(post);
    if (validationErrors) {
      dispatch(formValidationFailed(validationErrors));
    }
    else {
      history.push('/');
      dispatch(post.id ? savePost(post) : addPost(post));
    }
  },
  onCancel: (post) => history.push(post && post.id ? `/${post.category}/${post.id}` : '/'),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEditView);
