import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n';				// 国际化
// 引用语言栏
import lang from '@/common/variable/lang.js';	// 使用语言
import zhCN from 'utils/lang/zh-Cn.js';		// 中文

// 封装cu-custom组件
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);
// 引入uView
import uView from 'uview-ui';
Vue.use(uView);

// 引入页面组件
import notice from './pages/notice/home.vue'			
Vue.component('notice' , notice)								// 通知
import repair from './pages/repair-order/repair/home.vue'			
Vue.component('repair' , repair)								// 报障
import repairOrder from './pages/repair-order/repair-order/home.vue'			
Vue.component('repair-order' , repairOrder)						// 工单
import my from './pages/basic/my/home.vue'			
Vue.component('my' , my)										// 我的

Vue.use(VueI18n);
Vue.config.productionTip = false;

// 引用国际化语言
const i18n = new VueI18n({  
  locale: lang.locale,  
  messages: {
	  'zh-CN': zhCN  
  }  
})  

Vue.prototype._i18n = i18n 
App.mpType = 'app'

const app = new Vue({
    ...App,
	i18n
	
})
app.$mount()
