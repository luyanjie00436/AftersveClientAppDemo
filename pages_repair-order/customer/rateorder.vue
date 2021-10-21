<template>
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_order.customerValidataonrName }}</block>
		</cu-custom>

		<uni-forms>
			<!-- 服务评分 -->
			<uni-forms-item name="Grade">
				<view class="cu-form-group padding-left-xl solid-bottom" name="Grade">
					<text class="title text-bold">{{ i18n_order.customer.Grade }}</text>
					<uni-rate value="5" allowHalf v-model="current.Grade"></uni-rate>
				</view>
			</uni-forms-item>
			<!-- 服务评价 -->
			<uni-forms-item name="Msg">
				<view class="cu-form-group padding-left-xl solid-bottom" name="Msg">
					<textarea :placeholder="i18n_order.customer.msgPlaceholder" v-model="current.Msg"></textarea>
				</view>
			</uni-forms-item>
			<!-- 上传图片 -->
			<uni-forms-item>
				<luyj-choose-img  titleText="相关图片" @imgChange="imgChange"></luyj-choose-img>
			</uni-forms-item>
		</uni-forms>
		<bottom-btns :btns="btn_list" @click="clickBottom"></bottom-btns>
	</view>
</template>

<script>
	/**
	 * 工单评价
	 *  @author 陆彦捷
	 *  @description  工单评价
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				// 与系统有关参数
				OrderId: 0, // 工单id
				imgList: [], // 上传图片
				current: {
					OrderId: 0, // 工单编号
					Grade: 5, // 评分（默认为5）
					Msg: '', // 提示信息
					UserId: 0, // 当前用户
					imgs: '', // 图片组，用逗号隔开
				},
				btn_list: this.global.params.btn_list_commit
			}
		},
		computed:{
			 // 国际化
			 i18n : function(){
				 return this.$t('basic');
			 },
			 i18n_order : function(){
				 return this.$t("order");
			 }
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
		},
		methods: {
			// ========================================= 初始化方法 =========================================================
			/** 初始化方法
			 * @param {Object} options
			 */
			getParams: function(options) {
				// 工单id(暂时这么判断，非0则返回)
				this.OrderId = Boolean(options.OrderId) ? parseInt(options.OrderId) : 0; // 工单Id
				if (!Boolean(this.OrderId)) {
					uni.navigateBack(); // 返回上一页
				}
				this.current.OrderId = this.OrderId;
			},
			// ========================================= 公共方法 ==========================================================
			
			/**
			 * 服务评分
			 */
			rateOrderF: function() {
				this.global.repairOrderR.rateInfo({
					data : _self.current,
					before : function(){
						uni.showLoading({
							title:'评价提交中……'
						});
					},
					success : function(data , message){
						uni.hideLoading();
						if(Boolean(data)){
							uni.showToast({
								title: '完成评价！'
							});
							// 跳转到工单跟踪页面
							setTimeout(function() {
								if (_self.preview) {
									uni.navigateBack();
								} else {
									// 跳转到工单跟踪页面
									uni.navigateTo({
										url: "/pages_repair-order/customer/detail?OrderId=" +
											_self.OrderId
									});
								}
							}, 3000);
							return;
						}
						uni.showToast({
							title:message,
							icon:'none'
						})
					},
					fail : function(){
						uni.hideLoading();
						uni.showToast({
							title:'评价提交失败',
							icon:'none'
						})
					}
				});
			},
			// ========================================= 监听事件 ===========================================================
			/** 修改相关图片组
			 * @param {Object} e
			 */
			imgChange : function(e){
				this.imgList = e;
			},
			/** 提交工单
			 * @param {Object} e
			 */
			submit: function(e) {
				if (this.imgList.length > 0) {
					// 提交评价（包含图片）
					this.global.imgR.imgListUpload({
						imgs : _self.imgList,
						success : function(imgs){
							_self.current.imgs = imgs.toString();
						},
						fail : function(imgs){
							_self.current.imgs = imgs.toString();
						},
						complete: function(){
							// 提交评价
							_self.rateOrderF();		// 提交评价
						}
					}); 
				} else {
					this.rateOrderF(); // 提交评价（不包含图片）
				}
			},
			/** 点击底部提交按钮
			 * @param {String} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'submit':
						this.submit();
						break;
					default:break;
				}
			},
			// =============================================================================================================
		}
	}
</script>

<style>

</style>
