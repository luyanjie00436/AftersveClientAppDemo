<template>
	<view class="flex flex-direction">
		<!-- 标题 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{i18n_order.serviceOrderDetailName}}</block>
		</cu-custom>
		<!-- 工单主要信息 -->
		<view class="bg-cyan">
			<uni-load-more v-if="orderStatus != 'noMore' " color="#FFFFFF" :status="orderStatus"
				:contentText="orderLoadContentText" @clickLoadMore="init"></uni-load-more>
		</view>
		<navigator class="cf bg-cyan repair_box" :url="'/pages_repair/detail?OrderId=' + OrderId">
			<!-- 工单是否加载中 -->
			<view class="left  padding padding-left-xl text-df">
				<!-- 报障类型 -->
				<view class="left-item box">
					<view class="item-left">{{ i18n_order.repair.orderType }}</view>
					<view class="item-right">{{ currentOrder.OrderType === "SnOrder" ? i18n_order.repair.snOrder : i18n_order.repair.cateOrder }}</view>
				</view>
				<!-- 设备 -->
				<view v-if="OrderType === 'SnOrder'" class="left-item box">
					<view class="item-left">{{ i18n_order.repair.deviceSn }}</view>
					<view class="item-right">{{currentOrder.DeviceSn }}</view>
				</view>
				<!-- 设备名称： SN报修订单适用 -->
				<view v-if="OrderType === 'SnOrder'  " class="left-item box">
					<view class="item-left">{{ i18n_order.repair.name }}</view>
					<view class="item-right">{{ currentOrder.DeviceName }}</view>
				</view>
				<!-- 分类 -->
				<view v-if="OrderType === 'CateOrder' " class="left-item box">
					<view class="item-left">{{ i18n_order.repair.category }}</view>
					<view class="item-right">{{ currentOrder.CategoryName }}</view>
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
				<!-- 状态 -->
				<view class="left-item box">
					<view class="item-left">{{ i18n_order.repair.status }}</view>
					<view class="item-right">{{ cStatus }}</view>
				</view>
				<!-- 联系人 -->
				<view v-if="Boolean(currentOrder.AddUserTel)" class="left-item box">
					<view class="item-left">{{ i18n_order.repair.linkMan }}</view>
					<view class="item-right">{{ currentOrder.AddUserName }}({{ currentOrder.AddUserTel }})</view>
				</view>
				<!-- 提交时间 -->
				<view v-if="Boolean(currentOrder.CreateAt)" class="left-item box">
					<view class="item-left">{{ i18n_order.repair.createAt }}</view>
					<view class="item-right">
						<uni-dateformat format="yyyy-MM-dd hh:mm:ss" :date="currentOrder.CreateAt"></uni-dateformat>
					</view>
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
			<!-- 结束工单 -->
			<navigator v-if="cansuspend" class="fr margin-left"
				:url="'/pages_repair-order/server/suspend?OrderId=' + OrderId">
				<button class="cu-btn bg-red padding-lr">{{ i18n_order.order.btn_suspend }}</button>
			</navigator>
			<!-- 提交验收 ：-->
			<navigator v-if="canVaildation" class="fr margin-left"
				:url="'/pages_repair-order/server/repairsubmit?OrderId=' + OrderId + '&OrderNo=' + OrderNo">
				<button class="cu-btn bg-brown">{{ i18n_order.order.btn_canVaildation }}</button>
			</navigator>
			<!-- 工单转移  -->
			<navigator v-if="canTransfer" class="fr margin-left" url="" @tap="transferOrder">
				<button class="cu-btn bg-orange padding-lr">{{ i18n_order.order.btn_transfer }}</button>
			</navigator>
			<!-- 派工 -->
			<navigator v-if="canAssign" class="fr margin-left"
				:url="'/pages_repair-order/server/processing?OrderId=' + OrderId + '&OrderType=' + OrderType + '&DeviceSn=' + currentOrder.DeviceSn">
				<button class="cu-btn bg-orange padding-lr">{{ i18n_order.order.btn_assign }}</button>
			</navigator>
			<!-- 受理  -->
			<navigator v-if="canDispose" class="fr margin-left"
				:url="'/pages_repair-order/server/accept?OrderId=' + OrderId + '&OrderType=' + OrderType ">
				<button class="cu-btn bg-orange padding-lr">{{ i18n_order.order.btn_dispose }}</button>
			</navigator>
		</view>
		<!-- 弹出框 -->
	</view>
</template>

<script>
	/**
	 * (受理工单)工单跟踪
	 * @author 陆彦捷
	 * @description  受理工单跟踪 
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式有关参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				activeColor: this.global.params.activeColor,
				// 系统有关参数
				OrderId: 0, // 当前工单Id
				OrderNo: "", // 工单号
				OrderType: 'SnOrder', // 工单类型
				orderStatus: 'more', // 工单加载状态
				orderLoadContentText: this.global.params.loadContentText, // 显示加载数据
				logStatus: 'more', // 工单log状态
				loadingStatus: 'more', // 数据是否加载中
				logs_steps:[],		// 报障详情
				currentOrder: {}, // 当前工单值
				// 弹出框
				modalShowAcceptF: null, // 受理工单弹出框显示方法
				modalShowF: null, // 转交工单显示方法
			}
		},
		// 计算属性
		computed: {
			// 国际化
			i18n: function() {
				return this.$t('basic');
			},
			i18n_order: function() {
				return this.$t('order');
			},
			// 当前工单-是否可受理
			canDispose: function() {
				// 条件状态：未处理
				return this.currentOrder.Status === "Unprocessed";
			},
			// 是否可派工
			canAssign : function(){
				return this.currentOrder.Status === "SvcConfirmed";
			},
			// 当前工单-是否可转交
			canTransfer: function() {
				// 条件状态 ： 已受理、维修已确认、处理中
				return this.currentOrder.Status === "Unprocessed" && !Boolean(this.currentOrder.IsTransfer) && false;
			},
			// 确认工单
			canService: function() {
				return this.currentOrder.Status === "SvcConfirmed" && false;
			},
			// 当前工单-可提交验收
			canVaildation: function() {
				return this.currentOrder.Status === "Processing" ;
			},
			// 可结束工单
			cansuspend : function(){
				return Boolean(this.currentOrder.Status) && this.currentOrder.Status != 'Unprocessed' && this.currentOrder.Status != 'Created'
					&& this.currentOrder.Status != 'Checked ' && this.currentOrder.Status != 'Finished'
			},
			/**
			 * 当前的工单状态
			 */
			cStatus : function(){
				return this.global.repairOrderF.tranformStatusCNName(this.currentOrder.Status);
			}
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options); // 获取当前页面的参数
			
		},
		onShow : function(){
			this.init(); // 返回页面时重新获取工单信息
		},
		methods: {
			// ================================================= 初始化方法 ==========================================================
			/** 获取当前页面的参数
			 * @param {Object} options
			 */
			getParams: function(options) {
				this.OrderId = Boolean(options.OrderId) ? parseInt(options.OrderId) : 0;
			},
			/**
			 * 初始化获取
			 */
			init: function() {
				// 获取工单信息
				this.global.repairOrderR.getInfo({
					id: _self.OrderId,
					before: function() {
						// 请求前执行方法
						_self.orderStatus = 'loading';
					},
					success: function(data) {
						_self.orderStatus = 'noMore';
						if (Boolean(data)) {
							_self.currentOrder = data; // 工单信息
							_self.OrderType = data.OrderType; // 工单类型
							_self.OrderNo = data.OrderNo; // 获取工单号
						}
					},
					fail: function(errors) {
						_self.orderStatus = 'more';
					},
				});
				// 获取工单跟踪信息
				this.global.repairOrderR.getLogList({
					id : _self.OrderId,
					before : function(){
						_self.logStatus = 'loading';
					},
					success : function(data){
						// 请求成功后方法
						_self.logStatus = 'noMore';
						// 工单转换为步骤条
						_self.logs_steps = [];
						if (Boolean(data)) {
							data.forEach(item => {
								var title = item.Msg;
								var desc = "";
								if (Boolean(item.LinkMan)) {
									desc = '联系人:' + item.LinkMan + (Boolean(item.LinkTel) ? '(' + item
										.LinkTel + ')' : '') + '\n';
								}
								desc += new Date(item.CreateAt).toLocaleString() + '\n';
								_self.logs_steps.push({
									'title': title,
									'desc': desc
								});
							});
						}
					},
					fail : function(){
						_self.logStatus = 'more';
					}
				});
			},
			// ================================================= 监听事件 ============================================================
			/** 获取受理工单的方法
			 * @param {Object} func
			 */
			showAcceptModal: function(func) {
				this.modalShowAcceptF = func;
			},
			/**受理工单
			 * @param {Object} e
			 */
			disposeOrder: function(e) {
				if (typeof(this.modalShowAcceptF) === "function") {
					this.modalShowAcceptF();
				}
			},
			/** 转交工单的方法
			 * @param {Object} func 
			 */
			showTransModal: function(func) {
				this.modalShowF = func;
			},
			/** 转交工单
			 * @param {Object} e
			 */
			transferOrder: function(e) {
				if (typeof(this.modalShowF) === "function") {
					this.modalShowF();
				}
			},
			// ======================================================================================================================
		}
	}
</script>

<style lang="scss" scoped>
	.repair_box {
		display: -webkit-flex;
		/* Safari */
		display: flex;
		flex-wrap: row nowrap;
		width: 100vw;

		.left {
			width: 90vw;
			flex: 1;
			color: #EEEEEE;

			.left-item {
				padding-bottom: 10rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}

		.right {
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
</style>
