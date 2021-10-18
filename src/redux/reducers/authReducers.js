const INITIAL_STATE = {
    username: "",
    password: "",
    email: "",
    id: 0,
    isverified: "",
    role_id: 0,
    address: null,
    isLogin: false
}

// address: null
// email: "what@mail.com"
// id: 109
// isverified: 0
// password: "5fda84806a18b7cd19a327b8cd3b3d5cc01205b95af91f959ec9ef69cecea848"
// role_id: 3
// username: "carti"

export const authReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, ...action.payload, isLogin: true }
        default:
            return state
    }
}