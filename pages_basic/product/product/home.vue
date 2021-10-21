<template>
	<view>
		<!-- 权限判断 -->
		<operate-permission @isAdmin="adminF"></operate-permission>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_product.productTitle}}</block>
		</cu-custom>
		
		<!-- 搜索条件 -->
		<view class="bg-white">
			<luyj-search-bar v-model="search.searchKey" radius="80"  cancelColor="#999999" placeholder="请输入产品编码或名称" @confirm="confirm" @cancel="cancel" ></luyj-search-bar>
		</view>
		<!-- 列表 -->
		<uni-list>
			<uni-list-item showArrow v-for="(item , index) in list" :key="index" 
			:title="item.ProductNo + ' '  + item.ProductName"
			 :to="'/pages_basic/product/product/detail?ProductId=' + item.ProductId"
			 :thumb="item.ImgUrl"></uni-list-item>
			 <!-- 加载更多 -->
			 <uni-load-more :contentText="loadContentText" :status="status" @clickLoadMore="getList"></uni-load-more>
			 <!-- 加载更多 -->
		</uni-list>
		<!-- 返回顶部 -->
		<u-back-top :scrollTop="scrollTop">
		</u-back-top>
		
		<!-- 底部按钮 -->
		<bottom-btns v-if="isAdmin && false" :btns="btn_list"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 产品列表
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式相关参数
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				scrollTop: 0,
				isAdmin : false,		// 是否管理员
				// 系统相关参数
				search :{
					searchKey :'',		// 搜索关键字
					mchId : this.global.organ.getIndustryId(),
					pageInde : 1,		// 页码
					pageSize: 20,		// 每页条数
				},		// 搜索条件
				loadContentText: this.global.params.loadContentText,
				status :'more',
				list :[],
				btn_list: [{
					name: '添加',
					icon: 'cuIcon-add',
					clickName: 'add',
					url :'/pages_basic/product/product/edit'
				}] 
			}
		},
		computed:{
			i18n_product : function(){
				return this.$t('product');
			}
		},
		onLoad:function(options){
			_self = this;
		},
		onShow : function(){
			this.confirm(true);
		},
		// 滚动条事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// ========================================================= 监听事件 =======================================================
			/** 判断是否当前管理员
			 * @param {Boolean} value 是否当前管理员
			 */
			adminF : function(value){
				this.isAdmin = value;
			},
			/** 提交时方法
			 * @param {Boolean} first 是否加载首页
			 */
			confirm : function(first = false){
				this.search.pageIndex = first ? 1 : this.search.pageIndex;
				if(this.status == 'loading' || (this.status === 'noMore' && this.search.pageIndex != 1)){
					return;
				}
				this.getList();
			},
			/**
			 * 取消时执行方法
			 */
			cancel : function(e){
				if(e.value != ''){
					this.search.pageIndex = 1;
					if(this.status == 'loading' || (this.status === 'noMore' && this.search.pageIndex != 1)){
						return;
					}
					this.getList();
				}
			},
			// ========================================================= 请求方法 =======================================================
			/**
			 * 请求产品列表
			 */
			getList : function(){
				this.global.productR.getListPage({
					data : _self.search,
					before : function(){
						_self.status = 'loading';
						if(_self.search.pageIndex == 1){
							_self.list.splice(0);
						}
					},
					success : function(data){
						if(Array.isArray(data)){
							_self.list = _self.list.concat(data);
							_self.search.pageIndex ++ ;
							if(data.length <  _self.search.pageSize){
								_self.status = 'noMore';
								return;
							}
						}
						_self.status = 'more';
					},
					fail : function(){
						_self.status = 'more';
					}
				});
			},
			// ==========================================================================================================================
		}
	}
</script>

<style>

</style>
