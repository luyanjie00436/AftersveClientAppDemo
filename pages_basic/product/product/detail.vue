<template>
	<view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_product.product.nameBasic }}</block>
		</cu-custom>
		<!-- 权限判断 -->
		<operate-permission @isAdmin="adminF"></operate-permission>
		<!-- 权限判断 -->
		<!-- loading -->
		<uni-load-more v-if="status != 'noMore'" :contentText="loadContentText" :status="status" @clickLoadMore="getInfo(ProductId)"></uni-load-more>
		<!-- 表单 -->
		<form>
			<!-- 产品编码 -->
			<view class="cu-form-group  text-df">
				<view class=" title text-bold">{{ i18n_product.product.productNo }}</view>
				<text class="text-grey">{{ current.ProductNo}}</text>
			</view>
			<!-- 产品名称 -->
			<view class="cu-form-group  text-df">
				<view class=" title text-bold">{{ i18n_product.product.productName }}</view>
				<text class="text-grey">{{ current.ProductName}}</text>
			</view>
			<!-- 产品分类 -->
			<view class="cu-form-group  text-df">
				<view class=" title text-bold">{{ i18n_product.product.category }}</view>
				<text class="text-grey">{{ current.CategoryName}}</text>
			</view>
			<!-- 品牌 -->
			<view class="cu-form-group  text-df">
				<view class=" title text-bold">{{ i18n_product.product.brand }}</view>
				<text class="text-grey">{{ current.BrandName}}</text>
			</view>
			<!-- 型号 -->
			<view class="cu-form-group  text-df">
				<view class=" title text-bold">{{ i18n_product.product.model }}</view>
				<text class="text-grey">{{ current.ModelName}}</text>
			</view>
			<!-- 备注 -->
			<view class="cu-form-group  text-df">
				<view class=" title text-bold" style="min-width: 60px;">{{ i18n_product.product.msg }}</view>
				<view class="text-grey">{{ current.Msg}}</view>
			</view>
		</form>
		<!-- 表单 -->
		<!-- 底部按钮 -->
		<bottom-btns v-if="isAdmin && false" :btns="btn_list" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 品牌详情
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式有关参数
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				// 与系统有关参数
				isAdmin : false,			// 是否管理员
				ProductId : 0 ,				// 产品Id		
				current : {
					ProductId:0,			// 门店Id
					ProductNo: '',			// 产品编码
					ProductName : '',		// 产品名称
					CategoryName:'',		// 产品分类
					BrandName:'',			// 品牌
					ModelName:'',			// 型号
					Msg:'',					// 备注
				},				// 返回值
				loadContentText: this.global.params.loadContentText,
				status: 'more',			// 状态-更多
				// 返回顶部
				btn_list: [{
					name: '编辑',
					icon: 'cuIcon-edit',
					clickName: 'edit',
				}] 
			}
		},
		computed:{
			i18n_product : function(){
				return this.$t("product");
			}
		},
		onLoad:function(options){
			_self = this;
			this.getParams(options);
			if(Boolean(this.ProductId)){
				// 获取组织信息
				this.getInfo(this.ProductId);
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
				this.ProductId = Boolean(options.ProductId ) ?  options.ProductId : 0 ;
			},
			// ============================================= 监听事件 ======================================
			/** 判断是否当前管理员
			 * @param {Boolean} value 是否当前管理员
			 */
			adminF : function(value){
				this.isAdmin = value;
			},
			/** 点击底部事件
			 * @param {String} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'edit' : 
						uni.navigateTo({
							url :"/pages_basic/product/product/edit?ProductId=" + _self.ProductId
						})
						break;
					default:break;
				}
			},
			// =========================================== 请求事件 =======================================================================
			/** 获取产品详情
			 * @param {Number} productId 产品Id
			 */
			getInfo : function(productId){
				this.global.productR.getInfo({
					id :productId,
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
			// =========================================================================================================================
		}
	}
</script>

<style>

</style>
