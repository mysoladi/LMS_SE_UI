import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: !!localStorage.getItem("edunexa_token"),
    token: localStorage.getItem("edunexa_token"),
    userInfo: {
      id:'',
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      sec_answer:'',
      user_role:'',
      username:''
    },
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem("edunexa_token", action.payload)
    },
    setUserInfo: (state, action) => {
      console.log(action.payload)
      let {id, email,password,first_name, last_name, sec_answer,user_role,username} = action.payload

      state.userInfo.id = id
      state.userInfo.firstName = first_name
      state.userInfo.lastName = last_name
      state.userInfo.username = username
      state.userInfo.user_role = user_role
      localStorage.setItem('userFullName',first_name)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setToken, setUserInfo } = userSlice.actions

export default userSlice.reducer