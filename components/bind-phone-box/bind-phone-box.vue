<template>
	<view class="cu-modal " :class="ModalName" @tap="hideModal">
		<view class="cu-dialog" @tap.stop="">
			<!-- 标题 -->
			<view class="cu-bar bg-white justify-end">
				<view class="content text-bold text-cut">获取手机号</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<!-- 内容 -->
			<mobile-input @input="changeMobileNumber" ></mobile-input>
			<!-- 按钮 -->
			<view class="cu-bar bg-cyan" @tap="save">
				<view class="action  margin-0 flex-sub  solid-left">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 绑定手机号
	 * @author 陆彦捷
	 * @description 将微信绑定当前手机号
	 */
	var _self ;
	export default {
		name:"bind-phone-box",
		data() {
			return {
				ModalName : null ,		// 是否弹出
				validation : null,			// 验证方法
				// 微信绑定的请求值
				currentWeixin_b: {
					nickName: "", // 昵称
					avatarUrl: "", // 头像
					gender: "", // 性别
					mobile: "", // 手机号
					openId: this.global.login.getOpenId(), // 当前openId
				},
			};
		},
		computed:{
			i18n : function(){
				return this.$t("basic");
			}
		},
		// 初始化
		created:function(){
			_self = this;
			// 获取用户信息
			uni.getUserInfo({
				success:function(result){
					_self.currentWeixin_b.nickName  = result.userInfo.nickName;
					_self.currentWeixin_b.avatarUrl = result.userInfo.avatarUrl;
					_self.currentWeixin_b.gender = (result.userInfo.gender != "0") ? '男': '女';
				},
				fail:function(erros){
					_self.openSetting("用户信息");
				}
			});
			this.$emit('show', this.showModal);
		},
		methods:{
			// ================================================== 监听事件 =================================================
			/** 打开弹出框
			 * @param {Object} e
			 */
			showModal : function(e){
				this.ModalName = 'show';
			},
			/** 关闭弹出框
			 * @param {Object} e
			 */
			hideModal : function(e){
				this.ModalName = null;
			},
			/** 手机号码
			 * @param {Object} e
			 */
			changeMobileNumber : function(e){
				this.validation = e.validation;
				this.currentWeixin_b.mobile = e.detail.mobile;
			},
			/** 绑定信息
			 * @param {Object} e
			 */
			save : function (e){
				this.validation(this.mobile_success ,  this.error_message);
			},
			// ============================================ 公共方法 ============================================
			/** 打开授权设置页
			 * @param {Object} autoName 授权名称
			 */
			openSetting: function(autoName) {
				uni.showModal({
					title: '授权',
					content: '获取授权' + autoName + '失败，是否前往授权设置',
					success: function(result) {
						if (result.confirm) {
							uni.openSetting();
						}
					},
					fail: function() {
						uni.showToast({
							title: '打开授权设置失败！',
							icon: 'none'
						})
					}
				})
			},
			/** 手机号码验证成功执行事件
			 * @param {Object} result
			 */
			mobile_success : function(result){
				this.bindPhone_request();		// 绑定申请
				this.ModalName = null;
			},
			/** 验证失败时返回方法
			 * @param {Object} erros
			 */
			error_message : function(erros){
				if (erros.length > 0) {
					uni.showToast({
						title: erros[0].errorMessage,
						icon: 'none'
					});
					return;
				}
			},
			// ========================================= 请求方法 ==============================================================
			/**
			 * 微信绑定
			 */
			bindPhone_request : function() {
				uni.redirectTo({
					url:'/pages/index/index'
				});
			},
			// =============================================================================================================
		}
	}
</script>

<style>

</style>
