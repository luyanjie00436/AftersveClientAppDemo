<template>
	<view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_product.brandTiltle}}</block>
		</cu-custom>
		<!-- 搜索条件 -->
		<view class="bg-white">
			<luyj-search-bar v-model="search.searchKey" radius="80"  cancelColor="#999999" placeholder="请输入品牌编码或名称" @confirm="confirm" @cancel="cancel" ></luyj-search-bar>
		</view>
		<!-- 列表 -->
		<uni-list >
			<uni-list-item showArrow v-for="(item , index) in list" :key="index" :title="item.Name"
			 :to="'/pages_basic/product/brand/branddetail?BrandId=' + item.BrandId"></uni-list-item>
			 <!-- 加载更多 -->
			 <uni-load-more :contentText="loadContentText" :status="status" @clickLoadMore="getList"></uni-load-more>
			 <!-- 加载更多 -->
		</uni-list>
		<!-- 列表 -->
		<!-- 返回顶部 -->
		<u-back-top :scrollTop="scrollTop">
		</u-back-top>
		<!-- 返回顶部 -->
		<!-- 底部按钮 -->
		<bottom-btns v-if="isAdmin" :btns="btn_list"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 品牌
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式相关
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				scrollTop: 0,		// 滚动的起始位置
				isAdmin : false,		// 是否管理员
				// 系统相关
				search :{
					searchKey : '',
					pageIndex : 1,
					pageSize : 20,
				},	// 搜索条件
				list:[],
				loadContentText: this.global.params.loadContentText,
				status :'more',
				btn_list: [{
					name: '添加',
					icon: 'cuIcon-add',
					clickName: 'add',
					url :'/pages_basic/product/brand/brand_edit'
				}] 
			}
		},
		computed:{
			// 国际化
			i18n_product : function(){
				return this.$t('product');
			}
		},
		onLoad:function(){
			_self = this;
			this.confirm(true);		// 获取列表
		},
		onShow:function(){
			this.confirm(true);		// 获取列表
		},
		// 上拉触底事件
		onReachBottom:function(){
			this.confirm();
		},
		// 滚动条事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// =========================================== 监听事件 ==================================================================
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
			// ============================================ 请求方法 ==================================================================
			/**
			 * 获取品牌列表
			 */
			getList : function(){
				this.global.brandR.getListPage({
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
			// ========================================================================================================================
		}
	}
</script>

<style>

</style>
