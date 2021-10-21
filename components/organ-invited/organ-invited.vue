<template>
	<view class="margin-bottom-sm">
		<uni-list>
			<uni-list-item showArrow clickable @click="toGuide(item.MsgId)" v-for="item in data_invited" :key="item.Id" data-MsgId="">
				<!-- <template slot="header">头部（图标）</template> -->
				<template slot="body" style="width: 85%;">
					<view class="text-lg padding-xs text-bold">
						<text class="text-cyan text-cut">{{item.MchName}}</text></view>
					<view class=" text-df text-cut padding-lr text-red" style="line-height: 50rpx;">【{{item.FromName}}】{{item.Msg}}</view>
				</template>
				<template slot="footer" style="width: 15%;" @tap.stop="">
					<view class="flex  padding-top justify-center">
						<view class="cu-tag round bg-cyan light " @click="agreeClick(item.Id,item.MchName)">同意</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	/**
	 * 受邀加入组织
	 * @author 陆彦捷
	 * @description  查看用户受邀加入的组织。
	 */
	
	var _self;
	
	export default {
		name: "organ-invited",
		data() {
			return {
				data_invited : this.global.messages.merchant_invited,	// 受邀消息列表
			};
		},
		created: function() {
			_self = this;
		},
		methods: {
			//=========================================== 监听事件 =============================================
			/** 跳转到通知页（向导页）
			 * @param {Object} e
			 */
			toGuide(e){
				uni.navigateTo({
					url:'/pages/notice/noticedetail?userName=21011&preview=true&Id=' + e
				});
			},
			/**  受邀同意
			 * @param {Object} e
			 */
			agreeClick(Id,MchName){
				this.agree_request(Id , MchName);
			},
			// ======================================== 请求方法 ==============================================
			/**
			 * 同意邀请
			 * @param {int} Id 受邀请的Id
			 * @param {string} MchName 组织名称
			 */
			agree_request(Id ,MchName){
				uni.showModal({
					title:'受邀成功！',
					content:'您已成功加入加入【' + MchName + '】,是否需要导航？',
					success:function(result){
						// 确定，跳转导航页
						if(result.confirm){
							uni.navigateTo({
								url:'/pages_basic/page_guid'
							});
							return;
						}
						// 取消，跳转主页
						if(result.cancel){
							uni.navigateTo({
								url:'/pages/index/index'
							});
							return;
						}
					}
				});
			},
		},
		// ===========================================================================================================================
	}
</script>

<style>

</style>
