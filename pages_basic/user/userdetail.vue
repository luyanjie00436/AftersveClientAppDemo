<template>
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_user.nameBasic }}</block>
		</cu-custom>
		<!-- 登录判断 -->
		<is-login currentPage="index"></is-login>
		<!-- 表单 -->
			<!-- 头像 -->
			<view class="bg-white flex solid-bottom padding justify-center">
				<image class="cu-avatar round xl margin-left flex-item"
					:src="current.Avatar?current.Avatar:logo_my" @tap="changeAvatar"></image>
			</view>
			<!-- 用户名 -->
			<view class="cu-form-group text-df">
				<view class=" title text-bold">{{ i18n_user.loginName }}</view>
				<text class="text-grey">{{ current.LoginName }}</text>
			</view>
			<!-- 姓名 -->
			<view class="cu-form-group text-df">
				<view class="title text-bold">{{ i18n_user.name }}</view>
				<text class="text-grey">{{ current.Name }}</text>
			</view>
			<!-- 微信名称 -->
			<view class="cu-form-group text-df">
				<view class="title text-bold">{{ i18n_user.wxName }}</view>
				<text class="text-grey">{{ current.WxName }}</text>
			</view>
			<!-- 密码 -->
			<view v-if="isCurrent" class="cu-form-group text-df">
				<view class="title text-bold">{{ i18n_user.loginPwd }}</view>
				<navigator class="flex flex-direction" url="/pages_basic/my/changepassword">
					<text class="text-blue">{{ i18n_user.loginPwdTo}}</text>
				</navigator>
			</view>
			<!-- 手机号 -->
			<view class="cu-form-group text-df">
				<view class="title text-bold">{{ i18n_user.mobile }}</view>
				<text class="text-grey">{{current.Mobile}}</text>
			</view>
			<!-- 邮箱 -->
			<view class="cu-form-group text-df">
				<view class="title text-bold">{{ i18n_user.email }}</view>
				<text class="text-grey">{{ current.Email }}</text>
			</view>
			<!-- 创建日期 -->
			<view class="cu-form-group text-df">
				<view class="title text-bold" style="width: 200rpx;">{{ i18n_user.createdAt }}</view>
				<uni-dateformat class="text-grey " 
					:date="current.CreatedAt" :threshold="[60000, 3600000]"></uni-dateformat>
			</view>
		
		<button v-if="false" class="cu-btn bg-cyan padding round margin-lr margin-top" @click="save('form')">保存</button>
		
		<!-- 底部按钮 -->
		<bottom-btns :btns="isAdmin || isCurrent? btn_lists_admin : btn_lists" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
		
	</view>
</template>

<script>
	/** 用户详细信息
	 *  @author 陆彦捷
	 * @description  用户详细信息
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式相关组件
				preview: this.global.publicF.hasBack(), // 是否查看上一页
				logo_my : this.global.statics.login.logo_my,
				isAdmin : false ,		// 是否管理员
				isCurrent: false, // 是否可用修改当前用户密码
				// 系统相关参数
				UserId: 0, // 用户id
				current: {},
				// 底部按钮
				btn_lists: [], // 按钮组
				btn_lists_admin: [{
					name: '编辑',
					icon: 'cuIcon-edit',
					clickName: 'edit',
				}] // 按钮组-管理员
			}
		},
		computed:{
			// 国际化
			i18n_user : function(){
				return this.$t("user");
			}
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
		},
		onShow:function(){
			this.userInfo_request(); // 获取当前用户信息
		},
		methods: {
			// ============================================ 初始化 ==============================================
			/** 获取初始化参数
			 * @param {Object} options
			 */
			getParams: function(options) {
				this.UserId = options.UserId ? options.UserId: this.global.login.getUserId();
				this.isCurrent = (this.UserId == this.global.user.getUserId()); 		// 是否为当前用户
			},
			// ============================================ 监听事件 ==============================================
			/** 判断是否管理员
			 * @param {Object} val
			 */
			adminF: function(val) {
				this.isAdmin = val;
			},
			/** 点击底部按钮事件
			 * @param {String} name
			 */
			clickBottom: function(name) {
				switch (name) {
					case 'edit':
						uni.navigateTo({
							url: '/pages_basic/user/user_edit?UserId=' + _self.UserId
						});
						break;
					default:
						break;
				}
			},
			// =============================================== 请求方法 ==========================================================
			/**
			 * 获取当前用户信息
			 */
			userInfo_request: function() {
				this.global.userR.getInfo({
					id : _self.UserId,
					before : function(){
						uni.showLoading();
					},
					success:function(data){
						uni.hideLoading();
						if(Boolean(data)){
							_self.current = data;
							return;
						}
					},
					fail: function(){
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon:'none'
						});
					}
				})
			},
			// ========================================================================================================================
		}
	}
</script>

<style>

</style>
