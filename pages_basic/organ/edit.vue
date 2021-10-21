<template>
	<view>
		<!-- 判断是否登录 -->
		<is-login currentPage="index"></is-login>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_merchant.organ.nameBasic }}</block>
		</cu-custom>
		<!-- 导航栏 -->
		<uni-forms ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
			<!-- 编码 -->
			<uni-forms-item name="OrgNo">
				<view class="cu-form-group solid-bottom">
					<view class="title text-bold">
						<text class="margin-right-xs">{{ i18n_merchant.organ.orgNo }}</text>
						<text class="text-red">*</text>
					</view>
					<input v-model="current.OrgNo" :placeholder="i18n_merchant.organ.orgNoPlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 编码 -->
			<!-- 名称 -->
			<uni-forms-item name="Name">
				<view class="cu-form-group solid-bottom">
					<view class="title text-bold">
						<text class="margin-right-xs">{{ i18n_merchant.organ.orgName }}</text>
						<text class="text-red">*</text>
					</view>
					<input v-model="current.Name" :placeholder="i18n_merchant.organ.orgNamePlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 名称 -->
			<!-- 电话 -->
			<uni-forms-item name="Phone">
				<view class="cu-form-group solid-bottom">
					<view class="title text-bold">{{ i18n_merchant.organ.phone }}</view>
					<input v-model="current.Phone" :placeholder="i18n_merchant.organ.phonePlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 电话 -->
			<!-- 邮编 -->
			<uni-forms-item name="PostCode">
				<view class="cu-form-group solid-bottom">
					<view class="title text-bold">{{ i18n_merchant.organ.postCode }}</view>
					<input v-model="current.PostCode" :placeholder="i18n_merchant.organ.postCodePlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 邮编 -->
			<!-- 地址 -->
			<uni-forms-item name="Address">
				<view class="cu-form-group solid-bottom">
					<view class="title text-bold">{{ i18n_merchant.organ.address }}</view>
					<textarea v-model="current.Address"
						:placeholder="i18n_merchant.organ.addressPlaceholder"></textarea>
				</view>
			</uni-forms-item>
			<!-- 地址 -->
			<!-- 主管 -->
			<uni-forms-item name="Manages">
				<view class="cu-form-group solid-bottom">
					<view class="title text-bold" style="min-width: 60px;">{{ i18n_merchant.organ.manages}}</view>
					<staffs-selects-box style="width: 100%;" :orgId="current.OrgId"  @changeF="changeManagersF"></staffs-selects-box>
					<input v-show="false" v-model="current.Managers" />
				</view>
			</uni-forms-item>
			<!-- 主管 -->
			<!-- 上级部门 -->
			<uni-forms-item name="ParentId">
				<view class="cu-form-group solid-bottom">
					<view class="title text-bold">{{ i18n_merchant.organ.parentId }}</view>
					<luyj-data-picker :placeholder="i18n_merchant.organ.parentIdPlaceholder" style="width: 75%;"
						:border="false" :preload="true" :localdata="organtrees" :popup-title="i18n_organ.organTitle"
						@nodeclick="changeParentId" :value="current.ParentId">
					</luyj-data-picker>
				</view>
			</uni-forms-item>
			<!-- 上级部门 -->
			<!-- 排序 -->
			<uni-forms-item name="Sort">
				<view class="cu-form-group solid-bottom">
					<view class="title text-bold">{{ i18n_merchant.organ.sort}}</view>
					<input v-model="current.Sort" type="number" :placeholder="i18n_merchant.organ.sortPlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 排序 -->
		</uni-forms>
		<!-- 底部按钮 -->
		<bottom-btns :btns="current.OrgId > 0 ? btn_list_edit : btn_list_add" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 添加部门或编辑部门
	 * @author 陆彦捷
	 * @description  添加或编辑部门
	 */

	// 条件引入语言
	import lang from '@/common/variable/lang.js'; // 语言
	import zhCN from '../../utils/lang/zh-Cn.js'; // 中文
	var mylang;
	// 根据配置文件选择语言
	switch (lang.locale) {
		case 'zh-CN':
			mylang = zhCN;
			break;
		default:
			mylang = zhCN;;
			break;
	}

	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页

				// 与系统有关参数
				current: {
					OrgId: 0, // 部门id
					MchId: this.global.organ.getIndustryId(), // 组织Id
					OrgNo: "", // 部门编码
					Name: "", // 部门名称
					Phone: "", // 部门联系电话
					Managers: [], // 负责人(数组、对应员工id)
					PostCode: "", // 邮编
					Address: "", // 地址信息
					ParentId: 0, // 上级部门
					Sort: 0, // 排序
				},
				rules: {
					OrgNo: {
						rules: [{
							required: true,
							errorMessage: mylang.merchant.organ.orgNoPlaceholder
						}, ]
					},
					Name: {
						rules: [{
							required: true,
							errorMessage: mylang.merchant.organ.orgNamePlaceholder
						}, ]
					},
					Sort: {
						rules: this.global.rules.sort
					},
				}, // 验证规则
				staff_list: [], // 员工信息(用于选择部门负责人)
				changeManages : null ,	// 选择主管的方法
				fullorgTree: [], // 部门树形图
				organtrees: [], // 当前组织下的部门树形图
				btn_list_add: this.global.params.btn_list_add, // 添加状态按钮
				btn_list_edit: this.global.params.btn_list_edit // 编辑状态按钮
			};
		},
		computed: {
			// 国际化
			i18n : function(){
				return this.$t('basic');
			},
			i18n_merchant: function() {
				return this.$t('merchant');
			},
			i18n_organ: function() {
				return this.$t("organ");
			}
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options); // 初始化参数
			this.init_request(); // 初始化请求
			if(this.current.OrgId){
				this.getInfo(this.current.OrgId);
			}
		},
		onReady: function() {
			// 初始化表单验证
			this.$refs.form.setRules(this.rules);
		},
		onShow:function(){
			// 返回页面，修改主管
			if(typeof(this.changeManages) === "function"){
				this.changeManages(function(staffs , staffIds){
					_self.current.Managers = staffIds;
				});
			}
		},
		methods: {
			// ================================================ 初始化 =======================================================
			/** 初始化请求方法
			 * @param {Object} options
			 */
			getParams: function(options) {
				this.current.OrgId = Boolean(options.OrgId) ? options.OrgId : 0; // 部门Id
				this.current.MchId = Boolean(options.MchId) ? options.MchId : this.current.MchId; // 组织Id
				this.current.ParentId = Boolean(options.ParentId) ? options.ParentId : 0; // 上级Id
			},
			/**
			 * 初始化请求方法
			 */
			init_request: function() {
				// 请求部门树形图
				this.global.departmentR.getTrees({
					isFilter: true,
					orgId: _self.current.OrgId,
					data: {
						mchId: _self.current.MchId,
						loadMch: false,
						loadStaff: false,
						dataType: 1
					},
					success: function(fulldata, filterdata) {
						_self.fullorgTree = fulldata;
						_self.organtrees = filterdata;
						let temp = {
							text :'无',
							value: null
						};
						_self.organtrees.unshift(temp);
						
					}
				});
			},
			// ================================================ 监听事件 =====================================================
			/** 获取修改主管方法
			 * @param {Object} func
			 */
			changeManagersF : function(func){
				this.changeManages = func;
			},
			/** 修改上级部门
			 * @param {Object} e
			 */
			changeParentId: function(item) {
				this.current.ParentId = item.value;
			},
			/** 点击底部按钮
			 * @param {String} name
			 */
			clickBottom: function(name) {
				switch (name) {
					case 'edit':
						this.save('form');
						break;
					case 'delete':
						this.delete();
						break;
					default:
						break;
				}
			},
			/** 添加/编辑部门请求
			 * @param {String} form 表单名称
			 */
			save(form) {
				this.$refs[form]
					.submit()
					.then(res => {
						uni.showModal({
							title: _self.i18n.modal_save_title,
							content: _self.i18n.modal_save_content,
							success:function(result){
								if(result.confirm){
									_self.saveInfo();
								}
							}
						});
					})
					.catch(errors => {
					});
			},
			/**
			 * 删除部门
			 */
			delete : function(){
				uni.showModal({
					title: _self.i18n.modal_delete_title,
					content: _self.i18n.modal_delete_content,
					success:function(result){
						if(result.confirm){
							_self.deleteInfo(_self.current.OrgId);
						}
					}
				});
			},
			// =========================================== 请求数据 ===================================================================
			/** 获取当前部门信息
			 * @param {Number} orgId 部门Id
			 */
			getInfo : function(orgId){
				this.global.departmentR.getInfo({
					id : orgId,
					before : function(){
						uni.showLoading({
							title:_self.i18n.requestLoadingMessage
						});
					},
					success:function(data){
						uni.hideLoading();
						if(Boolean(data)){
							_self.current = data;
							_self.current.ParentId = _self.current.ParentId? _self.current.ParentId.toString() :null;		// 将上级部门改为字符串类型（为了显示）
						}
					},
					fail:function(){
						uni.hideLoading();
					}
				});
			},
			/**
			 * 保存部门信息
			 */
			saveInfo : function(){
				var func = _self.current.OrgId != 0 ? _self.global.departmentR.updateInfo : _self.global.departmentR.addInfo;
				func({
					data : _self.current,
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success : function(data){
						// 请求成功后执行方法
						uni.hideLoading();
						uni.navigateBack();		// 返回到上一页
						uni.showToast({
							title: _self.current.OrgId != 0 ? '更新成功' : '添加成功',
						});
					},
					fail : function(errors){
						uni.hideLoading();
						var temp = '系统错误';
						if (Boolean(errors.statusCode)) {
							temp = errors.data.ResultMsg
						}
						uni.showToast({
							title: temp,
							icon: 'none'
						});
					}
				});
			},
			/** 根据id删除当前部门信息
			 * @param {Number} id 部门id
			 */
			deleteInfo : function(id){
				this.global.departmentR.deleteInfo({
					id : id,
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success : function(data , message){
						// 请求成功后执行方法
						uni.hideLoading();
						if(Boolean(data)){
							uni.navigateBack();		// 返回到上一页
							uni.showToast({
								title: _self.i18n.deleteSuccessMessage,
							});
							return;
						}
						uni.showToast({
							title:message,
							icon:'none'
						});
					},
					fail : function(errors){
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon: 'none'
						});
					}
				});
			},
			// =======================================================================================================================
		}
	}
</script>

<style>

</style>
