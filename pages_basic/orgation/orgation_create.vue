<template>
	<view class="flex flex-direction bg-white">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ organtion_branch ? i18n_merchant.branch.branchcreate :i18n_merchant.merchant.merchantcreate }}</block>
		</cu-custom>

		<uni-forms :rules="rules" :value="current" ref="form" validate-trigger="bind" err-show-type="undertext">
			<view v-if="hasMch" class="cu-form-group solid-bottom box">
				<view class="item-left"> {{ i18n_merchant.isBrancText }}</view>
				<switch  v-model="organtion_branch"   @change="change_isBranch" class="cyan"
					:class="organtion_branch?'checked':''" :checked="organtion_branch?true:false"></switch>
			</view>
			<!-- 所属组织 -->
			<uni-forms-item v-if="organtion_branch" name="parentId">
				<view class="cu-form-group solid-bottom ">
					<view class="item-left">{{ i18n_merchant.branch.topMch }}</view>
					<!-- 下拉框，暂时不显示 -->
					<view>{{ TopMchName }}</view>
				</view>
			</uni-forms-item>
			<uni-forms-item name="mchNo" :border="true">
				<!-- 组织代码/门店代码 -->
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ organtion_branch ?  i18n_merchant.branch.mchNo : i18n_merchant.merchant.mchNo }}</text>
						<text class="text-red">*</text>
					
					</view>
					<input class="item-right" v-model="current.mchNo" :placeholder="organtion_branch? i18n_merchant.branch.mchNoPlaceholder: i18n_merchant.merchant.mchNoPlaceholder " name="mchNo"
						></input>
				</view>
				<!-- 组织代码/门店代码 -->
			</uni-forms-item>
			<!-- 名称 -->
			<uni-forms-item name="name">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ organtion_branch ? i18n_merchant.branch.name :i18n_merchant.merchant.name }}</text>
						<text class="text-red">*</text>
					</view>
					<input v-model="current.name" class="item-right" :placeholder="organtion_branch? i18n_merchant.branch.namePlaceholder:i18n_merchant.merchant.namePlaceholder" name="name"></input>
				</view>
			</uni-forms-item>
			<!-- 所属行业：总部 -->
			<uni-forms-item v-if="!organtion_branch" name="industryId">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_merchant.merchant.industry }}</view>
					<luyj-data-picker class="item-right" :placeholder="i18n_merchant.merchant.industryPlaceholder"
						:border="false" :value="current.industryId" :preload="true"
						:localdata="industry_list" :popup-title="i18n_merchant.merchant.industryTitle" @nodeclick="changeIndustry"></luyj-data-picker>
				</view>
			</uni-forms-item>
			<!-- 地区 -->
			<uni-forms-item name="area">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">{{ i18n_merchant.area }}</view>
					<luyj-data-picker ref="area" class="item-right" :placeholder="i18n_merchant.areaPlaceholder" :border="false"
						:value="area" :preload="true"
						:localdata="area_list" :popup-title="i18n_merchant.areaTitle" @change="changeArea" name="area"></luyj-data-picker>
				</view>
			</uni-forms-item>
			<view class="cu-form-group">
				<view class="action title text-bold">
					<text class="margin-right-xs">{{ i18n_merchant.address }}</text>
					<text class="text-red">*</text>
				</view>
			</view>
			<!-- 地址 -->
			<uni-forms-item name="address">
				<view class="cu-form-group solid-bottom">
					<textarea v-model="current.address" maxlength="-1" :placeholder="i18n_merchant.addressPlaceholder" name="address"
						></textarea>
				</view>
			</uni-forms-item>
			<!-- 商户类型 -->
			<uni-forms-item v-if="!organtion_branch" name="type">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_merchant.merchant.types }}</text>
						<text class="text-red">*</text>
					</view>
					<view class="item-right">
						<uni-data-checkbox :selectedColor="activeColor" :selectedTextColor="activeColor" :value="[0]" :localdata="range" multiple @change="changeType" name="type"></uni-data-checkbox>
					</view>
				</view>
			</uni-forms-item>
		</uni-forms>
		<button class="margin padding-lg bg-cyan cu-btn round" @click="create('form')">创建</button>
		<!-- 跳过此步骤 -->
		<navigator v-if="showSkip" url="" class="flex flex-direction" @tap="toSkip">
			<button class="margin padding-lg bg-grey cu-btn round">跳过此步骤</button>
		</navigator>
	</view>
</template>

<script>
	/** 创建组织、创建门店
	 * @description 创建组织
	 * @author 陆彦捷
	 * @description  创建组织、创建门店
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式有关参数
				preview: this.global.publicF.hasBack(), // 是否进入上一页
				activeColor: this.global.params.activeColor,	// 选中时选颜色
				// 系统有关参数
				currentPage: '', // 当前页面
				mearchLoading: false, // 组织是否加载中
				TopMchId: this.global.organ.getIndustryId(), // Top组织
				TopMchName: '', // Top组织名称
				organ_list: [], // 组织信息
				industry_list: [], // 行业信息
				area_list: [], // 区域信息列表
				// 提交数据
				organtion_branch: false, // 是否门店
				range: this.global.merchants.merType,	// 商户类型列表
				current: {
					parentId: 0, // 所属组织
					mchNo: '', // 组织机构代码
					name: '', // 名称(组织/门店名称)
					industryId: 12, // 所属行业Id(默认零售业)
					areacode: "", // 所在地区code
					area1: "", // 所在地区1
					area2: "", // 所在地区2
					area3: "", // 所在地区3
					address: '', // 地址
					IsCust: true, // 是否客户
					isSvc: false, // 是否服务商
					isSup: false, // 是否厂商
				}, // 当前表单值
				area: "", // 所在地区值
				rules: {
					mchNo: {
						rules: [{
							required: true,
							errorMessage: '请输入代码'
						}]
					},
					name: {
						rules: [{
							required: true,
							errorMessage: '请输入名称'
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: '请输入详细地址'
						}]
					},
					type: {
						rules: [{
							required: true,
							errorMessage: '请至少选择一种商户类型'
						}]
					}
				}, // 表单规则(行业和所在地区不验证)(组织暂时不验证)

			}
		},
		computed: {
			i18n: function() {
				return this.$t("basic");
			},
			i18n_merchant: function() {
				return this.$t("merchant");
			},
			// 是否展示跳过此步骤按钮
			showSkip: function() {
				return !(Boolean(this.global.login.getSkip()) || Boolean(this.global.organ.getBranchId()));
			},
			// 是否包含组织（Top）
			hasMch: function() {
				return Boolean(this.TopMchId);
			}
		},
		onReady: function() {
			this.$refs.form.setRules(this.rules);
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options); // 获取参数

			// 请求基本信息
			this.organ_request(); // 请求组织信息
			this.getTopMch(this.TopMchId); // Top组织信息
			this.industry_request(); // 请求行业信息
			this.area_request(); // 请求地区信息
		},
		methods: {
			// ========================================== 初始化 ===================================================
			/** 获取传参
			 * @param {Object} options
			 */
			getParams(options) {
				this.currentPage = options.currentPage ? options.currentPage : 'index'; // 当前页面属性
				this.organtion_branch = options.isBranch != 'false' ? Boolean(options.isBranch) : false;	// 是否创建门店
				if(this.organtion_branch){
					this.current.parentId = this.TopMchId; // 上级id,根据情况创建
				}
			},
			// ========================================== 监听事件 ===================================================
			/** 判断是否 门店
			 * @param {Object} e
			 */
			change_isBranch: function(e) {
				this.organtion_branch = e.detail.value;
				if (e.detail.value) {
					// 是门店（清除行业值）
					this.current.industryId = 0;
					// TODU 
					this.current.parentId = this.TopMchId; // 上级id,根据情况创建
				} else {
					// 不是门店（清除所属组织）
					this.current.parentId = 0;
				}
			},
			/** 修改所属组织
			 * @param {Object} index 索引
			 * @param {Object} item 当前项目
			 */
			changeParent: function(index, item) {
				this.current.parentId = item ? item.TopMchId : 0;
			},
			
			/** 修改行业 （点击行业选项时触发）
			 * @param {Object} item
			 */
			changeIndustry: function(item) {
				this.current.industryId = item.value;
			},
			/** 点击所在地区时(触发修改当前地区)
			 * @param {Object} e
			 */
			changeArea : function(e){
				var selectedArray = e.detail.value;
				var length = e.detail.value.length;
				// 分别获取area1、area2、area3的值
				this.current.area1 = length > 0 ? selectedArray[0].value : null;
				this.current.area2 = length > 1 ? selectedArray[1].value : null;
				this.current.area3 = length > 2 ? selectedArray[2].value : null;
			},
			/** 修改商户类型
			 * @param {Object} e
			 */
			changeType : function(e){
				var value = e.detail.value;
				this.current.IsCust = value.indexOf(0) >= 0 ;
				this.current.isSup = value.indexOf(1) >= 0;
				this.current.isSvc = value.indexOf(2) >= 0;
			},
			/**
			 * 跳过此步骤
			 * @param {Object} e
			 */
			toSkip: function(e) {
				this.global.login.setSkipTrue(); // 设置跳过此步骤为true
				// 跳转到主页
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			//==================================== 提交并验证 ==============================================
			/** 表单验证失败执行方法
			 * @param {Object} erros
			 */
			message_erros(erros) {
				// 验证手机号、验证码验证失败
				if (erros.length > 0) {
					uni.showToast({
						title: erros[0].errorMessage,
						icon: 'none'
					});
					return;
				}
			},
			/**
			 * 创建组织
			 * @param {String} form 表单名称
			 */
			create(form) {
				console.log(this.current);
				this.$refs[form]
					.submit()
					.then(res => {
						// 表单验证成功，创建组织
						_self.organ_create();
					})
					.catch(errors => {
						_self.message_erros(errors);
					});
			},
			// ========================================== 请求方法 ====================================================
			/**
			 * 请求所有组织机构
			 */
			organ_request() {
				this.global.merchantR.getListAll_merchant({
					before: function() {
						_self.mearchLoading = true;
					},
					success: function(data) {
						_self.mearchLoading = false;
						_self.organ_list = data;
						_self.organ_list.forEach(item => {
							item.label = item.Name + '(' + item.MchNo + ')';
						});
					},
					fail: function() {
						_self.mearchLoading = false;
					}
				});
			},
			/**获取Top组织信息
			 * @param {Object} MchId Top组织Id
			 */
			getTopMch: function(MchId) {
				this.global.merchantR.getInfo({
					id: MchId,
					success: function(data) {
						_self.TopMchName = data.Name;
					}
				});
			},
			/**
			 * 请求所有行业
			 */
			industry_request() {
				this.global.industryR.getTreesFormat({
					success: function(data) {
						_self.industry_list = data;
					}
				});
			},
			/**
			 * 请求所有地区
			 */
			area_request() {
				this.global.areaR.getTrees({
					success: function(data) {
						_self.area_list = data;
					}
				});
			},
			/**
			 * 创建组织 / 门店
			 */
			organ_create() {
				this.global.merchantR.addInfo({
					data: _self.current,
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success: function(data) {
						uni.hideLoading();
						// 设置组织
						if (Boolean(data)) {
							if (_self.hasMch) {
								// 已包含组织，提示创建成功
								uni.showToast({
									title: _self.i18n.addSuccessMessage
								});
							} else {
								// 不包含组织，引导页
								uni.showModal({
									title: '创建成功',
									content: '创建组织/' + _self.i18n.branch + '成功。点击确认进入引导页。',
									showCancel: false,
									success: (result) => {
										if (result.confirm) {
											uni.navigateTo({
												url: '/pages_basic/page_guid?'
											});
										}
									}
								});
							}
						} else {
							uni.showToast({
								title: _self.i18n.addFailMessage,
								icon: 'none'
							});
						}
					},
					fail: function(errors) {
						uni.hideLoading();
						var message = "";
						if (Boolean(errors.data)) {
							message = errors.data.ResultMsg;
						} else {
							message = _self.i18n.requestFailMessage;
						}
						uni.showToast({
							title: message,
							icon: 'none'
						});
					}
				});
			},
			// =================================================================================================================
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
