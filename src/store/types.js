// Getters
export const LOADING = 'shared/GET_LOADING'
export const ERROR = 'shared/GET_ERROR'
export const SUCCESS = 'shared/GET_SUCCESS'
export const INFO = 'shared/GET_INFO'

export const USER = 'authentication/GET_USER'
export const LOGIN_MODAL = 'authentication/GET_LOGIN_MODAL'
export const SIGNUP_MODAL = 'authentication/GET_SIGNUP_MODAL'

export const USER_INFO = 'authentication/profile/GET_USER_INFO'
export const USER_PROFILE = 'authentication/profile/GET_USER_PROFILE'

export const IS_FOLLOWING = 'authentication/profile/relationship/GET_IS_FOLLOWING'

export const BOOK_INFO = 'library/book/GET_BOOK_INFO'

export const COLLECTIONS = 'library/collection/GET_COLLECTIONS'
// export const ADDING_LOCK = 'library/collection/GET_ADDING_LOCK'
export const GET_COLLECTION_BY_NAME = 'library/collection/GET_COLLECTION_BY_NAME'

// Mutations
export const SET_LOADING = 'shared/SET_LOADING'
export const SET_ERROR = 'shared/SET_ERROR'
export const SET_SUCCESS = 'shared/SET_SUCCESS'
export const SET_INFO = 'shared/SET_INFO'
export const CLEAR_SUCCESS = 'shared/CLEAR_SUCCESS'
export const CLEAR_INFO = 'shared/CLEAR_INFO'
export const CLEAR_ERROR = 'shared/CLEAR_ERROR'
export const CLEAR_ALL_MESSAGE = 'shared/CLEAR_ALL_MESSAGE'

export const SET_USER = 'authentication/SET_USER'
export const TOGGLE_LOGIN_MODAL = 'authentication/TOGGLE_LOGIN_MODAL'
export const TOGGLE_SIGNUP_MODAL = 'authentication/TOGGLE_SIGNUP_MODAL'

export const SET_USER_INFO = 'authentication/profile/SET_USER_INFO'
export const SET_USER_PROFILE = 'authentication/profile/SET_USER_PROFILE'

export const SET_IS_FOLLOWING = 'authentication/profile/relationship/SET_IS_FOLLOWING'

export const SET_BOOK_INFO = 'library/book/SET_BOOK_INFO'

export const ADD_ONE_EMPTY_COLLECTION = 'library/collection/ADD_ONE_EMPTY_COLLECTION'
export const REMOVE_ONE_COLLECTION = 'library/collection/REMOVE_ONE_COLLECTION'
export const UPDATE_ONE_COLLECTION = 'library/collection/UPDATE_ONE_COLLECTION'
export const ENABLE_COLLECTION_EDITING = 'library/collection/ENABLE_COLLECTION_EDITING'
export const TOGGLE_COLLECTION_CHECK = 'library/collection/TOGGLE_COLLECTION_CHECK'
export const CLEAR_COLLECTIONS = 'library/collection/CLEAR_COLLECTIONS'

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
export const ACTION_SEARCH_BOOK_BY_ISBN_IN_FB_ASYNC = 'library/book/SEARCH_BOOK_BY_ISBN_IN_FB_ASYNC'
export const ACTION_SAVE_BOOK_INFO_INTO_FB_ASYNC = 'library/book/SAVE_BOOK_INFO_INTO_FB_ASYNC'

export const ACTION_LOAD_COLLECTIONS_ASYNC = 'library/collection/LOAD_COLLECTIONS_ASYNC'
export const ACTION_SAVE_ONE_COLLECTION_INTO_FB = 'library/collection/SAVE_ONE_COLLECTION_INTO_FB'
export const ACTION_REMOVE_ONE_COLLECTION_FROM_FB = 'library/collection/REMOVE_ONE_COLLECTION_FROM_FB'
export const ACTION_SAVE_THE_BOOK_INTO_COLLECTION_IN_FB = 'library/collection/SAVE_THE_BOOK_INTO_COLLECTION_IN_FB'
