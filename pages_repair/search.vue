<template>
	<view class="flex flex-direction bg-white">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_order.device.title }}</block>
		</cu-custom>
		<luyj-search-bar v-model="search.searchKey" cancelColor="#999999" radius="80" :placeholder="i18n_product.device.searchKeyPlaceholder" 
		@input="search_input" @cancel="search_cancel"></luyj-search-bar>
		
		<view class="cu-form-group margin-bottom-sm">
			<!-- 设备分类 -->
			<luyj-data-picker v-model="search.categoryId" :border="false" :placeholder="i18n_product.categoryPlaceholder"   :preload="true" :localdata="category_list"
				:popup-title="i18n_product.category" @nodeclick="changeCategory" ></luyj-data-picker>
			<!-- 设备分类 -->
			<!-- 型号 -->
			<luyj-data-picker v-model="search.modelId" :border="false"  :placeholder="i18n_product.modelPlaceholder"   :preload="true" :localdata="model_list"
				:popup-title="i18n_product.modelTitle" @nodeclick="changeModel" ></luyj-data-picker>
			<!-- 型号 -->
			<!-- 品牌 -->
			<luyj-data-picker v-model="search.branch_id" :border="false" :placeholder="i18n_product.brandPlaceholder"   :preload="true" :localdata="model_list"
					:popup-title="i18n_product.brandTilte" @nodeclick="changeModel" ></luyj-data-picker>
			<!-- 品牌 -->
		</view>
		<uni-list>
			<!-- 设备列表 -->
			<uni-list-item v-for="(item , index ) in product_list" :key="index" showArrow :thumb="item.ImgUrl? item.ImgUrl : device_thumb" thumbSize="base" clickable @click="clickItem(item)" >
				<template slot="body" class="flex flex-direction" style="width: 69%;">
					<view class=" cf text-cut">
						<view class="fl text-cut text-lg">
							<text class="text-bold">{{ item.Name }}</text>
						</view>
						<view class="text-sm text-grey fr cu-tag text-cut">{{ item.CategoryName }}</view>
					</view>
					<view class="text-sm text-cut ">
						<text class="text-bold">SN码</text>
						<text class="text-grey">{{ item.DeviceSn }}</text>
					</view>
					<view class="text-sm text-cut text-grey">
						<text class="text-bold">{{ i18n.supplier }}</text>
						<text>{{ item.SupMchName }}</text>
					</view>
					<view class="text-sm text-cut text-grey">
						<text class="text-bold">所属门店</text>
						<text>{{ item.MchName }}</text>
					</view>
					<!-- 报修次数 -->
					<view v-if="false" class="text-sm text-cut text-grey">
						<text class="text-bold">报修次数</text>
						<text>0次</text>
					</view>
				</template>
				<template slot="footer" class="padding-top-lg">
					<view class="cu-tag bg-cyan round margin-top margin-left paddding">报障</view>
				</template>
			</uni-list-item>
			<!-- 没有更多数据了 -->
			<uni-load-more :contentText="loadContentText" status="noMore"></uni-load-more>
		</uni-list>
	</view>
</template>

<script>
	/**
	 * 设备报修 (SN主页)
	 * @author 陆彦捷
	 * @description  搜索设备，然后根据SN报修设备信息
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式参数
				preview : this.global.publicF.hasBack(),
				device_thumb : this.global.statics.thumb.device_thumb,
				loadContentText: this.global.params.loadContentText, // 加载中
				// 系统参数
				search :{
					searchKey : '',
					categoryId : 0,	  // 设备分类Id
					modelId : 0 ,	 // 型号Id
					branch_id : 0 ,	// 品牌Id
				},
				MchId: 0,			// 组织Id(参数的组织id或引入的组织id)
				product_list:[],	// 设备列表
				category_list :[],	// 分类列表
				model_list :[],		// 型号列表
				currentProductId : 0 ,// 当前选中的设备
				
			}
		},
		computed:{
			// 国际化
			i18n : function(){
				return this.$t('basic');
			},
			i18n_product : function(){
				return this.$t('product');
			},
			i18n_order : function(){
				return this.$t('order');
			}
		},
		onLoad:function(options){
			_self = this;
			this.getParams(options);
			this.categories_request();			// 请求分类
			this.productlist_request();			// 设备请求(获取设备名称)
		},
		methods: {
			// ============================================ 初始化 ================================================
			/** 初始化参数
			 * @param {Object} options
			 */
			getParams : function(options){
				this.MchId = options.MchId ? options.MchId : this.global.organ.getIndustryId();	// 组织Id
				this.search.searchKey = options.searchKey ? options.searchKey : '';		// 搜索值
			},
			// ============================================ 监听事件 ===============================================
			/** 设备搜索事件
			 * @param {Object} e
			 */
			search_input : function(e){
				console.log('搜索设备事件',e);
			},
			/** 搜索设备取消事件
			 * @param {Object} e
			 */
			search_cancel : function(e){
				console.log("搜索设备取消事件",e);
			},
			/** 修改分类 (点击时修改)
			 * @param {Object} item
			 */
			changeCategory : function(item){
				console.log('修改分类时方法' , item);
				// this.models_request(item.value);
			},
			/** 修改型号
			 * @param {Object} item
			 */
			changeModel : function(item){
				console.log("修改型号时方法");
			},
			/** 修改品牌
			 * @param {Object} item
			 */
			changeBranch : function(item){
				console.log("修改品牌=>" , item);
			},
			/** 点击列表时方法,根据值判断跳转
			 * @param {Object} 当前设备
			 */
			clickItem : function(item){
				this.global.repairF.repairNavigateTo(item.DeviceSn);
			},
			// ============================================ 请求事件 ===============================================
			/**
			 * 分类列表请求(模拟)
			 */
			categories_request : function(){
				console.log("分类请求模拟");
				// setTimeout(function(){
				// 	_self.category_list= _self.global.changeobjF.change(_self.global..list, "CategoryId", "Name", "Children");
				// 	var temp = {
				// 		"value": 0,
				// 		"text": "无",
				// 	};
				// 	_self.category_list.unshift(temp);
				// } , 3000);
			},
			/**
			 * 型号列表请求（模拟）
			 * @param {Number} 分类 id
			 */
			models_request : function(CategoryId){
				console.log("型号请求模拟=>" , CategoryId);
				// setTimeout(function(){
				// 	if(CategoryId == 3){
				// 		_self.model_list = _self.global.changeobjF.change(_self.global..list, "ModelId", "Name");
				// 		var temp = {
				// 			"value": 0,
				// 			"text": "全部",
				// 		};
				// 		_self.model_list.unshift(temp)
				// 	}else{
				// 		_self.model_list = [{"value":0 , "text":"全部"}];
				// 	}
				// },3000);
			},
			branchList : function(ModelId){
				console.log("型号请求");
			},
			/**
			 * 设备列表请求
			 */
			productlist_request : function(){
				this.global.deviceR.getListPage({
					data : {
						pageIndex:1,
						pageSize : 10,
					},
					before : function(){
						uni.showLoading();
					},
					success : function(data){
						uni.hideLoading();
						_self.product_list = data;
					},
					fail: function(errors){
						uni.hideLoading();
					}
				});
			},
			// =====================================================================================================
		}
	}
</script>

<style scoped lang="scss">
.box {
	display: flex;
	flex-direction: row;
	.item-left {
		width: 180rpx;
		text-align: justify;
	}
	.item-right{
		flex:1;
	}
}
</style>
