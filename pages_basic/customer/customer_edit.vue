<template>
	<view class="flex flex-direction">
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_mchCustomer.nameBasic }}</block>
		</cu-custom>
		<!-- 标题栏 -->
		<!-- 导航栏 -->
		<uni-load-more v-if="status != 'noMore' && Boolean(CustomId)" :contentText="loadContentText" :status="status" @clickLoadMore="getInfo(CustMchId)"></uni-load-more>
		<!-- 表单内容 -->
		<uni-forms :rules="rules" :value="current" ref="form" validate-trigger="bind" err-show-type="undertext" >
			<!-- 商户 -->
			<uni-forms-item name="CustMchId">
				<view class="cu-form-group solid-bottom text-df box" name="CustMchId">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_mchCustomer.detail.custMch }}</text>
						<text class="text-red">*</text>
					</view>
					<merchant-select-box class="item-right" :mchId="CustMchId" @init="initMchIdF" @change="changeMchId"></merchant-select-box>
				</view>
			</uni-forms-item>
			<!-- 客户名称 -->
			<uni-forms-item name="Name">
				<view class="cu-form-group solid-bottom text-df box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_mchCustomer.detail.name }}</text>
						<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.Name" :placeholder="i18n_mchCustomer.detail.namePlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 客户编码 -->
			<uni-forms-item name="CustNo">
				<view class="cu-form-group solid-bottom text-df box">
					<view class="item-left">
						<text class="margin-right-xs">{{ i18n_mchCustomer.detail.custNo }}</text>
						<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.CustNo" :placeholder="i18n_mchCustomer.detail.custNoPlaceholder" />
				</view>
			</uni-forms-item>
			
		</uni-forms>
		<!-- 表单内容 -->
		<!-- 底部按钮 -->
		<bottom-btns  :btns="btn_list" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 客户信息选择
	 */
	var _self = this;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				CustomId: 0 ,				// 客户Id
				current : {
					CustomId : 0,		// 客户Id
					Name :'',			// 显示客户名称
					CustNo : '',		// 显示客户编码
					CustMchId : '',		// 客户组织id
					MchId : this.global.organ.getIndustryId() ,	// 当前足足
				},						// 返回值
				CustMchId : 0 ,			// 初始化客户Id
				rules :{
					Name: {
						rules: [{
							required: true,
							errorMessage: '请输入客户名称'
						}]
					}, // 客户名称
					CustNo: {
						rules: [{
							required: true,
							errorMessage: '请输入客户编码'
						}]
					}, // 客户编码
				},				// 验证
				initMchId : null,		// 接收参数
				loadContentText: this.global.params.loadContentText,
				status: 'more',			// 状态-更多
				// 返回顶部
				btn_list: [{
					name: '保存',
					icon: 'cuIcon-edit',
					clickName: 'edit',
				}] 
			}
		},
		computed:{
			// 国际化
			i18n : function(){
				return this.$t('basic');
			},
			i18n_mchCustomer : function(){
				return this.$t('mchCustomer');
			},
			i18n_merchant : function(){
				return this.$t('merchant');
			}
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules);
		},
		onLoad:function(options){
			_self = this;
			this.getParams(options);
			if(Boolean(this.CustomId)){
				// 获取组织信息
				this.getInfo(this.CustomId);
			}
		},
		onShow:function(){
			if(typeof(this.initMchId) === "function" ){
				this.initMchId();
			}
		},
		methods: {
			// ============================================ 初始化 ===================================================================================
			/** 初始化参数
			 * @param {Object} options
			 */
			getParams : function(options){
				this.CustomId = Boolean(options.CustomId ) ?  options.CustomId : 0 ;
			},
			// ============================================ 监听事件 =================================================================================
			/** 判断是否当前管理员
			 * @param {Boolean} value 是否当前管理员
			 */
			adminF : function(value){
				this.isAdmin = value;
			},
			/** 接收修改MchId事件
			 * @param {Object} func
			 */
			initMchIdF : function(func){
				this.initMchId = func;
			},
			/** 修改客商户事件
			 * @param {Object} e
			 */
			changeMchId : function(e){
				this.current.CustMchId = e.detail.MchId;
				this.current.Name = e.detail.Name;
			},
			/** 点击底部事件
			 * @param {String} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'edit' : 
						this.save();
						break;
					default:break;
				}
			},
			// ========================================= 公共方法 =====================================================================
			/**
			 * 保存方法
			 */
			save : function(){
				this.$refs['form'].validate()
					.then(result =>{
						if(_self.CustomId === 0){
							_self.addInfo();		// 添加客户信息
						}else{
							_self.updateInfo();		// 更新客户信息
						}
					})
					.catch(errors =>{
					});
			},
			/** 获取当前客户信息
			 * @param {Object} customId
			 */
			getInfo : function(customId){
				this.global.mchCustomerR.getInfo({
					id : customId,
					before : function(){
						_self.status = 'loading';
					},
					success : function(data){
						if(Boolean(data)){
							_self.status = 'noMore';
							_self.current = data;
							_self.current.MchId = data.MchId;
							_self.CustMchId = data.MchId;
							return;
						}
						_self.status = 'more';
					},
					fail : function(){
						_self.status = 'more';
					}
				})
			},
			/**
			 * 添加客户信息
			 */
			addInfo : function(){
				this.global.mchCustomerR.AddInfo({
					data : _self.current,
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success : function(data ,message){
						uni.hideLoading();
						if(Boolean(data)){
							uni.navigateBack();
							uni.showToast({
								title: _self.i18n.requestSuccessMessage
							});
							return;
						}
						uni.showToast({
							title: message,
							icon:'none'
						});
					},
					fail : function(){
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon:'none'
						});
					}
				})
			},
			/**
			 * 更新客户信息
			 */
			updateInfo : function(){
				this.global.mchCustomerR.UpdateInfo({
					data : _self.current,
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success : function(data ,message){
						uni.hideLoading();
						if(Boolean(data)){
							uni.navigateBack();
							uni.showToast({
								title: _self.i18n.requestSuccessMessage
							});
							return;
						}
						uni.showToast({
							title: message,
							icon:'none'
						});
					},
					fail : function(){
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon:'none'
						});
					}
				});
			},
			// ========================================================================================================================
		}
	}
</script>

<style scoped lang="scss">
	.box {
		display: flex;
		flex-direction: row;
		.item-left {
			width: 160rpx;
			text-align: justify;
			font-weight: bold;
		}
		.item-right{
			flex:1;
		}
	}
</style>
