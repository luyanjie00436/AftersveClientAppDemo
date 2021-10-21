<template name="is-login">
	<view>
	</view>
</template>

<script>
	/**
	 * 判断是否登录组件
	 * @author 陆彦捷
	 * @description  根据内存判断用户是否登录。
	 * 	未登录：跳转/保留当前登录页面
	 * 	登录、有当前组织：跳转主页
	 *  登录、无当前组织、有组织列表：跳转到选择组织页
	 *  登录、无当前组织、无组织列表：跳转到创建/选择组织页 
	 */
	var _self;
	export default {
		name:"is-login",
		props:{
			/** 当前所在页面
			 * @description 默认值 login
			 *  login: 登录页
			 *  index : 主页
			 *  organ： 创建/选择组织页
			 *  organ_switch : 选择组织页
			 */
			currentPage:{
				type: String,
				default:'login'
			},
		},
		data() {
			return {
				isLogin: false,			// 当前是否登录
				currentMchId : 0 ,		// 当前组织id
				currentMchLength : 0 	// 当前组织数量
			};
		},
		// 实列创建完成后事件
		created:function(){
			// 是否登录
			this.isLogin = this.global.login.isLogin();
			// 未登录 - 登录页
			if(!this.isLogin){
				if(this.currentPage != 'login'){
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url:'/pages/login/login-weixin/login-weixin'
					});
					// #endif
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url:'/pages/login/login'
					});
					// #endif
				}
				return;
			}
			// 强制当前页面（登录的时候跳过组织步骤）(如果处于登录状态，跳转到主页)
			if(this.global.login.getSkip()){
				if(this.currentPage == 'login'){
					uni.redirectTo({
						url:'/pages/index/index'
					});
				}
				return;
			}  	
			// 当前组织
			this.currentMchId = this.global.organ.getBranchId();
			this.currentMchLength = this.global.login.getMchLength;
			if(!Boolean(this.currentMchId)){
				if(this.currentMchLength > 0){
					// 有组织列表： 选择组织
					if(this.currentPage != 'organ_switch'){
						uni.redirectTo({
							url:'/pages_basic/orgation/orgation_switch'
						});
					}
					return;
				}
				// 无组织列表: 加入或创建组织
				if(this.currentPage != 'organ'){
					uni.redirectTo({
						url:'/pages_basic/orgation/orgation_createOrJoin'
					});
				}
				return;
			}
			// 有当前组织 : 主页 (当期页面为index 、organ_switch、 organ的不跳转)
			if(this.currentPage != 'index' && this.currentPage != 'organ_switch' && this.currentPage != 'organ' ){
				// 如果存在上一个页面，返回。否则，跳转到主页
				let pages = getCurrentPages();
				if(pages.length > 1){
					uni.navigateBack();
				}else{
					uni.redirectTo({
						url:'/pages/index/index'
					});
				}
			}
		},
	}
</script>

<style>

</style>
