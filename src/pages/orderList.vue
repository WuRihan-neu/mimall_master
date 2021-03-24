<template>
  <div class="order-list">    
      <order-header title="确认列表">
        <template v-slot:tip>
         <span>
            请谨防钓鱼链接或诈骗电话，了解更多>
         </span>
        </template>
      </order-header>
      <ul class="ul clearfix">
        <loading v-if="initialLoading"></loading>
        <li class="order-item w" v-for="(order, index) in list" :key="index">
          <div class="order-item-header">
            <span>{{order.createTime}}</span>
            <span class="line">|</span>
            <span class="receiveName">{{order.receiverName}}</span>
            <span class="line">|</span>
            <span>订单号：{{order.orderNo}}</span>
            <span class="line">|</span>
            <span>{{order.paymentTypeDesc}}</span>
            <div class="pay fr">
              <span>应付金额:</span>
              <span class="price">{{order.payment}}元</span>
            </div>
          </div>
          <div class="order-item-footer">
            <ul class="goodsList">
              <li v-for="(item, index) in order.orderItemVoList" :key="index">
                <div class="productImg"><img v-lazy="item.productImage" alt=""></div>
                <div class="productInfo fl">
                  <div class="productDetail">{{item.productName}}</div>
                  <div class="productPrice">{{item.currentUnitPrice}} X {{item.quantity}}</div>
                </div>
              </li>
            </ul>
          <div class="payment theme-color" v-if="order.status == 10" @click="goPay(order.orderNo)">{{order.statusDesc}}<em class="icon-down"></em></div>
          <div class="payment theme-color" v-else>{{order.statusDesc}}</div>
          </div> 
        </li>
        <div class="pagination-wrapper" v-if="true">
          <el-pagination
            background
            class="pagination"
            layout="prev, pager, next"
            :pageSize="pageSize"
            :pageNum = "pageNum"
            @current-change="handleChange"
            :total="total">
          </el-pagination>
        </div>
     <!--    <div class="load-more" v-if="false">
          <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
        </div> -->
       <!--  <div class="scroll-more" 
        v-infinite-scroll="scrollMore" 
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="410">
          <img src="/img/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
        </div> -->
        <no-data v-if="!initialLoading && list.length == 0"></no-data>
      </ul>   
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
import NoData from './../components/NoData'
import {Pagination, Button} from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
export default {
    name: 'order-list',
    data(){
      return{
        initialLoading: true,
        list:[], //订单列表
        loading:false, // 加载按钮
        pageSize:10, // 页面数量
        pageNum:1, // 默认显示的页面
        total:0, // 订单总量
        hasNextPage:false, // 是否有下一页
        busy: false, // 滚动加载，是否触发
      }
    },
    directives: {
      infiniteScroll
    },
    mounted() {
      this.getOrderList()
    },
    methods: {
      // 用于渲染订单列表
      getOrderList(){
        this.busy = true
        this.axios.get('/api/orders', {
          // get请求，参数需要有params传参
          params:{
            pageSize: 10,
            pageNum: this.pageNum
          }
        }).then((res)=>{
          // this.showBtn = true 
          this.initialLoading = false
          this.busy = false
          // this.list = this.list.concat(res.list)
          this.list = res.list
          this.total = res.total
          this.hasNextPage = res.hasNextPage
        }).catch(()=>{
          this.initialLoading = false
          this.busy = true
        })
      },
      // 第一种方法：分页器 (element-ui ==> pagination)
      handleChange(pageNum){
        this.pageNum = pageNum
        this.getOrderList()
      },
      // 第二种方法按钮加载(element-ui ==> button)
      loadMore(){
        this.pageNum++
        this.getOrderList()       
      },
      // 第三种方法滚动加载(插件 vue-infinite-scroll)
      scrollMore(){
         this.busy = true
         setTimeout(()=>{
          this.pageNum++
          this.getList()
         },500)
      },
      // 用于渲染订单列表(专门给滚动加载方法使用)
      getList(){
        this.loading = true;
        this.axios.get('/api/orders', {
          // get请求，参数需要有params传参
          params:{
            pageSize: 10,
            pageNum: this.pageNum
          }
        }).then((res)=>{
           this.loading = false
          this.list = this.list.concat(res.list)
          if(res.hasNextPage){
            this.busy = false
          } else{
             this.busy = true //当没有下一页，禁用
          }       
        })
      },
      // 支付
      goPay(orderNo){
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo
          }
        })
      }
    },
    components:{
      OrderHeader,   
      Loading,
      NoData,
      [Pagination.name]:Pagination,
      [Button.name]:Button
    },

}
</script>

<style lang="scss" scoped>
@import './../assets/css/base.scss';
@import './../assets/css/mixin.scss';
.order-list{
  .ul{
    background-color: #f5f5f5;
    width:100%;
    .order-item{
      margin-top: 33px;
      margin-bottom: 31px;
      width: 1226px;
      &:last-child{
        margin-bottom: 110px;
      }
      .order-item-header{
        height: 74px;
        line-height: 70px;
        background-color: #FFFAF7;
        .pay{
          display: inline-block;
          margin-right: 44px;
          .price{
            margin-left: 12px;
            font-size: 26px;
            color:#333333;
          }
        }
        span{
          font-size:16px;
          color: #666;
          &:first-child{
            margin-left: 43px;
          }
        }
        .line{
          color: #E5E5E5;
          margin: 0 9px;
        }
      }
      .order-item-footer{
        width: 1226px;
        min-height: 145px;
        background-color: #fff;
        padding-top: 30px;
        padding-bottom:30px;
        box-sizing: border-box; 
        @include flex(start,center,row);
        .goodsList{
          li{
              @include flex(start,center,row);
              margin-bottom: 20px;
              .productImg{
                margin-left: 43px;
                width: 80px;
                height: 80px;
                img{
                  width: 100%;
                }
              }
              .productInfo{
                margin-left: 45px;
                .productDetail{
                  font-size: 20px;
                  color:#333333;
                  margin-bottom: 15px;
                }
                .productPrice{
                  font-size: 20px;
                  color:#333333;
                }
              }
          }
        }
        .payment{
          margin-right: 44px;
          margin-left: auto;
          cursor: pointer;
          .icon-down{
            margin-left: 9px;
            display: inline-block;
            width:11px;
            height:10px;
            background: url('/img/icon-down.png')no-repeat center;
            transform: rotate(-90deg);
            background-size: contain;
          }
        }
      }
    }
    .pagination{
      text-align: right;
      margin-bottom: 25px;
    }
    .load-more{
      text-align: center;
      margin-bottom: 25px;
      .el-button--primary {
        color: #FFF;
        background-color: #ff6700;
        border: none;
      }
    } 
    .scroll-more{
      text-align: center;
      margin-bottom: 25px;
    }
  }
}
</style>