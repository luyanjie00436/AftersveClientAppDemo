<template>
	<view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_product.brand.nameBasic }}</block>
		</cu-custom>
		<!-- 权限判断 -->
		<operate-permission @isAdmin="adminF"></operate-permission>
		<!-- 权限判断 -->
		<!-- loading -->
		<uni-load-more v-if="status != 'noMore'" :contentText="loadContentText" :status="status" @clickLoadMore="getInfo(BrandId)"></uni-load-more>
		<!-- 表单 -->
		<form>
			<!-- 名称 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_product.brand.name }}</view>
				<text class="text-grey">{{ current.Name}}</text>
			</view>
			<!-- 排序 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_product.brand.sort }}</view>
				<text class="text-grey">{{ current.Sort}}</text>
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
	 * 品牌详情
	 */
	var _self;
	export default {
		data() {
			return {
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				isAdmin : false,			// 是否管理员
				BrandId: 0 ,				// 客户Id
				current : {
					BrandId:0,			// 门店Id
					Name : '',			// 名称
					Sort : 0,			// 排序
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
			if(Boolean(this.BrandId)){
				// 获取组织信息
				this.getInfo(this.BrandId);
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
				this.BrandId = Boolean(options.BrandId ) ?  options.BrandId : 0 ;
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
							url :"/pages_basic/product/brand/brand_edit?BrandId=" + _self.BrandId
						})
						break;
					default:break;
				}
			},
			// =========================================== 请求事件 =======================================================================
			/** 获取客户id
			 * @param {Number} brandId 品牌Id
			 */
			getInfo : function(brandId){
				this.global.brandR.getInfo({
					id :brandId,
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
