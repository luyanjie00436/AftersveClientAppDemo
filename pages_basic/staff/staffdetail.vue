<template>
	<view class="flex flex-direction">
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_staff.detailName }}</block>
		</cu-custom>
		<!-- 标题栏 -->
		<!-- 判断权限 -->
		<operate-permission @isAdmin="adminF">
		</operate-permission>
		<!-- 判断权限 -->
		<uni-forms>
			<!-- 头像 -->
			<uni-forms-item name="Avatar">
				<view class="bg-white flex solid-bottom padding justify-center ">
					<image class="cu-avatar round xl margin-left flex-item " style="border: 3rpx #E8E8E8 solid;"
						:src="current.Avatar?current.Avatar: logo_my"></image>
				</view>
			</uni-forms-item>
			<!-- 员工编号 -->
			<uni-forms-item name="StaffNo">
				<view class="cu-form-group solid-bottom text-df">
					<view class=" title text-bold">{{ i18n_staff.staffNo }}</view>
					<text class="text-grey">{{ current.StaffNo }}</text>
				</view>
			</uni-forms-item>
			<!-- 员工姓名 -->
			<uni-forms-item name="Name" required>
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{i18n_staff.name }}</view>
					<text class="text-grey">{{ current.Name }}</text>
				</view>
			</uni-forms-item>
			<!-- 绑定手机号 -->
			<uni-forms-item name="Mobile">
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_staff.mobile }}</view>
					<text class="text-grey">{{ current.Mobile }}</text>
				</view>
			</uni-forms-item>
			<!-- 联系电话 -->
			<uni-forms-item name="Phone">
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_staff.phone }}</view>
					<text class="text-grey">{{ current.Phone }}</text>
				</view>
			</uni-forms-item>
			<!-- 邮箱 -->
			<uni-forms-item name="Email">
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_staff.email }}</view>
					<text class="text-grey">{{ current.Email }}</text>
				</view>
			</uni-forms-item>
			<!-- 是否在职 -->
			<uni-forms-item>
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_staff.isJob }}</view>
					<text class="text-grey">{{ current.IsJob ? '是':'否' }}</text>
				</view>
			</uni-forms-item>
			<!-- 入职日期 -->
			<uni-forms-item>
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_staff.entryAt }}</view>
					<uni-dateformat class="text-grey" format="yyyy-MM-dd" :date="current.EntryAt"></uni-dateformat>
				</view>
			</uni-forms-item>
			<!-- 离职时间 -->
			<uni-forms-item v-if="!current.IsJob">
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_staff.quitAt }}</view>
					<uni-dateformat class="text-grey"  format="yyyy-MM-dd" 
						:date="current.QuitAt"></uni-dateformat>
				</view>
			</uni-forms-item>
			<!-- 创建时间 -->
			<uni-forms-item>
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold" >{{i18n_staff.createdAt }}</view>
					<uni-dateformat class="text-grey " :date="current.CreatedAt" :threshold="[60000, 3600000]"></uni-dateformat>
				</view>
			</uni-forms-item>
			<!-- 更新时间 -->
			<uni-forms-item>
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold" >{{ i18n_staff.updatedAt}}</view>
					<uni-dateformat class="text-grey" 
						:date="current.UpdatedAt" :threshold="[60000, 3600000]"></uni-dateformat>
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
	var _self;
	export default {
		data() {
			return {
				// 样式相关组件
				preview: this.global.publicF.hasBack(), // 是否查看上一页
				logo_my : this.global.statics.login.logo_my,	// 图片-我的
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
				btn_lists: [], // 按钮组
				btn_lists_admin: [{
					name: '编辑',
					icon: 'cuIcon-edit',
					clickName: 'edit',
				}] // 按钮组-管理员
			}
		},
		computed: {
			// 国际化
			i18n: function() {
				return this.$t("basic");
			},
			i18n_staff: function() {
				return this.$t('staff');
			},
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
			this.staffInfo_request(); // 获取当前用户信息
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
							url: '/pages_basic/staff/staff_edit?StaffId=' + _self.StaffId
						})
						break;
					default:
						break;
				}
			},
			// =============================================== 请求方法 ==================================
			/**
			 * 获取员工信息
			 */
			staffInfo_request: function() {
				this.global.staffR.getInfo({
					id: _self.StaffId,
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success: function(data) {
						uni.hideLoading();
						if (Boolean(data)) {
							_self.current = data;
							_self.Avatar_init = data.Avatar;
						}
					},
					fail: function() {
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon: 'none'
						});
					}
				});
			},
			// =================================================================================================
		}
	}
</script>

<style>

</style>
