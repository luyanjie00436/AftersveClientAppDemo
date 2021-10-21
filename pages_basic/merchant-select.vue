<template>
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_merchant.merchantSelect }}</block>
		</cu-custom>
		<!-- 导航栏 -->
		<!-- 头部 -->
		<view style="position: fixed;width: 100vw;z-index: 999;" :style="{'top': CustomBar + 'px'}"
			class="flex flex-direction bg-white">
			<!-- 搜索框 -->
			<luyj-search-bar  radius="80" cancelColor="#999999" :placeholder="i18n_merchant.branch.searchPlaceholder"
				v-model="search.searchKey" @confirm="searchClick(true)" @cancel="searchCancel"></luyj-search-bar>
			<!-- 搜索框 -->
		</view>
		<!-- 头部 -->
		<!-- body -->
		<view style="margin-top:calc(36px + 32rpx)">
			<uni-list >
				<uni-list-item v-if="current.MchId > 0" :title="current.MchNo  + '  ' + current.Name" clickable @click="clickItem(current)">
					<template slot="footer">
						<view class="text-df text-cyan">当前</view>
					</template>
				</uni-list-item>
				<!-- v-for="(item, index) for list" :key="index"
						:title="item.MchNo  + '  ' + item.Name "
						clickable @click="clickItem(item)" -->
				<uni-list-item v-for="(item,index) in list" :key="index" :title="item.MchNo  + '  ' + item.Name" clickable @click="clickItem(item)" ></uni-list-item>
			</uni-list>
			<uni-load-more :contentText="loadContentText" :status="status" @clickLoadMore="searchClick">
			</uni-load-more>
		</view>
		
		<!-- body -->
		<!-- 返回top -->
		<u-back-top :scrollTop="scrollTop" ></u-back-top>
		<!-- 返回top -->
	</view>
</template>

<script>
	/**
	 * 商户选择
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview: this.global.publicF.hasBack(),
				CustomBar: this.CustomBar,
				scrollTop: 0,
				// 与系统有关参数
				search:{
					searchKey: '' , 		// 搜索关键字
					pageIndex : 1,			// 当前页面
					pageSize : 20,			// 能够触发下拉事件
				},
				list : [],				// 组织信息
				current : {
					MchId:0,// id
				},
				loadContentText: this.global.params.loadContentText, // 加载更多
				status :'more'		// 状态
			}
		},
		computed :{
			// 国际化
			i18n_merchant : function(){
				return this.$t("merchant");
			}
		},
		onLoad:function(options){
			_self = this;
			this.getParams(options);
			if(this.current.MchId > 0){
				this.getMchInfo(this.current.MchId);		// 当前选项
			}
			this.getList(true);
		},
		onReachBottom:function(){
			this.searchClick();		// 搜索事件
		},
		// 滚动条事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// ============================================= 初始化方法 ================================================================
			/** 初始化参数
			 * @param {Object} options
			 */
			getParams : function(options){
				this.current.MchId = options.MchId ? options.MchId : 0;
			},
			// ============================================== 监听事件 =================================================================
			/**
			 * 搜索事件
			 * @param {Boolean} first 是否重新获取首页  
			 */
			searchClick : function(first = false){
				this.search.pageIndex = first ? 1 : this.search.pageIndex;
				if (this.status == 'loading' || (this.status === 'noMore' && this.search.pageIndex != 1)) {
					return;
				}
				this.getList();
			},
			/** 取消搜索事件
			 * @param {Object} e
			 */
			searchCancel: function(e){
				if(e.value != ""){
					this.search.pageIndex = 1;
					if (this.status == 'loading' || (this.status === 'noMore' && this.search.pageIndex != 1)) {
						return;
					}
					this.getList();
				}
			},
			/** 点击、选择组织事件
			 * @param {Object} item 
			 */
			clickItem : function(item){
				uni.$emit('query',item);
				uni.navigateBack();
			},
			// ====================================== 请求方法 =========================================================================
			/** 根据Id获取组织信息
			 * @param {Number} mchId 组织Id
			 */
			getMchInfo : function(mchId){
				this.global.merchantR.getInfo({
					id : mchId,
					success : function(data){
						_self.current = data;
					}
				});
			},
			/**
			 * 获取组织信息
			 */
			getList : function(){
				this.global.merchantR.getListPage({
					data: _self.search,
					before: function() {
						// 状态
						_self.status = 'loading';
						if (_self.search.pageIndex === 1) {
							_self.list.length = 0;
						}
					},
					success: function(data) {
						if (Array.isArray(data)) {
							_self.list = _self.list.concat(data);
							_self.search.pageIndex++;
							// 增加索引-继续获取
							if (data.length < _self.search.pageSize) {
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
			// =========================================================================================================================
		}
	}
</script>

<style>

</style>
