<template>
	<view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_product.model.nameBasic }}</block>
		</cu-custom>
		<!-- loading -->
		<uni-load-more v-if="status != 'noMore'" :contentText="loadContentText" :status="status" @clickLoadMore="getInfo(ModelId)"></uni-load-more>
		<!-- 表单 -->
		<form>
			<!-- 名称 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_product.model.name }}</view>
				<text class="text-grey">{{ current.Name}}</text>
			</view>
			<!-- 品牌 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_product.brandName }}</view>
				<text class="text-grey">{{ current.BrandName}}</text>
			</view>
		</form>
		<!-- 表单 -->
		<!-- 底部按钮 -->
		<bottom-btns v-if="isAdmin" :btns="btn_list" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 型号信息详情
	 * @author 陆彦捷
	 */
	var _self ;
	export default {
		data() {
			return {
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				// 返回顶部
				ModelId: 0 ,				// 客户Id
				current : {
					// BrandId:0,			// 门店Id
					// Name : '',			// 名称
					// Sort : 0,			// 排序
				},				// 返回值
				loadContentText: this.global.params.loadContentText,
				status: 'more',			// 状态-更多
				btn_list: [{
					name: '编辑',
					icon: 'cuIcon-edit',
					clickName: 'edit',
				}] 			// 底部按钮
			}
		},
		computed:{
			i18n_product : function(){
				return this.$t("product");
			},
			/**
			 * 判断当前用户是否有权利编辑数据
			 */
			isAdmin: function(){
				// 组织类型为服务商、供应商
				return this.global.organ.getIsSup() || this.global.organ.getIsSvc();
			}
		},
		onLoad:function(options){
			_self = this;
			this.getParams(options);
			if(Boolean(this.ModelId)){
				// 获取组织信息
				this.getInfo(this.ModelId);
			}else{
				// 返回上一页
				uni.navigateBack();
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
			// ==============================================监听事件===========================================================
			/** 点击底部事件
			 * @param {String} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'edit' : 
						uni.navigateTo({
							url :"/pages_basic/product/productmodel/edit?ModelId=" + _self.ModelId
						});
						break;
					default:break;
				}
			},
			// ==================================================== 请求事件 ==============================================================
			/** 根据id获取型号信息
			 * @param {Number} modelId 型号Id
			 */
			getInfo : function(modelId){
				this.global.modelR.getInfo({
					id :modelId,
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
						_self.status =  'more';
					}
				});
			}
			// ============================================================================================================================
		},
	}
</script>

<style>

</style>
