import React, {Component} from 'react'

class timer extends Component{
  state = {}
  render(){
    return(
      <div className="timeApp">
        <h4>{this.props.date.toLocaleTimeString()}</h4>
      </div>
    )
  }
}

export default Timer