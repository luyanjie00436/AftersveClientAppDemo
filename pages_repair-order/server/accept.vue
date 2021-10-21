<template>
	<view class="flex flex-direction">
		<!-- 标题 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview" >
			<block slot="content">{{ i18n_order.serviceOrderAcceptName }}</block>
		</cu-custom>
		
		<uni-forms ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
			<!-- 是否受理工单 -->
			<uni-forms-item name="IsAccept">
				<view class="cu-form-group solid-bottom box">
					<text class="item-left">{{ i18n_order.service.isAccept}}</text>
					<switch class="cyan" :checked="current.IsAccept" @change="changeIsAccept"></switch>
				</view>
			</uni-forms-item>
			<!-- 备注 -->
			<uni-forms-item  name="Msg" >
				<view class="cu-form-group solid-bottom box" name="Sort">
					<text class="item-left">{{ i18n_order.service.msg }}</text>
					<textarea class="item-right" v-model="current.Msg" auto-height :placeholder="i18n_order.service.msgPlaceholder" maxlength="-1" ></textarea>
				</view>
			</uni-forms-item>
		</uni-forms>
		<bottom-btns :btns="btn_list" @click="clickBottom"></bottom-btns>
	</view>
</template>

<script>
	/**
	 * 受理工单-受理
	 * @author 陆彦捷
	 * @description 受理工单-受理
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview : this.global.publicF.hasBack(),
				// 与系统有关参数
				OrderId : 0 ,		// 当前工单Id
				initSvc : null,							// 获取供应商方法
				changeStaff : null ,		// 修改员工方法
				current : {
					OrderId : 0 ,			// 工单id
					IsAccept: true,			// 是否受理工单
					SupId : this.global.organ.getIndustryId(),		// 服务商Id
					SvcId : this.global.organ.getIndustryId() ,		// 供应商Id
					Msg : ''	,			// 备注
				},
				rules: {
					SupId :{
						rules : this.global.rules.supId
					},
					StaffId: {
						rules: this.global.rules.staffId
					},
					Mobile: {
						rules: this.global.rules.mobile
					}
				},
				staffLoading : false,	// 员工信息加载中
				staff_list :[],		// 员工列表
				btn_list: this.global.params.btn_list_commit
			}
		},
		computed:{
			i18n : function(){
				return this.$t('basic');
			},
			i18n_order:function(){
				return this.$t('order');
			},
		},
		onReady: function() {
			// 初始化表单验证
			this.$refs.form.setRules(this.rules);
		},
		onLoad:function(options){
			_self = this;
			this.getParams(options);
			
		},
		onShow:function(){
		},
		methods: {
			// ============================================ 初始化事件 ====================================================
			/** 初始化参数
			 * @param {Object} options
			 */
			getParams : function(options){
				this.OrderId = Boolean(options.OrderId) ? parseInt(options.OrderId) : 0;			// 工单Id
				if(!Boolean(this.OrderId) && this.preview){
					uni.navigateBack();
				}
				this.current.OrderId = this.OrderId;
			},
			// ============================================ 监听事件 ======================================================
			/** 是否受理服务工单
			 * @param {Object} e
			 */
			changeIsAccept : function(e){
				this.current.isAccept = e.detail.value;
			},
			/** 点击底部按钮
			 * @param {Object} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'submit' :
						// 提交工单执行方法
						this.$refs['form']
							.submit()
							.then(result =>{
								_self.afterValidation();
							})
							.catch(errors=>{
							});
						break;
					default: break;
				}
			},
			/**
			 * 受理工单
			 */
			afterValidation : function(){
				uni.showModal({
					title: _self.i18n.modal_submit_title,
					content: _self.i18n.modal_submit_content,
					success:function(result){
						if(result.confirm){
							_self.global.repairOrderR.confirmInfo({
								data : _self.current,
								before : function(){
									uni.showLoading({
										title: _self.i18n.requestLoadingMessage
									});
								},
								success: function(datas , message){
									console.log(datas , message);
									uni.hideLoading();
									if(Boolean(datas)){
										uni.navigateBack();
										uni.showToast({
											title: _self.i18n.requestSuccessMessage
										});
										return;
									}
									// 提交失败提示
									uni.showToast({
										title: message,
										icon:'none'
									});
								},
								fail : function(errors){
									uni.hideLoading();  
								}
							}) ;
						}
					}
				});
			},
			// ===========================================================================================================
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
	}
}
</style>
