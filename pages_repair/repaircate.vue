<template>
	<view class="flex flex-direction bg-white">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_order.repair.cateOrder }}</block>
		</cu-custom>
		<!-- 表单 -->
		<uni-forms ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
			<!-- 标题：设备信息 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right">{{ i18n_order.repair.deviceBasic}}</view>
			<!-- 分类 -->
			<uni-forms-item  name="CategoryId">
			<view class="cu-form-group padding-left-xl solid-bottom box">
				<view class="item-left">{{ i18n_product.categoryTitle }}</view>
				<luyj-data-picker class="item-right" v-model="current.CategoryId" :border="false" :placeholder="i18n_product.categoryPlaceholder" 
					 :preload="true" :localdata="category_list"
					:popup-title="i18n_product.categoryTitle" @change="changeCategory" >
				</luyj-data-picker>
			</view>
			</uni-forms-item>
			<!-- 品牌 -->
			<uni-forms-item name="BrandId">
				<view class="cu-form-group padding-left-xl  solid-bottom box">
					<view class="item-left">{{ i18n_order.repair.brand }}</view>
					<luyj-data-picker class="item-right" v-model="current.BrandId" :placeholder="i18n_order.repair.brandPlaceholder" :border="false" 
						 :preload="true" :localdata="brand_list"
						:popup-title="i18n_order.repair.brandTitle" @change="changeBrand">
					</luyj-data-picker>
				</view>
			</uni-forms-item>
			<!-- 品牌 -->
			<!-- 型号 -->
			<uni-forms-item name="ModelId">
				<view class="cu-form-group padding-left-xl solid-bottom box">
					<view class="item-left">
						<text class="margin-right-sm">{{ i18n_product.modelTitle }}</text>
						<text class="text-red">*</text>
					</view>
					<luyj-data-picker class="item-right" v-model="current.ModelId" :placeholder="i18n_order.repair.modelPlaceholder" :border="false" 
						 :preload="true" :localdata="model_list"
						:popup-title="i18n_order.repair.modelTitle" @change="changeModel">
					</luyj-data-picker>
				</view>
			</uni-forms-item>
			<!-- 所属门店  -->
			<uni-forms-item name="MchId">
				<view class="cu-form-group padding-left-xl solid-bottom box" name="MchId">
					<view class="item-left">{{ i18n_order.repair.mch }}</view>
					<branch-select class="item-right" :mchId="current.MchId" @changeF="changeBranchF"></branch-select>
				</view>
			</uni-forms-item>
			<!-- 设备地址 -->
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
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">{{ i18n_order.repair.supName }}</view>
			<!-- 服务商 -->
			<view class="cu-form-group padding-left-xl text-df " name="ServiceMchId">
				<view class="title text-bold">{{ i18n_order.repair.supName }}</view>
				<view class="text-grey">{{ svcMch.Name ? svcMch.Name :'' }}</view>
			</view>
			<!-- 联系电话 -->
			<view class="cu-form-group padding-left-xl  text-df" name="LinkTel">
				<view class="title text-bold ">{{ i18n_order.repair.supLinkTel }}</view>
				<view class="text-grey">{{ svcMch.LinkTel?svcMch.LinkTel :'' }} {{ svcMch.LinkMan?'(' + svcMch.LinkMan + ')':'' }}</view>
			</view>
			
			<!-- 故障描述及服务需求 -->
			<view  class=" bg-cyan light text-xl padding-sm padding-left-xl padding-right cf ">
				<view class="fl text-bold">
					<text class="text-red margin-right-sm">*</text>
					<text>{{ i18n_order.repair.orderMsg }}</text>
				</view>
				<navigator url="/pages_basic/product/problem/home?"
					class="fr cu-tag text-grey text-df bg-white padding-sm  text-df">
					<text class="margin-right-xs">{{  i18n_order.repair.orderProblem }}</text> <text>>></text>
				</navigator>
			</view>
			<uni-forms-item  name="OrderMsg">
				<view class="cu-form-group padding-left-xl  text-df" name="OrderMsg">
					<textarea v-model="current.OrderMsg" :placeholder="i18n_order.repair.orderMsgPlaceholder" maxlength="-1"></textarea>
				</view>
			</uni-forms-item>
			<!-- 相关图片 -->
			<myfiles @loading="getLoading" @change="changeImgs"></myfiles>
			<!-- 联系人 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">{{ i18n.contact }}
			</view>
			<!-- 联系人姓名 -->
			<uni-forms-item name="AddUserName">
				<view class="cu-form-group padding-left-xl solid-bottom box" name="addUserName">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_order.repair.addUserName }}</text>
						<text class="text-red ">*</text>
					</view>
					<input class="item-right" v-model="current.AddUserName" :placeholder="i18n_order.repair.addUserNamePlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 联系电话 -->
			<uni-forms-item name="AddUserTel">
				<view class="cu-form-group padding-left-xl  text-df box" name="addUserTel">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_order.repair.addUserTel }}</text>
						<text class="text-red ">*</text>
					</view>
					<input class="item-right" v-model="current.AddUserTel" :placeholder="i18n_order.repair.addUserTelPlaceholder" />
				</view>
			</uni-forms-item>
		</uni-forms>
		
		<!-- 返回顶部 -->
		<u-back-top :scrollTop="scrollTop">
		</u-back-top>
		<!-- 返回顶部 -->
		<!-- 底部按钮 -->
		<bottom-btns  :btns="btn_list" @click="clickBottom"></bottom-btns>
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
				scrollTop : 0 ,
				// 与系统有关参数
				MchId: this.global.organ.getIndustryId(), // 组织Id
				UserId: this.global.login.getUserId(), // 当前用户id
				category_list :[],			// 设备分类
				brand_list :[],	// 品牌列表
				model_list: [], // 型号
				changeBranch : null ,		// 修改门店的方法
				svcMch: {}, // 服务商信息
				filesLoading : false,	// 文件是否上传中
				// 表单信息
				current: {
					OrderId: 0, // 工单Id
					OrderType: "CateOrder", // 工单类型   SnOrder ：按SN报障 ，  CateOrder  ： 按分类报障
					MchId: this.global.organ.getBranchId(), // 所属门店
					Address: "", // 设备地址
					CategoryId: 0, // 分类id
					BrandId : 0 ,	// 品牌Id
					ModelId: 0, // modelId
					// 个人信息(暂时不展示)(服务商查看时展示)
					AddUser: 0, // 添加人联系人
					AddUserName: "", // 添加人姓名
					AddUserTel: "", // 添加人联系电话
					OrderMsg: "", // 故障描述
					Files:[],	// 文件
					IsTransfer: false, // 是否对工单进行转移
				}, // 当前值

				rules: {
					ModelId:{
						rules : this.global.rules.modelId
					},
					OrderMsg: {
						rules: [{
							required: true,
							errorMessage: '请输入故障描述及服务需求'
						}]
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
				
				searchModel :{
					mchId : this.global.organ.getIndustryId(),		// 商户id
					categoryId : 0,									// 设备分类Id
					brandId : 0 ,									// 品牌id
				},		// 搜索型号的条件
				isSubmit : false,			// 是否提交submit
				btn_list : this.global.params.btn_list_commit
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
			i18n_order : function(){
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
		},
		onReady: function() {
			// 初始化表单验证
			this.$refs.form.setRules(this.rules);
		},
		onLoad: function(options) {
			_self = this;
			this.categories_request();		// 获取设备分类
			this.getbrandTree();			// 获取品牌信息
			this.getCurrentBranch();		// 获取当前门店信息
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
		onShow:function(){
			// 获取修改门店，及其地址
			if(typeof(this.changeBranch) === "function"){
				this.changeBranch(function(item){
					_self.current.MchId = item.MchId;
					_self.current.Address = item.Address;
					_self.serverMch_request(item.MchId , _self.current.CategoryId, _self.current.ModelId);
				});
			}
		},
		// 滚动条事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// ============================================ 监听事件 ==================================================================
			/** 修改分类
			 * @param {Object} e
			 */
			changeCategory: function(e) {
				this.serverMch_request(this.current.MchId, this.current.CategoryId, this.current.ModelId); // 获取服务商信息
			},
			/** 修改品牌执行方法
			 * @param {Object} e
			 */
			changeBrand : function(e){
				let value = e.detail.value;
				if(Array.isArray(value)){
				 	if( value.length > 0 ){
						this.current.ModelId = null;
						this.models_request(this.current.CategoryId , value[value.length -1].value);
					}
				}
				this.serverMch_request(this.current.MchId, this.current.CategoryId, this.current.ModelId); // 获取服务商信息
			},
			/** 修改型号
			 * @param {Object} e
			 */
			changeModel : function(e){
				this.serverMch_request(this.current.MchId, this.current.CategoryId, this.current.ModelId); // 获取服务商信息
			},
			/** 获取修改门店的方法
			 * @param {Function} func 方法名称
			 */
			changeBranchF : function(func){
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
			clickBottom : function(name){
				switch(name){
					case 'submit':
						this.submit('form');		// 保存或提交工单
						break;
					default :break;
				}
			},
			
			/** 保存或提交工单
			 * @param {String} form 表单名称
			 */
			submit: function(form) {
				// 验证
				this.$refs[form].validate()
					.then((result) => {
						let title = Boolean(_self.svcMch.MchId) ?  _self.i18n.modal_submit_title : _self.i18n_order.repair.noSupTitle;
						let content = Boolean(_self.svcMch.MchId) ?  _self.i18n.modal_submit_content : _self.i18n_order.repair.noSupContent;
						uni.showModal({
							title:  title,
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
			/** 根据门店、分类、型号获信息
			 * @param {Object} mchId 门店Id
			 * @param {Object} categoryId 分类Id
			 * @param {Object} modelId 型号id
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
					success: function(data , message) {
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
			/** 提交后续操作（是否上传图片、保存/提交工单）
			 * @param {Arra} Imgs 需要上传的图片数组
			 */
			submitSwitch: function(Imgs) {
				Imgs = Boolean(Imgs) ? Imgs : [];
				if (Imgs.length > 0) {
					this.orderImgUpload(Imgs);
				} else {
					this.submitSwitchNoImgs();
				}
			},
			/** 相关图片上传(递归调用)
			 * @param {Array} Imgs 图片地址数组
			 */
			orderImgUpload: function(Imgs) {
				this.global.imgR.imgListUpload({
					imgs : Imgs,
					success : function(data){
						_self.current.Imgs = data;
					},
					complete : function(){
						_self.submitSwitchNoImgs();
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
			/**
			 * 分类请求
			 */
			categories_request: function() {
				this.global.categoryR.getTrees({
					mchId : _self.MchId,
					success :function(data){
						_self.category_list = _self.global.changeobjF.change(data,
									"CategoryId", "Name", "Children");
					}
				});
			},
			/**
			 * 获取品牌
			 */
			getbrandTree : function(){
				this.global.brandR.getTree({
					data :{
						mchId : _self.MchId,
					},
					success : function(data){
						_self.brand_list = _self.global.changeobjF.change(data,
									"BrandId", "Name", "Children");
					}
				});
			},
			/**
			 * 型号列表请求
			 * @param {int} CategoryId 分类id 
			 * @param {int} BrandId 品牌Id
			 */
			models_request: function(CategoryId , BrandId) {
				this.global.modelR.getTree({
					data : {
						mchId : _self.MchId,
						categoryId : CategoryId,
						brandId : BrandId
					},
					success : function(data){
						_self.model_list = data;
					},
				});
			},
			/**
			 * 获取当前门店
			 */
			getCurrentBranch : function(){
				this.global.merchantR.getInfo({
					id : _self.current.MchId,
					success : function(data){
						_self.current.Address = data.Address;		// 当前门店地址
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
	font-size: 28rpx;
	.item-left {
		width: 180rpx;
		text-align: justify;
		font-size: 28rpx;
		font-weight: bold;
	}
	.item-right{
		flex:1;
		font-size: 28rpx;
	}
}
</style>
