<script>
	import Vue from 'vue';								// Vue值
	import global from '@/common/variable/global.js';	// 全局变量
	export default {
		onLaunch: function() {
			// 自定义导航栏
		    uni.getSystemInfo({
		        success: function(e) {
		            // #ifndef MP
		            Vue.prototype.StatusBar = e.statusBarHeight;
		            if (e.platform == 'android') {
		                Vue.prototype.CustomBar = e.statusBarHeight + 50;
		            } else {
		                Vue.prototype.CustomBar = e.statusBarHeight + 45;
		            };
		            // #endif
		            // #ifdef MP-WEIXIN
		            Vue.prototype.StatusBar = e.statusBarHeight;
		            let custom = wx.getMenuButtonBoundingClientRect();
		            Vue.prototype.Custom = custom;
		            Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
		            // #endif       
		            // #ifdef MP-ALIPAY
		            Vue.prototype.StatusBar = e.statusBarHeight;
		            Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
		            // #endif
		        }
		    })
			// 初始化一些参数
			this.initParam();
		},
		onShow: function() {
			console.log('App Show')
			this.updateApp();		// 检查版本更新
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			/**
			 * 初始化参数
			 */
			initParam : function(){
				Vue.prototype.website = global.website;		// 初始化website
				Vue.prototype.global = global;				// 更新全局变量
			},
			/**
			 * 检查版本更新
			 */
			updateApp : function(){
				const updateManger = uni.getUpdateManager();
				
				updateManger.onCheckForUpdate(function(res){
					// console.log("是否有最新版本",res.hasUpdate);
				});
				
				// 新版本下载完成
				updateManger.onUpdateReady(function(res){
					uni.showModal({
						title:'更新提示',
						content:'新版本已经准备好，是否重启应用？',
						success(res){
							if(res.confirm){
								updateManger.applyUpdate();
							}
						}
					})
				});
				// 新版本下载失败回调
				updateManger.onUpdateFailed(function(res){
					// 新的版本下载失败
				});
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* colorui */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/* uview-ui */
	@import "uview-ui/index.scss";
	/* 自定义样式 */
	@import './common/main.scss';
</style>
