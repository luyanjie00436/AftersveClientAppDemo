<template>
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_product.product.nameBasic }}</block>
		</cu-custom>
		<uni-load-more v-if="status != 'noMore' && Boolean(ProductId)" :contentText="loadContentText" :status="status" @clickLoadMore="getInfo(ProductId)"></uni-load-more>
		<!-- 表单内容 -->
		<uni-forms :rules="rules" :value="current" ref="form" validate-trigger="bind" err-show-type="undertext" >
			<!-- 产品编码 -->
			<uni-forms-item name="ProductNo">
				<view class="cu-form-group solid-bottom text-df">
					<view class=" title text-bold">
						<text class="margin-right-xs">{{ i18n_product.product.productNo }}</text>
						<text class="text-red">*</text>
					</view>
					<input v-model="current.ProductNo" :placeholder="i18n_product.product.productNoPlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 名称 -->
			<uni-forms-item name="ProductName">
				<view class="cu-form-group solid-bottom text-df">
					<view class=" title text-bold">
						<text class="margin-right-xs">{{ i18n_product.product.productName }}</text>
						<text class="text-red">*</text>
					</view>
					<input v-model="current.ProductName" :placeholder="i18n_product.product.productNamePlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 品牌 -->
			<uni-forms-item name="BrandId">
				<view class="cu-form-group solid-bottom text-df">
					<view class=" title text-bold">
						<text class="margin-right-xs">{{ i18n_product.brandName }}</text>
					</view>
					<luyj-data-picker v-model="current.BrandId" :border="false" style="width: 80vw;"  :placeholder="i18n_product.brandPlaceholder"
						:preload="true" :localdata="brand_tree" 
						:popup-title="i18n_product.brandTiltle"  
						  ></luyj-data-picker>
				</view>
			</uni-forms-item>
			
		</uni-forms>
		<!-- 表单内容 -->
		<!-- 底部按钮 -->
		<bottom-btns  :btns="ProductId ? btn_list_edit :  btn_list_add" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 产品信息的添加-编辑
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式相关参数
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				//  系统相关参数
				ProductId: 0 ,				// 品牌Id
				current : {
					ProductId:0,			// 门店Id
					ProductNo: '',			// 产品编码
					ProductName : '',		// 产品名称
					CategoryId:'',		// 产品分类
					BrandId:'',			// 品牌
					ModelId:'',			// 型号
					Msg:'',					// 备注
				},
				rules :{
					ProductNo: {
						rules: [{
							required: true,
							errorMessage: '请输入产品编码'
						}]
					}, // 产品编码
					ProductName: {
						rules: [{
							required: true,
							errorMessage: '请输入产品名称'
						}]
					}, // 产品名称
				},				// 验证
				loadContentText: this.global.params.loadContentText,
				status: 'more',			// 状态-更多
				brand_tree :[],			// 品牌列表
				btn_list_add: [{
					name: '保存',
					icon: 'cuIcon-edit',
					clickName: 'edit',
				}				
				] ,
				btn_list_edit: [{
					name: '保存',
					icon: 'cuIcon-edit',
					clickName: 'edit',
				},
				{
					name: '删除',
					icon: 'cuIcon-delete',
					clickName: 'delete',
					color : 'red'
				}
				] 
			}
		},
		computed:{
			// 国际化
			i18n : function(){
				return this.$t('basic');
			},
			i18n_product : function(){
				return this.$t("product");
			}
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules);
		},
		onLoad:function(options){
			_self = this;
			this.getParams(options);
			if(Boolean(this.ProductId)){
				// 获取组织信息
				this.getInfo(this.ProductId);
			}
		},
		methods: {
			// ============================================ 初始化 ===================================================================================
			/** 初始化参数
			 * @param {Object} options
			 */
			getParams : function(options){
				this.ProductId = Boolean(options.ProductId ) ?  options.ProductId : 0 ;
			},
			// ============================================ 监听事件 =================================================================================
			/** 判断是否当前管理员
			 * @param {Boolean} value 是否当前管理员
			 */
			adminF : function(value){
				this.isAdmin = value;
			},
			// ========================================= 底部按钮时间  =====================================================================
			/** 点击底部事件
			 * @param {String} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'edit' : 
						this.save();
						break;
					case 'delete':
						this.delete();
					default:break;
				}
			},
			/**
			 * 保存方法
			 */
			save : function(){
				this.$refs['form'].validate()
					.then(result =>{
						if(_self.ProductId === 0){
							_self.addInfo();		// 添加产品信息
						}else{
							_self.updateInfo();		// 更新客户信息
						}
					})
					.catch(errors =>{
					});
			},
			delete : function(){
				uni.showModal({
					title: _self.i18n.deleteTitle,
					content: _self.i18n.deleteContent,
					success:function(result){
						if(result.confirm){
							_self.deleteInfo();
						}
					}
				})
			},
			// ========================================= 公共方法 =====================================================================
			/** 根据id获取产品信息
			 * @param {Number} productId 品牌Id
			 */
			getInfo : function(productId){
				this.global.productR.getInfo({
					id : productId,
					before : function(){
						_self.status = 'loading';
					},
					success : function(data){
						if(Boolean(data)){
							_self.status = 'noMore';
							_self.current = data;
							return;
						}
						_self.status = 'more';
					},
					fail : function(){
						_self.status = 'more';
					}
				});
			},
			/**
			 * 添加产品信息
			 */
			addInfo : function(){
				this.global.productId.addInfo({
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
			/**
			 * 更新产品信息
			 */
			updateInfo : function(){
				this.global.brandR.updateInfo({
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
			/**
			 * 删产品信息
			 */
			deleteInfo : function(){
				this.global.brandR.deleteInfo({
					id : _self.ProductId,
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success : function(data ,message){
						uni.hideLoading();
						if(Boolean(data)){
							uni.navigateBack({
								delta:2
							});
							uni.showToast({
								title: _self.i18n.deleteSuccessMessage
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
			}
		},
	// ================================================================================================================================	
	}
</script>

<style>

</style>
