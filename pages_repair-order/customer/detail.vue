<template>
	<view class="flex flex-direction">
		<!-- 标题 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_order.detailName }}</block>
		</cu-custom>
		<!-- 工单主要信息 -->
		<view class="bg-cyan">
			<uni-load-more v-if="orderStatus != 'noMore' " color="#FFFFFF" :status="orderStatus" :contentText="orderLoadContentText"
				@clickLoadMore="init"></uni-load-more>
		</view>
		<navigator class="cf bg-cyan repair_box"
			:url="'/pages_repair/detail?OrderId=' + OrderId">
			<!-- 工单内容 -->
			<view class="left  padding padding-left-xl text-df">
				<!-- 报障方式 -->
				<view class="left-item box">
					<view class="item-left">{{ i18n_order.repair.orderType }}</view>
					<view class="item-right">{{ currentOrder.OrderType == 'SnOrder' ?  i18n_order.repair.snOrder : i18n_order.repair.cateOrder }}</view>
				</view>
				<!-- SN : SN码 -->
				<view v-if="OrderType === 'SnOrder'" class="left-item box">
					<view class="item-left">{{ i18n_order.repair.deviceSn }}</view>
					<view class="item-right">{{ Boolean(currentOrder.DeviceSn) ? currentOrder.DeviceSn :'' }}</view>
				</view>
				<!-- SN : 名称 -->
				<view v-if="OrderType === 'SnOrder' " class="left-item box">
					<view class="item-left">{{ i18n_order.repair.name }}</view>
					<view class="item-right">{{ Boolean(currentOrder.DeviceName) ? currentOrder.DeviceName :'' }}</view>
				</view>
				<!-- 型号 -->
				<view  v-if="Boolean(currentOrder.CategoryName) || Boolean(currentOrder.Brand) || Boolean(currentOrder.Model)" class="left-item box">
					<view class="item-left">
						<text>{{ i18n_order.repair.model }}</text>
					</view>
					<view class="item-right">
						<text v-if="Boolean(currentOrder.CategoryName)">{{ currentOrder.CategoryName }} > </text>
						<text v-if="Boolean(currentOrder.Brand)">{{ currentOrder.Brand }} > </text>
						<text v-if="Boolean(currentOrder.Model)">{{ currentOrder.Model }}</text>
					</view>
				</view>
				<!-- 故障描述 -->
				<view v-if="Boolean(currentOrder.OrderMsg)" class="text-cut left-item box">
					<view class="item-left">{{ i18n_order.repair.orderMsg }}</view>
					<view class="item-right ">{{ currentOrder.OrderMsg }}</view>
				</view>
				<!-- 服务商 -->
				<view class="text-cut left-item box">
					<view class="item-left">{{ i18n_order.repair.supName }}</view>
					<view class="item-right">{{ currentOrder.ServiceMchName ?currentOrder.ServiceMchName :'' }}</view>
				</view>
				<!-- 状态 -->
				<view class="left-item box">
					<view class="item-left">{{ i18n_order.repair.status }}</view>
					<view class="item-right">{{ cStatus }}</view>
				</view>
				<!-- 提交时间 -->
				<view v-if="Boolean(currentOrder.CreateAt)" class="left-item box">
					<view class="item-left">{{ i18n_order.repair.createAt }}</view>
					<uni-dateformat class="item-right" format="yyyy-MM-dd hh:mm:ss" :date="currentOrder.CreateAt"></uni-dateformat>
				</view>
			</view>
			<view class="right ">
				<view class="text-xxl ">
					<text class="cuIcon cuIcon-right text-center "></text>
				</view>
			</view>
		</navigator>
		<!-- 步骤条 -->
		<order-steps :status="currentOrder.Status"></order-steps>
		<!-- 报障详情-步骤条 -->
		<view class="cu-bar bg-white margin-top-sm solid-bottom">
			<view class="action text-bold">
				{{ i18n_order.logdetailName }}
			</view>
			<view class="action">
				<button class="bg-cyan cu-btn padding-lr-xl" open-type="contact">{{i18n.contactTitle }}</button>
			</view>
		</view>
		<view class="bg-white padding">
			<uni-load-more v-if="logStatus != 'noMore' " :status="logStatus" :contentText="orderLoadContentText"
				@clickLoadMore="init"></uni-load-more>
			<luyj-steps :options="logs_steps" direction="column" :columnLine="false" :active="logs_steps.length" :activeColor="activeColor">
			</luyj-steps>
		</view>
		<view class="cf padding bg-white">
			<!-- 再次报障 -->
			<navigator v-if="canReRepair" class="fr margin-left"
				:url="'/pages_repair/repairsn?DeviceSn=' + currentOrder.DeviceSn">
				<button class="cu-btn bg-brown">{{ i18n_order.order.btn_repair }}</button>
			</navigator>
			<!-- 评价 -->
			<navigator v-if="canRate" class="fr margin-left"
				:url="'/pages_repair-order/customer/rateorder?OrderId=' + OrderId ">
				<button class="cu-btn bg-orange padding-lr">{{ i18n_order.order.btn_rate }}</button>
			</navigator>
			<!-- 验收 -->
			<navigator v-if="canVaildation" class="fr margin-left" :url="'/pages_repair-order/customer/validation?OrderId=' + OrderId ">
				<button class="cu-btn bg-cyan padding-lr">{{ i18n_order.order.btn_valid }}</button>
			</navigator>
			<!-- 取消工单 -->
			<view v-if="canCancel" class="fr margin-left" @tap="cancelOrder">
				<button class="cu-btn bg-red">{{ i18n_order.order.btn_cancel }}</button>
			</view>
			<!-- 提交工单 -->
			<view v-if="canSubmit" class="fr margin-left" @tap="submitOrder">
				<button class="cu-btn bg-cyan">{{ i18n_order.order.btn_submit }}</button>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 工单跟踪
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式有关参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				activeColor : this.global.params.activeColor,
				// 系统有关参数
				OrderId: 0, // 当前工单Id
				OrderNo: "", // 工单号
				OrderType: 'SnOrder', // 工单类型
				orderStatus : 'more',			// 工单加载状态
				orderLoadContentText:this.global.params.loadContentText, // 显示加载数据
				logStatus: 'more', // 工单log状态
				currentOrder: {}, // 当前工单值
				currentLog: [], // 当前的工单Log
				logs_steps: [], // 报障详情步骤条
			}
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options); // 获取当前参数
		},
		onShow:function(){
			this.init(); // 获取初始化信息
		},
		computed: {
			/**
			 * 国际化
			 */
			i18n : function(){
				return this.$t('basic');
			},
			i18n_order : function(){
				return this.$t("order");
			},
			// 可提交
			canSubmit: function() {
				return this.currentOrder.Status === "Created";
			},
			// 可取消
			canCancel: function() {
				// 条件状态 ： 待受理
				return this.currentOrder.Status === 'Unprocessed';
			},
			// 可验收
			canVaildation: function() {
				// 条件状态 ： 待验收
				return this.currentOrder.Status === 'Uncheck';
			},
			// 可评价
			canRate: function() {
				// 条件状态 ：已完成
				return this.currentOrder.Status === 'Finished' && !this.currentOrder.IsPj;
			},
			// 可再次报障
			canReRepair: function() {
				// 条件状态 :已完成，且报障类型为Sn报障
				return (this.currentOrder.Status === 'Finished' && this.OrderType === 'SnOrder') || (this.currentOrder.Status === "Cancel" &&
					this.OrderType === "SnOrder");
			},
			/**
			 * 当前的工单状态
			 */
			cStatus : function(){
				return this.global.repairOrderF.tranformStatusCNName(this.currentOrder.Status);
			}
		},
		methods: {
			// ================================================= 初始化方法 ==========================================================
			/** 获取当前页面的参数
			 * @param {Object} options
			 */
			getParams: function(options) {
				// 订单Id
				this.OrderId = Boolean(options.OrderId) ?options.OrderId : 0;
				if(!Boolean(this.OrderId)){
					uni.navigateBack();
					uni.showToast({
						title: _self.i18n_order.noToastTitle,
						icon:'none'
					});
				}
			},
			/**
			 * 初始化方法
			 */
			init: function() {
				this.global.repairOrderR.getInfo({
					id: _self.OrderId,
					before: function() {
						_self.orderStatus = 'loading';
					},
					success: function(data) {
						_self.orderStatus = 'noMore';
						if(Boolean(data)){
							_self.currentOrder = data; // 工单信息
							_self.OrderType = data.OrderType; // 工单类型
							_self.OrderNo = data.OrderNo; // 获取工单号
						}
					},
					fail: function() {
						_self.orderStatus = 'more';
					}
				});
				// 获取工单跟踪信息
				this.global.repairOrderR.getLogList({
					id : _self.OrderId,
					before : function(){
						_self.logStatus = 'loading';
					},
					success : function(data){
						_self.logStatus = 'noMore'
						_self.currentLog = data;
						// 工单转换为步骤条
						_self.logs_steps  = [];
						if(Boolean(data)){
							data.forEach(item=>{
								var title = item.Msg;
								var desc = "";
								if(Boolean(item.LinkMan)){
									desc = '联系人:' + item.LinkMan + (Boolean(item.LinkTel) ? '(' + item.LinkTel + ')':'') + '\n';
								}
								desc += new Date( item.CreateAt).toLocaleString() + '\n';
								_self.logs_steps.push({'title' : title , 'desc' : desc});
							});
						}
					},
					fail : function(){
						_self.logStatus = 'more';
					}
				});
			},
			// ================================================= 监听事件 ============================================================
			/** 提交工单
			 * @param {Object} e
			 */
			submitOrder: function(e) {
				uni.showModal({
					title: '提交工单',
					content: '是否提交当前工单？',
					success: function(result) {
						if (result.confirm) {
							_self.global.repairOrderR.submitInfo({
								data: _self.currentOrder,
								before: function() {
									uni.showLoading({
										title: '工单提交中……'
									});
								},
								success: function(data , message) {
									uni.hideLoading();
									if (Boolean(data)) {
										uni.showToast({
											title: '工单提交成功！'
										});
										_self.init();
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
										title: '工单提交失败！',
										icon: 'none'
									});
								}
							});
						}
					}

				});
			},
			/** 取消工单
			 * @param {Object} e
			 */
			cancelOrder: function(e) {
				uni.showModal({
					title: '取消工单？',
					content: '是否取消工单？',
					success: function(result) {
						if (result.confirm) {
							_self.global.repairOrderR.cancelInfo({
								id :  _self.OrderId,
								before : function(){
									uni.showLoading();
								},
								success : function(data , message){
									uni.hideLoading();
									if(Boolean(data)){
										_self.init();
										uni.showToast({
											title:'工单取消成功！'
										});
										return;
									}
									uni.showToast({
										title: message,
										icon:'none'
									});
								},
								fail : function(){
									uni.hideLoading();
								}
							});
						}
					}
				});
			},
			/** 验收
			 * @param {Object} e
			 */
			validationOrder: function(e) {
				uni.showModal({
					title: '验收',
					content: '是否完成验收？',
					success: function(result) {
						if (result.confirm) {
							_self.global.repairOrderR.validatiaonInfo({
								data :{
									orderNo : _self.OrderNo
								},
								before : function(){
									uni.showLoading();
								},
								success : function(data , message){
									uni.hideLoading();
									if(Boolean(data)){
										uni.showToast({
											title: '验收完成!'
										});
										// 刷新当前数据
										setTimeout(function() {
											_self.init(); // 刷新当前数据
										}, 3000);
										return;
									}
									uni.showToast({
										title:message,
										icon:'none'
									});
								},
								fail : function(){
									uni.hideLoading();
								}
							});
						}
					}
				});
			},
			// ======================================================================================================================
		}
	}
</script>

<style scoped lang="scss" >
	.repair_box {
		display: -webkit-flex; /* Safari */
		display: flex;
		flex-wrap: row nowrap;
		width: 100vw;
		.left {
			width: 90vw;
			flex : 1;
			color: #EEEEEE;
			.left-item {
				padding-bottom: 10rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
		.right{
			width: 10vw;
			align-self: center;
			height: 100%;
		}
	}
	
	.box {
			display: flex;
			flex-direction: row;
			.item-left {
				width: 160rpx;
				text-align: justify;
				// 加粗
				font-weight: bold;
				// 字体-白色
				color: #FFFFFF;
			}
			.item-right{
				flex:1;
				// 溢出部分省略号
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
</style>
