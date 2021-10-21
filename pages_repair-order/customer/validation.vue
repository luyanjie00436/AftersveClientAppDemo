<template>
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_order.customerValidataonrName }}</block>
		</cu-custom>

		<uni-forms>
			<!-- 验收通过 -->
			<uni-forms-item name="IsPass">
				<view class="cu-form-group solid-bottom box">
					<text class="item-left">{{ i18n_order.customer.isPass }}</text>
					<switch class="cyan" :checked="current.IsPass" @change="changeIsPass"></switch>
				</view>
			</uni-forms-item>
			<!-- 服务评分 -->
			<uni-forms-item name="Grade">
				<view class="cu-form-group solid-bottom box" name="Grade">
					<text class="item-left">{{ i18n_order.customer.grade }}</text>
					<uni-rate value="5" allowHalf v-model="current.Grade"></uni-rate>
				</view>
			</uni-forms-item>
			<!-- 服务评价 -->
			<uni-forms-item name="Msg">
				<view class="cu-form-group solid-bottom" name="Msg">
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
	 * 工单验收
	 *  @author 陆彦捷
	 *  @description 工单验收 + 评价
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				// 与系统有关参数
				OrderId: 0, // 工单id
				// 评价事件
				imgList: [], // 上传图片
				// 验收工单
				current:{
				  OrderId: 0,
				  // OrderNo: "",
				  IsPass: true,			// 是否通过
				  IsScore: true,		// 是否评分
				  Grade: 5,				// 评分
				  Msg: "",
				  Imgs: ""
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
			 * 工单验收
			 */
			rateOrderF: function() {
				this.global.repairOrderR.validatiaonInfo({
					data : _self.current,
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success : function(data , message){
						uni.hideLoading();
						if(Boolean(data)){
							// 跳转到工单跟踪页面
							uni.navigateBack();
							uni.showToast({
								title: _self.i18n.requestSuccessMessage
							});
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
							title: _self.i18n.requestFailMessage,
							icon:'none'
						})
					}
				});
			},
			// ========================================= 监听事件 ===========================================================
			/** 修改是否验收通过
			 * @param {Object} e
			 */
			changeIsPass  : function(e){
				this.current.IsPass = e.detail.value;
			},
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

<style scoped lang="scss">
.box {
		display: flex;
		flex-direction: row;
		font-size: 28rpx;
		.item-left {
			width: 160rpx;
			text-align: justify;
			// 加粗
			font-weight: bold;
		}
		.item-right{
			flex:1;
			font-size: 28rpx;
		}
	}
</style>
