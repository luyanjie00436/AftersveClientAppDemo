<template>
	<view class="flex flex-direction">
		<uni-dateformat  class="text-center text-grey padding-tb-sm bg-gray" style="width: 100%;"
		:date="item.AddTime" :threshold="[60000, 3600000]"></uni-dateformat>
		<uni-list-item clickable @click="clickItem(item)" >
			<template slot ="body" clss="flex flex-direction">
				<view class="  text-bold text-xl">{{ item.Title }}</view>
				<view class=" text-grey text-df">{{item.Msg}}</view>
			</template>
		</uni-list-item>
	</view>
</template>

<script>
	/**
	 * 通知 ： 报障工单 | 受理工单展示
	 * @author 陆彦捷
	 * @description  通知详情展示(系统消息)
	 */

	export default {
		name: "notice-order",
		props: {
			// 消息具体内容
			item: {
				type: Object,
			}
		},
		data() {
			return {};
		},
		methods: {
			/** 点击item列表执行方法
			 * @param {Object} item
			 */
			clickItem :function(item){
				switch(item.MsgType){
					case 3 : 
						// 跳转到报障工单
						if(Boolean(item.DataKey)){
							console.log('跳转到新页面');
							uni.navigateTo({
								url:'/pages_repair-order/customer/detail?OrderId=' + item.DataKey
							});
						}
						break;
					case 4 : 
						// 跳转到受理工单
						if(Boolean(item.DataKey)){
							uni.navigateTo({
								url:'/pages_repair-order/server/detail?OrderId=' + item.DataKey
							});
						}
						break;
					default : break;
				}
			}
		},
		// =========================================================================================================
	}
</script>

<style>

</style>
