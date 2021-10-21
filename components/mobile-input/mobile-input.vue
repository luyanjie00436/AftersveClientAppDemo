<template>
	<view>
		<uni-forms :rules="rules" ref="mobile" :value="output.detail" validate-trigger="bind" err-show-type="undertext">
			<uni-forms-item name="mobile">
				<view class="cu-form-group solid-bottom">
					<text class="cuIcon-phone margin-right-sm"></text>
					<input v-model="output.detail.mobile" :placeholder="i18n_login.mobilePlaceholder" type="number" 
						@input="changeMobile" name="mobile"></input>
					<!-- #ifdef MP-WEIXIN  -->
					<button v-if="false" class="cu-tag line-cyan padding bg-white" open-type="getPhoneNumber"
						@getPhoneNumber="getPhoneNumber">获取本机号</button>
					<!-- #endif -->
				</view>
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
	/**
	 * 验证手机号
	 */
	var _self;
	export default {
		name: "mobile-input",
		data() {
			return {
				// 输出方法
				output: {
					detail: {
						mobile: '' // 手机号
					},
					validation: null, // 验证方法
				},
				// 验证
				rules: {
					mobile: {
						rules: this.global.rules.mobile
					}
				},
			};
		},
		computed:{
			i18n_login: function(){
				return this.$t('login');
			}
		},
		created: function() {
			_self = this;
			// 初始化input传出值
			this.output.validation = this.validation;
			this.$emit('input', this.output);
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.mobile.setRules(this.rules);
		},
		methods: {
			/** 修改手机号
			 * @param {Object} e
			 */
			changeMobile: function (e) {
				// 传参到父页面
				this.$emit('input', this.output);
			},
			/** 获取手机号
			 * @param {Object} e
			 */
			getPhoneNumber: function(e) {
				console.log("获取手机号回调：该appId没有权限", e)
			},
			// ========================================== 公共方法 ===========================================
			/** 验证当前表单(用于父组件验证)
			 * @param {function} successCallback	验证成功回调反复
			 * @param {funtion} failCallback	验证失败回到方法
			 */
			validation(successCallback, failCallback) {
				this.$refs.mobile
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
