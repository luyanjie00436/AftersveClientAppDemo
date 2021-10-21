<template>
	<view>
		<uni-forms :rules="rules" :value="current" ref="valpassword" validate-trigger="bind" err-show-type="undertext">
			<uni-forms-item name="password" required>
				<view class="cu-form-group solid-bottom">
					<text class="cuIcon-lock margin-right-sm"></text>
					<input :placeholder="password_placeholder" :password="!passwordView"
						@input="changePassowrd($event, 'password');binddata('password', $event.detail.value,'valpassword');"
						name="password"></input>
					<!-- 可视化密码 -->
					<view class="cu-capsule " @click="togglePasswordView">
						<text class="margin-right-sm"
							:class="passwordView ? 'cuIcon-attentionforbid':'cuIcon-attention'"
							style="transform: scale(1.5);"></text>
					</view>
				</view>
			</uni-forms-item>
			<!-- 再次输入密码 -->
			<uni-forms-item name="repassword" required>
				<view class="cu-form-group solid-bottom">
					<text class="cuIcon-lock margin-right-sm"></text>
					<input :placeholder="repassword_placeholder" :password="!rePasswordView" 
						@input="changePassowrd($event ,'rePassword');binddata('repassword', $event.detail.value,'valpassword');"
						name="repassword"></input>
					<!-- 可视化密码 -->
					<view class="cu-capsule " @click="toggleRePasswordView">
						<text class="margin-right-sm"
							:class="rePasswordView ? 'cuIcon-attentionforbid':'cuIcon-attention'"
							style="transform: scale(1.5);"></text>
					</view>
				</view>
			</uni-forms-item>
			<!-- 显示密码是否一致 -->
			<uni-forms-item class="othermessage" :error-message="uniquepassword?'':'两次密码不一致'">
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
	/**
	 * 验证密码输入
	 * (规则，大于6位数)
	 * @return {object} output
	 * 
	 */

	var _self;
	export default {
		name: "repassword",
		props:{
			// 输入密码提示信息
			password_placeholder:{
				type: String,
				default:'请输入密码'
			},
			// 再次输入密码提示信息
			repassword_placeholder:{
				tye: String,
				default:'请再次输入密码'
			}
		},
		data() {
			return {
				// 当前页面值
				current: {
					password: '',
					repassword: '',
					equal: ''
				},
				// 密码
				passwordView: false, // 密码是否可见
				rePasswordView: false, // 再次输入密码是否可见
				uniquepassword: true, // 密码是否一致
				// 验证
				rules: {
					// 密码
					password: {
						rules: [{
								required: true,
								errorMessage: '请输入密码'
							},
							{
								pattern: "^\.{6,}$", // 验证码为6位数
								errorMessage: '密码需大于6位数'
							},
						],
					},
					// 再次输入密码
					repassword: {
						rules: [{
								required: true,
								errorMessage: '请输入密码'
							},
							{
								pattern: "^\.{6,}$", // 验证码为6位数
								errorMessage: '密码需大于6位数'
							},
						],
					}
				},
				// 输出的值
				output: {
					detail: {
						password: ''
					},
					validation: ''
				},

			};
		},
		onReady: function() {
			// 初始化表单验证
			this.$refs.valpassword.setRules(this.rules);
		},
		created: function() {
			_self = this;
			// 输出的input事件
			this.output.validation = this.validation;
			this.$emit('input', this.output);
		},
		methods: {
			// ============================================= 监听事件 ====================================================
			/** 切换可视化密码
			 * @param {Object} e
			 */
			togglePasswordView : function(e) {
				_self.passwordView = !_self.passwordView;
			},
			/** 修改密码
			 * @param {Object} e
			 * @param {Object} type
			 */
			changePassowrd :function(e , type = 'password') {
				// 绑定密码
				if(type == 'password'){
					this.current.password = e.detail.value;
				}else{
					this.current.repassword = e.detail.value;
				}
				// 验证密码是否一致
				this.uniquepassword = (this.current.password == this.current.repassword);
				this.output.detail.password = this.current.password;		// 输出改变的密码
				// 切换可视化密码
				this.$emit('input', this.output);
			},
			// 切换再次输入可视化密码
			toggleRePasswordView(e) {
				_self.rePasswordView = !_self.rePasswordView;
			},

			// 验证当前表单(用于父组件验证)
			validation(successCallback, failCallback) {
				_self.$refs['valpassword']
					.submit()
					.then(result => {
						if (this.current.password == this.current.repassword) {
							this.uniquepassword = true;
							successCallback(result);
						} else {
							this.uniquepassword = false;
							var erros = [{key: "repassword", errorMessage: "两次密码不一致"}];
							failCallback(erros);
						}
					})
					.catch(errors => {
						// 调用失败时执行
						failCallback(errors);
					});
			},
		}
	}
</script>

<style>

</style>
