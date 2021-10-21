<template>
	<view class="flex flex-direction bg-white">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{i18n_merchant.nameBranch }}</block>
		</cu-custom>
		<!-- 导航栏 -->
		<!-- 头部 -->
		<view style="position: fixed;width: 100vw;z-index: 999;" :style="{'top': CustomBar + 'px'}"
			class="flex flex-direction bg-white">
			<!-- 搜索框 -->
			<luyj-search-bar radius="80" cancelColor="#999999" :placeholder="i18n_merchant.branch.searchPlaceholder"
				v-model="searchbranch.searchKey" @confirm="searchClick(true)" @cancel="searchCancel"></luyj-search-bar>
			<!-- 搜索框 -->
			<!-- 测试下拉栏 -->
			<view class="u-m-p-50">
				<view class="u-demo-area u-flex u-row-center">
					<!-- 部门 -->
					<luyj-data-picker style="width: 50%;" :placeholder="i18n_merchant.branch.orgPlaceholder"
						:border="false" :preload="true" :localdata="organtrees" :value="search.orgId"
						:popup-title="i18n_merchant.branch.orgTitle" @change="org_change">
					</luyj-data-picker>
					<!-- 部门 -->
					<!-- 地区 -->
					<luyj-data-picker ref="area" style="width: 50%;" v-model="area"
						:placeholder="i18n_merchant.areaPlaceholder" :border="false" :preload="true"
						:localdata="area_list" :popup-title="i18n_merchant.areaTitle" @nodeclick="area_nodeclick"
						@popupclosed="area_popupclosed"></luyj-data-picker>
					<!-- 地区 -->
				</view>
			</view>
		</view>
		<!-- 头部 -->
		<!-- 测试下拉栏 -->
		<!-- body(不同浏览器可能有细微差别，未计算) -->
		<view style="margin-top: 85px;">
			<teleport v-if="!isSearch">
				<u-index-list :scrollTop="scrollTop" :index-list="indexList">
					<view v-for="(item, index) in list" :key="index">
						<u-index-anchor :index="item.letter" />
						<navigator class="list-cell u-border-bottom" v-for="(item1, index) in item.data" :key="index"
							:url="'/pages_basic/orgation/orgationdetail?MchId=' + item1.MchId">
							<view class="paddding-left-sm">
								<text class="text-grey text-lg margin-right-sm">{{item1.MchNo}}</text>{{item1.Name}}
							</view>
						</navigator>
					</view>
				</u-index-list>
				<uni-load-more style="z-index: 10901;" :contentText="loadContentText" :status="status"
					@clickLoadMore="parOrg_request">
				</uni-load-more>
			</teleport>
			<teleport v-else>
				<uni-list>
					<uni-list-item v-for="(item,index) in branchList" :key="index"
						:title="item.MchNo + '  ' + item.Name "
						:to="'/pages_basic/orgation/orgationdetail?&MchId=' + item.MchId"></uni-list-item>
				</uni-list>
				<uni-load-more :contentText="loadContentText" :status="branchStatus" @clickLoadMore="searchClick">
				</uni-load-more>
			</teleport>
		</view>
		<!-- body -->
	</view>
</template>

<script>
	/**
	 * 门店索引
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				CustomBar: this.CustomBar,				// 高度
				options : null,							// 当前参数
				// 系统参数
				isSearch: false, // 是否搜索
				organtrees: [], // 部门树
				area: "", // 当前选中的地区
				tempArea: null, // 当前点击的area
				areaLoading : false,		// 地区是否加载中
				area_list: [], // 地区
				branchStatus: 'more', // 搜索列表状态
				searchbranch: {
					searchKey: '',
					topMchId: this.global.organ.getIndustryId(), // 组织Id
					orgId: null,
					area1: null,
					area2: null,
					area3: null,
					pageIndex: 1,
					pageSize: 20, // 考虑到屏幕的填充
				},
				branchList: [], // 门店列表

				scrollTop: 0, // 滚动条位置
				search: {
					topMchId: this.global.organ.getIndustryId(), // 组织Id
					orgId: null,
					area1: null,
					area2: null,
					area3: null,
					orderName: 'MchNo', // 排序名称
					pageIndex: 1,
					pageSize: 200,
				},
				indexList: [], // 列表
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
			}
		},
		/**滚动条事件
		 * @param {Object} e
		 */
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// 加载完成事件
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
			this.getOrg(); // 获取部门信息
			this.getArea(); // 获取所在地区
		},
		// 渲染完成事件
		onShow:function(){
			if(!this.areaLoading){
				this.parOrg_request(true);
			}
		},
		// 上拉触底事件
		onReachBottom: function() {
			if (this.isSearch) {
				this.searchClick();
			} else {
				this.parOrg_request(); // 获取门店信息
			}
		},
		methods: {
			// ================================================== 初始化方法 ======================================================
			/** 加载参数
			 * @param {Object} options
			 */
			getParams: function(options) {
				this.options = options;
				// 上级组织
				this.search.topMchId = Boolean(options.MchId) ? parseInt(options.MchId) : this.search.topMchId;
				this.searchbranch.topMchId = Boolean(options.MchId) ? parseInt(options.MchId) : this.searchbranch
					.topMchId;
				// 部门
				this.search.orgId = Boolean(options.OrgId) ? options.OrgId : this.search.orgId;
				this.searchbranch.orgId = Boolean(options.OrgId) ? options.OrgId : this.searchbranch.orgId;
				// 地区
				this.area = this.options.AreaId ? this.options.AreaId : this.area;
			},
			/**
			 * 获取当前地区
			 */
			getArea: function() {
				this.global.areaR.getTrees({
					before : function(){
						_self.areaLoading = true;		// 地区是否加载中
						_self.status = 'loading';		// 假装门店状态加载中
						var temp = {
							"value": "",
							"text": "无",
						};
						_self.area_list.unshift(temp);
					},
					success: function(data) {
						_self.areaLoading = false;
						_self.area_list = _self.area_list.concat(data);
					},
					fail: function(){
						_self.areaLoading = false;
					},
					complete : function(){
						// 获取当前选中值 （onshow的ready事件无效）
						_self.$refs['area'].$nextTick(function(){
							_self.setAreaSearch();
							_self.parOrg_request(true);
						});
					}
				});
			},
			/**
			 * 获取当前部门信息
			 */
			getOrg: function() {
				this.global.departmentR.getTrees({
					data: {
						mchId: _self.search.topMchId,
						loadMch: false,
						loadStaff: false,
						dataType: 1
					},
					success: function(fulldata, filterdata) {
						_self.organtrees = fulldata;
						var temp = {
							"value": null,
							"text": "无",
						};
						_self.organtrees.unshift(temp);
					}
				});
			},
			/**
			 * 获取门店信息
			 * @param {Boolean} first 是否加载首页
			 */
			parOrg_request: function(first = false) {
				this.search.pageIndex = first ? 1 : this.search.pageIndex;
				if ((this.status == 'loading' && this.search.pageIndex !=1 ) || (this.status === 'noMore' && this.search.pageIndex != 1)) {
					return;
				}
				this.global.merchantR.getListPage({
					data: _self.search,
					before: function() {
						// 状态
						_self.status = 'loading';
					},
					success: function(data) {
						if (_self.search.pageIndex === 1) {
							// 清空索引
							_self.indexList.splice(0);
							_self.list.splice(0);
						}
						if (Array.isArray(data)) {
							_self.loadList(data);
							// 增加索引-继续获取
							if (data.length >= _self.search.pageSize) {
								_self.search.pageIndex++;
								_self.status = 'more';
							} else {
								_self.status = 'noMore';
							}
							return;
						}
					},
					fail: function() {
						_self.status = 'more';
					}
				});
			},
			// ============================================== 监听事件 ===========================================================
			/**搜索事件
			 * @param {Boolean} first 是否首次搜索
			 */
			searchClick: function(first = false) {
				this.isSearch = true;
				this.searchbranch.pageIndex = first ? 1 : this.searchbranch.pageIndex;
				if (this.branchStatus == 'loading' || (this.branchStatus === 'noMore' && this.searchbranch.pageIndex !=
						1)) {
					return;
				}
				this.global.merchantR.getListPage({
					data: _self.searchbranch,
					before: function() {
						_self.branchStatus = 'loading';
						if (_self.searchbranch.pageIndex === 1) {
							_self.branchList.splice(0);
						}
					},
					success: function(data) {
						if (Array.isArray(data)) {
							_self.branchList = _self.branchList.concat(data);
							_self.searchbranch.pageIndex++;
							if (data.length >= _self.searchbranch.pageSize) {
								_self.branchStatus = 'more';
							} else {
								_self.branchStatus = 'noMore';
							}
						}
					},
					fail: function() {
						_self.branchStatus = "more";
					}
				})
			},
			/**取消搜索事件
			 * @param {Object} e
			 */
			searchCancel: function(e) {
				this.isSearch = false;
			},
			/** 选择部门事件
			 * @param {Object} e
			 */
			org_change: function(e) {
				let value = e.detail.value;
				if (value.length > 0) {
					this.search.orgId = value[value.length - 1].value;
					this.searchbranch.orgId = value[value.length - 1].value;
				} else {
					this.search.orgId = null;
					this.searchbranch.orgId = null;
				}
				// 加载门店或列表请求事件
				this.parOrg_request(true);
				if (this.isSearch) {
					this.searchClick(true);
				}
			},
			/**
			 * 点击地区事件
			 */
			area_nodeclick: function(e) {
				this.tempArea = e.value;
			},
			/** 关闭地区事件
			 */
			area_popupclosed: function() {
				// 获取area值
				this.area = this.tempArea;
				this.setAreaSearch();		// 设置选中的Area值
				// 加载门店或列表请求事件
				this.parOrg_request(true);
				if (this.isSearch) {
					this.searchClick(true);
				}
			},
			// ============================================== 公共方法 ============================================================
			/** 将现有的门店信息加载到索引（indexList 和list）
			 * @param {Array} list 要加载的列表
			 */
			loadList: function(list) {
				list.forEach(item => {
					var temp = Boolean(item.MchNo) ? item.MchNo.substr(0, 1).toUpperCase() : '#';
					// 索引数组
					if (this.indexList.indexOf(temp) == -1) {
						this.indexList.push(temp);
					}
					// 索引列表数组
					var tempobj = this.list.find(i => {
						return i.letter == temp;
					});
					if (Boolean(tempobj)) {
						tempobj.data.push(item);
					} else {
						var tempo = {
							letter: temp,
							data: [item]
						};
						this.list.push(tempo);
					}
				});
			},
			/**
			 * 根据选中值，获取地区的搜索条件
			 */
			setAreaSearch : function(){
				var value = this.$refs['area'].selected;
				this.search.area1 = value.length > 0 ? value[0].value : null;
				this.searchbranch.area1 = value.length > 0 ? value[0].value : null;
				this.search.area2 = value.length > 1 ? value[1].value : null;
				this.searchbranch.area2 = value.length > 1 ? value[1].value : null;
				this.search.area3 = value.length > 2 ? value[2].value : null;
				this.searchbranch.area3 = value.length > 2 ? value[2].value : null;
			},
			// ====================================================================================================================
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: $u-content-color;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>
