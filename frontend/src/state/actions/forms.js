import {FORM_VALIDATION_FAILED} from './types';

export const formValidationFailed = (messages) => ({type: FORM_VALIDATION_FAILED, messages});
