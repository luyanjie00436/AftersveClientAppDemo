<template>
	<view class="flex flex-direction">
		<!-- 标题 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview" >
			<block slot="content">{{ i18n_order.serviceOrderAssignName }}</block>
		</cu-custom>
		
		<uni-forms ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
			<!-- SN码 -->
			<uni-forms-item name="DeviceSn">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="">{{ i18n_order.service.deviceSn }}</text>
					</view>
					<input class="item-right" v-model="current.DeviceSn" :placeholder="i18n_order.service.deviceSnPlaceholder"  />
				</view>
			</uni-forms-item>
			<!-- 服务方式 -->
			<uni-forms-item name="SvcMode">
				<view class="cu-form-group solid-bottom box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_order.service.svcMode}}</text>
						<text class="text-red">*</text>
					</view>
					<picker class="item-right" @change="changeSvcMode" :value="modeIndex" :range="orderModes" range-key="text">
						<view class="uni-input">{{ modeIndex >=  0 ? orderModes[modeIndex].text : i18n_order.service.svcModePlaceholder }}</view>
					</picker>
					<input v-show="false" v-model="current.SvcMode"/>
				</view>
			</uni-forms-item>
			<!-- 是否收费 -->
			<uni-forms-item name="IsCharge">
				<view class="cu-form-group solid-bottom box">
					<text class="item-left">{{ i18n_order.service.isCharge }}</text>
					<switch class="cyan" :checked="current.IsCharge" @change="changeIsCharge"></switch>
				</view>
			</uni-forms-item>
			<!-- 转交供应商 -->
			<view class="cu-form-group solid-bottom box">
				<text class="item-left">{{ i18n_order.service.isTrans }}</text>
				<switch  class="cyan" @change="changeIsTrans"></switch>
			</view>
			<!-- 供应商 -->
			<view v-if="isTrans">
				<uni-forms-item name="SvcId">
					<view class="cu-form-group solid-bottom box" name="Sort">
						<view class="item-left">{{ i18n_order.service.svc }}</view>
						<merchant-select-box class="item-right" :mchId="current.SvcId" @init="initSvcF" @change="changeSvc"></merchant-select-box>
						<input v-show="false" v-model="current.SvcId" />
					</view>
				</uni-forms-item>
			</view>
			<view v-else>
				<!-- 技术人人员 -->
				<uni-forms-item  name="StaffId" >
					<view class="cu-form-group solid-bottom box" name="StaffId">
						<view class="item-left">
							<text class="margin-right-xs">{{ i18n_order.service.staff }}</text>
							<text class="text-red">*</text>
						</view>
						<staff-select class="item-right" :staffId="current.StaffId" @changeF="changeStaffF"></staff-select>
						<!-- <input v-model="current.StaffId" placeholder="122" /> -->
					</view>
				</uni-forms-item>
				<!-- 技术人员联系电话 -->
				<uni-forms-item  name="Mobile" >
					<view class="cu-form-group solid-bottom box" name="Mobile">
						<view class="item-left">
							<text class="margin-right-xs">{{ i18n_order.service.mobile }}</text>
							<text class="text-red">*</text>
						</view>
						<input class="item-right" :placeholder="i18n_order.service.mobilePlaceholder" v-model="current.Mobile" />
					</view>
				</uni-forms-item>
			</view>
			
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
	 * 受理工单-派工
	 * @author 陆彦捷
	 * @description 受理工单-确认
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview : this.global.publicF.hasBack(),
				// 与系统有关参数
				OrderId : 0 ,		// 当前工单Id
				OrderType : 'CateOrder',	// 工单类型
				orderModes: this.global.orders.svcModes, // 服务方式列表
				modeIndex : -1 ,						// 服务方式索引
				isTrans : false,						// 是否转交供应商
				initSvc : null,							// 获取供应商方法
				changeStaff : null ,		// 修改员工方法
				current : {
					OrderId : 0 ,			// 工单id
					// OrderNo: '',			// 订单No
					isAccept: true,			// 是否受理工单
					DeviceSn : '',			// 设备Sn码
					SvcMode :null,			// 服务方式
					IsCharge : false ,		// 是否收费
					// mchId : this.global.organ.getIndustryId(),		// 当前用户id, 为了不出错使用
					SupId : this.global.organ.getIndustryId(),		// 服务商Id
					SvcId : this.global.organ.getIndustryId() ,		// 供应商Id
					Msg : ''	,			// 备注
					StaffId : 0 ,			// 员工号(维修人员)
					Name : '',			// 名称
					Mobile : '',	// 电话号码
				},
				rules: {
					SvcMode :{
						rules: [{
							required: true,
							errorMessage: '请选择服务方式'
						}]
					},
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
			// 供应商
			if(typeof(this.initSvc) === "function"){
				this.initSvc();
			}
			// 技术人员
			if(typeof(this.changeStaff)  == "function"){
				this.changeStaff(function(item){
					_self.current.StaffId = item.StaffId;
					_self.current.Name = item.Name;
					_self.current.Mobile = item.Mobile;
				});
			}
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
				this.OrderType = Boolean(options.OrderType) ? options.OrderType : this.OrderType;	// 报修类型
				this.current.DeviceSn = (options.DeviceSn && options.DeviceSn != 'null') ? options.DeviceSn : this.current.DeviceSn;	// 设备Sn
			},
			// ============================================ 监听事件 ======================================================
			/** 修改服务方式
			 * @param {Object} e
			 */
			changeSvcMode: function(e) {
				this.modeIndex = e.detail.value;
				this.current.SvcMode = this.orderModes[e.detail.value].value;
			},
			/** 更改是否收费
			 * @param {Object} e
			 */
			changeIsCharge : function(e){
				this.current.IsCharge = e.detail.value;
			},
			/** 更改是否转交供应商
			 * @param {Object} e
			 */
			changeIsTrans : function(e){
				this.isTrans  = e.detail.value;
				if(!e.detail.value){
					this.current.SvcId = this.global.organ.getIndustryId();
				}
			},
			/** 初始化修改供应商方法
			 * @param {Function} func
			 */
			initSvcF : function(func){
				this.initSvc = func;
			},
			/** 修改当前工供应商
			 * @param {Object} e
			 */
			changeSvc : function(e){
				this.current.SvcId = e.detail.MchId;
			},
			/** 选择技术人员方法
			 * @param {Function} fuc 方法
			 */
			changeStaffF : function(fuc){
				this.changeStaff = fuc;
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
			 * 提交服务信息
			 */
			afterValidation : function(){
				uni.showModal({
					title: _self.i18n.modal_submit_title,
					content: _self.i18n.modal_submit_content,
					success:function(result){
						if(result.confirm){
							_self.global.repairOrderR.svcAssignInfo({
								data : _self.current,
								before : function(){
									uni.showLoading({
										title: _self.i18n.requestLoadingMessage
									});
								},
								success: function(datas , message){
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
		min-width: 160rpx;
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
