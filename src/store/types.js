// Getters
export const LOADING = 'shared/GET_LOADING'
export const ERROR = 'shared/GET_ERROR'

export const USER = 'authentication/GET_USER'
export const LOGIN_MODAL = 'authentication/GET_LOGIN_MODAL'
export const SIGNUP_MODAL = 'authentication/GET_SIGNUP_MODAL'

export const USER_INFO = 'authentication/profile/GET_USER_INFO'
export const USER_PROFILE = 'authentication/profile/GET_USER_PROFILE'

export const IS_FOLLOWING = 'authentication/profile/relationship/GET_IS_FOLLOWING'

// Mutations
export const SET_LOADING = 'shared/SET_LOADING'
export const SET_ERROR = 'shared/SET_ERROR'
export const CLEAR_ERROR = 'shared/CLEAR_ERROR'

export const SET_USER = 'authentication/SET_USER'
export const TOGGLE_LOGIN_MODAL = 'authentication/TOGGLE_LOGIN_MODAL'
export const TOGGLE_SIGNUP_MODAL = 'authentication/TOGGLE_SIGNUP_MODAL'

export const SET_USER_INFO = 'authentication/profile/SET_USER_INFO'
export const SET_USER_PROFILE = 'authentication/profile/SET_USER_PROFILE'

export const SET_IS_FOLLOWING = 'authentication/profile/relationship/SET_IS_FOLLOWING'

// Actions
export const ACTION_USER_LOGIN_ASYNC = 'authentication/USER_LOGIN'
export const ACTION_USER_SIGNUP_ASYNC = 'authentication/USER_SIGNUP'
export const ACTION_AUTO_SIGNIN = 'authentication/AUTO_SIGNIN'
export const ACTION_USER_LOGOUT = 'authentication/USER_LOGOUT'

export const ACTION_LOAD_USER_INFO_ASYNC = 'authentication/profile/LOAD_USER_INFO_ASYNC'
export const ACTION_LOAD_USER_PROFILE_BY_ID_ASYNC = 'authentication/profile/LOAD_USER_PROFILE_BY_ID_ASYNC'

export const ACTION_FOLLOW_THE_USER_ASYNC = 'authentication/profile/relationship/FOLLOW_THE_USER_ASYNC'
export const ACTION_UNFOLLOW_THE_USER_ASYNC = 'authentication/profile/relationship/UNFOLLOW_THE_USER_ASYNC'
export const ACTION_RELATIONSHIP_CHECK = 'authentication/profile/relationship/RELATIONSHIP_CHECK'

export const ACTION_SEARCH_BOOK_BY_ISBN_ASYNC = 'library/book/SEARCH_BOOK_BY_ISBN_ASYNC'

