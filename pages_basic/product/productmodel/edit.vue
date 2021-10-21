<template>
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_product.brand.nameBasic }}</block>
		</cu-custom>
		<uni-load-more v-if="status != 'noMore' && Boolean(ModelId)" :contentText="loadContentText" :status="status" @clickLoadMore="getInfo(ModelId)"></uni-load-more>
		<!-- 表单内容 -->
		<uni-forms :rules="rules" :value="current" ref="form" validate-trigger="bind" err-show-type="undertext" >
			<!-- 名称 -->
			<uni-forms-item name="Name">
				<view class="cu-form-group solid-bottom text-df">
					<view class=" title text-bold">
						<text class="margin-right-xs">{{ i18n_product.model.name }}</text>
						<text class="text-red">*</text>
					</view>
					<input v-model="current.Name" :placeholder="i18n_product.brand.namePlaceholder" />
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
		<bottom-btns  :btns="ModelId ?btn_list_edit : btn_list_add" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 型号添加或编辑
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				ModelId : 0 ,				// 型号Id
				brand_tree : [],			// 品牌树形图
				current : {
					ModelId : 0 ,		// 模型Id
					BrandId : null,		// 品牌Id
					Name :'',			// 名称
				},						// 返回值
				rules :{
					Name: {
						rules: [{
							required: true,
							errorMessage: '请输入名称'
						}]
					}, // 名称
				},				// 验证
				loadContentText: this.global.params.loadContentText,
				status: 'more',			// 状态-更多
				// 返回顶部
				btn_list_add:this.global.params.btn_list_add,
				btn_list_edit: this.global.params.btn_list_edit
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
			this.getBrandTree();		// 获取品牌指南针
			if(Boolean(this.ModelId)){
				this.getInfo(this.ModelId);		// 获取型号信息
			}
		},
		methods: {
			// ============================================ 初始化 ===================================================================================
			/** 初始化参数
			 * @param {Object} options
			 */
			getParams : function(options){
				this.ModelId = Boolean(options.ModelId ) ?  options.ModelId : 0 ;
			},
			// ============================================ 监听事件 =================================================================================
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
						if(_self.ModelId === 0){
							_self.addInfo();		// 添加客户信息
						}else{
							_self.updateInfo();		// 更新客户信息
						}
					})
					.catch(errors =>{
					});
			},
			/**
			 * 删除
			 */
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
			/**
			 * 根据id获取品牌信息
			 */
			getBrandTree : function(){
				this.global.brandR.getTree({
					data :{mchId : _self.global.organ.getIndustryId()},
					success : function(data){
						let temp = {
							"value" :null,
							"text":'无'
						}
						_self.brand_tree =  _self.global.changeobjF.change( data,"BrandId" , "Name" , "Children" );
						_self.brand_tree.unshift(temp);
					},
				});
			},
			/** 根据id获取型号信息
			 * @param {Number} modelId 型号Id
			 */
			getInfo : function(modelId){
				this.global.modelR.getInfo({
					id : modelId,
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
			 * 添加型号信息
			 */
			addInfo : function(){
				this.global.modelR.addInfo({
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
			 * 更新型号信息
			 */
			updateInfo : function(){
				this.global.modelR.updateInfo({
					data : _self.current,
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
			 * 删除品牌信息
			 */
			deleteInfo : function(){
				this.global.modelR.deleteInfo({
					id : _self.ModelId,
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
				});
			}
		},
	// ================================================================================================================================	
	}
</script>

<style>

</style>
