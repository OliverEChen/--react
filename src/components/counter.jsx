import React,{Component} from 'react'

export default class Counter extends Component {
  componentDidMount(){
    console.log(this.props);
  }
  increment = ()=> {
    let {value} = this.refs.selectNum
    this.props.increment(value*1)
  }
  decrement = ()=> {
    let {value} = this.refs.selectNum
    this.props.decrement(value*1)
  }
  incrementIfOdd = ()=>{
    let {value} = this.refs.selectNum
    let count = this.props.count
    if(count%2 === 1){
      this.props.increment(value*1)
    }
  }
  incrementAysnc = ()=>{
    let {value} = this.refs.selectNum
    setTimeout(() => {
      this.props.increment(value*1)
    }, 1000);
  }

  render () {
    return (
      <div>
        <h1>求和：{this.props.count}</h1>
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