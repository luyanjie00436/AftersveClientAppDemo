<template>
	<view class="flex flex-direction">
		<!-- 判断操作权限 -->
		<operate-permission :MchId="current.TopMchId" :BranchId="current.MchId" @isAdmin="adminF"></operate-permission>
		<!-- 判断操纵权限 -->
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{i18n_merchant.nameBasic }}</block>
		</cu-custom>
		<!-- 标题栏 -->
		<!-- 当前组织/门店列表 -->
		<uni-list>
			<uni-list-item
				:thumb="(current.Logo == null || current.Logo == '' || current.Logo == 'string') ? organ_default: current.Logo"
				thumbSize="lg">
				<template slot="body">
					<view class=" cf ">
						<view class="fl text-lg text-bold padding-top-xs">
							{{ current.Name }}
						</view>
						<view class="text-sm fr cu-tag bg-cyan light margin-left text-cut">
							{{ current.ParentId ?  i18n_merchant.nameBranch  : i18n_merchant.name }}
						</view>
					</view>
					<view class="text-bold text-cut text-lg"></view>
					<view class="text-sm text-cut text-grey">{{ i18n_merchant.linkTel }}：{{ current.LinkTel }}</view>
				</template>
			</uni-list-item>
		</uni-list>
		<!-- 是否包含当前门店 -->
		<template>
			<!-- 所属组织 -->
			<navigator v-if="current.MchId != current.TopMchId"
				:url="'/pages_basic/orgation/orgationdetail?MchId=' +  current.TopMchId">
				<view class="cu-form-group text-df">
					<view class="title text-bold">{{ i18n_merchant.branch.topMch }}</view>
					<view class="text-grey">{{ current.TopMchName }}
						<text class=" cuIcon-right margin-left"></text>
					</view>
				</view>
			</navigator>
			<!-- 所属组织 -->
			<!-- 所含门店 -->
			<navigator v-if="current.MchId == current.TopMchId" class="cu-form-group text-df"
				:url="'/pages_basic/orgation/branchlist?MchId=' + current.MchId">
				<view class="title text-bold">{{ i18n_merchant.merchant.branches }}</view>
				<text class="text-grey cuIcon-right"></text>
			</navigator>
			<!-- 所含门店 -->
		</template>
		<!-- 编辑组织信息 -->
		<uni-forms >
			<!-- 基本信息 -->
			<uni-forms-item name="Name">
				<!-- 名称 -->
				<view class="cu-form-group margin-top-sm solid-bottom text-df">
					<view class="title text-bold">
						<text
							class="margin-right-sm">{{ isMerch ? i18n_merchant.merchant.name : i18n_merchant.branch.name }}</text>
					</view>
					<text class="text-grey">{{current.Name ? current.Name : ''}}</text>
				</view>
				<!-- 名称 -->
			</uni-forms-item>
			<uni-forms-item name="MchNo">
				<!-- 组织编码 -->
				<view class="cu-form-group solid-bottom text-df" :class="current.TopMchId ? '':'margin-top'">
					<view class="title text-bold">
						<text
							class="margin-right-sm">{{ isMerch ? i18n_merchant.merchant.mchNo : i18n_merchant.branch.mchNo }}</text>
					</view>
					<text class="text-grey">{{ current.MchNo ? current.MchNo : '' }}</text>
				</view>
				<!-- 组织编码 -->
			</uni-forms-item>
			<uni-forms-item v-if="!isMerch" name="OrgId">
				<!-- 所属部门 -->
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_merchant.branch.org }}</view>
					<text class="text-grey">{{current.OrgName ? current.OrgName : ''}}</text>
				</view>
				<!-- 所属部门 -->
			</uni-forms-item>
			<uni-forms-item name="Msg">
				<!-- 描述 -->
				<view class="cu-form-group solid-bottom text-df" name="Msg">
					<view class="title text-bold">
						<text class="margin-right-sm">{{ i18n_merchant.msg }}</text>
						<text class="text-red">*</text>
					</view>
					<text class="text-grey">{{current.Msg ? current.Msg : ''}}</text>
				</view>
				<!-- 描述 -->
			</uni-forms-item>
			<uni-forms-item v-if="isMerch" name="IndustryId">
				<!-- 行业 -->
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_merchant.merchant.industry }}</view>
					<text class="text-grey">{{current.IndustryName ? current.IndustryName : ''}}</text>
				</view>
				<!-- 行业 -->
			</uni-forms-item>
			<uni-forms-item v-if="isMerch" name="Type">
				<!-- 商户类型 -->
				<view class="cu-form-group text-df">
					<view class="title text-bold">{{ i18n_merchant.merchant.types }}</view>
					<text class="text-grey">{{ typesName }}</text>
				</view>
				<!-- 商户类型 -->
			</uni-forms-item>
			<uni-forms-item v-if="!isMerch && false" name="Status">
				<!-- 状态 -->
				<view class="cu-form-group text-df">
					<view class="title text-bold">{{ i18n_merchant.branch.status }}</view>
					<text class="text-grey">{{current.Status ? current.Status : ''}}</text>
				</view>
				<!-- 状态 -->
			</uni-forms-item>
			<!-- 基本信息 -->

			<!-- 区域信息 -->
			<uni-forms-item name="Area">
				<!-- 地区 -->
				<view class="cu-form-group solid-bottom margin-top-sm text-df">
					<view class="title text-bold">{{ i18n_merchant.area }}</view>
					<text
						class="text-grey">{{current.Area1Name ? current.Area1Name : ''}}&nbsp;{{current.Area2Name ? current.Area2Name :''}}&nbsp;{{current.Area3Name ? current.Area3Name :''}}</text>
				</view>
				<!-- 地区 -->
			</uni-forms-item>
			<uni-forms-item name="Address">
				<!-- 地址 -->
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_merchant.address }}</view>
					<text class="text-grey">{{current.Address ? current.Address :''}}</text>
				</view>
				<!-- 地址 -->
			</uni-forms-item>
			<uni-forms-item class="PostCode">
				<!-- 邮编 -->
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_merchant.postCode }}</view>
					<text class="text-grey">{{current.PostCode ? current.PostCode : ''}}</text>
				</view>
				<!-- 邮编 -->
			</uni-forms-item>
			<!-- 区域信息 -->

			<!-- 负责人信息 -->
			<uni-forms-item v-if="!isMerch" name="Managers">
				<!-- 负责人 -->
				<view class="cu-form-group solid-bottom margin-top-sm text-df">
					<view class="title text-bold">{{ i18n_merchant.branch.managers }}</view>
					<text class="text-grey">{{ ManagerNames }}</text>
				</view>
				<!-- 负责人 -->
			</uni-forms-item>
			<uni-forms-item name="LinkMan">
				<!-- 联系人 -->
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_merchant.linkMan }}</view>
					<text
						class="text-grey">{{ current.LinkMan ? current.LinkMan :'' }}({{current.LinkTel ? current.LinkTel : ''}})</text>
				</view>
				<!-- 联系人 -->
			</uni-forms-item>
			<!-- 负责人信息 -->

			<!-- 其他 -->
			<uni-forms-item v-if="isMerch" name="LegalPerson">
				<!-- 法人 -->
				<view class="cu-form-group solid-bottom margin-top-sm text-df">
					<view class="title text-bold">{{ i18n_merchant.merchant.legalPerson }}</view>
					<text class="text-grey">{{current.LegalPerson ? current.LegalPerson : ''}}</text>
				</view>
				<!-- 法人 -->
			</uni-forms-item>
			<uni-forms-item v-if="isMerch" name="BankName">
				<!-- 开户行 -->
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_merchant.merchant.bankName }}</view>
					<text class="text-grey">{{current.BankName ? current.BankName : ''}}</text>
				</view>
				<!-- 开户行 -->
			</uni-forms-item>
			<uni-forms-item v-if="isMerch" name="BankAccount">
				<!-- 开户账号 -->
				<view class="cu-form-group solid-bottom text-df">
					<view class="title text-bold">{{ i18n_merchant.merchant.bankAccount }}</view>
					<text class="text-grey">{{current.BankAccount ? current.BankAccount : ''}}</text>
				</view>
				<!-- 开户账号 -->
			</uni-forms-item>
			<!-- 其他 -->
		</uni-forms>
		<!-- 底部按钮 -->
		<bottom-btns :btns="isAdmin ? btn_lists_admin : btn_lists" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 查看组织信息
	 * @author 陆彦捷
	 * @description 查看当前的组织或门店信息
	 */
	var _self;
	export default {
		data() {
			return {
				// 页面相关消息
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				pattern: this.global.params.fab_pattern,
				CustomBar: this.CustomBar, // 导航栏高度
				organ_default: this.global.statics.organ.organ_default,		// 组织图片
				// 系统相关消息
				isAdmin: false, // 判断是否为管理员
				BranchID: 0, // 门店id
				current: {
					MchId: 0, // 组织Id
					Logo: '', // 图标
					Name: '', // 组织名称
					MchNo: '', // 组织编码
					Msg: '', // 组织信息描述
					IndustryId: '', // 行业
					IsCust: false, // 是否客户类型（类型组织）
					IsSup: false, // 是否服务商(类型组织)
					IsSvc: false, // 是否供应商（类型组织）
					OrgId: 0, // 所属部门id（类型：门店）
					TopMchId: 0, // 所属组织id
					Status: '', // 状态
					Address: '', // 地址
					Area1: 0, // 区域1
					Area2: 0, // 区域2
					Area3: 0, // 区域3
					Managers: null, // 负责人（类型门店,默认为空）
					LinkMan: '', // 联系人
					LinkTel: '', // 联系电话
					LegalPerson: '', // 法人
					BankName: '', // 开户行
					BankAccount: '', // 开户账号

				}, // 当前显示的组织门店信息
				mainMch: {}, // 主企业信息
				orgIndex: 1, // 查看门店信息的页码（默认为1）
				orgPageSize: 10, // 默认每页条数（10）
				organization_list: [], // 当前企业所含门店的信息
				loadContentText: this.global.params.loadContentText,
				organStatus: 'more', // 当前门店
				orgtree: [], // 当前企业的部门信息
				industry_list: [], // 所有行业
				range: this.global.merchants.merType, // 商户类型列表
				types: [], // 商户类型列表
				typesName: '', // 根据商户类型列表获取商户类型字符串
				area_list: [], // 地区列表
				areainit: null, // 地区的初始值
				staff_list: [], // 返回的员工信息，用于选择负责人
				staff_data_list: [], // 经格式化的员工信息
				ManagerNames: [], // 组织的名称
				btn_lists: [{
						name: '添加门店',
						// url: '/pages_basic/orgation/orgation_create',
						icon: 'cuIcon-add',
						clickName :'add'
					}					
				], // 按钮组
				btn_lists_admin: [{
						name: '添加门店',
						// url: '/pages_basic/orgation/orgation_create',
						icon: 'cuIcon-add',
						clickName :'add'
					},
					{
						name: '编辑',
						icon: 'cuIcon-edit',
						clickName :'edit'
					}
				]	// 按钮组-管理员
			}
		},
		watch: {
			// 当前值
			current: {
				deep: true,
				handler: function(val, oldval) {
					// 顶部组织id
					if (val.TopMchId != oldval.MchId) {
						this.getorgTree(val.TopMchId); // 获取部门树
						this.getStaffs(val.TopMchId); // 获取员工信息
					}
					if (val.Managers != oldval.Managers) {
						this.ManagerNames = this.global.merchantF.getManagesName(this.staff_list, val.Managers);
					}
				}
			},
			// 员工信息列表
			staff_list: function(val, oldval) {
				this.ManagerNames = this.global.merchantF.getManagesName(val, this.current.Managers);
			},
			// 商户类型值修改
			types: function(val) {
				this.typesName = this.global.merchantF.getTypesName(val);
			}
		},
		computed: {
			i18n: function() {
				return this.$t('basic');
			},
			i18n_merchant: function() {
				return this.$t('merchant');
			},
			/**
			 * 判断是否为组织类型
			 */
			isMerch: function() {
				return this.current.TopMchId === this.current.MchId;
			},
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
			this.init();
		},
		methods: {
			// ======================================= 初始化方法 ==================================================
			/** 获取参考值
			 * @param {Object} options
			 */
			getParams: function(options) {
				this.BranchID = options.MchId ? options.MchId : this.global.organ.getBranchId(); // 组织id
			},
			/**
			 * 初始化方法
			 */
			init: function() {
				this.request_Org(this.BranchID); // 查询当前组织/门店
				// 请求所有行业
				this.global.industryR.getTreesFormat({
					success: function(data) {
						_self.industry_list = data;
					}
				});
				// 请求所在地区
				this.global.areaR.getTrees({
					success: function(data) {
						_self.area_list = data;
					}
				});

			},
			/** 获取部门树
			 * @param {Object} mchId 组织id
			 */
			getorgTree: function(mchId) {
				this.global.departmentR.getTrees({
					data: {
						mchId: mchId,
						loadMch: false,
						loadStaff: false,
						dataType: 1,
					},
					success: function(datafull) {
						_self.orgtree = datafull;
					}
				});
			},
			/** 获取当前组织的员工信息
			 * @param {Object} mchId 组织Id
			 */
			getStaffs: function(mchId) {
				this.global.staffR.getAllList({
					data: {
						mchId: mchId
					},
					success: function(data) {
						_self.staff_list = data;
						// 选择负责人格式化（暂时）
						_self.staff_data_list = JSON.parse(JSON.stringify(data));
						_self.staff_data_list.forEach(item => {
							item.id = item.StaffId;
							item.value = item.Name;
						});
					}
				});
			},
			// ======================================= 监听事件 ==================================================
			/**判断是否为管理员(可编辑)
			 * @param {Object} data
			 */
			adminF: function(data) {
				this.isAdmin = data;
			},
			/**获取负责人
			 * @param {Object} arr 选中的值数组
			 */
			getBackVal: function(arr) {
				// 转换为数组（临时, 需要将传出值做修改）
				this.current.Managers = [];
				var arrays = arr.slice(0, arr.length - 1).split(",");
				arrays.forEach((item, index) => {
					this.current.Managers.push(parseInt(item.split("|")[1]));
				});
			},
			/** 底部导航栏事件
			 * @param {Object} name
			 */
			clickBottom: function(name){
				switch(name){
					case 'add':
						uni.navigateTo({
							url: '/pages_basic/orgation/orgation_create?isBranch=true',
						});
						break;
					case 'edit':
						uni.navigateTo({
							url:'/pages_basic/orgation/merchant_edit?MchId=' + _self.BranchID
						});
						break;
					default:break;
				}
			},
			// ======================================= 请求方法 ==================================================
			/**
			 * 根据id查看组织/门店信息
			 * @param {Number} MchId 组织id
			 */
			request_Org(MchId) {
				this.global.merchantR.getDetail({
					id: MchId,
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success: function(data) {
						uni.hideLoading();
						if (Boolean(data)) {
							_self.current = data;
							// 初始化商户类型
							if (Boolean(data.IsCust)) {
								_self.types.push(0);
							}
							if (Boolean(data.IsSup)) {
								_self.types.push(1);
							}
							if (Boolean(data.IsSvc)) {
								_self.types.push(2);
							}
							if (Boolean(data.Area3)) {
								_self.areainit = data.Area3;
							} else if (Boolean(data.Area2)) {
								_self.areainit = data.Area2;
							} else if (Boolean(data.Area1)) {
								_self.areainit = data.Area1;
							}
							// 部门Id改为字符串（为了配合部门tree）
							_self.current.OrgId = data.OrgId.toString();
							_self.logoInt = data.Logo;
							return;
						}
						uni.showToast({
							title: _self.i18n.noMessage,
							icon: 'none'
						});
					},
					fail: function() {
						uni.hideLoading();
					}
				});
			},
			// ===============================================================================================================
		}
	}
</script>

<style>
	.page {
		height: calc(100vh -65px);
	}
</style>
