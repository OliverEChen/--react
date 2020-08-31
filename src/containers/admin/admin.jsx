import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {createDeleteUserInfoAction} from '../../redux/actions/login_action'

class Admin extends Component {
  componentDidMount(){
    console.log(this.props);
  }
  logOut = () => {
    this.props.deleteUserInfo()
  }
  render(){
    const {isLogin} = this.props.userInfo
    if(isLogin){
      return (
        <div>
          <h1>hello,{this.props.userInfo.user.username}</h1>
          <button onClick={this.logOut}>退出登录</button>
        </div>
      )
    }else {
      return <Redirect to='/login'/>
    }
  }
}
export default connect(
  state => ({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)(Admin)