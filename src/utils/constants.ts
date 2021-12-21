export const CONSTANTS: any = {
  ResponseFormat: {
    ERROR: { code: 422, content: { errorcode: -1, error: {} } },
    SUCCESS: { code: 200, content: {} }
  },
  EMAIL_ID_EXISTS: {
    code: 'EMAIL_ID_EXISTS',
    message: 'Email Id already registered'
  },
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: `User account doesn't exists, please register`, 
  },
  EMAIL_IS_EMPTY: 'EMAIL_IS_EMPTY',
  PASSWORD_IS_EMPTY: 'PASSWORD_IS_EMPTY',
  PASSWORD_LENGTH_MUST_BE_MORE_THAN_8:  'PASSWORD_LENGTH_MUST_BE_MORE_THAN_8',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  SOME_THING_WENT_WRONG: 'SOME_THING_WENT_WRONG',
  USER_EXISTS_ALREADY: 'USER_EXISTS_ALREADY',
  USER_DOES_NOT_EXIST: 'USER_DOES_NOT_EXIST',
  TOKEN_IS_EMPTY: 'TOKEN_IS_EMPTY',
  EMAIL_IS_IN_WRONG_FORMAT: 'EMAIL_IS_IN_WRONG_FORMAT'
}
