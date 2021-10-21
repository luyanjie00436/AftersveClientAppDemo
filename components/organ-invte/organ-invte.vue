<template>
	<view class="flex flex-direction ">
		<view class="cu-modal " :class="ModalName" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-bold text-cut">{{ i18n_staff.invitionName }}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<uni-forms ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
					<uni-forms-item name="mobile">
						<view class="cu-form-group solid-bottom">
							<input :placeholder="i18n_staff.invition.mobilePlaceholder" maxlength="11" type="number" :value="current.mobile"
								@input="changeMobile($event);binddata('mobile', $event.detail.value,'form')" />
						</view>
					</uni-forms-item>
				</uni-forms>
				<view class="cu-bar bg-cyan" @tap="invite_click('form')">
					<view class="action  margin-0 flex-sub  solid-left">{{i18n_staff.invition.btn_submit }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 邀请新的组织成员
	 * @author 陆彦捷
	 * @description  当前用户邀请新的的组织成员
	 */
	import login from '@/common/storage/loginstorage.js' // 登录
	import organ from '@/common/storage/organstorage.js';

	var _self;
	export default {
		name: "organ-invte",
		props: {
			// 当前组织id
			MchId: {
				type: Number,
				default: 0
			},
			// 当前用户
			UserId: {
				type: Number,
				default: login.getUserId()
			},
			// 邀请加入的部门
			orgId: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				// 与样式有关参数
				ModalName: null, // 当前组织
				// 与系统有关参数
				current: {
					mobile: '', // 被邀请用户的手机号
				},
				rules: {
					mobile: {
						rules: this.global.rules.mobile
					},
				} // 验证规则
			};
		},
		computed:{
			// 国际化语言
			i18n_staff : function(){
				return this.$t('staff');
			},
		},
		onReady: function() {
			// 初始化表单验证
			this.$refs.form.setRules(this.rules);
		},
		created: function() {
			_self = this;
			this.$emit('show', this.showModal);
		},
		methods: {
			// ================================================ 监听事件 ==========================================
			/** 显示弹出框
			 * @param {Object} e
			 */
			showModal: function(e) {
				this.ModalName = 'show'; // 显示弹出框
			},
			/** 隐藏弹出框
			 * @param {Object} e
			 */
			hideModal: function(e) {
				// 隐藏hide
				this.ModalName = '';
			},
			/** 修改用户的手机号码
			 * @param {Object} e
			 */
			changeMobile: function(e) {
				this.current.mobile = e.detail.value;
			},
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
			// ================================================ 请求方法 ==========================================
			/** 发出邀请
			 * @param {Object} e
			 */
			invite_request: function() {
				this.global.staffR.inviteInfo({
					data: {
						'invType': 1, // 邀请类型： 0 ：平台邀请 ，1 : 被邀请人手机号
						'mchId': _self.MchId,
						'fromId': _self.UserId,
						'mobile': _self.current.mobile,
						'orgId': _self.orgId,
						'msg': '邀请加入'
					},
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
			// ==================================================================================================
		}
	}
</script>

<style>

</style>
