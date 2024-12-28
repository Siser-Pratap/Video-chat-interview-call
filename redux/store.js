// store.js

// Import the configureStore function from Redux Toolkit to create the Redux store
import { configureStore } from '@reduxjs/toolkit';

// Import the user slice reducer (to be created in a separate file)
import userReducer from './slices/userSlice';

// Create the Redux store and configure it with the user slice reducer
const store = configureStore({
    reducer: {
        // Add the user slice reducer to the store
        user: userReducer,
    },
});

// Export the store so it can be used in the application
export default store;
