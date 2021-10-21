<template>
	<view class="flex flex-direction bg-white">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_order.repair.nameBasic }}</block>
		</cu-custom>
		<!-- 工单信息加载状态组件 -->
		<uni-load-more v-if="orderStatus != 'noMore'" :status="orderStatus" :contentText="orderLoadContentText"
			@clickLoadMore="getOrderByOrderId(OrderId)"></uni-load-more>
		<!-- 表单 -->
		<form>
			<!-- 工单类型 -->
			<view  class="cu-form-group">
				<view class="title text-bold">
					<text class="margin-right-xs">{{ i18n_order.repair.orderType }}</text>
				</view>
				<text class="text-grey">{{ current.OrderType == 'SnOrder' ? i18n_order.repair.snOrder : i18n_order.repair.cateOrder }}</text>
			</view>
			<!-- 标题：设备信息 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right">{{ i18n_order.repair.deviceBasic}}</view>
			<!-- SN: 设备SN码 -->
			<view v-if="current.OrderType === 'SnOrder'" class="cu-form-group padding-left-xl">
				<text class="title text-bold">{{ i18n_order.repair.deviceSn }}</text>
				<text class="text-grey">{{ current.DeviceSn? current.DeviceSn :'' }}</text>
			</view>
			<!-- SN: 设备名称 -->
			<view v-if="current.OrderType === 'SnOrder' " class="cu-form-group padding-left-xl">
				<text class="title text-bold">{{ i18n_order.repair.name }}</text>
				<text class="text-grey">{{ current.DeviceName ? current.DeviceName : '' }}</text>
			</view>
			<!--分类 -->
			<view   class="cu-form-group padding-left-xl" >
				<view class="title text-bold">
					<text class="margin-right-xs">{{ i18n_product.categoryTitle }}</text>
				</view>
				<text class="text-grey">{{ current.CategoryName ? current.CategoryName :'' }}</text>
			</view>
			<!-- 品牌 -->
			<view  class="cu-form-group padding-left-xl" >
				<view class="title text-bold">
					<text >{{ i18n_order.repair.brand }}</text>
				</view>
				<text class="text-grey">{{ current.Brand ? current.Brand :'' }}</text>
			</view>
			<!-- 品牌 -->
			<!-- Cate: 型号 -->
			<view class="cu-form-group padding-left-xl" >
				<text class="title text-bold">{{ i18n_product.modelTitle }}</text>
				<text class="text-grey">{{ current.Model ? current.Model:'' }}</text>
			</view>
			<!-- 型号 -->
			<!-- 所属门店 -->
			<view class="cu-form-group padding-left-xl">
				<text class="title text-bold">{{ i18n_order.repair.mch }}</text>
				<text class="text-grey">{{ current.MchName ? current.MchName :'' }}</text>
			</view>
			<!-- 设备地址 -->
			<view class="cu-form-group padding-left-xl text-df" name="Address">
				<text class="title text-bold">{{ i18n_order.repair.address }}</text>
				<text class="text-grey ">{{ current.Address ? current.Address :'' }}</text>
			</view>
			<!-- 标题：服务商 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">{{ i18n_order.repair.supName }}</view>
			<!-- 服务商 -->
			<view class="cu-form-group padding-left-xl" name="ServiceMchId">
				<text class="title text-bold">{{ i18n_order.repair.supName }}</text>
				<text class="text-grey">{{ svcMch.Name ? svcMch.Name :'' }}</text>
			</view>
			<!-- 联系电话 -->
			<view class="cu-form-group padding-left-xl" name="LinkTel">
				<text class="title text-bold">{{ i18n_order.repair.supLinkTel }}</text>
				<text class="text-grey">{{ svcMch.LinkTel?svcMch.LinkTel :'' }} {{ svcMch.LinkMan? '(' + svcMch.LinkMan + ')' :'' }}</text>
			</view>
			<!-- 故障描述及服务需求 -->
			<view class=" bg-cyan light text-xl padding-sm padding-left-xl padding-right cf ">
				<view class="fl text-bold">
					<text>{{ i18n_order.repair.orderMsg }}</text>
				</view>
				<navigator url="/pages/basic/product/problem/home?"
					class="fr cu-tag text-grey text-df bg-white padding-sm">
					<text class="margin-right-xs">{{ i18n_order.repair.orderProblem }}</text> <text>>></text>
				</navigator>
			</view>
			<view class="cu-form-group padding-left-xl" name="OrderMsg">
				<view class="text-grey ">
					{{ current.OrderMsg ? current.OrderMsg :'' }}
				</view>
			</view>
			<myfiles readonly :imgList="current.Imgs" :videoList="current.Videos" :fileList="current.Files"></myfiles>
			<!-- 联系人 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">{{ i18n.contact }}
			</view>
			<!-- 联系人姓名 -->
			<view class="cu-form-group padding-left-xl">
				<view class="title text-bold">
					<text>{{ i18n_order.repair.addUserName }}</text>
				</view>
				<view class="text-grey"> {{ current.AddUserName ? current.AddUserName :'' }} </view>
			</view>
			<!-- 联系电话 -->
			<view class="cu-form-group padding-left-xl">
				<view class="title text-bold">
					<text>{{ i18n_order.repair.addUserTel }}</text>
				</view>
				<view class="text-grey"> {{ current.AddUserTel ? current.AddUserTel :'' }}</view>
			</view>
		</form>
		
		<!-- 返回顶部 -->
		<u-back-top :scrollTop="scrollTop">
		</u-back-top>
		<!-- 返回顶部 -->
		
		<!-- 底部按钮 -->
		<bottom-btns v-if="canEdit" :btns="btn_list" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
		
	</view>
</template>

<script>
	/**
	 * 工单详情表
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				scrollTop : 0 ,							// 滚动条位置
				// 与系统有关参数
				OrderId: 0, 		// 工单Id 0
				orderLoadContentText:this.global.params.loadContentText, // 显示加载数据
				orderStatus: 'more', // 加载状态
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
					Videos:[],	// 视频组
					Files:[],	// 图片组
					IsTransfer: false, // 是否对工单进行转移
				}, // 当前值
				btn_list: this.global.params.btn_list_toEdit
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
			// 是否可进入编辑页面
			canEdit: function() {
				return this.current.TopMchId == this.global.organ.getIndustryId() &&  this.current.Status == ('Unprocessed' || 'Created' );
			}
		},
		onReady: function() {
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options); // 初始化加载参数
			this.getOrderByOrderId(this.OrderId);
			
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
			/** 点击底部按钮
			 * @param {String} name 底部按钮名称
			 */
			clickBottom : function(name){
				switch(name){
					case 'edit' :
						uni.navigateTo({
							url :'/pages_repair/repair?OrderId=' + _self.OrderId
						})
						break;
					default : break;
				}
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
						if(Boolean(data)){
							_self.orderStatus = "noMore";
							// 获取数据
							_self.current = data;
							_self.serverMch_request(data.MchId , data.CategoryId , data.ModelId); // 获取服务商信息
							return;
						}
						self.orderStatus = "more";
					},
					fail : function(){
						_self.orderStatus = "more";
					}
				});
			},
			// ================================================= 请求事件 ==========================================================
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

<style>

</style>
