<template>
	<view class="flex flex-direction bg-white" style="min-height: 100vh;">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_product.modelManage }}</block>
		</cu-custom>
		<!-- 搜索框 -->
		<luyj-search-bar v-model="search.searchKey" cancelColor="#999999" radius="80" :placeholder="i18n_product.model.searchPlaceholder" @confirm="searchConfirm(true)" ></luyj-search-bar>
		
		<!-- 下拉选择 -->
		<view class="u-m-p-50 bg-white ">
			<view class="u-demo-area u-flex u-row-center">
				<!-- 选择品牌 -->
				<luyj-data-picker v-model="search.brandId" style="width:100vw" :border="false"  :placeholder="i18n_product.brandPlaceholder"
					:preload="true" :localdata="brand_tree" 
					:popup-title="i18n_product.brandTiltle"  
					:column-names ="{value : 'value',text :'Name' ,children:'children'}" 
					 @change="changeBrandId" 
					  ></luyj-data-picker>
				<!-- 选择品牌 -->
			</view>
		</view>
		<!-- 下拉选择 -->
		
		<!-- 型号列表 -->
		<uni-list>
			<uni-list-item v-for="(item,index) in model_list" :key="index" showArrow :title="item.Name" :note="item.BrandName" 
			 :to="'/pages_basic/product/productmodel/detail?ModelId=' + item.ModelId"
			 >
			</uni-list-item>
		</uni-list>
		<uni-load-more v-if="listMoreStatus != 'noMore'" :contentText="loadContentText" :status="listMoreStatus" @clickLoadMore="getModels"></uni-load-more>
		<!-- 型号列表 -->
		<!-- 返回顶部 -->
		<u-back-top :scrollTop="scrollTop">
		</u-back-top>
		<!-- 返回顶部 -->
		<!-- 底部按钮 -->
		<bottom-btns v-if="isAdmin && false" :btns="btn_list"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 型号
	 * @author 陆彦捷
	 * @description  型号的查看和搜索列表
	 */
	var _self;
	export default {
		data() {
			return {
				// 页面样式参数
				preview :  this.global.publicF.hasBack(),			// 上级页面
				loadContentText: this.global.params.loadContentText, // 加载中
				scrollTop:0 ,										// 滚动按钮
				// 系统参数
				brand_tree : [],			// 品牌树形图
				brandId : 0 ,				// 分类id
				// 搜索条件
				search : {
					searchKey : '',
					brandId: null,			// 门店Id
					pageIndex : 1,
					pageSize : 20 
				},				
				model_list : [],			//	型号
				listMoreStatus : 'more',	// 加载更多状态
				currentModelId : 0 ,		// 当前型号
				btn_list: [{
					name: '添加',
					icon: 'cuIcon-add',
					clickName: 'add',
					url :'/pages_basic/product/brand/brand_edit'
				}] 
			}
		},
		computed : {
			// 国际化
			i18n_product : function(){
				return this.$t('product');
			},
			// 是否可编辑（当前商户类型为服务商或供应商）
			canEdit : function(){
				return this.global.organ.getIsSup() || this.global.organ.getIsSvc();
			}
		},
		onLoad:function(options){
			_self = this;
			this.getBrandTree();			// 获取品牌
		},
		onShow:function(){
			this.searchConfirm(true);		// 型号请求
		},
		/**
		 * 页面触底上拉
		 */
		onReachBottom:function(){
			this.searchConfirm();
		},
		// 滚动事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// ===================================== 监听事件 ===========================================================
			/**
			 * 搜索提交事件
			 * @param {Boolean}  first  是否加载首页
			 */
			searchConfirm : function(first = false){
				this.search.pageIndex =  first ? 1 : this.search.pageIndex;
				this.listMoreStatus = first ? 'more' : this.listMoreStatus;
				if(this.listMoreStatus != "more" || (this.listMoreStatus == 'noMore' && this.search.pageIndex != 1)){
					return;
				}
				this.getModels();			// 搜索值
			},
			/** 修改品牌
			 * @param {Object} e
			 */
			changeBrandId : function(e){
				this.search.pageIndex = 1;
				this.searchConfirm(true);
			},
			// ===================================== 公共事件 ==========================================================
			/**
			 * 获取品牌树形图
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
			/**
			 * 搜索型号
			 */
			getModels : function(){
				this.global.modelR.getListPage({
					data: _self.search,
					before : function(){
						_self.listMoreStatus = "loading";
						if(_self.search.pageIndex === 1){
							_self.model_list = [];
						}
					},
					success: function(data){
						_self.model_list = _self.model_list.concat(data);
						// 修改状态
						if(data.length >= _self.search.pageSize){
							_self.listMoreStatus = "more";
							_self.search.pageIndex += 1;
							return;
						}
						_self.listMoreStatus = "noMore";
					},
					fail:function(errors){
						_self.listMoreStatus = "more";
					}
				});
			},
			// ==========================================================================================================
		}
	}
</script>

<style>

</style>
