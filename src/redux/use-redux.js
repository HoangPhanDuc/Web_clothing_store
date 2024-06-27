//hide-show password
const showPassWord = { status: false };
export const showPasswordClick = (state = showPassWord, action) => {
  switch (action.type) {
    case "SHOW_PASSWORD":
      return { ...state, status: !state.status };
    default:
      return state;
  }
};
