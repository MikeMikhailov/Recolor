import React from 'react'
import { Spin } from 'antd';
import '../scss/Loading.scss'

function Loading() {
  return (
    <div className="loading__container">
      <Spin size="large" />
    </div>
  )
}

export default Loading
