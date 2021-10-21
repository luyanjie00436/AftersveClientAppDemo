<template>
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_product.brand.nameBasic }}</block>
		</cu-custom>
		<uni-load-more v-if="status != 'noMore' && Boolean(BrandId)" :contentText="loadContentText" :status="status" @clickLoadMore="getInfo(BrandId)"></uni-load-more>
		<!-- 表单内容 -->
		<uni-forms :rules="rules" :value="current" ref="form" validate-trigger="bind" err-show-type="undertext" >
			<!-- 名称 -->
			<uni-forms-item name="Name">
				<view class="cu-form-group solid-bottom box">
					<view class=" item-left">
						<text class="margin-right-xs">{{ i18n_product.brand.name }}</text>
						<text class="text-red">*</text>
					</view>
					<input class="item-right" v-model="current.Name" :placeholder="i18n_product.brand.namePlaceholder" />
				</view>
			</uni-forms-item>
			<!-- 排序 -->
			<uni-forms-item name="Sort">
				<view class="cu-form-group solid-bottom box">
					<view class=" item-left">
						<text class="margin-right-xs">{{ i18n_product.brand.sort }}</text>
					</view>
					<input class="item-right" v-model="current.Sort" type="number" :placeholder="i18n_product.brand.sortPlaceholder" />
				</view>
			</uni-forms-item>
		</uni-forms>
		<!-- 表单内容 -->
		<!-- 底部按钮 -->
		<bottom-btns  :btns="BrandId ? btn_list_edit :  btn_list_add" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 品牌的添加或编辑
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				BrandId: 0 ,				// 品牌Id
				current : {
					BrandId : 0,		// 品牌Id
					Name :'',			// 名称
					Sort : 0			// 排序
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
			if(Boolean(this.BrandId)){
				// 获取组织信息
				this.getInfo(this.BrandId);
			}
		},
		methods: {
			// ============================================ 初始化 ===================================================================================
			/** 初始化参数
			 * @param {Object} options
			 */
			getParams : function(options){
				this.BrandId = Boolean(options.BrandId ) ?  options.BrandId : 0 ;
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
						if(_self.BrandId === 0){
							_self.addInfo();		// 添加客户信息
						}else{
							_self.updateInfo();		// 更新客户信息
						}
					})
					.catch(errors =>{
					});
			},
			delete : function(){
				console.log("删除当前品牌" , this.BrandId);
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
			/** 根据id获取品牌信息
			 * @param {Number} brandId 品牌Id
			 */
			getInfo : function(brandId){
				this.global.brandR.getInfo({
					id : brandId,
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
			 * 添加品牌信息
			 */
			addInfo : function(){
				this.global.brandR.addInfo({
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
			 * 更新品牌信息
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
			 * 删除品牌信息
			 */
			deleteInfo : function(){
				this.global.brandR.deleteInfo({
					id : _self.BrandId,
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

<style scoped lang="scss" >
.box {
	display: flex;
	flex-direction: row;
	font-size: 28rpx;
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
