import React,{Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd'
import {createDeleteUserInfoAction} from '../../redux/actions/login_action'
import Header from './header/header'
import LeftNav from './left_nav/left_nav'
import './css/admin.css'
import Home from '../../components/home/home'
import Category from '../category/category'
import Product from '../product/product'
import Detail from '../product/detail'
import AddUpdate from '../product/add_update'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'

const { Footer, Sider, Content } = Layout;

@connect(
  state => ({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)
class Admin extends Component {
  // componentDidMount(){
  //   console.log(this.props);
  // }
  logOut = () => {
    this.props.deleteUserInfo()
  }
  render(){
    const {isLogin} = this.props.userInfo
    if(isLogin){
      return (
        <Layout className="admin">
          <Sider className="sider">
            <LeftNav></LeftNav>
          </Sider>
          <Layout>
            <Header>header</Header>
            <Content className="content">
              <Switch>
                <Route path="/admin/home" component={Home}/> 
                <Route path="/admin/prod_about/category" component={Category}/> 
                <Route path="/admin/prod_about/product" component={Product} exact/> 
                <Route path="/admin/prod_about/product/detail/:id" component={Detail}/> 
                <Route path="/admin/prod_about/product/add_update" component={AddUpdate} exact/> 
                <Route path="/admin/prod_about/product/add_update/:id" component={AddUpdate}/> 
                <Route path="/admin/user" component={User}/> 
                <Route path="/admin/role" component={Role}/> 
                <Route path="/admin/charts/bar" component={Bar}/> 
                <Route path="/admin/charts/line" component={Line}/> 
                <Route path="/admin/charts/pie" component={Pie}/> 
                <Redirect to="/admin/home"/>
              </Switch>
            </Content>
            <Footer className="footer">推荐使用谷歌浏览器，获取最佳体验</Footer>
          </Layout>
        </Layout>
      )
    }else {
      return <Redirect to='/login'/>
    }
  }
}
export default Admin
// export default connect(
//   state => ({userInfo:state.userInfo}),
//   {
//     deleteUserInfo:createDeleteUserInfoAction
//   }
// )(Admin)