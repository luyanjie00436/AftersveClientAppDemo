<template>
	<view v-if="Boolean(item)">
		<uni-list-item>
			<template slot="body" style="width: 100%; padding-0">
				<navigator :url="'/pages_repair-order/server/detail?preview=true&OrderId='+ item.OrderId">
					<!-- 工单号和状态 -->
					<view class="flex justify-between">
						<text class="text-grey text-lg">{{ Boolean(item.OrderNo) ? item.OrderNo : ''  }}</text>
						<text class="cu-tag  round  " :class="statusClass">{{status}}</text>
					</view>
					<view class="flex flex-direction padding-lr-sm text-df">
						<!-- 报障方式 -->
						<view v-if="Boolean(item.OrderType)" class="box">
							<view class="item-left">{{ i18n_order.repair.orderType }}</view>
							<view class="item-right">{{ item.OrderType === "SnOrder"?i18n_order.repair.snOrder:i18n_order.repair.cateOrder }}</view>
						</view>
						<!-- SN码 -->
						<view v-if="Boolean(item.DeviceSn)" class="box"> 
							<view class="item-left">{{ i18n_order.repair.deviceSn }}</view>
							<view class="item-right">{{item.DeviceSn}}</view>
						</view>
						<!-- 设备名称 -->
						<view v-if="Boolean(item.DeviceName)" class="box">
							<view class="item-left">{{ i18n_order.repair.name }}</view>
							<view class="item-right">{{ item.DeviceName }}</view>
						</view>
						<!-- 型号 : 分类 > 品牌 > 型号 -->
						<view v-if="Boolean(item.CategoryName) || Boolean(item.Brand) || Boolean(item.Model)" class="box">
							<view class="item-left">{{ i18n_order.repair.model }}</view>
							<view class="item-right ">
								<text v-if="Boolean(item.CategoryName)">{{ item.CategoryName }}></text>
								<text v-if="Boolean(item.Brand)">{{ item.Brand }}></text>
								<text v-if="Boolean(item.Model)">{{ item.Model }}</text>
							</view>
						</view>
						<!-- 故障描述 -->
						<view v-if="Boolean(item.OrderMsg)" class="box">
							<view class="item-left">{{ i18n_order.repair.orderMsg }}</view>
							<view class="item-right ">{{ item.OrderMsg }}</view>
						</view>
						<!-- 联系人 -->
						<view v-if="Boolean(item.AddUserTel)" class="box">
							<view class="item-left">{{ i18n.contact }}</view>
							<view class="item-right">{{ item.AddUserTel }}({{ Boolean(item.AddUserName) ? item.AddUserName :''  }})</view>
						</view>
						<!-- 报障时间 -->
						<view class="box ">
							<view class="item-left">{{ i18n_order.repair.createAt }}</view>
							<uni-dateformat class="item-right" :threshold="[60000, 3600000]" format="yyyy-MM-dd hh:mm:ss" :date="item.CreateAt"></uni-dateformat>
						</view>
					</view>
				</navigator>
			</template>
		</uni-list-item>
	</view>
</template>

<script>
	/**
	 * 报障工单项
	 * @property {Object} item 受理工单项
	 * @author 陆彦捷
	 * @description  受理工单的每一项单独展示
	 */
	var _self;
	export default {
		name:"repair-item-service",
		props: {
			item :{
				type:Object,
				default:null
			}
		},
		data() {
			return {
				status : '',			// 工单状态
				statusClass : '',		// 当前状态的样式
			};
		},
		computed:{
			i18n : function(){
				return this.$t('basic');
			},
			i18n_order :function(){
				return this.$t('order');
			}
		},
		created:function(){
			_self = this;
			this.status = this.global.repairOrderF.tranformStatusCNName( this.item.Status , "service");		// 获取工单状态中文名
			this.statusClass = this.global.repairOrderF.getStatuClass(this.item.Status ,"service");			// 获取工单样式	
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
.box {
		padding-top: 10rpx;
		display: flex;
		flex-direction: row;
		.item-left {
			width: 160rpx;
			text-align: justify;
		}
		.item-right{
			flex:1;
			color: #8799A3;
			// 超出部分省略号
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
</style>
