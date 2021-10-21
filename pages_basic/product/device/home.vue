<template>
	<view class="flex flex-direction bg-white">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">设备</block>
		</cu-custom>
		<view class="flex flex-start ">
			<view style="width: 87vw;">
				<luyj-search-bar v-model="search.searchKey" :placeholder="i18n_product.device.searchKeyPlaceholder"
					radius="80" cancelColor="#999999" @confirm="search_confirm(true)"></luyj-search-bar>
			</view>
			<view style="width: 13vw;" class="margin-xs text-sl" @click="toScan">
				<text class="cuIcon cuIcon-scan"></text>
			</view>
		</view>

		<!-- 搜索条件 -->
		<view v-if="switBranch " class="u-m-p-50 ">
			<!-- 商户-->
			<view class="u-demo-area u-flex u-row-center margin-sm">
				<label style="width: 100vw;" class="text-center" @click="changBranchs">
					<text>{{ mchName ? mchName : '无'}}</text>
					<u-icon name="arrow-down" size="28" color="#909399"></u-icon>
				</label>
			</view>
		</view>
		<!-- 搜索条件 -->
		<uni-list>
			<!-- 设备列表 -->
			<uni-list-item v-for="(item , index ) in device_list" :key="index" showArrow title="1"
				:thumb="item.ImgUrl? item.ImgUrl : device_thumb" thumbSize="lg"
				:to="'/pages_basic/product/device/detail?DeviceId=' +item.DeviceId ">
				<teleport slot="body" class="flex flex-direction">
					<view class=" cf ">
						<view class="fl text-cut text-lg">
							<text class="text-bold"> {{ item.Name ? item.Name :'' }}</text>
						</view>
						<view class="text-sm fr cu-tag text-cut">{{ item.CategoryName ? item.CategoryName : '' }}</view>
					</view>
					<view class="text-sm text-cut text-grey box">
						<text class="item-left">{{ i18n_product.device.deviceSn }}</text>
						<text class="item-right">{{ item.DeviceSn ? item.DeviceSn :'' }}</text>
					</view>
					<view class="text-sm text-cut text-grey box">
						<text class="item-left">{{ i18n.supplier }}</text>
						<text class="item-right">{{ item.SupMchName ? item.SupMchName :'' }}</text>
					</view>
					<view class="text-sm text-cut text-grey box">
						<text class="item-left">{{ i18n_product.device.mchId }}</text>
						<text class="item-right">{{ item.MchName ? item.MchName : '' }}</text>
					</view>
				</teleport>
			</uni-list-item>
			<!-- 没有更多数据了 -->
			<uni-load-more :contentText="loadContentText" :status="status" @clickLoadMore="search_confirm(false)"></uni-load-more>
		</uni-list>

		<!-- 返回顶部 -->
		<u-back-top :scrollTop="scrollTop">
		</u-back-top>
		<!-- 返回顶部 -->

	</view>
</template>

<script>
	/**
	 * 设备主页
	 * @author 陆彦捷
	 * /api/SvcMchCustom/GetDevices 获取客户设备
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式参数
				device_thumb: this.global.statics.thumb.device_thumb,
				preview: this.global.publicF.hasBack(),
				scrollTop: 0, // 滚动的起始位置
				pattern: this.global.params.fab_pattern, // 可选配置项样式（悬浮按钮）
				loadContentText: this.global.params.loadContentText, // 加载中
				// 系统参数
				Self: true, // 是否当前组织
				mchName: this.global.organ.getTopName() ? this.global.organ.getTopName() : this.global.organ
			.getName(), // 组织/门店名称
				// 系统参数 - 设备
				search: {
					searchKey: '', // 关键字 (搜索条件）
					mchId: this.global.organ.getBranchId(),
					customId: null, // 客户Id
					categoryId: null, // 分类id(搜索条件)
					brandId: null, // 品牌Id
					modelId: null, // 型号Id
					pageIndex: 1, // 当前页
					pageSize: 20, // 每页大小
				},
				model: '', // 型号
				status: 'more', // 	加载状态
				device_list: [], // 设备列表

			}
		},
		computed: {
			// 国际化
			i18n: function() {
				return this.$t('basic');
			},
			i18n_product: function() {
				return this.$t("product");
			},
			/**
			 * 是否可切换门店
			 */
			switBranch: function() {
				return this.global.organ.getIsSup() || this.global.organ.getIsSvc();
			}
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
			this.search_confirm(true); // 设备请求(获取设备名称)
		},
		onShow: function() {
			uni.$once("query", query => {
				if (Boolean(query)) {
					console.log("query=>", query);
					this.search.customId = query.Self ? null : query.MchId;
					this.mchName = query.Name;
					this.Self = query.Self;
					this.search_confirm(true); // 设备请求
				}
			});
		},
		// 滚动条事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		/**
		 * 上拉触底事件-加载设备信息
		 */
		onReachBottom: function() {
			this.search_confirm(false);
		},
		methods: {
			// ============================================ 初始化 ================================================
			/** 初始化参数
			 * @param {Object} options
			 */
			getParams: function(options) {
				this.search.mchId = options.MchId ? options.MchId : this.search.mchId; // 组织Id
				this.search.searchKey = options.searchKey ? options.searchKey : ''; // 搜索值
			},
			// ============================================ 监听事件 ===============================================
			/** 设备搜索
			 * @param {Boolean} first 是否加载首页
			 */
			search_confirm: function(first = false) {
				this.search.pageIndex = first ? 1 : this.search.pageIndex;
				this.status = first ? "more" : this.status;
				if (this.status == 'loading' || (this.status === 'noMore' && this.search.pageIndex != 1)) {
					return;
				}
				this.devicelist_request();
			},
			/** 切换客户
			 * @param {Object} e
			 */
			changBranchs: function(e) {
				uni.navigateTo({
					url: '/pages_basic/customer/customer-select?'
				});
			},
			/**
			 * 调用扫一扫查看设备详情
			 */
			toScan : function () {
				uni.scanCode({
					// #ifndef MP-TOUTIAO
					scanType:['barCode'],		// 设定扫码类型为条形码
					// #endif
					success: function(e) {
						_self.global.productR.productBySn_request({
							data :{sn : e.result},
							success : function(data){
								if(Boolean(data)){
									uni.navigateTo({
										url:'/pages/basic/product/device/detail?DeviceId'+ data.DeviceId
									});
									return;
								}
								uni.showToast({
									title: _self.i18n.searchaFailMessage,
									icon:'none'
								});
							},
							fail : function(){
								uni.showToast({
									title: _self.i18n.searchaFailMessage,
									icon:'none'
								})
							}
						});
					},
					fail: function(e) {
						uni.showToast({
							title:'调用扫码方法失败',
							icon:'none'
						});
						
					}
				})
			},
			// ============================================ 请求事件 ===============================================
			/**
			 * 设备列表请求
			 */
			devicelist_request: function() {
				let func = this.Self ? this.global.deviceR.getListPage : this.global.deviceR.getCustList;
				func({
					data: _self.search,
					before: function() {
						_self.status = "loading";
						if (_self.search.pageIndex === 1) {
							_self.device_list = [];
						}
					},
					success: function(data) {
						// 获取页面状态并添加索引
						if (Array.isArray(data)) {
							_self.device_list = _self.device_list.concat(data);
							_self.search.pageIndex++;
							if (data.length < _self.search.pageSize) {
								_self.status = "noMore";
								return;
							}
						}
						_self.status = "more";
					},
					fail: function() {
						_self.status = "more";
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
		width: 120rpx;
		text-align: justify;
		font-weight: bold;
	}
	.item-right{
		flex:1;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}
</style>
