<template name="repair-order">
	<view class="flex flex-direction">
		<!-- 搜索框 : 查看工单的时候、搜索设备，暂时省略 -->
		<product-search v-if="false" bgColor="bg-cyan"></product-search>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan">
			<block slot="content">工单</block>
		</cu-custom>
		<!-- 导航条 -->
		<scroll-view scroll-x class=" nav padding-lr-xl bg-cyan light ">
			<view class="flex text-center text-cyan">
				<view v-if="showCustomerOrder && showServiceOrder" class="cu-item flex-sub" :class="Customer?'bg-white text-cyan ':''"
					@tap="tabSelect" :data-customer="true">
					报障工单
				</view>
				<!-- 受理工单：需要分为服务商受理工单和供应商受理工单 -->
				<view v-if="showServiceOrder && showCustomerOrder" class="cu-item flex-sub " :class="!Customer?'bg-white text-cyan':''"
					@tap="tabSelect" :data-customer="false">
					受理工单
				</view>
				<!-- <view v-if="showServiceOrder && showCustomerOrder" class="cu-item flex-sub " :class="!Customer?'bg-white text-cyan':''"
					@tap="tabSelect" :data-customer="false">
					受理工单(供应商)
				</view> -->
			</view>
		</scroll-view>

		<!-- 报障工单 -->
		<view v-if="Customer && showCustomerOrder">
			<scroll-view scroll-x class=" nav padding-lr-xl bg-white ">
				<view class="flex text-center text-grey">
					<view class="cu-item flex-sub" :class="item.value == customerCur ? 'text-cyan cur':''"
						v-for="(item, index) in customerStatus" :key="item.value" @tap="tabCustomer"
						:data-value="item.value">
						{{item.text}}
					</view>
				</view>
			</scroll-view>
			<!-- 保障工单列表 -->
			<uni-list>
				<repair-item-customer v-for="(item , index) in customer_list" :key="item.OrderId" :item="item">
				</repair-item-customer>
			</uni-list>
			<uni-load-more :contentText="loadContentText"  :status="customerLoadingStatus" @clickLoadMore="clickCustomerLoadMore"></uni-load-more>
		</view>
		<!-- 受理工单 -->
		<view v-if="!Customer && showServiceOrder">
			<scroll-view scroll-x class=" nav padding-lr-xl bg-white ">
				<view class="flex text-center text-grey">
					<view class="cu-item flex-sub " :class="item.value == serviceCur ? 'text-cyan cur':''"
						v-for="(item, index) in serviceStatus" :key="item.value" @tap="tabService"
						:data-value="item.value">
						{{item.text}}
					</view>
				</view>
			</scroll-view>
			<!-- 受理工单列表 -->
			<uni-list>
				<repair-item-service v-for="(item , index) in server_list" :key="item.OrderId" :item="item">
				</repair-item-service>
			</uni-list>
			<uni-load-more :contentText="loadContentText" :status="serviceLoadingStatus" @clickLoadMore="clickServiceLoadMore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	/**
	 * 工单
	 * @author 陆彦捷
	 * @property {Boolean} isCustomer 是否报障工单（默认值为true）
	 * @description  工单列表（包括报障工单和受理工单）
	 * 	工单状态包括 草稿 Created； 
	 * 		未处理 Unprocessed； 
	 * 		已受理 SvcConfirmed 
	 * 		维修已确认 RepairConfirm 
	 * 		处理中 Processing; 
	 * 		待验收 Uncheck;
	 * 		 已验收 Checked
	 * 		已完成 Finished
	 * 		取消 Cancel
	 */
	var _self;
	export default {
		// 输入参数
		props: {
			// 是否默认显示报障工单
			isCustomer: {
				type: Boolean,
				default: true
			},
			// 是否商户
			IsCust : {
				type :Boolean,
				default: false
			},
			// 是否厂商
			IsSup : {
				type: Boolean,
				default:false
			},
			// 是否服务商
			IsSvc :{
				type :Boolean,
				default:false
			}
		},
		data() {
			return {
				// 样式
				Customer: this.isCustomer, // 是否报障工单
				loadContentText: this.global.params.loadContentText, // 加载中
				// 系统参数
				MchId: this.global.organ.getBranchId(), // 当前组织/门店Id
				TopMchId: this.global.organ.getIndustryId(), // 当前组织id(Top)
				customerCur: 1, // 当前报障工单状态
				customerLoadingStatus: 'more', // 报障工单状态
				customerIndex: 1, // 当前工单页面
				customerSize: 10, // 每页工单数量（默认10）
				customerStatus: [{
						text: '全部',
						value: -1
					},
					// {text:'未提交',value : 0},
					{
						text: '待受理',
						value: 1
					},
					{
						text: '处理中',
						value: 2
					},
					{
						text: '待验收',
						value: 3
					},
					{
						text: '已完成',
						value: 4
					},
					{
						text: '已取消',
						value: 5
					},
				], // 报障工单状态
				customer_list: [], // 报障工单列表

				serviceCur: 0, // 当前受理工单状态
				serviceLoadingStatus: 'more', // 受理工单状态
				serviceIndex: 1, // 受理工单页码
				serviceSize: 10, // 受理工单每页数据量（默认10）
				serviceStatus: [{
						text: '全部',
						value: -1
					},
					{
						text: '待受理',
						value: 0
					},
					{
						text: '已受理',
						value: 1
					},
					{
						text: '处理中',
						value: 2
					},
					{
						text: '待验收',
						value: 3
					},
					{
						text: '已完成',
						value: 4
					},
				],
				server_list: [], // 受理工单列表
			}
		},
		watch:{
			isCustomer : function(val){
				this.Customer = val;
			}
		},
		computed: {
			// 显示报障工单
			showCustomerOrder: function() {
				return this.IsCust;
			},
			// 显示受理工单
			showServiceOrder: function() {
				return this.IsSup || this.IsSvc;
			}
		},
		created: function() {
			_self = this;
			// 初始化加载工单信息
			if (this.Customer) {
				// 报障工单
				var status = this.global.repairOrderF.tranformStatus(this.customerCur, "customer");
				this.getCustomerOrder(status, this.customerIndex, this.customerSize);
			} else {
				// 受理工单
				var status = this.global.repairOrderF.tranformStatus(this.serviceCur, "service");
				this.getServerOrder(status, this.serviceIndex, this.serviceSize);
			}
		},
		methods: {
			// ========================================= 监听事件 ===================================================
			/** 切换工单类型
			 * @param {Object} e 选中值：e.currentTarget.dataset.customer
			 * 	@value true 工单类型为保障工单
			 *  @value false 工单类型为受理工单
			 */
			tabSelect(e) {
				this.Customer = e.currentTarget.dataset.customer;
				if (e.currentTarget.dataset.customer) {
					// 加载报障工单数据
					this.customerIndex = 1; // 更改索引为1
					this.customerCur = 0; // 工单状态默认为0
					var status = this.global.repairOrderF.tranformStatus(this.customerCur, "customer");
					this.getCustomerOrder(status, this.customerIndex, this.customerSize);
				} else {
					// 加载受理工单数据
					this.serviceIndex = 1;
					this.serviceCur = 0; // 工单状态默认为0
					var status = this.global.repairOrderF.tranformStatus(this.serviceCur, "service");
					this.getServerOrder(status, this.serviceIndex, this.service);
				}
			},
			/** 切换报障工单状态
			 * @param {Object} e 选中值 e.currentTarget.dataset.value（Number）
			 */
			tabCustomer(e) {
				this.customerCur = e.currentTarget.dataset.value;
				var status = this.global.repairOrderF.tranformStatus(e.currentTarget.dataset.value, "customer");
				this.customerIndex = 1;
				this.getCustomerOrder(status, this.customerIndex, this.customerSize);
			},
			/**切换受理工单状态
			 * @param {Object} e 选中值 e.currentTarget.dataset.value（Number）
			 */
			tabService(e) {
				this.serviceCur = e.currentTarget.dataset.value;
				var status = this.global.repairOrderF.tranformStatus(e.currentTarget.dataset.value, "service");
				this.serviceIndex = 1;
				this.getServerOrder(status, this.serviceIndex, this.serviceSize);
			},
			/**
			 * 点击加载报障工单
			 */
			clickCustomerLoadMore: function() {
				if (this.customerLoadingStatus === "more") {
					this.customerIndex++; // 添加当前页面
					var status = this.global.repairOrderF.tranformStatus(this.customerCur, "customer"); // 获取当前工单的状态
					this.getCustomerOrder(status, this.customerIndex, this.customerSize);
				}
			},
			/**
			 * 点击加载受理工单
			 */
			clickServiceLoadMore: function() {
				if (this.serviceLoadingStatus === "more") {
					this.serviceIndex++; // 添加当前页面
					var status = this.global.repairOrderF.tranformStatus(this.serviceCur, "service"); // 获取当前工单的状态
					this.getServerOrder(status, this.serviceIndex, this.serviceSize);
				}
			},
			// ========================================== 公共方法 =======================================================
			/** 获取报障工单
			 * @param {String} status 状态
			 * @param {Number} index 索引
			 * @param {Number} pageSize 每页记录数
			 */
			getCustomerOrder: function(status, index = 1, pageSize = 10) {
				this.global.repairOrderR.getCustomerList({
					data: {
						topMchId: _self.TopMchId,
						// mchId: _self.MchId,
						orderName:'OrderId',
						isAsc:false,
						status : status,
						pageIndex: index,
						pageSize: pageSize,
					},
					before: function() {
						_self.customerLoadingStatus = "loading";
					},
					success: function(data) {
						// 提交成功时执行方法
						if (index === 1) {
							_self.customer_list = [];
						}
						if (Boolean(data)) {
							// 获取数据
							_self.customer_list = _self.customer_list.concat(data);
							// 数据状态
							if (data.length < pageSize) {
								// 没有更多数据了
								_self.customerLoadingStatus = "noMore";
							} else {
								// 还可以加载更多数据
								_self.customerLoadingStatus = "more";
							}
							return;
						}
						_self.customerLoadingStatus = "noMore";
					},
					fail: function() {
						// 提交失败时执行方法
						_self.customerLoadingStatus = "more";
					}
				});
			},
			/** 获取受理工单
			 * @param {String} status 工单状态
			 * @param {Number} index 索引
			 * @param {Number} pageSize 每页记录数
			 */
			getServerOrder: function(status, index = 1, pageSize = 10) {
				this.global.repairOrderR.getSeviceList({
					data: {
						svcMchId: _self.MchId,
						status: status,
						orderName:'OrderId',
						isAsc:false,
						pageIndex: index,
						pageSize: pageSize
					},
					before: function() {
						_self.serviceLoadingStatus = "loading";
					},
					success: function(data) {
						if (index === 1) {
							_self.server_list = [];
						}
						if (Boolean(data)) {
							// 获取数据
							_self.server_list = _self.server_list.concat(data);
							// 数据状态
							if (data.length < pageSize) {
								// 没有更多数据了
								_self.serviceLoadingStatus = "noMore";
							} else {
								// 还可以加载更多数据
								_self.serviceLoadingStatus = "more";
							}
							return;
						}
						_self.serviceLoadingStatus = "noMore";
					},
					fail: function(){
						_self.serviceLoadingStatus = "more";
					}
				});
			},
			// ===========================================================================================================
		}
	}
</script>

<style>

</style>
