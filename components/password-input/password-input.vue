<template>
	<view>
		<uni-forms :rules="rules" ref="password" :value="output.detail" validate-trigger="bind"
			err-show-type="undertext">
			<uni-forms-item name="password">
				<view class="cu-form-group solid-bottom">
					<text class="cuIcon-lock margin-right-sm"></text>
					<input v-model="output.detail.password" :placeholder="placeholder" :password="!passwordView"
						@input="changePassowrd" name="password"></input>
					<!-- 可视化密码 -->
					<view class="cu-capsule " @click="togglePasswordView">
						<text class="margin-right-sm"
							:class="passwordView ? 'cuIcon-attentionforbid':'cuIcon-attention'"
							style="transform: scale(1.5);"></text>
					</view>
				</view>
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
		name: "password-input",
		props: {
			// 密码的提示信息
			placeholder: {
				type: String,
				default: '请输入密码'
			}
		},
		data() {
			return {
				// 输出值
				output: {
					detail: {
						password: ''
					},
					validation: null
				},
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
				},
				passwordView: false, // 密码是否显示（默认不显示）
			};
		},
		onReady: function() {
			// 初始化表单验证
			this.$refs.password.setRules(this.rules);
		},
		created: function() {
			_self = this;
			// 初始化input值
			this.output.validation = this.validation;
			this.$emit('input', this.output);
		},
		methods: {
			// ========================================== 监听事件 ===========================================
			/** 修改密码
			 * @param {Object} e
			 */
			changePassowrd: function(e) {
				this.$emit('input', this.output);
			},
			/** 切换密码显示状态
			 * @param {Object} e
			 */
			togglePasswordView(e) {
				this.passwordView = !this.passwordView;
			},
			// ========================================== 公共方法 ===========================================
			/** 验证当前表单(用于父组件验证)
			 * @param {function} successCallback	验证成功回调反复
			 * @param {funtion} failCallback	验证失败回到方法
			 */
			validation(successCallback, failCallback) {
				_self.$refs['password']
					.submit()
					.then(result => {
						successCallback(result);
					})
					.catch(errors => {
						// 调用失败时执行
						failCallback(errors);
					});
			},
			// ===================================================================================================
		}
	}
</script>

<style>

</style>
