import React,{Component} from 'react'
import {Icon,Button,Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import dayjs from 'dayjs'
import menuList from '../../../config/menu_config'
import {createDeleteUserInfoAction} from '../../../redux/actions/login_action'
import {reqWeather} from '../../../api/index'
import './css/header.less'
const { confirm } = Modal

@connect(
  state => ({
    userInfo:state.userInfo,
    title:state.title
  }),
  {deleteUser:createDeleteUserInfoAction}
)
@withRouter
class Header extends Component {
  state = {
    isFull:false,
    date:dayjs().format('YYYY年 MM月DD日 HH时:mm分:ss秒'),
    weatherInfo:{}
  }
  componentDidMount(){
    //全屏切换
    screenfull.on('change',()=>{
      let isFull = !this.state.isFull
      this.setState({isFull})
    })
    //更新时间
    this.timer = setInterval(() => {
      this.setState({date:dayjs().format('YYYY年 MM月DD日 HH时:mm分:ss秒')})
    }, 1000)
    //获取天气
    this.getWeather()
    //展示当前菜单标题
    this.getTitle()
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  getWeather = async()=> {
    let weather = await reqWeather()
    this.setState({weatherInfo:weather})
    // console.log(weather);
  }
  getTitle = () => {
    let pathKey = this.props.location.pathname.split('/').reverse()[0]
    let title = ''
    menuList.forEach((item)=>{
      if(item.children instanceof Array){
        let tmp = item.children.find((citem)=>{
          return citem.key === pathKey
        })
        if(tmp) title = tmp.title
      }else {
        if(pathKey === item.key) title = item.title
      }
    })
    this.setState({title})
  }
  // 切换全屏
  fullScreen = () => {
    screenfull.toggle()
  }
  // 退出登录
  logOut = () => {
    confirm({
      title: '确定退出？',
      content: '若退出，需要重新登录',
      okText:'确定',
      cancelText:'取消',
      onOk:() => {
        this.props.deleteUser()
      },
      onCancel() {},
    });
    
  }
  render(){
    let {isFull,/*weatherInfo*/} = this.state
    let {user} = this.props.userInfo
    return (
      <header className="header">
        <div className="header-top">
          <Button size="small" onClick={this.fullScreen}>
            <Icon type={isFull?'fullscreen-exit':'fullscreen'} /> 
          </Button>
          <span className="username">欢迎，{user.username}</span>
          <Button type="link" size="small" onClick={this.logOut}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            {this.props.title || this.state.title}
          </div>
          <div className="header-bottom-right">
            {this.state.date}&nbsp;&nbsp;
            <img src="https://dss3.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/weather/icons/a1.png" alt="天气信息"/>
            {/* {weatherInfo.city}&nbsp;{weatherInfo.weather}&nbsp;{weatherInfo.temperature}&nbsp;{weatherInfo.wind} */}
            多云 温度：2℃~5℃
          </div>
        </div>
      </header>
    )
  }
}
export default Header
