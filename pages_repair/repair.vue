<template>
	<view class="flex flex-direction bg-white">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_order.repair.nameBasic }}</block>
		</cu-custom>
		<!-- 工单信息加载状态组件 -->
		<uni-load-more v-if="orderStatus != 'noMore' " :status="orderStatus" :contentText="orderLoadContentText"
			@clickLoadMore="getOrderByOrderId(OrderId)"></uni-load-more>
		<!-- 表单 -->
		<uni-forms ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
			<view  class="cu-form-group">
				<view class="title text-bold">
					<text class="margin-right-xs">{{ i18n_order.repair.orderType }}</text>
				</view>
				<text class="text-grey">{{ current.OrderType == 'SnOrder' ? i18n_order.repair.snOrder : i18n_order.repair.cateOrder }}</text>
			</view>
			<!-- 标题：设备信息 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right">设备信息</view>
			<!-- SN: 设备SN码 -->
			<view  v-if="current.OrderType === 'SnOrder' " class="cu-form-group box" name="DeviceSn">
				<text class="item-left">{{ i18n_order.repair.deviceSn }}</text>
				<text class="text-grey">{{ current.DeviceSn ? current.DeviceSn :'' }}</text>
			</view>
			<!-- SN: 设备名称 -->
			<view v-if="current.OrderType === 'SnOrder' " class="cu-form-group box">
				<text class="item-left">{{ i18n_order.repair.name }}</text>
				<text  class="text-grey">{{ product.Name ? product.Name :'' }}</text>
			</view>
			<!-- SN: 分类 -->
			<view v-if="current.OrderType === 'SnOrder' " class="cu-form-group box">
				<text class="item-left">{{ i18n_product.categoryTitle }}</text>
				<text class="text-grey">{{ product.CategoryName ? product.CategoryName :'' }}</text>
			</view>
			<!-- 品牌 -->
			<view v-if="current.OrderType === 'SnOrder' " class="cu-form-group box">
				<text class="item-left">{{ i18n_order.repair.brand }}</text>
				<text class="text-grey"> {{ product.BrandName ? product.BrandName :'' }}</text>
			</view>
			<!-- 品牌 -->
			<!-- SN: 型号 -->
			<view v-if="current.OrderType === 'SnOrder'" class="cu-form-group solid-bottom box">
				<text class="item-left">{{ i18n_product.modelTitle }}</text>
				<text class="text-grey">{{ product.Model ? product.Model :'' }}</text>
			</view>
			<!-- Cate: 分类 -->
			<uni-forms-item v-if="current.OrderType === 'CateOrder'" name="CategoryId">
				<view class="cu-form-group solid-bottom box" name="CategoryId">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_product.categoryTitle }}</text>
					</view>
					<luyj-data-picker class="item-right" v-model="current.CategoryId" :border="false" :placeholder="i18n_product.categoryPlaceholder" 
						 :preload="true" :localdata="category_list"
						:popup-title="i18n_product.categoryTitle" @change="changeCategory" >
					</luyj-data-picker>
				</view>
			</uni-forms-item>
			<!-- 品牌 -->
			<uni-forms-item v-if="current.OrderType === 'CateOrder'"  >
				<view class="cu-form-group solid-bottom box" >
					<text class="item-left">{{ i18n_order.repair.brand }}</text>
					<luyj-data-picker class="item-right" v-model="current.BrandId" :placeholder="i18n_order.repair.brandPlaceholder" :border="false" 
						 :preload="true" :localdata="brand_list"
						:popup-title="i18n_order.repair.brandTitle" @change="changeBrand">
					</luyj-data-picker>
				</view>
			</uni-forms-item>
			<!-- 品牌 -->
			<!-- Cate: 型号 -->
			<uni-forms-item v-if="current.OrderType === 'CateOrder'" name="ModelId">
				<view class="cu-form-group solid-bottom box" name="ModelId">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_product.modelTitle }}</text>
						<text class="text-red">*</text>
					</view>
					<luyj-data-picker class="item-right" v-model="current.ModelId" :placeholder="i18n_order.repair.modelPlaceholder" :border="false" 
						 :preload="true" :localdata="model_list"
						:popup-title="i18n_order.repair.modelTitle" @change="changeModel">
					</luyj-data-picker>
				</view>
			</uni-forms-item>
			<!-- 品牌 -->
			
			<!-- 所属门店  -->
			<uni-forms-item name="MchId">
				<view class="cu-form-group solid-bottom box" name="MchId">
					<text class="item-left">{{ i18n_order.repair.mch }}</text>
					<branch-select class="item-right" :mchId="current.MchId" @changeF="changeBranchF"></branch-select>
				</view>
			</uni-forms-item>
			<!-- 设备地址 -->
			<uni-forms-item name="Address">
				<view class="cu-form-group solid-bottom box" name="Address">
					<text class="item-left">{{ i18n_order.repair.address }}</text>
					<view class="text-grey">{{ current.Address ? current.Address :'' }}</view>
				</view>
			</uni-forms-item>
			<!-- 标题：服务商 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">{{ i18n_order.repair.supName }}</view>
			<!-- 服务商 -->
			<view class="cu-form-group box " name="ServiceMchId">
				<text class="item-left">{{ i18n_order.repair.supName }}</text>
				<text class="text-grey">{{ svcMch.Name ? svcMch.Name :'' }}</text>
			</view>
			<!-- 联系电话 -->
			<view class="cu-form-group box" name="LinkTel">
				<text class="item-left">{{ i18n_order.repair.supLinkTel }}</text>
				<text class="text-grey">{{ svcMch.LinkTel?svcMch.LinkTel :'' }}{{ svcMch.LinkMan?'(' + svcMch.LinkMan + ')':'' }}</text>
			</view>
			<!-- 故障描述 -->
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
			<!-- 故障描述及服务需求 -->
			<uni-forms-item  name="OrderMsg">
				<view class="cu-form-group padding-left-xl  text-df" name="OrderMsg">
					<textarea v-model="current.OrderMsg" :placeholder="i18n_order.repair.orderMsgPlaceholder" maxlength="-1"></textarea>
				</view>
			</uni-forms-item>
			
			<!-- 标题：相关图片 -->
			<luyj-choose-img :titleText="i18n_order.repair.imgs" title-class="bg-cyan light" :imgList="current.Imgs"
				@imgChange="changeImgs"></luyj-choose-img>

			<!-- 联系人 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">{{ i18n.contact }}
			</view>
			<!-- 联系人姓名 -->
			<uni-forms-item name="AddUserName">
				<view class="cu-form-group solid-bottom box" name="addUserName">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_order.repair.addUserName }}</text>
						<text class="text-red ">*</text>
					</view>
					<input class="item-right" v-model="current.AddUserName" :placeholder="i18n_order.repair.addUserNamePlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 联系电话 -->
			<uni-forms-item name="AddUserTel">
				<view class="cu-form-group box" name="addUserTel">
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
	 * 报障工单查看页
	 * @author 陆彦捷
	 * @description  编辑报障工单
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				scrollTop : 0 ,
				// 与系统有关参数
				orderLoadContentText:this.global.params.loadContentText, // 显示加载数据
				orderStatus: 'more', // 加载状态

				// 与系统有关参数
				MchId: this.global.organ.getIndustryId(), // 组织Id
				OrderId: 0, // 工单Id =0
				category_list: [], // 设备分类
				brand_list :[],	// 品牌列表
				model_list: [], // 型号
				changeBranch : null ,		// 修改门店的方法
				svcMch: {}, // 服务商信息
				ImgList: [], // 用于比对图片是否上传

				// 表单信息
				current: {
					OrderId: 0, // 工单Id
					DeviceSn: "", // SN码
					OrderType: "", // 工单类型   SnOrder ：按SN报障 ，  CateOrder  ： 按分类报障
					MchId: 0, // 所属门店
					Address: "", // 设备地址
					ServiceMchId: 0, // 服务商id
					CategoryId: 0, // 分类id
					ModelId: 0, // modelId
					// 个人信息(暂时不展示)(服务商查看时展示)
					AddUser: 0, // 添加人联系人
					AddUserName: "", // 添加人姓名
					AddUserTel: "", // 添加人联系电话
					OrderMsg: "", // 故障描述
					Imgs: [], // 图片
					IsTransfer: false, // 是否对工单进行转移
				}, // 当前值

				rules: {
					ModelId:{
						rules : this.global.rules.categoryId
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
				product: {}, // 获取的设备信息
				searchModel :{
					mchId : this.global.organ.getIndustryId(),		// 商户id
					categoryId : 0,									// 设备分类Id
					brandId : 0 ,									// 品牌id
				},		// 搜索型号的条件
				
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
		},
		onReady: function() {
			// 初始化表单验证
			this.$refs.form.setRules(this.rules);
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options); // 初始化加载参数
			// 获取表单信息
			this.getOrderByOrderId(this.OrderId);
		},
		onShow:function(){
			if(typeof(this.changeBranch) === "function"){
				this.changeBranch(function(item){
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
				this.OrderId = Boolean(options.OrderId) ? parseInt(options.OrderId) : 0; // 获取OrderId
			},
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
			/** 修改相关图片
			 * @param {Array} imgs
			 */
			changeImgs : function(imgs){
				this.current.Imgs = imgs;
			},
			/** 底部按钮
			 * @param {String} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'submit':
						this.submit('form');		// 提交工单
						break;
					default :break;
				}
			},
			/** 保存或提交工单
			 * @param {String} form 表单名称
			 */
			submit: function(form) {
				// 验证分类
				if (this.current.OrderType === "SnOrder" ) {
					delete this.rules.ModelId;
				}
				// 验证
				this.$refs[form].validate()
					.then((result) => {
						// 提交或保存当前工单
						let title = Boolean(_self.svcMch.MchId) ?  _self.i18n.modal_submit_title : _self.i18n_order.repair.noSupTitle;
						let content = Boolean(_self.svcMch.MchId) ?  _self.i18n.modal_submit_content : _self.i18n_order.repair.noSupContent;
						uni.showModal({
							title:  title,
							content: content,
							success: function(result) {
								if (result.confirm) {
									_self.submitSwitch(_self.current.Imgs); // 提交后续操作
								}
							}
						});
					})
					.catch((errors) => {
						_self.messageShow(errors);
					});
			},
			// ======================================== 公共方法 =========================================================
			/** 根据工单id 获取当前工单信息
			 * @param {Number} OrderId
			 */
			getOrderByOrderId: function(OrderId) {
				this.global.repairOrderR.getInfo({
					id : OrderId,
					before : function(){
						_self.orderStatus = "loading"; // 工单信息加载状态
					},
					success : function(data){
						// 获取数据
						_self.current = data;
						_self.current.Imgs = [];
						_self.orderImg_request(OrderId);
						if (Boolean(data.DeviceSn)) {
							_self.product_request(data.DeviceSn); // 获取设备信息
						}
						return;
					},
					fail : function(){
						// 请求失败执行操作
						_self.orderStatus = "noMore";
					},
					complete:function(){
						// 根据品类获取加载数据
						switch (_self.current.OrderType) {
							case 'CateOrder':
								_self.categories_request();		// 获取分类
								_self.getbrandTree();			// 获取品牌
								_self.serverMch_request(_self.current.MchId, _self.current.CategoryId, _self.current.ModelId); // 如果报障类型为分类报障，获取服务商
								break;
							default:
								break;
						}
					}
				});
			},
			
			// ======================================= 公共方法-提交 ======================================================
			/** 提交后续操作（保存/提交工单）(不包括验证及图片)
			 * @param {Boolean} isSubmit	是否提交
			 */
			submitSwitchNoImgs: function() {
				// 工单提交
				this.global.repairOrderR.updateInfo({
					data: _self.current,
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success: function(data , message) {
						uni.hideLoading();
						if (Boolean(data)) {
							uni.navigateBack({
								delta:2
							});
							uni.showToast({
								title: _self.i18n.requestSuccessMessage,
								icon: 'none'
							});
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
					},
					complete : function(){
						
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
					this.submitSwitchNoImgs(isSubmit);
				}
			},
			/** 相关图片上传
			 * @param {Array} Imgs	 图片地址
			 */
			orderImgUpload: function(Imgs) {
				this.global.imgR.imgListIncreUpload({
					imgs : Imgs,
					beforeImgs : _self.ImgList,		// 之前的图片
					success : function(data){
						_self.current.Imgs = data;
					},
					complete : function(){
						_self.submitSwitchNoImgs();
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
			/** 获取工单对应的图片列表
			 * @param {Object} OrderId 工单Id
			 */
			orderImg_request: function(OrderId) {
				this.global.repairOrderR.getImgList({
					id  : OrderId,
					before : function(){
						_self.current.Imgs = [];
					},
					success : function(data){
						_self.orderStatus = "noMore";
						_self.ImgList = data;
						if(data.length > 0){
							data.forEach(item => {
								_self.current.Imgs.push(item.Path);
							});
						}
					},
					fail :function(){
						_self.orderStatus = "more";
					},
				});
			},
			/** 根据SN获取设备信息
			 * @param {String} sn 设备的SM码
			 */
			product_request: function(sn) {
				this.global.deviceR.getInfoByData({
					data: {
						sn
					},
					success: function(data) {
						if(Boolean(data)){
							// 获取数据
							_self.product = data;
							// 当前门店
							_self.current.MchId = data.MchId; // 当前门店
							_self.current.Address = data.Address; // 门店地址
							_self.current.ServiceMchId = data.ServiceMchId; // 服务商id
							// 服务商信息
							_self.svcMch.MchId = data.SupplierMchId;
							_self.svcMch.Name = data.SupplierMchName;
							_self.svcMch.LinkMan = data.SupLinkMan;
							_self.svcMch.LinkTel = data.SupLinkTel;
							return;
						}
					},
				});
			},
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
						_self.svcMch = data;
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
		font-weight: bold;
	}
	.item-right{
		flex:1;
	}
}
</style>
