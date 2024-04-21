import React, { Component } from 'react'
import loading from './loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
          <img className='my-3' src={loading} alt="loading" />
        </div>
      </div>
    )
  }
}

export default Spinner
