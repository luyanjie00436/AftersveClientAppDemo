<template>
	<view class="bg-white">
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">注册</block>
		</cu-custom>

		<view class="main-content-height flex align-center">
			<view class="flex flex-direction  " style="width: 100%;">
				<uni-forms :rules="rules" :value="current" ref="form" validate-trigger="bind" err-show-type="undertext">
					<smsCode ref="smsCode" smsType="Register" @input="changeSmsCode"></smsCode>
					<repassword @input="changepassword"></repassword>
				</uni-forms>
				<!-- 注册 -->
				<button class="margin padding-lg bg-cyan cu-btn round" @click="register('form')">注册</button>
				<!-- 跳转登录 -->
				<view class="text-cyan title flex justify-end ">
					<view class="basis-sm text-right padding-lg title text-cyan" @click="toLogin">登录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				// 其他参数
				preview: this.global.publicF.hasBack(), // 是否包含上一页(用于返回上一页)
				// 当前账户
				current: {
					mobile: '', // 手机号
					smsCode: '', // 验证码
					password: '', // 密码
				},
				rules:{},
				validation: null, // 账号验证
				passwordvalidation: null, // 密码验证
			}
		},
		onReady: function() {
			this.$refs.form.setRules(this.rules);
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
		},
		methods: {
			// ========================================= 初始化 ======================================================
			/**
			 * 获取页面参数
			 * @param {Object} options
			 */
			getParams(options) {
			},
			// ========================================= 监听事件 ==================================================
			/** 获取手机号及验证码
			 * @param {Object} e 
			 *  detail.mobile 手机号
			 *  detail.smsCode 验证码
			 *  validation 提交验证方法（手机、验证码）
			 */
			changeSmsCode(e) {
				this.current.mobile = e.detail.mobile;
				this.current.smsCode = e.detail.smsCode;
				this.validation = e.validation;
			},
			// 修改密码和密码方法
			/** 修改和验证密码
			 * @param {Object} e
			 *  detail.password 修改密码
			 *  validation 提交验证方法（密码）
			 */
			changepassword(e) {
				this.current.password = e.detail.password;
				this.passwordvalidation = e.validation;
			},
			/** 跳转到登录页面
			 * @param {Object} e
			 */
			toLogin(e) {
				// #ifdef MP-WEIXIN
				uni.redirectTo({
					url: '/pages/login/login-weixin/login-weixin'
				});
				// #endif
				// #ifndef MP-WEIXIN
				uni.redirectTo({
					url: '/pages/login/login'
				});
				// #endif
			},
			// ============================================= 验证和注册 =============================
			/** 验证手机号、验证码成功
			 * @param {Object} result 成功信息
			 */
			smsCode_success(result) {
				this.passwordvalidation(this.password_success, this.password_erros);
			},
			/** 验证手机号、验证码失败方法
			 * @param {Object} erros 失败信息
			 */
			smsCode_erros(erros) {
				// 验证手机号、验证码验证失败
				if (erros.length > 0) {
					uni.showToast({
						title: erros[0].errorMessage,
						icon: 'none'
					});
					return;
				}
			},
			/** 验证密码成功
			 * @param {Object} result
			 */
			password_success(result) {
				this.register_request();
			},
			/** 验证密码失败
			 * @param {Object} erros
			 */
			password_erros(erros) {
				if (errors.length > 0) {
					uni.showToast({
						title: errors[0].errorMessage,
						icon: 'none'
					});
				}
			},
			/** 注册
			 * @param {Object} form 提交的表单
			 */
			register(form) {
				this.validation(this.smsCode_success, this.smsCode_erros);
			},
			// ============================================== 请求 ====================================
			/**
			 * 注册请求
			 */
			register_request() {
				// 跳转到注册添加页面
				uni.redirectTo({
					url:'/pages_basic/orgation/orgation_createOrJoin'
				});
			}
		},
	}
</script>

<style>

</style>
