<template>
	<view class="flex flex-direction ">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{titles[msgType -1]}}</block>
		</cu-custom>
		<!-- 受邀消息 -->
		<uni-list class="padding-lr" v-if="msgShow">
			<!-- 组织消息 -->
			<template v-if="msgType == 2">
				<noticedetail-invited v-for="(item , index) in items" :key="item.Id" :item="item" ></noticedetail-invited>
			</template>
			<!-- 组织消息 -->
			<!-- 工单 -->
			<template v-else-if ="msgType == 3 || msgType == 4">
				<notice-order v-for="(item , index) in items" :key="item.Id" :item="item"></notice-order>
			</template>
			<!-- 工单 -->
			<!-- 系统消息或其他消息显示 -->
			<template v-else>
				<noticedetail-system v-for="(item , index) in items" :key="item.Id" :item="item"></noticedetail-system>
			</template>
		</uni-list>
	</view>
</template>

<script>
	/**
	 * 消息详情
	 * @author 陆彦捷
	 * @date 2021.06.17
	 * @date 2021.07.23 重新引入login
	 * @description  消息的详情列表，不同的消息类型展示不同
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式相关
				preview: this.global.publicF.hasBack(), // 是否显示上一页
				titles: ['系统提示', '组织信息', '报障工单', '受理工单', '其他类型'], // 标题
				msgShow: false, // 显示系统消息
				// 与系统相关
				msgType: 0, // 消息类型 1：系统消息 ， 2 ： 企业消息
				UserId : this.global.login.getUserId(),		// 当前用户
				MchId: this.global.organ.getIndustryId(), 	// 组织id
				items: []
			}
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
			this.message_request(this.msgType);			// 请求消息
			this.message_read(this.msgType);			// 将消息设置为已读
		},
		methods: {
			// =================================================== 初始化方法 =================================================
			/** 获取初始化参数
			 * @param {Object} options 参数
			 */
			getParams(options) {
				this.msgType = options.msgType ? options.msgType : 1;
			},
			/** 根据实际情况，将消息设置为已读
			 * @param {Number} msgType 消息类型
			 */
			message_read(msgType){
				switch(msgType){
					case 2 :break;
					default: this.messageRead_request(msgType);break;
				}
			},
			// =================================================== 请求事件 =================================================
			/** 根据消息类型获取消息
			 * @param {Number} msgType 消息类型
			 * @description  暂时，消息类型按时间降序排序
			 */
			message_request(msgType) {
				console.log("显示组织信息");
				// let data = {
				// 	userId : _self.UserId,
				// 	msgType : msgType,
				// 	orderName :'addTime',
				// 	isAsc : false,
				// }
				// // 组织信息：已读不显示
				// if(msgType == 2){
				// 	data.isRead = false;
				// }
				// this.global.msgR.getList({
				// 	data :  data,
				// 	before : function(){
				// 		_self.msgShow = false;
				// 		uni.showLoading();
				// 	},
				// 	success : function(data){
				// 		uni.hideLoading();
				// 		_self.msgShow = true;
				// 		_self.items = data;
				// 	},
				// 	fail : function(){
				// 		uni.hideLoading();
				// 		_self.msgShow = true;
				// 		_self.items = [];
				// 	}
				// });
			},
			/**
			 * 将消息设为已读（消息内容除企业邀请外）
			 * @param {Number} msgType 消息类型
			 */
			messageRead_request(msgType){
				this.global.msgR.updateReadInfo({
					data : { msgType : msgType}
				});
			}
		}
	}
</script>

<style>

</style>
