import React from 'react';
import { connect } from 'react-redux';

const FormValidationErrors = ({messages}) => {
    if (!messages || messages.length === 0) {
        return null;
    }
    return (
        <div className="form-errors">
            <div>Please correct the following errors:</div>
            <ul className="form-errors">
                {messages.map(message => <li>{message}</li>)}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => ({
    messages: state.postsApp.formValidationErrors
});

export default connect(mapStateToProps)(FormValidationErrors);