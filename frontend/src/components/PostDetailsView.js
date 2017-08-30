import React from 'react';
import { withRouter } from 'react-router';

const PostDetailsView = ({match}) => (<h1>Post Details: {match.params.post_id}</h1>);

export default withRouter(PostDetailsView);