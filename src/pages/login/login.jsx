import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './css/login.less'
import logo from './images/logo.png'

class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  pwdValidator = (rule, value, callback)=> {
    if(!value){
      callback('请输入用户名')
    }else if(value.length>12){
      callback('用户名必须小于等于12位')
    }else if(value.length<4){
      callback('用户名必须大于等于4位')
    }else if(!(/^\w+$/.test(value))){
      callback('用户名必须是字母、数字、下划线组成')
    }else{
      callback()
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo"/>
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '请输入用户名!' },
                  { max: 12, message: '用户名必须小于等于12位' },
                  { min: 4, message: '用户名必须大于等于4位' },
                  { pattern:/^\w+$/, message: '用户名必须是字母、数字、下划线组成' },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ validator: this.pwdValidator }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住我</Checkbox>)}
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
                或者 <a href="">现在注册!</a>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
export default Form.create({ name: 'Login' })(Login);