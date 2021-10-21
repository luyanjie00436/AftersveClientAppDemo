<template>
	<view class="flex flex-direction">
		<!-- 是否登录 -->
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_staff.detailName }}</block>
		</cu-custom>
		<!-- 标题栏 -->
		<!-- 判断权限 -->
		<operate-permission  @isAdmin="adminF">
		</operate-permission>
		<!-- 判断权限 -->
		<uni-forms :rules="rules" :value="current" ref="form" validate-trigger="bind" err-show-type="undertext">
			<!-- 头像 -->
			<uni-forms-item name="Avatar">
				<view class="bg-white flex solid-bottom padding justify-center">
					<image class="cu-avatar round xl margin-left flex-item" style="border: 3rpx #E8E8E8 solid;"
						:src="current.Avatar?current.Avatar: logo_my" @tap="changeAvatar"></image>
				</view>
			</uni-forms-item>
			<!-- 员工编号 -->
			<uni-forms-item name="StaffNo">
				<view class="cu-form-group solid-bottom text-df">
					<view class=" title text-bold">
						<text class="margin-right-sm">{{ i18n_staff.staffNo }}</text>
					</view>
					<view class="text-grey">{{ current.StaffNo }}</view>
				</view>
			</uni-forms-item>
			<!-- 员工姓名 -->
			<uni-forms-item name="Name" required>
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_staff.name }}</text>
						<text class="text-red">*</text>
					
					</view>
					<input class="item-right" v-model="current.Name" :placeholder="i18n_staff.namePlaceholder"  name="Name" />
				</view>
			</uni-forms-item>
			<!-- 绑定手机号 -->
			<uni-forms-item name="Mobile">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_staff.mobile }}</text>
						<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.Mobile" :placeholder="i18n_staff.mobilePlaceholder" type="number"  />
				</view>
			</uni-forms-item>
			<!-- 联系电话 -->
			<uni-forms-item name="Phone">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_staff.phone }}</text>
						<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.Phone" :placeholder="i18n_staff.phonePlaceholder" type="number" />
				</view>
			</uni-forms-item>
			<!-- 邮箱 -->
			<uni-forms-item name="Email">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_staff.email }}</text>
						<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.Email" :placeholder="i18n_staff.emailPlaceholder"  />
				</view>
			</uni-forms-item>
			<!-- 是否在职 -->
			<uni-forms-item name="IsJob">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_staff.isJob }}</view>
					<switch  name="IsJob" class="cyan" :checked="current.IsJob" @change="changeIsJob" ></switch>
				</view>
			</uni-forms-item>
			<!-- 入职日期 -->
			<uni-forms-item>
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_staff.entryAt }}</view>
					<picker v-model="current.EntryAt" mode="date" start="1900-01-01" end="2999-01-01"
					>
						<uni-dateformat format="yyyy-MM-dd" class="text-left  padding-tb-sm " style="width: 100%;"
							:date="current.EntryAt">无</uni-dateformat>
					</picker>
				</view>
			</uni-forms-item>
			<!-- 离职时间 -->
			<uni-forms-item>
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_staff.quitAt }}</view>
					<picker :value="current.QuitAt" mode="date" start="1900-01-01" end="2999-01-01"
						@change="changQuitAt">
						<uni-dateformat format="yyyy-MM-dd" class="text-left  padding-tb-sm " style="width: 100%;"
							:date="current.QuitAt"></uni-dateformat>
					</picker>
				</view>
			</uni-forms-item>
		</uni-forms>
		<!-- 底部按钮 -->
		<bottom-btns :btns="isAdmin ? btn_lists_admin : btn_lists" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/** 获取员工信息
	 *  @author 陆彦捷
	 * @description 查看员工信息详情
	 */
	import user from '@/common/storage/userstorage.js';

	var _self;
	export default {
		data() {
			return {
				// 样式相关组件
				preview: this.global.publicF.hasBack(), // 是否查看上一页
				logo_my :  this.global.statics.login.logo_my,
				// 系统相关参数
				isAdmin: false, // 判断是否为管理员
				StaffId: 0, // 员工编号
				current: {
					StaffId: 0, // 员工号
					Avatar: '', // 头像
					StaffNo: '', // 员工编码
					Name: '', // 姓名
					Mobile: '', // 绑定手机号
					Phone: '', // 手机号	
					Email: '', // 邮箱
					IsJob: true, // 是否在职
					EntryAt: null, // 入职日期
					QuitAt: null, // 离职日期
					Status: '', // 状态
					CreatedAt: null, // 创建时间
					UpdatedAt: null // 更新时间
				},
				Avatar_init: null, // 初始时头像
				rules: {
					StaffNo: {
						rules: [{
							required: true,
							errorMessage: '请输入员工编号'
						}]
					}, // 员工编码
					Name: {
						rules: [{
							required: true,
							errorMessage: '请输入员工姓名'
						}]
					}, // 名称
					Mobile: {
						rules: this.global.rules.mobile,
					}, // 绑定手机号
					Phone: {
						rules: this.global.rules.mobile,
					}, // 联系电话
					Email: {
						rules: this.global.rules.email
					}, // 邮箱
				},
				btn_lists: [], // 按钮组
				btn_lists_admin:this.global.params.btn_list_add // 按钮组-管理员
			}
		},
		computed: {
			// 国际化
			i18n : function(){
				return this.$t("basic");
			},
			i18n_staff: function() {
				return this.$t('staff');
			}
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);	// 获取参数
			this.staffInfo_request(this.StaffId); // 获取当前用户信息
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
				this.StaffId = options.StaffId ? options.StaffId : this.global.staff.getId(); // 员工Id
			},
			// ============================================ 监听事件 ==============================================
			/** 判断是否管理员
			 * @param {Object} val
			 */
			adminF : function(val){
				this.isAdmin = val;
			},
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
					fail: function(erros) {
						uni.showToast({
							title: '选择图片失败！',
							icon: 'none'
						});
					}
				});
				// uni.show
			},
			/**修改是否在职
			 * @param {Object} e
			 */
			changeIsJob: function(e) {
				this.current.IsJob = e.detail.value;
				if(!e.detail.quitAt){
					this.current.QuitAt = null;
				}
			},
			/** 修改离职时间
			 * @param {Object} e
			 */
			changQuitAt: function(e) {
				this.current.QuitAt = e.detail.value;
			},
			/**
			 * 保存数据（个人信息）
			 * @param {string} 提交表单名称 
			 */
			save: function(form) {
				this.$refs[form].validate()
					.then((result) => {
						// 判断图片是否为初始化图片
						uni.showModal({
							title: _self.i18n.modal_save_title,
							content: _self.i18n.modal_save_content,
							success: function(result) {
								if (result.confirm) {
									if (_self.current.Avatar == _self.Avatar_init) {
										_self.changestaff_request();
									} else {
										_self.staffChangLogo_request(_self.current.Avatar);
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
			// =============================================== 请求方法 ==================================
			/**
			 * 获取员工信息
			 * @param {Number} id 员工id
			 */
			staffInfo_request: function(id) {
				this.global.staffR.getInfo({
					id : id,
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success : function(data){
						uni.hideLoading();
						if(Boolean(data)){
							_self.current = data;
							_self.Avatar_init = data.Avatar;
						}
					},
					fail : function(){
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon:'none'
						});
					}					
				});
			},
			/** 上传头像并修改用户信息
			 * @param {String} avatUrl 本地图片的路径
			 */
			staffChangLogo_request: function(avatUrl) {
				_self.global.imgR.imgUpload({
					imgUrl: _self.current.Avatar,
					LoadingText:'头像上传中……',
					success : function(ImgUrl){
						this.current.Avatar = ImgUrl;
					},
					fail:function(){
						_self.current.Avatar = _self.Avatar_init;
					},
					complete : function(){
						_self.changestaff_request();
					}
				});

			},
			/**
			 * 修改员工信息
			 */
			changestaff_request: function() {
				this.global.staffR.updateInfo({
					data : _self.current,
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success : function(data ,message){
						uni.hideLoading();
						if(Boolean(data)){
							uni.showToast({
								title: _self.i18n.editSuccessMessage
							});
							_self.staffInfo_request();		// 更新员工信息
						}else{
							uni.showToast({
								title: message,
								icon:'none'
							});
						}
					},
					fail : function(errors){
						uni.hideLoading();
						let message = _self.i18n.requestFailMessage;
						if(Boolean(errors.statusCode)){
							message = errors.data.ResultMsg;
						}
						uni.showToast({
							title:message,
							icon:'none'
						});
					}
				})
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
