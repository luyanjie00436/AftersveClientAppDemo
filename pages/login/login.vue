<template>
	<view class="bg-white">
		<!-- 判断是否登录 -->
		<is-login currentPage="login"></is-login>
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-white" :isBack="preview">
			<block slot="content"></block>
		</cu-custom>
		<!-- 登录内容 -->
		<view class="content">
			<view style="display: flex; justify-content: center;">
				<image :src="logourl" class="margin-xl" style="width:50vw;height: 50vw;"></image>
			</view>
			<!-- 登录内容 -->
			<view v-if="TabCur == 1" class="flex flex-direction">
				<!-- 账号密码登录 -->
				<mobile-input @input="changeMobile"></mobile-input>
				<password-input @input="changePassword"></password-input>
			</view>
			<teleport v-else-if ="TabCur == 0">
				<!-- 手机/验证码登录 -->
				<smsCode ref="smsCode" smsType="Login" @input="changeSmsCode"></smsCode>
			</teleport>
			<!-- 登录内容 -->
			
			<button class="margin padding-lg bg-cyan cu-btn round" @click="login('form')">登录</button>
			<!-- 微信登录 -->
			<!-- #ifdef MP-WEIXIN -->
			<button class="margin padding-lg  cu-btn round" @click="weiXinLogin">
				<text class="cuIcon-weixin text-olive margin-right-xl" style="transform: scale(1.5);"></text>
				微信登录
			</button>
			<!-- #endif -->
			<view class="text-cyan title flex justify-end">
				<navigator url="/pages/login/password/password_forget?"
					class="text-cyan text-center padding title" style="width: 33.3%;">忘记密码</navigator>
				<navigator url="/pages/login/register/register?"
					class="text-cyan text-center padding title" style="width: 33.3%;">注册账号</navigator>
				<view class="text-cyan text-center padding title" style="width: 33.3%;" @click="tabSelect">
					{{ TabCur == 0 ? '账号登录':'验证码登录'}}
				</view>
			</view>
		</view>
		<!-- 绑定手机号弹出框 -->
		<bind-phone-box @show="showModal"></bind-phone-box>
		<!-- 绑定弹出框 -->
	</view>
</template>

<script>
	/**
	 *  登录页面
	 *  @author
	 * @description 登录方式：验证码登录、账号密码登录、微信登录
	 */
	var _self;
	export default {
		data() {
			return {
				// 延时参数
				preview: this.global.publicF.hasBack(), // 是否包含上一页(用于返回上一页)
				logourl : this.global.statics.logo,
				TabCur: 1, // 当前登录方式（0：验证码登录，1：账号密码登录）
				// 手机验证请求值
				currentSms: {
					loginType: "1", // 登录模式（0：账号登录，1：验证码登录，2：微信登录）
					mobile: '', // 手机号
					smsCode: '' // 验证码
				},
				// 账号密码请求值
				currentUser: {
					loginType: "0", // 登录模式（0：账号登录，1：验证码登录，2：微信登录）
					loginName: '', // 账号
					password: '' // 密码
				},
				// 微信登录的请求值
				currentWeixin: {
					loginType: "2", // 登录模式（0：账号登录，1：验证码登录，2：微信登录）
					wxCode: "", // 登录返回的code
					mobile: "" // 手机号
				},
				bindboxShowFunction: null, // bind显示Modal方法
				// 密码
				smsCodevalidation: null, // 验证码验证登录方法
				mobilevalidation: null, // 账号登录：账号（手机号）验证
				passwordvalidation: null // 账号登录：密码验证
			}
		},
		computed:{
			i18n : function(){
				return this.$t('basic');
			},
			i18n_login: function(){
				return this.$t('login');
			}
		},
		onLoad: function() {
			_self = this;
			this.getAuthorize(); // 获取授权权限
		},
		methods: {
			// ================================= 初始化 =============================================================================
			/**
			 * 获取授权
			 */
			getAuthorize() {
				uni.authorize({
					scope: 'scope.userInfo'
				}); // 请求用户基本信息授权
			},
			// ================================== 监听事件 ===========================================================================
			/** 登录方式切换
			 * @param {Object} e
			 */
			tabSelect: function(e) {
				// 清除值
				this.clear();
				// 跳转对应登录方式
				uni.showLoading();
				this.TabCur = (this.TabCur == 0 ? 1 : 0);
				setTimeout(function() {
					uni.hideLoading();
				}, 300);
			},
			/** 修改验证码
			 * @param {Object} e
			 */
			changeSmsCode: function(e) {
				this.currentSms.mobile = e.detail.mobile;
				this.currentSms.smsCode = e.detail.smsCode;
				this.smsCodevalidation = e.validation;
			},
			/** 账号登录 - 修改手机号
			 * @param {Object} e
			 */
			changeMobile: function(e) {
				this.currentUser.loginName = e.detail.mobile;
				this.mobilevalidation = e.validation;
			},
			/** 账号登录 - 修改密码
			 * @param {Object} e
			 */
			changePassword: function(e) {
				this.currentUser.password = e.detail.password;
				this.passwordvalidation = e.validation;
			},
			/** 弹出绑定手机号方法
			 * @param {Object} func 
			 */
			showModal: function(func) {
				this.bindboxShowFunction = func;
			},
			// ================================== 方法 ====================================================================================
			/**
			 * 清除当前页面显示的值
			 */
			clear() {},
			// ===================== 登录 =========================== 
			/** 登录方法
			 */
			login: function() {
				if (this.TabCur == 0) {
					// 验证码登录
					this.loginSmsCode();
				} else {
					// 账号密码登录
					this.loginUser();
				}
			},
			// ============== 验证码登录 ==========
			/** 账号、验证成功执行方法
			 * @param {Object} result 返回值
			 * 	
			 */
			loginSmsCode_success: function(result) {
				this.currentSms.smsCode = result.smsCode;
				try {
					uni.redirectTo({
						url:'/pages/index/index'
					})
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					});
				}
			},
			/** 账号、验证码验证失败执行方法
			 * @param {Object} erros
			 */
			message_erros: function(erros) {
				// 验证手机号、验证码验证失败
				if (erros.length > 0) {
					uni.showToast({
						title: erros[0].errorMessage,
						icon: 'none'
					});
					return;
				}
			},
			/**
			 *  验证码登录
			 */
			loginSmsCode: function() {
				this.smsCodevalidation(this.loginSmsCode_success, this.message_erros);
			},
			// =================================== 账号登录 =================================================
			/** 账号验证成功执行方法
			 * @param {Object} result 消息
			 */
			loginloginName_success: function(result) {
				this.passwordvalidation(this.loginpassword_success, this.message_erros);
			},
			/** 密码验证成功执行方法
			 * @param {Object} result
			 */
			loginpassword_success: function(result) {
				try {
					uni.redirectTo({
						url:'/pages/index/index'
					})
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					});
				}
			},
			/**
			 *  账号登录
			 */
			loginUser: function() {
				this.mobilevalidation(this.loginloginName_success, this.message_erros);
			},
			// ================= 微信登录 =========================
			/**
			 * 微信登录
			 */
			// #ifdef MP-WEIXIN
			weiXinLogin: function() {
				uni.redirectTo({
					url:'/pages/index/index'
				})
			},
			// #endif
			// ========================================================================================================================
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		-webkit-flex-direction : column;
		flex-direction: column;
		height: calc(100vh - 100upx)
	}
</style>
