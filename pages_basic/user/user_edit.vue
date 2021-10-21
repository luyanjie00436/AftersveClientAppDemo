<template>
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_user.nameBasic }}</block>
		</cu-custom>
		
		<!-- 表单 -->
		<uni-forms :rules="rules" :value="current" ref="form" validate-trigger="bind" err-show-type="undertext">
			<!-- 头像 -->
			<view class="bg-white flex solid-bottom padding justify-center">
				<image class="cu-avatar round xl margin-left flex-item"
					:src="current.Avatar?current.Avatar:logo_my" @tap="changeAvatar"></image>
			</view>
			<!-- 姓名 -->
			<uni-forms-item name="Name">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_user.name }}</text>
						<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.Name" :placeholder="i18n_user.namePlaceholder" name="Name"/>
				</view>
			</uni-forms-item>
			<!-- 手机号 -->
			<uni-forms-item name="Mobile">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_user.mobile }}</text>
						<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.Mobile" :placeholder="i18n_user.mobilePlaceholder" type="number" />
				</view>
			</uni-forms-item>
			<!-- 邮箱 -->
			<uni-forms-item name="Email">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_user.email }}</text>
						<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.Email" :placeholder="i18n_user.emailPlaceholder" />
				</view>
			</uni-forms-item>
		</uni-forms>
		
		<!-- 底部按钮 -->
		<bottom-btns :btns="btn_lists_admin" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/** 用户详细信息
	 *  @author 陆彦捷
	 * @description  编辑用户信息
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式相关组件
				preview: this.global.publicF.hasBack(), // 是否查看上一页
				logo_my : this.global.statics.login.logo_my,
				isCurrent: false, // 是否可用修改当前用户密码
				// 系统相关参数
				UserId: 0, // 用户id
				current: {
					UserId : 0 ,		// 用户名
					Avatar :'',			// 头像
					Name:'',			// 姓名
					Mobile:'',			// 手机号
					Email:'',			// 邮箱
				},
				Avatar_init: null, // 初始时头像
				rules: {
					Name: {
						rules: [{
							required: true,
							errorMessage: '请输入姓名'
						}]
					}, // 名称
					Mobile: {
						rules: this.global.rules.mobile
					}, // 手机号
					Email: {
						rules: this.global.rules.email
					}, // 邮箱
				},
				btn_lists_admin: [
					{
						name: '保存',
						icon: 'cuIcon-edit',
						clickName: 'edit',
					}
				] // 按钮组-管理员
			}
		},
		computed:{
			i18n : function(){
				return this.$t('basic');
			},
			i18n_user: function(){
				return this.$t('user');
			}
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
		},
		onShow:function(){
			this.userInfo_request(); // 获取当前用户信息
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules);
		},
		methods: {
			// ============================================ 初始化 ==============================================
			/** 获取初始化参数
			 * @param {Object} options
			 */
			getParams: function(options) {
				this.UserId = options.UserId ? options.UserId : this.global.login.getUserId();
				this.isCurrent = (this.UserId == this.global.user.getUserId()); 		// 是否为当前用户
			},
			// ============================================ 监听事件 ==============================================
			/** 修改头像
			 * @param {Object} e
			 */
			changeAvatar: function(e) {
				// 显示本地上传的头像
				uni.chooseImage({
					count: 1, // 最多可选择图片张数
					success: function(result) {
						// 直接修改本地预览
						if (result.tempFilePaths.length == 1) {
							_self.current.Avatar = result.tempFilePaths[0];
						}
					},
					fail: function() {
						uni.showToast({
							title: '选择图片失败！',
							icon: 'none'
						});
					}
				});
				// uni.show
			},
			/**
			 * 保存数据（个人信息）
			 * @param {string} 提交表单名称 
			 */
			save: function(form) {
				this.$refs[form].validate()
					.then((result) => {
						uni.showModal({
							title: _self.i18n.modal_save_title,
							content: _self.i18n.modal_save_content,
							success:function(result){
								if(result.confirm){
									//点击确定，保存当前的用户信息
									if (_self.current.Avatar === _self.Avatar_init) {
										_self.changeUser_request();
									} else {
										_self.global.imgR.imgUpload({
											imgUrl: _self.current.Avatar,
											LoadingText:'头像上传中……',
											success : _self.imgUpload_success,
											fail:_self.imgUpload_fail,
											complete : _self.changeUser_request
										});
									}
								}
							}
						});
					})
					.catch((erros) => {
						// 显示错误信息
						uni.showToast({
							title: erros[0].errorMessage,
							icon: 'none'
						});
					});
			},
			/** 点击底部按钮事件
			 * @param {String} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'edit':
						this.save('form');
						break;
					default:break;
				}
			},
			// =============================================== 公共方法 ==========================================================
			/** 头像上传成功后执行方法
			 * @param {Object} ImgUrl 图像返回路径
			 */
			imgUpload_success : function(ImgUrl){
				this.current.Avatar = ImgUrl;
			},
			/** 头像上传失败后执行方法
			 * @param {Object} errors
			 */
			imgUpload_fail : function(errors){
				this.current.Avatar = this.Avatar_init;
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
							_self.Avatar_init = data.Avatar;
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
			/**
			 * 修改用户信息
			 */
			changeUser_request: function() {
				this.global.userR.updateInfo({
					data : _self.current,
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success : function(data , message){
						uni.hideLoading();
						uni.navigateBack();
						uni.showToast({
							title: message,
							icon: 'none'
						});
						if(_self.isCurrent){
							_self.global.user.setName(data.Name);
							_self.global.user.setLoginName(data.LoginName);
							_self.global.user.setMobile(data.Mobile);
							_self.global.user.setAvatar(data.Avatar);
						}
					},
					fail : function(){
						uni.hideLoading();
						uni.showToast({
							title:  _self.i18n.requestFailMessage,
							icon: 'none'
						});
					}
				});
			}
			// =================================================================================================
		}
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
