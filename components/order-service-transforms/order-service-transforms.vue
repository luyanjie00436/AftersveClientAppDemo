<template>
	<view class="flex flex-direction padding">
		<view class="cu-modal " :class="ModalName" @tap="hideModal">
			<view class="cu-dialog" style="overflow: visible;" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-bold text-cut">转交工单</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<uni-forms  ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
					<!-- 服务商 -->
					<uni-forms-item name="ServiceMchId">
						<view class="cu-form-group solid-bottom">
							<view class="title">
								<text>服务商</text>
								<text class="text-red">*</text>
							</view>
							<luyj-select-lay  :loading="serviceLoading" zindex="3"
								placeholder="请选择服务商" :options="service_list" :value="current.ServiceMchId" slabel="label" 
								svalue="MchId" @selectitem="changeService">
							</luyj-select-lay>
						</view>
					</uni-forms-item>
					<!-- 服务商 -->
				</uni-forms>
				
				<view class="cu-bar bg-blue" @tap="submit">
					<view class="action  margin-0 flex-sub  solid-left">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 转交工单组件
	 * @description  转交工单组件
	 * @property {Number} OrderId 订单id 
	 * @property {String} OrderNo 订单号
	 * @property {Function} refreshF 工单转交成功后方法
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		name:"order-service-transforms",
		props:{
			// 订单id
			OrderId : {
				type:Number,
				default: 0
			},
			// 订单号
			OrderNo :{
				type:String,
				default:''
			},
			// 工单转交成功后方法
			refreshF : {
				type: Function,
				default:null
			}
		},
		data() {
			return {
				// 与样式有关参数
				ModalName : null ,				// 当前组织
				// 与系统有关参数
				current:{
					ServiceMchId : null ,			// 服务商id
				},
				serviceLoading: false,			// 服务商加载中
				service_list :[],				// 服务商列表
				rules:{
					ServiceMchId:{
						rules:[{
							required: true,
							errorMessage: '请选择服务商'
						}]
					}
				}
			};
		},
		onReady: function() {
			// 初始化表单验证
			this.$refs.form.setRules(this.rules);
			this.service_request();			// 获取服务商信息
		},
		created:function(){
			_self = this;
			this.$emit('show', this.showModal);		// showModal
			this.current.ServiceMchId = this.global.organ.getIndustryId();
		},
		methods:{
			// ====================================== 初始化方法 ==========================================================
			/**
			 * 获取服务商信息
			 */
			service_request() {
				this.global.merchantR.getListAll_merchant({
					before: function() {
						_self.serviceLoading = true;
					},
					success: function(data) {
						_self.serviceLoading = false;
						_self.service_list = data;
						_self.service_list.forEach(item => {
							item.label = item.Name + '(' + item.MchNo + ')';
						});
					},
					fail: function() {
						_self.serviceLoading = false;
					}
				});
			},
			// ====================================== 监听信息 ==========================================================
			/** 显示弹出框
			 * @param {Object} e
			 */
			showModal : function (e){
				this.ModalName = 'show';		// 显示弹出框
			},
			/** 隐藏弹出框
			 * @param {Object} e
			 */
			hideModal : function(e){
				// 隐藏hide
				this.ModalName = '';
			},
			/** 修改服务商信息
			 * @param {Object} index
			 * @param {Object} item
			 */
			changeService: function(index ,item){
				this.current.ServiceMchId = item.MchId;
			},
			/**
			 * 验证并转移工单
			 */
			submit: function(){
				this.$refs['form'].submit()
				.then(result=>{
					_self.submit_f();
				}).catch();
			},
			/**
			 * 转移工单方法
			 */
			submit_f : function(){
				uni.showModal({
					title:'转移',
					content:'是否转移当前工单',
					success:function(result){
						if(result.confirm){
							// 转移工单请求
							_self.global.repairOrderR.newOrderInfo({
								data: {
									OrderId : _self.OrderId ,
									OrderNo : _self.OrderNo ,
									ServiceMchId : _self.current.ServiceMchId,
									MchId : _self.global.organ.getIndustryId()		// 当前组织信息
								},
								before : function(){
									uni.showLoading({
										title: '工单转移中……'
									});
								},
								success: function(data ,message){
									uni.hideLoading();
									if(Boolean(data)){
										uni.showToast({
											title:'工单转移成功！'
										});
										setTimeout(function(){
											_self.hideModal();
										} , 3000);
										if(typeof(_self.refreshF) === "function"){
											_self.refreshF();
										}
										return;
									}
									// 提交失败提示
									uni.showToast({
										title: message,
										icon:'none'
									});
								},
								fail : function(){
									uni.hideLoading();  
								}
							});
						}
					}
				});
			}
			// =========================================================================================================
		}
	}
</script>

<style>

</style>
