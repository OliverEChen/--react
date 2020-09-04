import React,{Component} from 'react'
import {Button,Card,Icon,List, message} from 'antd'
import {connect} from 'react-redux'
import { reqProductById,reqCategoryList } from '../../api/index'
import {BASE_URL} from '../../config/index'
import './css/detail.css'
const {Item} = List

@connect(
  state => ({
    productList:state.productList,
    categoryList:state.categoryList
  })
)
class Detail extends Component {
  state = {
    categoryId:'',
    categoryName:'',
    desc:'',
    detail:'',
    imgs:[],
    name:'',
    price:'',
    isLoading:true
  }
  componentDidMount(){
    const reduxProdList = this.props.productList
    const reduxCateList = this.props.categoryList
    const {id} = this.props.match.params
    if(reduxProdList.length){
      let result =  reduxProdList.find((item)=>item._id === id)
      if(result) {
        this.categoryId = result.categoryId
        this.setState({...result})}
    }else this.getProdById(id)

    if(reduxCateList.length){
      let result =  reduxCateList.find((item)=>item._id === this.categoryId)
      this.setState({categoryName:result.name,isLoading:false})
    }else this.getCategoryList()
  }
  getCategoryList = async() => {
    let result = await reqCategoryList()
    const {status,data,msg} = result
    if(status===0) {
      let result =  data.find((item)=>{
        return item._id = this.state.categoryId
      })
      if(result) this.setState({categoryName:result.name,isLoading:false})
    }
    else message.error(msg)
  }
  getProdById = async(id) => {
    let result = await reqProductById(id)
    const {status,data,msg} = result
    if(status===0){
      // const {categoryId,desc,detail,imgs,name,price} = data
      // this.setState({categoryId,desc,detail,imgs,name,price})
      this.categoryId = data.categoryId
      this.setState({...data})//打包解构
    }else message.error(msg)
  }
  render(){
    return (
      <Card 
        title={
          <div className='left-top'>
            <Button type='link' onClick={()=>{this.props.history.goBack()}}>
              <Icon type="arrow-left" style={{fontSize:'20px'}}></Icon>
            </Button>
            <span>商品详情</span>
          </div>
        } 
        loading={this.state.isLoading}
      >
        <List 
          className='prod-info'
          // size="small"
          // bordered
          grid={{column:1}}
        >
          <Item >
            <span className='prod'>商品名称:</span>
            <span>{this.state.name}</span>
          </Item>
          <Item >
            <span className='prod'>商品描述:</span>
            <span>{this.state.desc}</span>
          </Item>
          <Item >
            <span className='prod'>商品价格:</span>
            <span>{`￥${this.state.price}`}</span>
          </Item>
          <Item >
            <span className='prod'>所属分类:</span>
            <span>{this.state.categoryName}</span>
          </Item>
          <Item >
            <span className='prod'>商品图片:</span>
            <span>
              {
                this.state.imgs.map((item,index)=>{
                  return <img 
                          key={index} 
                          src={`${BASE_URL}/upload/`+item} 
                          alt='商品图片'
                          style={{width:'400px',height:'400px'}}
                        />
                })
              }
            </span>
          </Item>
          <Item >
            <span className='prod'>商品详情:</span>
            <span dangerouslySetInnerHTML={{__html:this.state.detail}}></span>
          </Item>
        </List>
      </Card>
    )
  }
}
export default Detail