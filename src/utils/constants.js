
let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
    apiRoot = 'https://localhost:8017'
}
if (process.env.BUILD_MODE === 'production') {
    apiRoot = 'https://trello-api-d3ye.onrender.com'
}

export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12

export const CARD_MEMBER_ACTIONS = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
}