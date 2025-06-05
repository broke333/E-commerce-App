import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: [], // List of all registered users
    currentUser: null, // Currently logged-in user
    isAuthenticated: false, // Authentication status
  },
  reducers: {
    signup: (state, action) => {
      const { username, email, password } = action.payload;

      // Check if user already exists
      const userExists = state.users.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
      if (userExists) {
        throw new Error('User with this email already exists.');
      }

      const newUser = {
        id: state.users.length + 1, // Simple ID generation
        username,
        email: email.toLowerCase(),
        password, // In a real app, hash the password
        addresses: [],
        paymentMethods: [],
        orderHistory: [],
      };

      state.users.push(newUser);
      state.currentUser = newUser;
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      const { email, password } = action.payload;

      const user = state.users.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password.');
      }

      state.currentUser = user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action) => {
      const { addresses, paymentMethods } = action.payload;
      if (!state.currentUser) {
        throw new Error('No user is logged in.');
      }
      if (addresses) {
        state.currentUser.addresses = addresses;
      }
      if (paymentMethods) {
        state.currentUser.paymentMethods = paymentMethods;
      }
      const userIndex = state.users.findIndex(
        (user) => user.id === state.currentUser.id
      );
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.currentUser };
      }
    },
    addOrderToHistory: (state, action) => {
      const order = action.payload;
      if (!state.currentUser) {
        throw new Error('No user is logged in.');
      }
      state.currentUser.orderHistory.push(order);
      const userIndex = state.users.findIndex(
        (user) => user.id === state.currentUser.id
      );
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.currentUser };
      }
    },
  },
});

export const { signup, login, logout, updateProfile, addOrderToHistory } = authSlice.actions;
export default authSlice.reducer;