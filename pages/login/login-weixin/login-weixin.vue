<template>
	<view class="bg-white">
		<!-- #ifdef MP-WEIXIN -->
		<is-login currentPage="login"></is-login>
		<!-- #endif -->
		<!-- 导航栏 -->
		<cu-custom  bgColor="bg-white">
			<block slot="content"></block>
		</cu-custom>
		<!-- #ifdef MP-WEIXIN -->
		<view class="main-content-height flex align-start">
			<view class="flex flex-direction  " style="width: 100%;">
				<view style="display: flex; justify-content: center;">
					<image :src="logurl" class="margin-xl" style="width:50vw;height: 50vw;"></image>
				</view>
				<button class="margin padding-lg  cu-btn round" @click="weiXinLogin">
					<text class="cuIcon-weixin text-olive margin-right-xl" style="transform: scale(1.5);"></text>
					微信用户一键登录
				</button>
				<navigator url="/pages/login/login">
					<view class="text-center text-cyan">更多登录方式</view>
				</navigator>
			</view>
		</view>
		<bind-phone-box @show="showModal"></bind-phone-box>
		<!-- #endif -->
	</view>
</template>

<script>
	/**
	 * 微信登录
	 */
	var _self;
	export default {
		data() {
			return {
				logurl : this.global.statics.logo,		// 文件固定路径
				current: {
					loginType: "2", // 登录模式（0：账号登录，1：验证码登录，2：微信登录）
					wxCode: "", // 登录返回的code
					mobile: "" // 手机号
				},
				bindboxShowFunction: null, 				// bind显示Modal方法
			}
		},
		computed:{
			i18n : function(){
				return this.$t('basic');
			}
		},
		onLoad: function() {
			_self = this;
			// #ifndef MP-WEIXIN
			uni.redirectTo({
				url: '/pages/login/login'
			})
			// #endif
		},
		methods: {
			// ===============================  展示绑定 =============================================
			/**
			 * @param {Object} func 
			 */
			showModal: function(func) {
				this.bindboxShowFunction = func;
			},
			// ================================== 监听事件 ============================================
			/**
			 * 微信登录
			 */
			weiXinLogin: function() {
				_self.bindboxShowFunction();
			},
		}
	}
</script>

<style>

</style>
