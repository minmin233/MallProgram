<template>
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <li>fenlei1</li>
      <li>fenlei2</li>
      <li>fenlei3</li>
      <li>fenlei4</li>
      <li>fenlei5</li>
      <li>fenlei6</li>
      <li>fenlei7</li>
      <li>fenlei8</li>
      <li>fenlei9</li>
      <li>fenlei10</li>
      <li>fenlei11</li>
      <li>fenlei12</li>
      <li>fenlei13</li>
      <li>fenlei14</li>
      <li>fenlei15</li>
      <li>fenlei16</li>
      <li>fenlei17</li>
      <li>fenlei18</li>
      <li>fenlei19</li>
      <li>fenlei20</li>
      <li>fenlei21</li>
      <li>fenlei22</li>
      <li>fenlei23</li>
      <li>fenlei24</li>
      <li>fenlei25</li>
      <li>fenlei26</li>
      <li>fenlei27</li>
      <li>fenlei28</li>
      <li>fenlei29</li>
      <li>fenlei30</li>
      <li>fenlei31</li>
      <li>fenlei32</li>
      <li>fenlei33</li>
      <li>fenlei34</li>
      <li>fenlei35</li>
      <li>fenlei36</li>
      <li>fenlei37</li>
      <li>fenlei38</li>
      <li>fenlei39</li>
      <li>fenlei40</li>
      <li>fenlei41</li>
      <li>fenlei42</li>
      <li>fenlei43</li>
      <li>fenlei44</li>
      <li>fenlei45</li>
      <li>fenlei46</li>
      <li>fenlei47</li>
      <li>fenlei48</li>
      <li>fenlei49</li>
      <li>fenlei50</li>
      <li>fenlei51</li>
      <li>fenlei52</li>
      <li>fenlei53</li>
      <li>fenlei54</li>
      <li>fenlei55</li>
      <li>fenlei56</li>
      <li>fenlei57</li>
      <li>fenlei58</li>
      <li>fenlei59</li>
      <li>fenlei60</li>
      <li>fenlei61</li>
      <li>fenlei62</li>
      <li>fenlei63</li>
      <li>fenlei64</li>
      <li>fenlei65</li>
      <li>fenlei66</li>
      <li>fenlei67</li>
      <li>fenlei68</li>
      <li>fenlei69</li>
      <li>fenlei70</li>
      <li>fenlei71</li>
      <li>fenlei72</li>
      <li>fenlei73</li>
      <li>fenlei74</li>
      <li>fenlei75</li>
      <li>fenlei76</li>
      <li>fenlei77</li>
      <li>fenlei78</li>
      <li>fenlei79</li>
      <li>fenlei80</li>
      <li>fenlei81</li>
      <li>fenlei82</li>
      <li>fenlei83</li>
      <li>fenlei84</li>
      <li>fenlei85</li>
      <li>fenlei86</li>
      <li>fenlei87</li>
      <li>fenlei88</li>
      <li>fenlei89</li>
      <li>fenlei90</li>
      <li>fenlei91</li>
      <li>fenlei92</li>
      <li>fenlei93</li>
      <li>fenlei94</li>
      <li>fenlei95</li>
      <li>fenlei96</li>
      <li>fenlei97</li>
      <li>fenlei98</li>
      <li>fenlei99</li>
      <li>fenlei100</li>
    </ul>
  </div>

</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Category',
  data(){
    return{
      scroll:null
    }
  },
  // 组件创建完后模板没有挂载
  created() {

  },
  mounted() {
    // this.scroll=new BScroll(document.querySelector('.wrapper'))
    this.scroll=new BScroll((this.$refs.aaa),{
      probeType:3,
      pullUpload:true
    })
    this.scroll.on('scroll',(position)=>{
      console.log(position);
    })
    this.scroll.on('pullingUp',()=>{
      console.log('上拉加载更多');
    })
  },
}
</script>

<style>
.wrapper{
  height: 150px;
  background-color: #f00;
  overflow: hidden;
  /* overflow-y: scroll; */
}
</style>
