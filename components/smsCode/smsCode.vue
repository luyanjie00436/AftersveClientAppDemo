<template>
	<view>
		<uni-forms :rules="rules" :value="output.detail" ref="smsCode" validate-trigger="bind"
			err-show-type="undertext">
			<!-- 使用原生input，需要绑定binddata -->
			<uni-forms-item v-if="showMoblie" name="mobile" required>
				<view class="cu-form-group solid-bottom">
					<text class="cuIcon-phone margin-right-sm"></text>
					<input v-model="output.detail.mobile" :placeholder="i18n_login.mobilePlaceholder" type="number" name="mobile"
						@input="changeMobile"></input>
				</view>
			</uni-forms-item>
			<uni-forms-item name="smsCode" required>
				<view class="cu-form-group solid-bottom">
					<text class="cuIcon-album margin-right-sm"></text>
					<input v-model="output.detail.smsCode" type="number" :placeholder="i18n_login.smsCodePlaceholder" :maxlength="smsCodeMaxLength"
						@input="changeSmsCode($event);"></input>
					<button class='cu-btn shadow light' :class="smsCode_disable?'bg-grey':'bg-cyan'" @click="getSmsCode"
						:disabled="smsCode_disable">{{smsCode_disable?smsMessage:i18n_login.smsCode }}</button>
				</view>
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
	/**
	 * 验证码登录控件
	 */
	var _self;
	export default {
		name: "smsCode",
		props: {
			// 验证码长度
			smsCodeMaxLength: {
				type: Number,
				default: 6
			},
			// 获取的验证码类型： 默认Login(登录)
			smsType: {
				type: String,
				default: 'Login'
			},
			// 显示手机号码控件
			showMoblie: {
				type: Boolean,
				default: true
			},
			// 倒计时事件(单位s,默认60s)
			maxSecond: {
				type: Number,
				default: 60,
			}
		},
		data() {
			return {
				// =================================================== 
				smsCode_disable: false, // 验证码按钮是否可用
				smsMessage: '验证码', // 验证码消息显示内容
				second: 0, // 显示倒计时
				output: {
					detail: {
						mobile: '', // 电话号码
						smsCode: '', // 验证码
					},
					validation: null,
				},

				// 规则
				rules: {
					mobile: {
						rules: this.global.rules.mobile,
					},
					smsCode: {
						rules: [{
								required: true,
								errorMessage: '请输入验证码'
							},
							{
								format: 'number',
								errorMessage: '验证码为纯数字类型'
							},
							{
								pattern: "^\\d{" + this.smsCodeMaxLength + "}$", // 验证码为6位数
								errorMessage: '校验码必须为' + this.smsCodeMaxLength + '位数'
							}
						]
					}
				},
			};
		},
		computed:{
			// 国际化
			i18n_login:function(){
				return this.$t('login');
			}
		},
		created: function() {
			_self = this;
			// 初始化input值
			this.output.validation = this.validation;
			this.$emit('input', this.output);
		},
		// 
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.smsCode.setRules(this.rules);
		},
		// 方法
		methods: {
			// ================================== 监听事件 ============================================
			/** 修改手机号码
			 * @param {Object} e
			 */
			changeMobile(e) {
				this.$emit('input', this.output);
			},
			/** 修改验证码
			 * @param {Object} e
			 */
			changeSmsCode(e) {
				this.$emit('input', this.output);
			},
			
			// =================================== 公共方法 ================================================
			/**
			 * 倒计时
			 */
			countDown: function() {
				// 倒计时开始
				if (!_self.smsCode_disable && _self.second == 0) {
					_self.smsCode_disable = true;
					_self.second = _self.maxSecond;
				}
				// 倒计时
				var sid = setInterval(function() {
					_self.second--;
					if (_self.second <= 0) {
						// 倒计时完成
						_self.smsCode_disable = false;
						clearInterval(sid);
					}
					_self.smsMessage = _self.second + "s后获取";
				}, 1000);

			},
			/**
			 * 获取验证码前操作（验证手机号）
			 */
			beforeGetSmsCode: function() {
				var pattern = /^1[3|5|6|7|8|9][0-9]{9}$/;
				return pattern.test(_self.output.detail.mobile);
			},
			// 
			/** 验证当前表单(用于父组件验证)
			 * @param {function} successCallback 表单验证成功后执行方法
			 * @param {function} failCallback 表单验证失败后执行方法
			 */
			validation: function(successCallback, failCallback) {
				_self.$refs['smsCode']
					.submit()
					.then(result => {
						successCallback(result);
					})
					.catch(errors => {
						// 调用失败时执行
						failCallback(errors);
					});
			},
			// =================================== 请求方法 ================================================
			/** 获取验证码
			 * @param {Object} e
			 */
			getSmsCode: function(e) {
				// 获取验证，并调用input输出
				_self.output.detail.smsCode = '123456'
				_self.$emit('input', _self.output);
				// 倒计时
				_self.countDown();
			},
			// =======================================================================================================================
		}
	}
</script>

<style>

</style>
