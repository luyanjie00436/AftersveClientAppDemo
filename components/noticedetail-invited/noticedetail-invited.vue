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
		<uni-list-item direction="column">
			<template slot="body" class="flex solid-bottom  justify-end text-df">
				<view class="bg-cyan  padding-xs margin-lr-xs radius" @click="inviteCheck_request(item.Id , 'Agreed');messageRead_request(item.Id)">同意</view>
				<view class="bg-red padding-xs margin-lr-xs radius" @click="inviteCheck_request(item.Id , 'Refused');messageRead_request(item.Id)">拒绝</view>
			</template>
		</uni-list-item>
	</view>
</template>

<script>
	/**
	 * 消息详情展示：受邀消息
	 */
	var _self;
	export default {
		name:"noticedetail-invited",
		props:{
			// 消息具体内容
			item: {
				type: Object,
			},
		},
		data() {
			return {
			};
		},
		computed:{
			i18n : function(){
				return this.$t("basic");
			}
		},
		created:function(){
			_self = this;
		},
		methods:{
			// ============================================= 请求方法 ======================================================
			/** 同意/拒绝邀请
			 * @param {Object} msgId 消息id
			 * @param {Object} ckStatus 同意/拒绝
			 */
			inviteCheck_request(msgId ,ckStatus){
				this.global.staffR.invitionCheckInfo({
					data : {
						msgId : msgId ,
						ckStatus : ckStatus
					},
					before : function(){
						uni.showLoading();
					},
					success :function(data ,message){
						uni.hideLoading();
						uni.showToast({
							title: message,
							icon:'none'
						});
					},
					fail: function(errors){
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon:'none'
						});
					}
				});
			},
			/**
			 * 将消息设为已读（根据消息id）
			 * @param {Number} msgId 消息id
			 */
			messageRead_request(msgId){
				this.global.msgR.updateReadInfo({
					data : { msgId : msgId}
				});
			}
		}
	}
</script>

<style>

</style>
