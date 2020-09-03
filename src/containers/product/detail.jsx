import React,{Component} from 'react'
import {Button,Card,Icon,List} from 'antd'
import {connect} from 'react-redux'
import { reqProductById } from '../../api/index'
import {BASE_URL} from '../../config/index'
import './css/detail.css'
const {Item} = List

@connect(
  state => ({productList:state.productList})
)
class Detail extends Component {
  state = {
    categoryId:'',
    desc:'',
    detail:'',
    imgs:[],
    name:'',
    price:''
  }
  componentDidMount(){
    const reduxProdList = this.props.productList
    const {id} = this.props.match.params
    if(reduxProdList.length !== 0){
      let result =  reduxProdList.find((item)=>{
        return item._id === id
      })
      if(result){
        const {categoryId,desc,detail,imgs,name,price} = result
        this.setState({categoryId,desc,detail,imgs,name,price})
      }
    }else this.getProdById(id)
  }
  getProdById = async(id) => {
    let result = await reqProductById(id)
    const {status,data} = result
    if(status===0){
      const {categoryId,desc,detail,imgs,name,price} = data
      this.setState({categoryId,desc,detail,imgs,name,price})
    } 
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
      >
        <List 
          className='prod-info'
          // size="small"
          // bordered
          grid={{gutter:0}}
          split
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
            <span>{this.state.categoryId}</span>
          </Item>
          <Item >
            <span className='prod'>商品图片:</span>
            <span>
              {
                this.state.imgs.map((item,index)=>{
                  return <img key={index} src={`${BASE_URL}/upload/`+item} alt='商品图片'/>
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