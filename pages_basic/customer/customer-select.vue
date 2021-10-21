<template>
	<view class="flex flex-direction ">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_mchCustomer.name }}</block>
		</cu-custom>
		<!-- 导航栏 -->
		<!-- 搜索栏 -->
		<luyj-search-bar class="bg-white"  radius="80" cancelColor="#999999" :placeholder="i18n_mchCustomer.searchKeyPlaceholder"
			v-model="search.searchKey" @confirm="searchClick(true)" @cancel="searchCancel"></luyj-search-bar>
		<!-- 搜索栏 -->
		<!-- body -->
		<uni-list>
			<uni-list-item v-if="currentMch" :title="currentMch.MchNo + ' ' + currentMch.Name" 
			 clickable	@click="clickItem(currentMch)">
				<template slot="footer" class="text-df text-cyan">
					<text>{{i18n_merchant.nameMy}}</text>
					<text v-if="Self" class="margin-left-xs">{{ i18n.currentMessage }}</text>
				</template>
			</uni-list-item>
			<uni-list-item v-if="currentCust"  :title="(currentCust.CustNo ? currentCust.CustNo : currentCust.CustMchNo) + ' ' + (currentCust.Name ? currentCust.Name : currentCust.CustMchName)" 
			clickable @click="clickItem(currentCust)">
				<template slot="footer" class="text-df text-cyan text-df">
					<text >{{ i18n.currentMessage }}</text>
				</template>
			</uni-list-item>
			<uni-list-item v-for="(item ,index) in list" :key="index"  :title="(item.CustNo ? item.CustNo : item.CustMchNo) + ' ' + (item.Name ? item.Name : item.CustMchName)" 
			clickable @click="clickItem(item)"></uni-list-item>
		</uni-list>
		<uni-load-more :contentText="loadContentText" :status="status"
			@clickLoadMore="searchClick(false)">
		</uni-load-more>
		<!-- body -->
		<!-- 返回顶部 -->
		<u-back-top :scrollTop="scrollTop">
		</u-back-top>
		<!-- 返回顶部 -->
	</view>
</template>

<script>
	/**
	 * 客户索引
	 * @author 陆彦捷
	 * @description  显示当前组织和客户
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式参数
				preview: this.global.publicF.hasBack(),
				scrollTop : 0,	// 滚动条位置
				CustomBar: this.CustomBar,
				// 系统参数
				Self : true,
				MchId : this.global.organ.getIndustryId(),
				search: {
					searchKey : '',
					mchId: this.global.organ.getIndustryId(), // 组织Id
					pageIndex : 1,			// 默认页码
					pageSize : 20,			// 默认条数
				},
				currentMch :null,		// 当前门店
				currentCust: null,
				list: [], //  索引列表
				loadContentText: this.global.params.loadContentText, // 索引列表加载更多
				status: 'more', // 索引列表状态
			}
		},
		computed: {
			i18n: function() {
				return this.$t('basic');
			},
			i18n_merchant: function() {
				return this.$t('merchant');
			},
			i18n_mchCustomer: function() {
				return this.$t('mchCustomer');
			}
		},
		
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
			_self.current_request(this.search.mchId); // 获取当前组织或门店
			if(Boolean(this.MchId) && !this.Self){
				this.getCurrentInfo(this.MchId);		
			}
			this.searchClick(true);
		},
		// 滚动条事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom: function() {
			this.searchClick(); // 获取门店信息
		},
		methods: {
			// ================================================== 初始化方法 ======================================================
			/** 加载参数
			 * @param {Object} options
			 */
			getParams: function(options) {
				this.Self = options.Self == undefined ? true : (options.Self != 'false' ? Boolean(options.Self) : false );		// 是否当前用户
				this.MchId = options.MchId ?  options.MchId : this.MchId;			// 获取到的组织Id
			},
			/**
			 * 获取客户信息
			 */
			getShortList: function() {
				this.global.mchCustomerR.getShortList({
					data: _self.search,
					before: function() {
						_self.status = 'loading';
						if(_self.pageSize == 1){
							_self.list = [];
						}
					},
					success: function(data) {
						if (Array.isArray(data)) {
							_self.list = _self.list.concat(data);
							_self.search.pageIndex ++ ;
							if(data.length < _self.search.pageSize){
								_self.status = 'noMore';
								return;
							}
						}
						_self.status = 'more';
					},
					fail: function() {
						_self.status = 'more';
					}
				});
			},
			/**
			 * 获取当选中前客户
			 * @param {Number} customId 客户Id
			 */
			getCurrentInfo : function(customId){
				this.global.mchCustomerR.getInfo({
					id : customId,
					success : function(data){
						if(Boolean(data)){
							_self.currentCust = data;
						}
					}
					
				})
			},
			/**  获取当前组织
			 * @param {Number} branchId 门店Id
			 */
			current_request: function(branchId = 0) {
				branchId = Boolean(branchId) ? branchId : _self.global.organ.getBranchId();
				this.global.merchantR.getDetail({
					id: branchId,
					success: function(data) {
						if(Boolean(data)){
							_self.currentMch = data;
						}
					},
				});
			},
			// ============================================== 监听事件 ===========================================================
			/**搜索事件
			 * @param {Boolean} first 是否首次搜索
			 */
			searchClick: function(first = false) {
				this.search.pageIndex = first ? 1 : this.search.pageIndex;
				this.status = first ? 'more' : this.status;
				if(this.status == 'loading' || (this.status === 'noMore' && this.search.pageIndex != 1)){
					return;
				}
				this.getShortList();
			},
			/**取消搜索事件
			 * @param {Object} e
			 */
			searchCancel: function(e) {
				console.log("e=>" ,e);
			},
			/** 点击当前索引
			 * @param {Object} item
			 */
			clickItem: function(item) {
				// #ifdef MP-WEIXIN || MP-QQ
				uni.$emit("query" , {
					MchId: item.CustomId ? item.CustomId : item.MchId,		// 组织、门店Id
					Name: item.Name,										// 名称
					Self : !Boolean(item.CustomId)							// 是否当前组织
				});
				uni.navigateBack();
				// #endif
			},
			// ====================================================================================================================
		}
	}
</script>

<style lang="scss" scoped>
</style>
