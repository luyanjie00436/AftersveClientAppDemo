<template>
	<view>
		<!-- tabber 页面 -->
		<scroll-view :scroll-y="true" class="main-content-height">
			<notice v-if="PageCur=='notice' "></notice>
			<repair v-if="PageCur == 'repair' && showRepair"  :IsSup="IsSup" :IsSvc="IsSvc"></repair>
			<repair-order v-if="PageCur == 'repair_order' && showOrder "  :isCustomer="isCustomer && showRepair"
				:IsCust="IsCust" :IsSup="IsSup" :IsSvc="IsSvc"></repair-order>
			<my v-show = "PageCur == 'my' " :noticeNumber="noticeNumber" @tabbar="toNotice" @getUserCur="getUserCurF" :MchId="MchId"></my>
		</scroll-view>
		
		<!-- 底部导航栏 -->
		<view class="cu-bar tabbar bg-white shadow foot ">
			<!-- 通知（包含数字角标） -->
			<view class="action" @click="NavChange" data-cur="notice">
				<uni-badge size="small" :text="noticeNumber" absolute="rightTop" type="error">
				    <view class='cuIcon-cu-image'>
				    	<text class="lg cuIcon-noticefill" :class="PageCur=='notice'?'text-cyan':'text-gray'"></text>
				    </view>
					<view :class="PageCur=='notice'?'text-cyan':'text-gray'">通知</view>
				</uni-badge>
			</view>
			<!-- 报障 -->
			<view v-if="showRepair" class="action" @click="NavChange" data-cur="repair">
				<view class='cuIcon-cu-image'>
					<text class="lg cuIcon-homefill" :class="PageCur=='repair'?'text-cyan':'text-gray'"></text>
				</view>
				<view :class="PageCur=='repair'?'text-cyan':'text-gray'">报障</view>
			</view>
			<!-- 工单 -->
			<view v-if="showOrder" class="action" @click="NavChange" data-cur="repair_order">
				<view class='cuIcon-cu-image'>
					<text class="lg cuIcon-formfill" :class="PageCur=='repair_order'?'text-cyan':'text-gray'"></text>
				</view>
				<view :class="PageCur=='repair_order'?'text-cyan':'text-gray'">工单</view>
			</view>
			<!-- 我的 -->
			<view class="action" @click="NavChange" data-cur="my">
				<view class='cuIcon-cu-image'>
					<text class="lg cuIcon-people" :class="PageCur=='my'?'text-cyan':'text-gray'"></text>
				</view>
				<view :class="PageCur=='my'?'text-cyan':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 主页
	 * @author 陆彦捷
	 */
	var _self ;
	export default {
		data() {
			return {
				// 延时参数
				PageCur: 'notice' ,			// 当前Nav
				repairShow : false,			// 是否展示报障和工单
				isCustomer : true,			// 打开工单时，是否默认报障工单
				first : true,				// 是否首次
				// 参数(与系统及权限有关参数)
				MchId : this.global.organ.getIndustryId() ,// (当前)组织Id
				IsCust : false,		// 获取是否商户
				IsSup : false,		// 是否厂商
				IsSvc : false,		// 是否服务商
				noticeNumber : 0 ,			// 通知条数
				getUserCur : null,			// 重新加载当前用户信息
			}
		},
		computed : {
			// 是否显示报障
			showRepair : function(){
				return this.IsCust && Boolean(this.MchId);
			},
			// 是否显示工单
			showOrder : function(){
				return Boolean(this.MchId) && (this.IsCust || this.IsSup || this.IsSvc);
			},
		},
		onLoad(options) {
			_self = this;
			this.getParams(options);
			this.mchId_request();					// 获取当前组织信息
		},
		/**
		 * 页面监听显示
		 */
		onShow : function(){
			if(this.first){
				this.first = false;
			}else{
				if(this.global.organ.getIsCust() == ''){
					this.mchId_request();					// 重新获取当前组织信息
				}else{
					this.MchId = this.global.organ.getIndustryId();		// 组织id
					this.IsCust =  this.global.organ.getIsCust(),		// 获取是否商户
					this.IsSup = this.global.organ.getIsSup();			// 是否厂商
					this.IsSvc = this.global.organ.getIsSvc();			// 是否服务商
				}
			}
			// 获取信息
			this.noticeNumber_request();					// 获取未读通知数量
			// 获取当前用户
			if(typeof(this.getUserCur) == 'function' && this.PageCur == 'my'){
				this.getUserCur();		// 获取当前用户
			}
		},
		methods: {
			// ==================================== 初始化 ========================================================
			/** 获取当前页面参数
			 * @param {Object} options
			 */
			getParams(options){
				this.PageCur = options.PageCur ? options.PageCur : 'notice';				// 默认主页
				this.isCustomer = options.isCustomer ? Boolean(options.isCustomer)  : true;	// 工单默认展示报障工单
			},
			// ==================================== 切换 ==========================================================
			/** Nav切换
			 * @param {Object} e
			 */
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur;
			},
			/** 切换当前页为通知
			 * @param {String} cur
			 */
			toNotice(cur){
				this.PageCur = cur;
			},
			/** 获取当前用户
			 * @param {Function} func
			 */
			getUserCurF : function(func){
				this.getUserCur = func;
			},
			// ==================================== 公共方法 ======================================================
			/**
			 * 获取当前门店信息
			 */
			mchId_request() {
				this.global.merchantR.getCurrentInfo({
					success : function(data){
						if(Boolean(data)){
							_self.MchId = data.TopMchId;		// 当前组织
							_self.global.organ.setIndustryId(data.TopMchId);
							_self.IsCust = data.IsCust;			// 是否门店		
							_self.global.organ.setIsCust(data.IsCust);
							_self.IsSup = data.IsSup;			// 是否服务商
							_self.global.organ.setIsSup(data.IsSup);
							_self.IsSvc = data.IsSvc;			// 是否供应商
							_self.global.organ.setIsSvc(data.IsSvc);
							_self.global.organ.setAddress(data.Address);	// 门店地址
						}
					},
					fail : function(errors){
						_self.MchId = 0;
					}
				});
			},
			/**
			 * 获取当期用户的未读通知数量
			 */
			noticeNumber_request(){
				this.global.msgR.getCount({
					success : function(data){
						_self.noticeNumber = data;	// 获取未读通知数量
					},
					fail : function(errors){
						_self.noticeNumber = 0 ; // 错误：设置未读通知数量为0
					}
				});
			},
		// ================================================================================================================	
		}
	}
</script>

<style>
	
	
</style>
