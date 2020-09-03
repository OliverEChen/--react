import React,{Component} from 'react'
import { Card,Button,Icon,Select,Input,Table, message } from 'antd'
import {connect} from 'react-redux'
import {createSaveProductAction} from '../../redux/actions/product_action'
import {reqProductList, reqUpdateProdStatus,reqsearchProduct} from '../../api/index'
import {PAGE_SIZE} from '../../config/index'
const { Option } = Select

@connect(
  state => ({}),
  {saveProduct:createSaveProductAction}
)
class Product extends Component {
  state = {
    productList:[],//商品列表数据
    total:'',//总页数
    current:'',//当前在那一页
    keyWord:'',//搜索关键词
    searchType:'productName',//搜索类型
    isLoading:true,//是否处于加载中
  }
  componentDidMount(){
    this.getProductList()
  }
  getProductList = async(num=1) => {
    let result
    if(this.isSearch){
      const {searchType,keyWord} = this.state
      result = await reqsearchProduct(num,PAGE_SIZE,searchType,keyWord)
    }else {
      result = await reqProductList(num,PAGE_SIZE)
    }

    const {status,data} = result
    console.log(data);
    if(status===0) {
      this.setState({
        productList:data.list,
        total:data.total,
        current:data.pageNum,
        isLoading:false
      })
      //获取到的商品列表存入redux中
      this.props.saveProduct(data.list)
    }else message.error('获取商品列表失败，请联系管理员')
  }
  updateProdStatus = async({status,_id}) => {
    let productList = [...this.state.productList]
    if(status===1) status = 2
    else status = 1
    let result = await reqUpdateProdStatus(_id,status)
    if(result.status === 0) {
      message.success('更新商品状态成功')
      productList = productList.map((item)=>{
        if(item._id===_id) {
          item.status = status
        }
        return item
      })
      this.setState({productList})
    }
    else message.error('更新商品状态失败')
  }
  search = async() => {
    this.isSearch = true
    this.getProductList()
  }

  render () {
    const dataSource = this.state.productList
    
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        width:'20%',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        align:'center',
        width:'10%',
        key: 'price',
        render:(price)=>{return `￥${price}`}
      },
      {
        title: '状态',
        // dataIndex: 'status',
        align:'center',
        width:'10%',
        key: 'status',
        render:(item)=>{
          const {status} = item
          return (
            <div>
              <Button 
                type={status===1?'danger':'primary'}
                onClick={()=>{this.updateProdStatus(item)}}
              >
                {status===1?'下架':'上架'}
              </Button><br/>
              <span>{status===1?'在售':'停售'}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        // dataIndex: 'operate',
        align:'center',
        width:'10%',
        key: 'operate',
        render:(item)=>{
          return (
            <div>
              <Button type='link' onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}}>详情</Button><br/>
              <Button type='link' onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update/2')}}>修改</Button>
            </div>
          )
        }
      },
    ];
    return (
      <div>
        <Card 
          title={
            <div>
              <Select 
                defaultValue="productName" 
                style={{ width: 120 }} 
                onChange={(value)=>{this.setState({searchType:value})}}
              >
                <Option value="productName">按名称搜索</Option>
                <Option value="productDesc">按描述搜索</Option>
              </Select>
              <Input 
                style={{width:'20%',margin:'0 10px'}}
                placeholder='关键字'
                allowClear
                onChange={(event)=>{this.setState({keyWord:event.target.value})}}
              >
              </Input>
              <Button 
                type='primary'
                onClick={this.search}
              >
                <Icon type='search'></Icon>
                搜索
              </Button>
            </div>
          }
          extra={
            <Button 
              type="primary"
              onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update')}}
            >
              <Icon type="plus-circle"></Icon>
              添加商品
            </Button>
          }>
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          bordered
          rowKey='_id'
          pagination={{
            total:this.state.total,
            pageSize:PAGE_SIZE,
            current:this.state.current,
            onChange:this.getProductList
          }}
          loading={this.state.isLoading}
        />
      </Card>
      </div>
    )
  }
}
export default Product