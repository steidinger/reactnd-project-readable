import React from 'react';
import { connect } from 'react-redux';
import { addPost, editPost, editPostFinished, savePost } from '../actions';

class PostEditView extends React.Component {

    handleChange = (field, value) => {
        const { post } = this.props;
        const updatedPost = { ...post, [field]: value };
        if (this.props.onEdit) {
            this.props.onEdit(updatedPost);
        }
    }

    componentWillUnmount() {
        if (this.props.onExit) {
            this.props.onExit();
        }
    }

    render() {
        const { post, categories, onSave } = this.props;
        const isNewPost = !post.id;

        return (
            <form className="post-form">
                <h1>Edit Post</h1>

                <div className="form-row">
                    <label htmlFor="post_id">Title</label>
                    <input id="post_id" value={post.title} onChange={(e) => this.handleChange('title', e.target.value)} />
                </div>

                <div className="form-row">
                    <label htmlFor="post_body">Text</label>
                    <textarea id="post_body" value={post.body} onChange={(e) => this.handleChange('body', e.target.value)} />
                </div>

                <div className="form-row">
                    <label htmlFor="post_author">Author</label>
                    <input id="post_author" value={post.author} onChange={(e) => this.handleChange('author', e.target.value)} disabled={!isNewPost} />
                </div>

                <div className="form-row">
                    <label htmlFor="post_category">Category</label>
                    {categories &&
                        <select id="post_category" value={post.category} onChange={(e) => this.handleChange('category', e.target.value)} disabled={!isNewPost}>
                            {categories.map(category => (
                                <option key={category.path} value={category.name}>
                                    {category.name}
                                </option>))
                            }
                        </select>}
                </div>
                <button type="button" onClick={(e) => onSave(post)}>Save</button>
            </form>
        )
    };
}

const mapStateToProps = (state, { match }) => {
    const post = state.postsApp.currentlyEditedPost || state.posts[match.params.post_id] || { category: undefined };
    return { post, categories: state.categories };
}

const mapDispatchToProps = (dispatch) => ({
    onEdit: (post) => dispatch(editPost(post)),
    onExit: () => dispatch(editPostFinished()),
    onSave: (post) => dispatch(post.id ? savePost(post) : addPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEditView);