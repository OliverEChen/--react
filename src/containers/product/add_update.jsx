import React, { Component } from 'react'
import {Card,Button,Icon,Form,Input,Select,message} from 'antd'
import {connect} from 'react-redux'
import {reqCategoryList,reqAddProduct,reqProductById,reqUpdateProduct} from '../../api/index'
import PictureWall from './picture_wall'
import RichTextEditor from './rich_text_editor'
const {Item} = Form
const {Option} = Select

@connect(
  state => ({
    categoryList:state.categoryList,
    productList:state.productList
  }),
  {}
)
@Form.create()
class AddUpdate extends Component {
  state = {
    categoryList:[],
    operaType:'add',
    categoryId:'',
    name:'',
    desc:'',
    price:'',
    detail:'',
    imgs:[],
    _id:''
  }
  componentDidMount(){
    const {categoryList,productList} = this.props
    const {id} = this.props.match.params
    if(categoryList.length){
      this.setState({categoryList})
    }else {
      this.getCategorylist()
    }
    if(id) {
      this.setState({operaType:'update'})
      if(productList.length){
        let result = productList.find((item)=>{
          return item._id === id
        })
        if(result) {
          this.setState({...result})
          this.refs.pictureWall.setFileList(result.imgs)
          this.refs.richTextEditor.setRichText(result.detail)
        }
      }else this.getProductList(id)
    }
  }
  getProductList = async(id) => {
    let result = await reqProductById(id)
    const {status,data,msg} = result
    if(status===0) {
      this.setState({...data})
      this.refs.pictureWall.setFileList(data.imgs)
      this.refs.richTextEditor.setRichText(data.detail)
    }else message.error(msg)
  }
  getCategorylist = async() => {
    let result = await reqCategoryList()
    const {status,data,msg} = result
    if(status===0){
      this.setState({categoryList:data})
    }else {
      message.error(msg)
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let imgs = this.refs.pictureWall.getImgArr()
    let detail = this.refs.richTextEditor.getRichText()
    const {operaType,_id} = this.state
    this.props.form.validateFields(async(err,values)=>{
      if (err) return
      else {
        this.getCategorylist(values)
        let result
        if(operaType==='add'){
          result = await reqAddProduct({...values,imgs,detail})
        }else result = await reqUpdateProduct({...values,imgs,detail,_id})
        const {status,msg} = result
        if(status===0) {
          if(operaType==='add') message.success('添加商品成功')
          else message.success('修改商品成功')
          this.props.history.replace('/admin/prod_about/product')
        }
        else message.error(msg)

      }
    })
  }
  render() {
    const {getFieldDecorator} = this.props.form
    const {operaType} = this.state
    return (
        <Card 
          title={
            <div>
              <Button type="link" onClick={this.props.history.goBack}>
                <Icon type="arrow-left"/>
                <span>返回</span>
              </Button>
            <span>{(operaType==='add'?'添加商品':'修改商品')}</span>
            </div>
          }
        >
          <Form 
            onSubmit={this.handleSubmit}
            labelCol={{md:2}}
            wrapperCol={{md:8}}
          >
            <Item label="商品名称">
                 { 
                  getFieldDecorator('name',{
                    initialValue:this.state.name || '',
                    rules:[
                      {
                        required:true,message:'请选择输入商品名称'
                      }
                    ]
                  })
                  (
                  <Input
                    placeholder="商品名称"
                  />
                  )
                }
            </Item>
            <Item label="商品描述">
            { 
              getFieldDecorator('desc',{
                initialValue:this.state.desc || '',
                rules:[
                  {
                    required:true,message:'请选择输入商品描述'
                  }
                ]
              })
              (
              <Input
                placeholder="商品描述"
              />
              )
            }
              
            </Item>
            <Item label="商品价格">
            {
              getFieldDecorator('price',{
                initialValue:this.state.price || '',
                rules:[
                  {
                    required:true,message:'请选择输入商品价格'
                  }
                ]
              })
              (<Input
                placeholder="商品价格"
                addonAfter="元"
                prefix="￥"
                type="number"
              />)
            }
             
            </Item>
            <Item label="商品分类">
                {
                  getFieldDecorator('categoryId',{
                    initialValue:this.state.categoryId || '',
                    rules:[
                      {
                        required:true,message:'请选择一个分类'
                      }
                    ]
                  })
                  (
                  <Select>
                    <Option value="">请选择分类</Option>
                    {
                      this.state.categoryList.map((item)=>{
                      return <Option key={item._id} value={item._id}>{item.name}</Option>
                      })
                    }
                  </Select>
                  )
                }
              
            </Item>
            <Item  label="商品图片" wrapperCol={{md:12}}>
              <PictureWall ref='pictureWall'/>
            </Item>
            <Item label="商品详情" wrapperCol={{md:16}}>
              <RichTextEditor ref='richTextEditor'/>
            </Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form>
        </Card>
    )
  }
}
export default AddUpdate

