<template name="repair">
	<view class="flex flex-direction">
		<!-- 头部导航 -->
		<cu-custom bgColor="bg-white" >
			<block slot="content">{{ i18n_order.repairName }}</block>
		</cu-custom>
		<!-- 背景 ： 天青色 -->
		<view class="padding-sm bg-gradual-cyan" >
			<!-- SN码报障 -->
			<luyj-search-bar cancelColor="#F8F8F8"  :placeholder="i18n_order.repairSnPlaceholder" radius="80" @confirm="toSearch"></luyj-search-bar>
			<!-- SN码报障和型号报障搜索单 -->
			<view  class="grid  text-center col-2 ">
				<view class="padding  text-xsl flex flex-direction" @click="snScan">
					<text class="cuIcon-scan margin-right text-white"></text>
					<text class="text-bold text-lg text-white" >{{ i18n_order.repairSnName }}</text>
				</view>
				<view class="padding  text-xsl flex flex-direction" @tap="toType">
					<text class="cuIcon-repairfill margin-right text-white"></text>
					<text class="text-bold text-lg text-white">{{ i18n_order.repairCateName }}</text>
				</view>
			</view>
		</view>
		<!-- 报障工单 -->
		<uni-list v-if="Boolean(SnOrder)">
			<view class="flex solid-bottom padding justify-between">
				<view class="margin-left text-lg text-bold">{{ i18n_order.customerOrderName }}</view>
				<navigator url="/pages/index/index?PageCur=repair_order&isCustomer=true" class="text-grey text-xl flex align-center">
					<text class="text-df margin-right-xs  ">更多</text>
					<text class="cuIcon-pullright "></text>
				</navigator>
			</view>
			<repair-item-customer :item="SnOrder"></repair-item-customer>
		</uni-list>
		<!-- 报障工单 -->
		<!-- 受理工单 -->
		<uni-list v-if="Boolean(CateOrder) && showServiceOrder" class="margin-top-xs">
			<view class="flex solid-bottom padding justify-between">
				<view class="margin-left text-lg text-bold">{{ i18n_order.serviceOrderName }}</view>
				<navigator url="/pages/index/index?PageCur=repair_order&isCustomer=false" class="text-grey text-xl flex align-center">
					<text class="text-df margin-right-xs  ">更多</text>
					<text class="cuIcon-pullright "></text>
				</navigator>
			</view>
			<repair-item-service :item="CateOrder"></repair-item-service>
		</uni-list>
		<!-- 受理工单 -->
	</view>
</template>

<script>
	/**
	 * 报障首页
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		// 输入参数
		props:{
			// 是否供应商
			IsSup : {
				type :Boolean,
				default : false
			},
			// 是否厂商
			IsSvc :{
				type :Boolean,
				default : false
			}
		},
		data() {
			return {
				// 与系统有关的参数
				BranchId : this.global.organ.getBranchId(),			// 门店Id
				SnOrder : null ,		// 报障工单对象
				CateOrder : null ,		// 受理工单对象
				toSearch :this.global.repairF.toSearch,				// 跳转到搜索页
				snScan : this.global.repairF.snScan,				// SN扫码报障
				toType : this.global.repairF.toType,				// 跳转到分类报障页
			}
		},
		computed:{
			i18n : function(){
				return this.$t("basic");
			},
			i18n_order :function(){
				return this.$t("order");
			},
			// 是否展示最近受理工单
			showServiceOrder : function(){
				return this.IsSup || this.IsSvc;
			}
		},
		created:function(){
			_self = this;
			this.init(this.BranchId);		// 初始化值
		},
		methods: {
			// =============================================== 初始化 =====================================================
			/**
			 * 初始化当前值（获取报障工单和受理工单）
			 * @param {Number} MchId 当前门店/组织的Id
			 */
			init : function(MchId){
				// 获取就近的报障工单
				this.global.repairOrderR.getCustomerListTop1({
					data : {
						topMchId : MchId,
						mchId : MchId,
						orderName:'OrderId',
						isAsc:false,
						pageIndex : 1,
						pageSize : 10,
						orderName : 'CreateAt',
						isAsc : false
					},
					success : function(data){
						_self.SnOrder = data;
					}
				});
				// 获取就近的受理工单
				this.global.repairOrderR.getSeviceListTop1({
					data :{
						svcMchId : MchId,
						pageIndex : 1,
						pageSize : 10,
						orderName : 'CreateAt',
						isAsc : false
					},
					success : function(data){
						_self.CateOrder = data;
					}
				});
			},
			// ================================================================================================================
		}
	}
</script>

<style>

</style>
