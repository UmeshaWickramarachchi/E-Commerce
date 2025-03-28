
export const handleLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: "LOGIN",
      data
    })
  }
}

export const handleLogout = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT"
    })
  }
}
