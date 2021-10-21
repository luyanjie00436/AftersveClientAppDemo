<template>
	<view>
		<!-- 权限判断 -->
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_mchCustomer.nameMange }}</block>
		</cu-custom>
		<!-- 导航栏 -->		
		
		<!-- 搜索条件 -->
		<view class="bg-white">
			<luyj-search-bar v-model="search.searchKey" radius="80"  cancelColor="#999999" placeholder="请输入客户编码或名称" @confirm="confirm" @cancel="cancel" ></luyj-search-bar>
		</view>
		<!-- 搜索条件 -->
		
		<!-- 列表 -->
		<uni-list>
			<uni-list-item showArrow v-for="(item , index) in list" :key="index" :title="(item.CustNo ? item.CustNo : item.CustMchNo) + ' ' + item.Name"
			 :to="'/pages_basic/customer/customerdetail?CustomId=' + item.CustomId"></uni-list-item>
			 <!-- 加载更多 -->
			 <uni-load-more :contentText="loadContentText" :status="status" @clickLoadMore="getList(false)"></uni-load-more>
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
	 * 客户列表
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				isAdmin : false,							// 判断是否管理人员
				search : {
					mchId:this.global.organ.getIndustryId(),	// 当前组织Id
					pageIndex: 1,			// 页码
					pageSize : 20,			// 可查看条数
				},
				list :[],					// 查询的列表信息
				loadContentText: this.global.params.loadContentText,
				status: 'more',			// 状态-更多
				// 返回顶部
				scrollTop: 0,		// 滚动的起始位置
				// 底部列表
				btn_list: [{
					name: '添加',
					icon: 'cuIcon-add',
					clickName: 'add',
					url :'/pages_basic/customer/customer_edit'
				}] 
			}
		},
		computed:{
			// 国际化
			i18n : function(){
				return this.$t("basic");
			},
			i18n_mchCustomer : function(){
				return this.$t("mchCustomer");
			}
		},
		onReady:function(){
			_self = this;
			this.getList(true);
		},
		// 上拉触底事件
		onReachBottom:function(){
			this.getList();
		},
		// 滚动条事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// ================================================= 监听事件 ================================================================
			/** 判断是否当前管理员
			 * @param {Boolean} value 是否当前管理员
			 */
			adminF : function(value){
				this.isAdmin = value;
			},
			/** 提交时方法
			 * @param {Object} e
			 */
			confirm : function(e){
				console.log("提交" ,e);
			},
			/**
			 * 取消时执行方法
			 */
			cancel : function(){
				console.log("取消");
			},
			// ================================================= 请求方法 =================================================================
			/**
			 * 请求客户信息列表
			 * @property {Boolean} first 是否首页 
			 */
			getList : function(first = false){
				this.search.pageIndex = first ? 1 : this.search.pageIndex;
				if(this.status == 'loading' || (this.status === 'noMore' && this.search.pageIndex != 1)){
					return;
				}
				this.global.mchCustomerR.getList({
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
							if(data.length >=  _self.search.pageSize){
								_self.status = 'more';
								return;
							}
							_self.status = 'noMore';
							return;
						}
						_self.status = 'more';
					},
					fail : function(){
						_self.status = 'more';
					}
				});
			},
			// ===========================================================================================================================
		}
	}
</script>

<style>

</style>
