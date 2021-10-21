<template>
	<view class="flex flex-direction ">
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_staff.invitionName }}</block>
		</cu-custom>
		<!-- 标题栏 -->
		<!-- 内容 -->
		<uni-forms ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
			<!-- 手机号 -->
			<uni-forms-item name="mobile">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
							<text class="margin-right-xs">{{ i18n_staff.invition.mobile }}</text>
							<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.mobile" :placeholder="i18n_staff.invition.mobilePlaceholder" maxlength="11" type="number"
						/>
				</view>
			</uni-forms-item>
			<!-- 手机号 -->
			<!-- 邀请说明 -->
			<uni-forms-item name="msg">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_staff.invition.msg }}</view>
					<textarea class="item-right" v-model="current.msg" :placeholder="i18n_staff.invition.msgPlaceholder" auto-height maxlength="-1"
						/>
				</view>
			</uni-forms-item>
			<!-- 邀请说明 -->
		</uni-forms>
		<!-- 内容 -->
		<!-- 底部按钮 -->
		<bottom-btns :btns="btn_lists" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 邀请成员
	 */
	var _self ;
	export default {
		data() {
			return {
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				 current:{
					'invType': 1, // 邀请类型： 0 ：平台邀请 ，1 : 被邀请人手机号
					'mchId': this.global.organ.getBranchId(),
					'fromId': this.global.user.getUserId(),
					'mobile': '',
					'orgId': 0,
					'msg': '',				// 提示消息
				},
				rules: {
					mobile: {
						rules: this.global.rules.mobile
					},
				}, // 验证规则
				// 底部按钮
				btn_lists: [
					{
						name: '邀请',
						icon: 'cuIcon-friendadd',
						clickName: 'invition',
					}
				] 
			}
		},
		computed: {
			i18n: function() {
				return this.$t('basic');
			},
			i18n_staff: function() {
				return this.$t('staff');
			}
		},
		onReady: function() {
			_self = this;
			// 初始化表单验证
			this.$refs.form.setRules(this.rules);
		},
		methods: {
			// ================================================ 监听事件 ==========================================
			/** 点击
			 * @param {String} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'invition' : this.invite_click('form');break;
					default:break;
				}
			},
			//  ============================== 公共方法 ====================================================================
			/** 发送邀请
			 * @param {String} form 表单名称
			 */
			invite_click(form) {
				this.$refs[form]
					.submit()
					.then(res => {
						_self.invite_request();
					})
					.catch(errors => {
						uni.showToast({
							title: errors[0].errorMessage,
							icon: 'none'
						});
					});
			},
			/** 发出邀请请求
			 * @param {Object} e
			 */
			invite_request: function() {
				this.global.staffR.inviteInfo({
					data: _self.current,
					success: function() {
						uni.showToast({
							title: '邀请信息发送成功！'
						});
					},
					fail: function() {
						uni.showToast({
							title: '邀请信息发送失败！',
							icon: 'none'
						});
					},
					complete: function() {
						_self.ModalName = '';
					}
				});
			},
		},
		// =================================================================================================================
	}
</script>

<style scoped lang="scss">
.box {
	display: flex;
	flex-direction: row;
	font-size: 28rpx;
	.item-left {
		width: 160rpx;
		text-align: justify;
		font-weight: bold;
	}
	.item-right{
		flex:1;
	}
}
</style>
