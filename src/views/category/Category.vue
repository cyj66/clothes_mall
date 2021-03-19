<template>

<!-- 1.必须得有一个wrapper包着；2、wrapper里面只有一个content -->
<div class="wrapper">
    <ul class="content">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
        <li>26</li>
        <li>27</li>
        <li>28</li>
        <li>29</li>
        <li>30</li>
        <li>31</li>
        <li>32</li>
        <li>33</li>
        <li>34</li>
        <li>35</li>
        <li>36</li>
        <li>37</li>
        <li>38</li>
        <li>39</li>
        <li>40</li>
        <li>41</li>
        <li>42</li>
        <li>43</li>
        <li>44</li>
        <li>45</li>
        <li>46</li>
        <li>47</li>
        <li>48</li>
        <li>49</li>
        <li>50</li>
    </ul>
    <!-- 三 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>    

</div>
    
</template>

<script>
//利用混入，三行代码得到backTop
import {backTopMixin} from 'common/mixin'   //一

// 安装better-scroll:npm install better-scroll --save
import BScroll from 'better-scroll'
export default {
    mounted(){
        let wrapper=document.getElementsByClassName('wrapper')[0]
        let bs = new BScroll(wrapper,{
            //默认为0不派发scroll事件，为1会非实时（屏幕滑动超过一定时间后）派发scroll事件，
            //为2会在屏幕滑动的过程中实时的派发 scroll 事件，为3不仅在屏幕滑动的过程中且在惯性滚动等其他过程也实时派发 scroll 事件
            probeType:2,
            click:3,      //允许监听点击事件
            pullUpLoad:true     //允许上拉加载
        })
        bs.on('scroll',/*position=>console.log(position)*/)   //参数就是x,y坐标的集合
        bs.on('pullingUp',()=>{
            console.log('上拉加载更多')     //只回调一次
            //发送网络请求，请求更多数据
            //等数据请求完成，并且将新的数据展示出来后
            setTimeout(()=>{
                bs.finishPullUp()     //调用完这个后才能再次触发pullingUp事件
            },2000)
        })
    },
    mixins:[backTopMixin],    //二
}
</script>

<style scoped>
    .wrapper{
        height: 200px;
        background-color: aqua;
        overflow:hidden
    }
</style>