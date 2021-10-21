<template>
	<view class="bg-white">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_login.passwordTitle }}</block>
		</cu-custom>
		<!-- 导航栏 -->
		<view class="main-content-height flex align-center">
			<view class="flex flex-direction  " style="width: 100%;">
				<uni-forms :rules="rules" :value="current" ref="form" validate-trigger="bind" err-show-type="undertext">
					<password-input @input="changepassword" :placeholder="i18n_login.oldPasswordPlaceholder"></password-input>
					<repassword @input="changerePassword" :password_placeholder="i18n_login.newPasswordPlaceholder"
						:repassword_placeholder="i18n_login.reNewPasswordPlaceholder"></repassword>
				</uni-forms>
				<!-- 重置密码 -->
				<button class="margin padding-lg bg-cyan cu-btn round" @click="resetPassword('form')">{{ i18n.button_save }}</button>
				<!-- 跳转登录 -->
				<view class="text-cyan title flex justify-end ">
					<navigator url="/pages/login/password/password_forget?logined=true"
						class="basis-sm text-right padding-lg title text-cyan">{{ i18n_login.forgetPassword  }}</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 修改密码
	 * @author 陆彦捷
	 * @description  根据旧密码和新密码，进行密码修改
	 */
	var _self;
	export default {
		data() {
			return {
				// 其他参数
				preview: this.global.publicF.hasBack(), // 是否包含上一页(用于返回上一页)
				// 当前账户
				current: {
					oldPwd: '', // 原始密码
					newPwd: '', // 新密码
				},
				rules: {},
				passwordvalidation: null, // 原始密码颜值
				newpasswordvalidation: null, // 新密码颜值
			}
		},
		computed: {
			// 国际化
			i18n: function() {
				return this.$t('basic');
			},
			i18n_login: function(){
				return this.$t('login');
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
			/** 修改原始密码
			 * @param {Object} e
			 */
			changepassword(e) {
				this.current.oldPwd = e.detail.password;
				this.passwordvalidation = e.validation;
			},
			/** 重新输入密码
			 * @param {Object} 
			 */
			changerePassword(e) {
				this.current.newPwd = e.detail.password;
				this.newpasswordvalidation = e.validation;
			},
			// =============================================== 重置密码 =========================================
			/** 验证原始密码成功
			 * @param {Object} result 成功信息
			 */
			password_success(result) {
				this.newpasswordvalidation(this.newPassword_success, this.message_erros);
			},
			/** 验证新密码成功
			 * @param {Object} result
			 */
			newPassword_success(result) {
				this.updatePwd_request();
			},
			/** 验证失败提示信息
			 * @param {Object} erros 失败信息
			 */
			message_erros(erros) {
				// 验证手机号、验证码验证失败
				if (erros.length > 0) {
					uni.showToast({
						title: erros[0].errorMessage,
						icon: 'none'
					});
					return;
				}
			},
			/** 重置密码
			 * @param {Object} form 提交的表单
			 */
			resetPassword(form) {
				this.passwordvalidation(this.password_success, this.message_erros);
			},
			// ============================================== 请求 =====================================================
			/**
			 * 修改密码请求
			 */
			updatePwd_request() {
				this.global.loginR.updatePwd({
					data: _self.current,
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success: function(data , message) {
						uni.hideLoading();
						if (Boolean(data)) {
							uni.showToast({
								title: _self.i18n_login.msg_success,
							});
						} else {
							uni.showToast({
								title: message,
								icon: 'none'
							});
						}
					},
					fail : function(){
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon: 'none'
						});
					}
				});
			}
			// ===================================================================================================================
		}
	}
</script>

<style>

</style>
