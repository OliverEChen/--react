import React,{Component} from 'react'
import {connect} from 'react-redux'
import {createDemo2Action} from '../../redux/actions/test_action'

class Admin extends Component {
  componentDidMount(){
    console.log(this.props);
  }
  render(){
    return (
      <div>
        Admin
      </div>
    )
  }
}
export default connect(
  state => ({test:state.test}),
  {
    demo2:createDemo2Action
  }
)(Admin)