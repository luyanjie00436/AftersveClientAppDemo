<template>
	<view class="bg-white">
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">重置密码</block>
		</cu-custom>
		<view class="main-content-height flex align-center">
			<view class="flex flex-direction  " style="width: 100%;">
				<uni-forms :rules="rules" :value="current" ref="form" validate-trigger="bind" err-show-type="undertext">
					<smsCode ref="smsCode" smsType="ResetPwd" @input="changeSmsCode"></smsCode>
					<repassword @input="changepassword"></repassword>
				</uni-forms>
				<!-- 重置密码 -->
				<button class="margin padding-lg bg-cyan cu-btn round" @click="resetPassword('form')">重置密码</button>
				<!-- 跳转登录 -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="text-cyan title flex justify-end ">
					<navigator url="/pages/login/login-weixin/login-weixin" class="basis-sm text-right padding-lg title text-cyan" >登录</navigator>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="text-cyan title flex justify-end ">
					<navigator url="/pages/login/login" class="basis-sm text-right padding-lg title text-cyan" >登录</navigator>
				</view>
				<!-- #endif -->
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
					pwd: '', // 密码
					mobile: '', // 手机号
					smsCode: '', // 验证码
				},
				rules: {},
				validation: null, // 账号验证
				passwordvalidation: null, // 密码验证
			}
		},
		onReady: function() {
			this.$refs.form.setRules(this.rules);
		},
		onLoad: function(options) {
			_self = this;
		},
		methods: {
			// ========================================= 监听事件 ==================================================
			/** 获取验证码
			 * @param {Object} e
			 */
			changeSmsCode(e) {
				this.current.mobile = e.detail.mobile;
				this.current.smsCode = e.detail.mobile;
				this.validation = e.validation;
			},
			/** 修改密码
			 * @param {Object} e
			 */
			changepassword(e) {
				this.current.pwd = e.detail.password;
				this.passwordvalidation = e.validation;
			},
			// =============================================== 重置密码 =========================================
			/** 验证手机号、验证码成功
			 * @param {Object} result 成功信息
			 */
			smsCode_success(result) {
				this.current.smsCode = result.smsCode;
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
				this.resetPwd_request();
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
			/** 重置密码
			 * @param {Object} form 提交的表单
			 */
			resetPassword(form) {
				this.validation(this.smsCode_success, this.smsCode_erros);
			},
			// ============================================== 请求 =====================================================
			/**
			 * 重置密码请求
			 */
			resetPwd_request() {
				uni.showToast({
					title:'修改密码成功'
				});
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url: '/pages/login/login-weixin/login-weixin'
				});
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url: '/pages/login/login'
				});
				// #endif
			}
		},
		// ========================================================================================================
	}
</script>

<style>

</style>
