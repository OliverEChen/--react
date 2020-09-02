import React,{Component} from 'react'
import { Card,Button,Icon,Table,message,Modal,Form,Input } from 'antd'
import {reqCategoryList,reqAddCategory,reqUpdateCategory} from '../../api'
import {PAGE_SIZE} from '../../config/index'
const {Item} = Form

@Form.create()
class Category extends Component {
  state = {
    categoryList:[],//商品分类列表
    visible:false,//控制弹窗显示隐藏
    operaType:'',//操作类型（新增/修改）
    isLoading:true,//是否处于加载中
    modalCurrentValue:'',//弹窗显示的值,数据回显
    modalCurrentId:''
  }
  componentDidMount(){
    //请求商品分类列表
    this.getCategoryList()
  }
  showAdd = () => {
    this.setState({
      operaType:'add',
      visible: true,
      modalCurrentValue:'',
      modalCurrentId:''
    });
  };
  showUpdate = (item) => {
    const {_id,name} = item
    this.setState({
      operaType:'update',
      visible: true,
      modalCurrentValue:name,
      modalCurrentId:_id
    });
  };
  toAdd = async(values) => {
      let result = await reqAddCategory(values)
      const {status,data,msg} = result
      if(status === 0) {
        message.success('新增商品分类成功')
        let categoryList = [...this.state.categoryList]
        categoryList.unshift(data)
        this.setState({categoryList})
        this.setState({visible: false,})//隐藏弹窗
        this.props.form.resetFields()//重置表单
      }else message.error(msg)
      
  }
  toUpdate = async(categoryObj) => {
    let result = await reqUpdateCategory(categoryObj)
    const {status,msg} = result
    if(status === 0) {
      message.success('更新分类名称成功')
      this.getCategoryList()
      this.setState({visible: false,})//隐藏弹窗
      this.props.form.resetFields()//重置表单
    }else message.error(msg) 
  }
  handleOk = () => {
    const {operaType} = this.state
    this.props.form.validateFields(async(err,values)=>{
      if(err) {
        message.warning('输入有误，请检查') 
        return
      }
      if(operaType==='add') this.toAdd(values)
      if(operaType==='update') {
        const categoryId = this.state.modalCurrentId
        const categoryName = values.categoryName
        const categoryObj = {categoryId,categoryName}
        this.toUpdate(categoryObj)
      }
    })
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields()
  };
  getCategoryList = async() => {
    let result = await reqCategoryList()
    this.setState({isLoading:false})
    let {status,data,msg} = result
    if(status===0) this.setState({categoryList:data.reverse()})
    else message.error(msg)
  }
  render () {
    const dataSource = this.state.categoryList
    let {operaType,visible} = this.state
    let {getFieldDecorator} = this.props.form
    
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        // dataIndex: 'age',
        key: 'age',
        render:(item)=>{return <Button type="link" onClick={()=>{this.showUpdate(item)}}>修改分类</Button>},
        width:'25%',
        align:'center'
      },
    ];
    return (
      <div>
        <Card 
          extra={<Button type="primary" onClick={this.showAdd} ><Icon type="plus-circle"></Icon>添加</Button>} 
        >
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            bordered={true} 
            rowKey='_id' 
            pagination={{pageSize:PAGE_SIZE,showQuickJumper:true}}
            loading={this.state.isLoading}
          />
          
        </Card>
        <Modal
          title={operaType === 'add'?'新增分类':'修改分类'}
          visible={visible}
          onOk={this.handleOk}
          okText='确定'
          cancelText='取消'
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('categoryName', {
                initialValue:this.state.modalCurrentValue,
                rules: [
                  { required: true, message: '分类名必须输入' },
                ],
              })(
                <Input
                  placeholder="请输入分类名"
                />,
              )}
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Category