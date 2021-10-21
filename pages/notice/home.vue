<template name="notice">
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-gradual-cyan" >
			<block slot="content">{{ i18n_notice.name }}</block>
		</cu-custom>
		<!-- SN报障和分类报障 -->
		<view v-if="showRepair" class="padding-sm bg-gradual-cyan" >
			<!-- SN码报障和型号报障搜索单 -->
			<view  class="grid  text-center col-2 ">
				<view class="padding  text-lg text-white" @click="snScan">
					<text class="cuIcon-scan margin-right text-white"></text>
					<text class="text-bold  text-white" >{{ i18n_order.repairSnName }}</text>
				</view>
				<view class="padding  text-lg" @tap="toType">
					<text class="cuIcon-repairfill margin-right text-white"></text>
					<text class="text-bold text-lg text-white">{{ i18n_order.repairCateName }}</text>
				</view>
			</view>
		</view>
		<!-- SN报障和分类报障 -->
		<!-- 通知列表 -->
		<uni-list>
			<uni-list-chat v-for="(item, index) in notice_types" :key="index"  :title="item.Name" 
			:note="itemMsg(item)" 	:time="itemTime(item)"  
			:badge-text="item.NoRead"
			 :avatar="item.Icon"  avatarCircle 
			 :to="'/pages/notice/noticedetail?msgType=' + (index + 1)" ></uni-list-chat>
		</uni-list>
		<!-- 通知列表 -->
	</view>
</template>

<script>
	/**
	 *  消息通知页面
	 * @author 陆彦捷
	 * @description  按分类查看消息通知
	 */
	var _self;
	export default {
		data() {
			return {
				MchId : this.global.organ.getIndustryId() ,			// (当前)组织Id
				UserId : this.global.user.getUserId(),
				IsCust : this.global.organ.getIsCust(),				// 是否商户
				notice_types : [] ,		// 通知信息的列表形式
				snScan : this.global.repairF.snScan,				// SN扫码报障
				toType : this.global.repairF.toType,				// 跳转到分类报障页
			}
		},
		props:{},
		computed:{
			// 国际化
			i18n : function(){
				return this.$t("basic");
			},
			i18n_notice : function(){
				return this.$t("notice");
			},
			i18n_order : function(){
				return this.$t("order");
			},
			// 打开工单时是否显示报障
			showRepair : function(){
				return this.IsCust && Boolean(this.MchId);
			},
		},
		// 初始化方法
		created:function(){
			_self = this;
			this.messageType_request();			// 获取通知信息
		},
		methods: {
			// ============================================ 事件 =============================================
			/**
			 * 请求当前用户的通知
			 */
			messageType_request(){
				this.global.msgR.getTypeList({
					data:{
						userId :_self.UserId
					},
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage,
						})
					},
					success : function(data){
						uni.hideLoading();
						_self.notice_types = data;
					},
					fail : function(errors){
						uni.hideLoading();
						_self.notice_types = [];
					}
				});
			},
			// ===================================== 公共方法 =============================================
			/** 通知- 通知的内容
			 * @param {Object} item 消息类型
			 */
			itemMsg : function(item){
				if(!Boolean(item.Items)){ return '';}
				return item.Items.length > 0? item.Items[0].Title :'';
			},
			/** 通知 -通知的时间
			 * @param {Object} item 消息类型
			 */
			itemTime : function(item){
				if(!Boolean(item.Items)){ return '';}
				if(item.Items.length === 0){ return '';}
				return this.global.publicF.showTimePipe(new Date(item.Items[0].AddTime));
			}
		// =================================================================================================================
		}
	}
</script>

<style>

</style>
