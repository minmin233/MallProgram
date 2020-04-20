<template>
  <div id="home"  class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']" @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed">
    </tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad">
      </home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']" @tabClick="tabClick"
                   ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from '../../common/utils'



export default {
  name:'Home',
  components:{
    NavBar,
    Scroll,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop

  },
  // 存储请求过来的数据
  data(){
    return{
      //result:null,
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  // 首页创建完就网络请求
  created(){
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    this.saveY=this.$refs.scroll.getScrollY();
  },
  destroyed() {
    console.log('-------');
  },
  mounted() {
    // 防止调用很多次
    const refresh=debounce(this.$refs.scroll.refresh,200 )
    // 1.监听item中图片加载完成
    this.$bus.$on('itemImageLoad',()=>{
      // this.$refs.scroll.refresh()
      refresh()
    })
  },
  methods: {
    /**
     * 事件监听
     */
    tabClick(index){
      //console.log(index);
      switch (index) {
        case 0:
          this.currentType='pop'
          break;
        case 1:
          this.currentType='new'
          break;
        case 2:
          this.currentType='sell'
          break;
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    backTopClick(){
      // console.log('click');
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      // console.log(position);
      //1.判断回到顶部是否显示
      this.isShowBackTop = (-position.y) > 1000

      //2.判断tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      //只能上拉加载一次
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      // 2.获取tabControl的offSetTop
      // 所有的组件都有一个属性$el 获取组件中的元素
      // offsetTop图片没有加载完成的值
      // 只需要调用一次
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求
     */
    // 函数调用->压入函数栈(保存函数调用过程中所有变量 临时的)
    // 函数调用结束 弹出函数栈（释放函数所有变量）
    // 垃圾回收
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      //console.log(res);
      //this.result=res;
      this.banners=res.data.data.banner.list;
      this.recommends=res.data.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page=this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
      this.goods[type].list.push(...res.data.data.list)
      this.goods[type].page += 1
      //可以多次上拉加载
      this.$refs.scroll.finishPullUp()
    })
    },


  }
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航栏不跟随一起滚动 */
  /* 此时用的是better-scroll的局部滚动 */
/*   position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control{
  position: relative;
  z-index: 9;
}

/* .content{
  height: calc(100% - 49px);
  overflow: hidden;
}*/

.content{
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom: 49px;
  left:0;
  right:0;
}

/* overflow: hidden让sticky失效 */
/* .tab-control{
  position:sticky ;
  top:44px;
  z-index: 9;
} */
/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 9;
} */
</style>
