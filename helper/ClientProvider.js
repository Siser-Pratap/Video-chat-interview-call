"use client";
import React, { Children } from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'

const ClientProvider = ({children}) => {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  )
}

export default ClientProvider
