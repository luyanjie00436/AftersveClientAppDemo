<template>
	<view class="flex flex-direction">
		<!-- 判断操作权限 -->
		<operate-permission :MchId="current.TopMchId" :BranchId="current.MchId" @canDelete="canDeleteF">
		</operate-permission>
		<!-- 判断操纵权限 -->
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{i18n_merchant.nameBasic }}</block>
		</cu-custom>
		<!-- 当前组织/门店列表 -->
		<uni-list>
			<uni-list-item
				:thumb="Boolean(current.Logo) || current.Logo == 'string' ? organ_default: current.Logo"
				thumbSize="lg" clickable @click="changeLogo">
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

		<!-- 编辑组织信息 -->
		<uni-forms :rules="rules" :value="current" ref="form" validate-trigger="bind" err-show-type="undertext">
			<!-- 基本信息 -->
			<uni-forms-item name="Name">
				<!-- 名称 -->
				<view class="cu-form-group margin-top-sm solid-bottom box">
					<view class="item-left">
						<text
							class="margin-right-xs">{{ isMerch ? i18n_merchant.merchant.name : i18n_merchant.branch.name }}</text>
						<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.Name"
						:placeholder="isMerch ?i18n_merchant.merchant.namePlaceholder :i18n_merchant.branch.namePlaceholder"
						 />
				</view>
				<!-- 名称 -->
			</uni-forms-item>
			<uni-forms-item name="MchNo">
				<!-- 组织编码 -->
				<view class="cu-form-group solid-bottom box" :class="current.TopMchId ? '':'margin-top'">
					<view class="item-left">
						<text
							class="margin-right-xs">{{ isMerch ? i18n_merchant.merchant.mchNo : i18n_merchant.branch.mchNo }}</text>
						<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.MchNo" 
						:placeholder="isMerch ?i18n_merchant.merchant.mchNoPlaceholder :i18n_merchant.branch.mchNoPlaceholder"
						/>
				</view>
				<!-- 组织编码 -->
			</uni-forms-item>
			<uni-forms-item v-if="!isMerch" name="OrgId">
				<!-- 所属部门 -->
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_merchant.branch.org }}</view>
					<luyj-data-picker class="item-right" v-model="current.OrgId" :placeholder="i18n_merchant.branch.orgPlaceholder"
						:border="false" :preload="true" :localdata="orgtree"
						:popup-title="i18n_merchant.branch.orgTitle" name="OrgId">
					</luyj-data-picker>
				</view>
				<!-- 所属部门 -->
			</uni-forms-item>
			<uni-forms-item name="Msg">
				<!-- 描述 -->
				<view class="cu-form-group solid-bottom box" name="Msg">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_merchant.msg }}</text>
						<text class="text-red">*</text>
					</view>
					<textarea class="item-right" v-model="current.Msg" maxlength="-1" auto-height
						:placeholder="i18n_merchant.msgPlaceholder"></textarea>
				</view>
				<!-- 描述 -->
			</uni-forms-item>
			<uni-forms-item v-if="isMerch" name="IndustryId">
				<!-- 行业 -->
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_merchant.merchant.industry }}</view>
					<luyj-data-picker class="item-right" v-model="current.IndustryId"
						:placeholder="i18n_merchant.merchant.industryPlaceholder" :border="false"
						:preload="true" :localdata="industry_list" :popup-title="i18n_merchant.merchant.industryTitle">
					</luyj-data-picker>
				</view>
				<!-- 行业 -->
			</uni-forms-item>
			<uni-forms-item v-if="isMerch" name="Type">
				<!-- 商户类型 -->
				<view class="cu-form-group box">
					<view class="item-left">{{ i18n_merchant.merchant.types }}</view>
					<text class="text-grey">{{typesName}}</text>
				</view>
				<!-- 商户类型 -->
			</uni-forms-item>
			<!-- 基本信息 -->

			<!-- 区域信息 -->
			<uni-forms-item name="Area">
				<!-- 地区 -->
				<view class="cu-form-group solid-bottom margin-top-sm box">
					<view class="item-left">{{ i18n_merchant.area }}</view>
					<luyj-data-picker ref="area" class="item-right" :placeholder="i18n_merchant.areaPlaceholder" 
						:border="false" :preload="true" :localdata="area_list" :value="areainit"
						:popup-title="i18n_merchant.areaTitle" @change="changeArea" name="Area"></luyj-data-picker>
				</view>
				<!-- 地区 -->
			</uni-forms-item>
			<uni-forms-item name="Address">
				<!-- 地址 -->
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_merchant.address }}</text>
						<text class="text-red">*</text>
					</view>
					<textarea class="item-right" v-model="current.Address" maxlength="-1" auto-height
						:placeholder="i18n_merchant.addressPlaceholder" name="Address"></textarea>
				</view>
				<!-- 地址 -->
			</uni-forms-item>
			<uni-forms-item class="PostCode">
				<!-- 邮编 -->
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_merchant.postCode }}</view>
					<input class="item-right" :placeholder="i18n_merchant.postCodePlaceholder" type="number" maxlength="6" />
				</view>
				<!-- 邮编 -->
			</uni-forms-item>
			<!-- 区域信息 -->

			<!-- 负责人信息 -->
			<uni-forms-item v-if="!isMerch" name="Managers">
				<!-- 负责人 -->
				<view class="cu-form-group solid-bottom margin-top-sm box">
					<view class="item-left">{{ i18n_merchant.branch.managers }}</view>
					<luyj-select-multiple v-if="staff_data_list.length > 0" class="item-right"
						:placeholder='i18n_merchant.branch.managersPlaceholder' :value="ManagerNames"
						:binData="staff_data_list" checkType="checkbox" overflow="hide" @getBackVal="getBackVal"
						:selectIco="true">
					</luyj-select-multiple>
				</view>
				<!-- 负责人 -->
			</uni-forms-item>
			<uni-forms-item name="LinkMan">
				<!-- 联系人 -->
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_merchant.linkMan }}</view>
					<input class="item-right" :placeholder="i18n_merchant.linkManPlaceholder" v-model="current.LinkMan" name="LinkMan" />
				</view>
				<!-- 联系人 -->
			</uni-forms-item>
			<uni-forms-item name="LinkTel">
				<!-- 联系人电话 -->
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_merchant.linkTel }}</view>
					<input class="item-right" v-model="current.LinkTel" :placeholder="i18n_merchant.linkTelPlaceholder" name="LinkTel" />
				</view>
				<!-- 联系人电话 -->
			</uni-forms-item>
			<!-- 负责人信息 -->

			<!-- 其他 -->
			<uni-forms-item v-if="isMerch" name="LegalPerson">
				<!-- 法人 -->
				<view class="cu-form-group solid-bottom margin-top-sm box">
					<view class="item-left">{{ i18n_merchant.merchant.legalPerson }}</view>
					<input class="item-right" v-model="current.LegalPerson" :placeholder="i18n_merchant.merchant.legalPersonPlaceholder" />
				</view>
				<!-- 法人 -->
			</uni-forms-item>
			<uni-forms-item v-if="isMerch" name="BankName">
				<!-- 开户行 -->
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_merchant.merchant.bankName }}</view>
					<input class="item-right" v-model="current.BankName" :placeholder="i18n_merchant.merchant.bankNamePlaceholder" />
				</view>
				<!-- 开户行 -->
			</uni-forms-item>
			<uni-forms-item v-if="isMerch" name="BankAccount">
				<!-- 开户账号 -->
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_merchant.merchant.bankAccount }}</view>
					<input class="item-right" v-model="current.BankAccount" type="number"
						:placeholder="i18n_merchant.merchant.bankAccountPlaceholder" />
				</view>
				<!-- 开户账号 -->
			</uni-forms-item>
			<!-- 其他 -->
		</uni-forms>
		<!-- 编辑和删除页-->
		<view v-if="false" class="margin-lr margin-top padding round cu-btn bg-cyan" @click="edit">{{ i18n.button_edit }}
		</view>
		<view v-if="canDelete && false" class="margin-lr margin-top padding round cu-btn bg-red" @click="branchDelete">
			{{ i18n.button_delete }}</view>

		<!-- 底部按钮 -->
		<bottom-btns :btns="canDelete ? btn_lists_canEdit : btn_lists" @click="clickBottom"></bottom-btns>
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
				activeColor: this.global.params.activeColor,
				organ_default: this.global.statics.organ.organ_default,	// 组织对应图片
				// 系统相关消息
				canDelete: false, // 是否可删除
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
				rules: {
					MchNo: {
						rules: [{
							required: true,
							errorMessage: '请输入代码'
						}]
					},
					Name: {
						rules: [{
							required: true,
							errorMessage: '请输入名称'
						}]
					},
					Msg: {
						rules: [{
							required: true,
							errorMessage: '请输入描述信息'
						}]
					},
					Address: {
						rules: [{
							required: true,
							errorMessage: '请输入详细地址'
						}]
					},
					IndustryId: {
						rules: [{
							required: true,
							errorMessage: '请选择所属行业'
						}]
					},
					Type: {
						rules: [{
							required: true,
							errorMessage: '请至少选择一种商户类型'
						}]
					}
				}, // 验证
				logoInt: null, // Logo的初始化值
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
					name: '保存',
					icon: 'cuIcon-edit',
					clickName :'save'
				}], // 按钮组
				btn_lists_canEdit: [{
						name: '保存',
						icon: 'cuIcon-edit',
						clickName :'save'
					},
					{
						name: '删除',
						icon: 'cuIcon-delete',
						clickName :'delete',
						color : '#FF0000'
						
					}
				] // 按钮组-管理员
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
		onReady: function() {
			this.$refs.form.setRules(this.rules); // 初始化加载验证
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
				this.request_partOrg(this.BranchID); // 查询当前组织包含的门店
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
			/**判断是否可删除（组织的管理员）
			 * @param {Object} data
			 */
			canDeleteF: function(data) {
				this.canDelete = data;
			},
			/** 修改头像
			 * @param {Object} e
			 */
			changeLogo: function(e) {
				uni.chooseImage({
					count: 1, // 最多可选择图片张数
					success: function(result) {
						// 直接修改本地预览
						if (result.tempFilePaths.length == 1) {
							_self.current.Logo = result.tempFilePaths[0];
						}
					},
					fail: function(erros) {
						uni.showToast({
							title: '选择图片失败！',
							icon: 'none'
						});
					}
				});
			},
			/** 修改商户类型
			 * @param {Object} e
			 */
			changeType: function(e) {
				var value = e.detail.value;
				this.current.IsCust = value.indexOf(0) >= 0;
				this.current.isSup = value.indexOf(1) >= 0;
				this.current.isSvc = value.indexOf(2) >= 0;
			},
			/** 修改所在地区
			 * @param {Object} e
			 */
			changeArea: function(e) {
				var value = e.detail.value;
				this.current.Area1 = value.length >= 1 ? value[0].value : null;
				this.current.Area2 = value.length >= 2 ? value[1].value : null;
				this.current.Area3 = value.length >= 3 ? value[2].value : null;
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
			/** 修改当前组织信息
			 * @param {function} fail 验证失败后续操作
			 */
			edit: function(failF = null) {
				this.$refs['form'].submit()
					.then(result => {
						uni.showModal({
							title:  _self.i18n.modal_save_title,
							content:_self.i18n.modal_save_content,
							success:function(re){
								if(re.confirm){
									if (_self.logoInt != _self.current.Logo) {
										_self.updateMch_hasImg(_self.current);
									} else {
										_self.updateMch(_self.current); // 更新组织信息、
									}
								}
							}
						});
					})
					.catch(errors => {
						if (errors.length > 0) {
							uni.showToast({
								title: errors[0].errorMessage,
								icon: 'none'
							});
						}
						if (typeof(errors) === "function") {
							failF(errors);
						}
					})
			},
			/** 删除组织、门店
			 * @param {Object} e
			 */
			branchDelete: function(e) {
				uni.showModal({
					title: _self.i18n.deleteTitle,
					content: _self.i18n.deleteContent,
					success: function(result) {
						if (result.confirm) {
							_self.global.merchantR.deleteInfo({
								id: _self.BranchID,
								before: function() {
									uni.showLoading({
										title: _self.i18n.requestLoadingMessage
									});
								},
								success: function(data) {
									uni.hideLoading();
									if (Boolean(data)) {
										uni.showToast({
											title: _self.i18n.deleteSuccessMessage
										});
										// 1.5s后跳转top主页
										setTimeout(function() {
											uni.redirectTo({
												url: '/pages_basic/orgation/orgationdetail?MchId=' +
													_self.current.TopMchId
											})
										}, 1500);
										return;
									}
									uni.showToast({
										title: _self.i18n.deleteFailMessage,
										icon: 'none'
									});
								},
								fail: function() {
									uni.hideLoading();
									uni.showToast({
										title: _self.i18n.requestFailMessage,
										icon: 'none'
									});
								}

							});
						}
					}
				})

			},
			/** 点击按钮时间
			 * @param {String} name 要执行事件的名称
			 */
			clickBottom: function(name) {
				switch (name) {
					case 'save':
						this.edit();
						break;
					case 'delete':
						this.branchDelete();
						break;
					default:
						break;
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
			/** 查看当前组织所包含的门店
			 * @param {Object} MchId 组织Id
			 */
			request_partOrg: function(MchId) {
				if (this.organStatus != "more") {
					return;
				}
				// 获取组织信息
				this.global.merchantR.getListPage({
					data: {
						topMchId: MchId,
						pageIndex: _self.orgIndex,
						pageSize: _self.orgPageSize
					},
					before: function() {
						_self.organStatus = "loading";
						if (_self.orgIndex === 1) {
							_self.organization_list = [];
						}
					},
					success: function(data) {
						if (Boolean(data)) {
							_self.organization_list = _self.organization_list.concat(data);
							if (data.length >= _self.orgPageSize) {
								_self.organStatus = "more";
								_self.orgIndex++;
							} else {
								_self.organStatus = "noMore";
							}
							return;
						}
						_self.organStatus = "noMore";
					},
					fail: function() {
						_self.organStatus = "more";
					}
				})
			},
			/**更新当前组织信息-包括组织图片
			 * @param {Object} data
			 */
			updateMch_hasImg: function(data) {
				this.global.imgR.imgUpload({
					imgUrl: data.Logo,
					success: function(url) {
						data.Logo = url;
						_self.logoInt = url;
					},
					fail: function() {
						data.Logo = _self.logoInt;
					},
					complete: function() {
						_self.updateMch(data);
					}
				});
			},
			/** 更新当前组织信息
			 * @param {Object} data
			 */
			updateMch: function(data) {
				this.global.merchantR.updateInfo({
					data: data,
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success: function(data) {
						uni.hideLoading();
						if (Boolean(data)) {
							uni.navigateBack();
							uni.showToast({
								title: _self.i18n.editSuccessMessage
							});
						} else {
							uni.showToast({
								title: _self.i18n.editFailMessage,
								icon: 'none'
							});
						}
					},
					fail: function() {
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon: 'none'
						});
					}
				})
			},
			/** 删除当前组织请求
			 * @param {Object} MchId 组织Id
			 */
			deleteMch_request: function(MchId) {
				this.global.merchant.MchDelete_request({
					mchId: MchId,
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success: function(data) {
						uni.hideLoading();
						if (Boolean(data)) {
							uni.showToast({
								title: _self.i18n.deleteSuccessMessage
							});
						} else {
							uni.showToast({
								title: _self.i18n.deleteFailMessage,
								icon: 'none'
							});
						}
					},
					fail: function() {
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon: 'none'
						});
					}
				})
			},

			// ===============================================================================================================
		}
	}
</script>

<style scoped lang="scss">
	.page {
		height: calc(100vh -65px);
	}
	
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
