import React,{Component} from 'react'
import {createIncrementAction,createDecrementAction} from './redux/action_creators.js'

export default class App extends Component {
  componentDidMount(){
    console.log(this.props.store);
  }
  increment = ()=> {
    let {value} = this.refs.selectNum
    this.props.store.dispatch(createIncrementAction(value*1))
    // this.setState({count:value*1+count})
  }
  decrement = ()=> {
    let {value} = this.refs.selectNum
    this.props.store.dispatch(createDecrementAction(value*1))
    // let {count} = this.state
    // this.setState({count:count-value})
  }
  incrementIfOdd = ()=>{
    let {value} = this.refs.selectNum
    let count = this.props.store.getState()
    // let {count} = this.state
    if(count%2 === 1){
      // this.setState({count:value*1+count})
      this.props.store.dispatch(createIncrementAction(value*1))
    }
  }
  incrementAysnc = ()=>{
    let {value} = this.refs.selectNum
    setTimeout(() => {
      this.props.store.dispatch(createIncrementAction(value*1))
      // let {count} = this.state
      // this.setState({count:value*1+count})
    }, 1000);
  }

  render () {
    // let {count} = this.state
    let count = this.props.store.getState()
    return (
      <div>
        <h1>求和：{count}</h1>
        <select ref="selectNum">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if Odd</button>&nbsp;
        <button onClick={this.incrementAysnc}>increment aysnc</button>
      </div>
    )
  }
}

