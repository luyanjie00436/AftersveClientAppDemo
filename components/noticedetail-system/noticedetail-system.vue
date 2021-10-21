<template>
	<view class="flex flex-direction">
		<uni-dateformat  class="text-center text-grey padding-tb-sm bg-gray" style="width: 100%;"
		:date="item.AddTime" :threshold="[60000, 3600000]"></uni-dateformat>
		<uni-list-item >
			<template slot ="body" clss="flex flex-direction">
				<view class="  text-bold text-xl">{{ item.Title }}</view>
				<view class=" text-grey text-df">{{item.Msg}}</view>
			</template>
		</uni-list-item>
	</view>
</template>

<script>
	/**
	 * 通知详情展示系统消息
	 * @author 陆彦捷
	 * @description  通知详情展示(系统消息)
	 */

	export default {
		name: "noticedetail-system",
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
		}
	}
</script>

<style>

</style>
