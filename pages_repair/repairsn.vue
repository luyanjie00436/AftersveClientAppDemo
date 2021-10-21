<template>
	<view class="flex flex-direction bg-white">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_order.repair.snOrder }}</block>
		</cu-custom>
		<!-- 设备信息加载组件 -->
		<uni-load-more v-if="productStatus != 'noMore'" :status="productStatus" :contentText="productLoadContentText"
			@clickLoadMore="product_request(DeviceSn)"></uni-load-more>
		<!-- 表单 -->
		<uni-forms ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
			<!-- 标题：设备信息 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right">
				{{ i18n_order.repair.deviceBasic}}</view>
			<!-- SN: 设备SN码 -->
			<uni-forms-item name="DeviceSn">
				<view class="cu-form-group solid-bottom box" name="DeviceSn">
					<text class="item-left">{{ i18n_order.repair.deviceSn }}</text>
					<text class="text-grey">{{ Boolean(current.DeviceSn) ? current.DeviceSn :'' }}</text>
				</view>
			</uni-forms-item>
			<!-- SN: 设备名称 -->
			<view class="cu-form-group box ">
				<text class="item-left">{{ i18n_order.repair.name }}</text>
				<text class="text-grey">{{ Boolean(product.Name) ? product.Name : ''}}</text>
			</view>
			<!-- SN: 分类 -->
			<view class="cu-form-group box">
				<text class="item-left">{{ i18n_product.categoryTitle }}</text>
				<text class="text-grey">{{ Boolean(product.CategoryName) ? product.CategoryName :'' }}</text>
			</view>
			<!-- 品牌 -->
			<view class="cu-form-group box ">
				<text class="item-left">{{ i18n_order.repair.brand }}</text>
				<text class="text-grey"> {{ Boolean(product.BrandName) ? product.BrandName : '' }}</text>
			</view>
			<!-- 品牌 -->
			<!-- SN: 型号 -->
			<view class="cu-form-group solid-bottom box">
				<text class="item-left">{{ i18n_product.modelTitle }}</text>
				<text class="text-grey">{{ Boolean(product.ModelName) ? product.ModelName :'' }}</text>
			</view>
			<!-- 所属门店 : 所属门店和地址 (控件后期修改) -->
			<uni-forms-item name="MchId">
				<view class="cu-form-group solid-bottom box" name="MchId">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_order.repair.mch }}</text>
						<text class="text-red">*</text>
					</view>
					<branch-select class="item-right" :mchId="current.MchId" @changeF="changeBranchF"></branch-select>
				</view>
			</uni-forms-item>
			<!-- 设备地址 -->
			<uni-forms-item name="Address">
				<view class="cu-form-group solid-bottom box" name="Address">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_order.repair.address }}</text>
						<text class="text-red">*</text>
					</view>
					<input v-model="current.Address" :placeholder="i18n_order.repair.addressPlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 标题：服务商 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">
				{{ i18n_order.repair.supName }}</view>
			<!-- 服务商 -->
			<view class="cu-form-group box" name="ServiceMchId">
				<text class="item-left">{{ i18n_order.repair.svcName }}</text>
				<text class="text-grey">{{ svcMch.Name ? svcMch.Name :'' }}</text>
			</view>
			<!-- 联系电话 -->
			<view class="cu-form-group box" name="LinkTel">
				<text class="item-left">{{ i18n_order.repair.svcLinkTel }}</text>
				<text class="text-grey">{{ svcMch.LinkTel?svcMch.LinkTel :'' }}{{ svcMch.LinkMan? '（' + svcMch.LinkMan + ')':'' }}</text>
			</view>
			<!-- 故障描述及服务需求 -->
			<view class=" bg-cyan light text-xl padding-sm padding-left-xl padding-right cf ">
				<view class="fl text-bold">
					<text class="text-red margin-right-sm">*</text>
					<text>{{ i18n_order.repair.orderMsg }}</text>
				</view>
				<navigator url="/pages_basic/product/problem/home?"
					class="fr cu-tag text-grey text-df bg-white padding-sm  text-df">
					<text class="margin-right-xs">{{ i18n_order.repair.orderProblem }}</text> <text>>></text>
				</navigator>
			</view>
			<uni-forms-item name="OrderMsg">
				<view class="cu-form-group padding-left-xl text-df" name="OrderMsg">
					<textarea v-model="current.OrderMsg" :placeholder="i18n_order.repair.orderMsgPlaceholder"
						maxlength="-1"></textarea>
				</view>
			</uni-forms-item>
			<!-- 相关文件 -->
			<myfiles @loading="getLoading" @change="changeImgs"></myfiles>
			<!-- 联系人 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">{{ i18n.contact }}
			</view>
			<!-- 联系人姓名 -->
			<uni-forms-item name="AddUserName">
				<view class="cu-form-group padding-left-xl solid-bottom box" name="addUserName">
					<view class="title text-bold item-left">
						<text class="margin-right-xs">{{ i18n_order.repair.addUserName }}</text>
						<text class="text-red ">*</text>
					</view>
					<input class="item-right" v-model="current.AddUserName"
						:placeholder="i18n_order.repair.addUserNamePlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 联系电话 -->
			<uni-forms-item name="AddUserTel">
				<view class="cu-form-group padding-left-xl text-df box" name="addUserTel">
					<view class="title text-bold item-left">
						<text class="margin-right-xs">{{ i18n_order.repair.addUserTel }}</text>
						<text class="text-red ">*</text>
					</view> 
					<input class="item-right" v-model="current.AddUserTel" type="number"
						:placeholder="i18n_order.repair.addUserTelPlaceholder" />
				</view>
			</uni-forms-item>
		</uni-forms>

		<!-- 返回顶部 -->
		<u-back-top :scrollTop="scrollTop">
		</u-back-top>
		<!-- 返回顶部 -->
		<!-- 底部按钮 -->
		<bottom-btns :btns="btn_list" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * SN设备报障
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				scrollTop: 0,
				productLoadContentText: this.global.params.loadContentText, // 显示加载数据
				productStatus: 'more', // 加载状态
				product: {}, // 获取的设备信息
				// 与系统有关参数
				MchId: this.global.organ.getIndustryId(), // 组织Id
				UserId: this.global.login.getUserId(), // 当前用户id
				DeviceSn: '', // 设备SN
				changeBranch: null, // 修改门店的方法
				filesLoading : false,	// 文件是否上传中
				// 表单信息
				current: {
					OrderId: 0, // 工单Id
					OrderType: "SnOrder", // 工单类型   SnOrder ：按SN报障 ，  CateOrder  ： 按分类报障
					DeviceSn: "", // SN码
					MchId: this.global.organ.getIndustryId(), // 所属门店
					Address: this.global.organ.getAddress(), // 设备地址
					CategoryId: 0, // 分类id
					ModelId: 0, // modelId
					Files :'',	// 文件Id
					// 个人信息(暂时不展示)(服务商查看时展示)
					AddUser: 0, // 添加人联系人
					AddUserName: "", // 添加人姓名
					AddUserTel: "", // 添加人联系电话
					OrderMsg: "", // 故障描述
					IsTransfer: false, // 是否对工单进行转移
				}, // 当前值
				oldCurrent :{
					MchId:null,
					CategoryId: null,
					ModelId: null
				},
				rules: {
					OrderMsg: {
						rules: [{
							required: true,
							errorMessage: '请输入故障描述及服务需求'
						}]
					},
					// 所属门店
					MchId: {
						rules: this.global.rules.mchId,
					},
					// 门店地址
					address: {
						rules: this.global.rules.address,
					},
					// 联系人姓名
					AddUserName: {
						rules: [{
							required: true,
							errorMessage: '请输入姓名'
						}]
					},
					// 联系人电话号码
					AddUserTel: {
						rules: this.global.rules.mobile
					},
				}, // 验证
				svcMch: {}, // 当前服务商
				isSubmit : false,			// 是否提交submit

				btn_list: this.global.params.btn_list_commit
			}
		},
		computed: {
			// 国际化
			i18n: function() {
				return this.$t('basic');
			},
			i18n_product: function() {
				return this.$t('product');
			},
			i18n_order: function() {
				return this.$t("order");
			},
			// 是否保存
			isSave: function() {
				return false;
			}
		},
		watch:{
			// 文件是否加载中
			filesLoading : function(val){
				if(!val && this.isSubmit){
					uni.hideLoading();
					this.submitSwitchNoImgs();
					this.isSubmit = false;
				}
			},
			current:{
				handler:function(val){
					let isChange = val.MchId != this.oldCurrent.MchId || val.CategoryId != this.oldCurrent.CategoryId || val.ModelId != this.oldCurrent.ModelId;
					if(isChange){
						this.serverMch_request(val.MchId , val.CategoryId , val.ModelId);
					}
					this.oldCurrent.MchId = val.MchId;
					this.oldCurrent.CategoryId = val.CategoryId;
					this.oldCurrent.ModelId = val.ModelId;
				},
				deep: true
			}
		},
		onReady: function() {
			// 初始化表单验证
			this.$refs.form.setRules(this.rules);
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options); // 初始化加载参数
			this.product_request(this.DeviceSn); // 获取设备信息
			// 获取员工信息（联系人）
			this.global.staffR.getCurrentInfo({
				success: function(item) {
					// 加载联系人的基本信息
					if (Boolean(item)) {
						_self.current.AddUser = item.UserId;
						_self.current.AddUserName = item.Name;
						_self.current.AddUserTel = item.Mobile;
					}
				}
			});
		},
		onShow: function() {
			// 获取修改门店，及其地址
			if (typeof(this.changeBranch) === "function") {
				this.changeBranch(function(item) {
					_self.current.MchId = item.MchId;
					_self.current.Address = item.Address;
				});
			}
		},
		// 滚动条事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// ============================================ 初始化方法 ================================================================
			/** 获取初始化参数
			 * @param {Object} options 
			 */
			getParams: function(options) {
				this.DeviceSn = options.DeviceSn ? options.DeviceSn : ''; // 获取设备SN
				this.current.DeviceSn = this.DeviceSn;
			},
			// ============================================ 监听事件 ==================================================================
			/** 获取修改门店的方法
			 * @param {Function} func 方法名称
			 */
			changeBranchF: function(func) {
				this.changeBranch = func;
			},
			/** 获取文件的加载状态
			 * @param {Boolean} loading 文件（图片、视频、文件）是否加载中
			 */
			getLoading : function(loading){
				this.filesLoading = loading;
			},
			/**修改文件对象、数组
			 * @param {Array} files 文件对象数组
			 * @param {Array} fileIds 文件id数组
			 */
			changeImgs : function(files , fileIds){
				this.current.Files = fileIds.toString();
			},
			/** 提交底部按钮
			 * @param {String} name
			 */
			clickBottom: function(name) {
				switch (name) {
					case 'submit':
						this.submit('form'); // 保存或提交工单
						break;
					default:
						break;
				}
			},

			/** 保存或提交工单
			 * @param {String} form 表单名称
			 */
			submit: function(form) {
				// 验证
				this.$refs[form].validate()
					.then((result) => {
						let title = Boolean(_self.svcMch.MchId) ? _self.i18n.modal_submit_title : _self
							.i18n_order.repair.noSupTitle;
						let content = Boolean(_self.svcMch.MchId) ? _self.i18n.modal_submit_content : _self
							.i18n_order.repair.noSupContent;
						uni.showModal({
							title: title,
							content: content,
							success: function(result) {
								if (result.confirm) {
									if(_self.filesLoading){
										// 文件加载中，设置提交数据
										_self.isSubmit = true;
										uni.showLoading({
											title:_self.i18n.requestFileUpload
										});
									}else{
										// 提交文件
										_self.submitSwitchNoImgs(); // 提交后续操作(不包括图片上传)
									}
								}
							}
						});
					})
					.catch((errors) => {
						_self.messageShow(errors);
					});
			},
			// ======================================= 公共方法-提交 ======================================================
			
			/** 提交后续操作（保存/提交工单）(不包括验证及图片)
			 */
			submitSwitchNoImgs: function() {
				this.global.repairOrderR.submitInfo({
					data: _self.current,
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success: function(data, message) {
						uni.hideLoading();
						if (Boolean(data)) {
							_self.submitOrder_success(data);
							return;
						}
						uni.showToast({
							title: message,
							icon: 'none'
						});
					},
					fail: function(errors) {
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon: 'none'
						});
					}
				});
			},
			/**
			 *  工单提交成功后执行操作
			 *  @param {Number} OrderId 工单id
			 */
			submitOrder_success(OrderId) {
				uni.showModal({
					title: '提交成功',
					content: '工单提交成功！是否查看工单进度？',
					confirmText: '工单跟踪',
					cancelText: '工单列表',
					success: function(result) {
						// 工单进度页
						if (result.confirm) {
							uni.navigateTo({
								url: '/pages_repair-order/customer/detail?OrderId=' +
									OrderId
							});
							return;
						}
						// 工单列表页
						if (result.cancel) {
							uni.navigateTo({
								url: '/pages/index/index?PageCur=repair_order'
							});
							return;
						}
					}
				});
			},
			/** 展示错误提示信息
			 * @param {Object} errors 错误提示信息
			 */
			messageShow: function(errors) {
				if (errors.length > 0) {
					uni.showToast({
						title: errors[0].errorMessage,
						icon: 'none'
					});
				}
			},
			// ================================================= 请求事件 ==========================================================
			/** 根据SN获取设备信息
			 * @param {String} sn 设备的SM码
			 */
			product_request: function(sn) {
				this.global.deviceR.getInfoByData({
					data: {
						sn
					},
					before: function() {
						_self.productStatus = "loading"; // 设备状态为加载中
					},
					success: function(data) {
						if (Boolean(data)) {
							// 设备信息加载完成
							_self.productStatus = "noMore";
							// 获取数据
							_self.product = data;
							// 分类、型号
							_self.current.CategoryId = data.CategoryId;
							_self.current.ModelId = data.ModelId;
							return;
						}
					},
					fail: function(errors) {
						_self.productStatus = "more";
					}
				});
			},
			/** 根据门店、分类、型号获信息
			 * @param {Number} mchId 门店Id
			 * @param {Number} categoryId 分类Id
			 * @param {Number} modelId 型号id
			 */
			serverMch_request: function(mchId, categoryId, modelId) {
				this.global.merchantR.getSvcInfo({
					data: {
						mchId :mchId,
						categoryId : categoryId,
						vueId : modelId
					},
					success : function(data){
						if(Boolean(data)){
							_self.svcMch = data;
						}
					}
				});
			},
			// ====================================================================================================================

		}
	}
</script>

<style scoped lang="scss">
	.box {
		display: flex;
		flex-direction: row;
		padding-left: 50rpx;
		font-size: 28rpx;

		.item-left {
			width: 160rpx;
			text-align: justify;
			font-weight: bold; // 加粗
			font-size: 28rpx;
		}

		.item-right {
			flex: 1;
			font-size: 28rpx;
		}
	}
</style>
