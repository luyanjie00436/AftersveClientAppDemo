<template>
	<view class="flex flex-direction ">
		<!-- 判断是否登录 -->
		<is-login currentPage="index"></is-login>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_staff.nameSelect }}</block>
		</cu-custom>
		<!-- 搜索员工信息 -->
		<luyj-search-bar class="bg-white" v-model="search.searchKey" radius="80" cancelColor="#999999"
			:placeholder="i18n_staff.searchkeyPlaceholder" @confirm="confirm" @cancel="cancel"></luyj-search-bar>
		<!-- 员工列表 -->
		
		<view v-if="checkList.length > 0" class="item-box" >
			<view  v-for="(item, index) in checkList" :key="index" class="item-inline">
				<view>{{ item.Name }}</view>
				<view class="item-inline-close " @tap.stop="del" :data-index="index">
					<text class='cuIcon-close'></text>
				</view>
			</view>
		</view>
		<uni-list>
			<!-- 员工列表 -->
			<uni-list-item v-for="(item , index) in staff_list" :key="index" 
				:title="item.Name + '(' + item.StaffNo + ')'" :note="item.Mobile"
				 clickable @click="clickItem(item)">
				<template slot="header">
					<checkbox class="cyan" :value="item" :checked="isCheck(item.StaffId)"  style="transform: scale(0.5);"></checkbox>
				</template>
			</uni-list-item>
			<!-- 加载更多 -->
			<uni-load-more :contentText="loadContentText" :status="status" @clickLoadMore="stafflist_request">
			</uni-load-more>
			<!-- 加载更多 -->
		</uni-list>
		<!-- 员工列表 -->
		
		<!-- 返回顶部 -->
		<u-back-top :scrollTop="scrollTop">
		</u-back-top>
		<!-- 返回顶部 -->
		
		<!-- 底部确认 -->
		<bottom-btns :btns="btn_list_confirm" @click="clickBottom"></bottom-btns>
	</view>
</template>

<script>
	/**
	 * 员工选择 - 多选
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				scrollTop: 0,		// 滚动的起始位置
				// 与系统有关参数
				search: {
					searchKey: '', // 搜索关键字
					topMchId: 0, // 总店id
					mchId: 0, 	// 门店id
					pageIndex: 1, // 当前页码
					pageSize: 20, // 最大显示页码
				},
				checkIdList : [],	// 选中的员工Id信息
				checkList : [],		// 选中的员工列信息
				loadContentText: this.global.params.loadContentText, // 加载中
				status: 'more', // 下拉框状态
				staff_list: [], // 员工信息
				btn_list_confirm : this.global.params.btn_list_confirm,	// 底部确认按钮
			}
		},
		computed: {
			// 国际化语言
			i18n: function() {
				return this.$t("basic");
			},
			i18n_merchant: function() {
				return this.$t("merchant");
			},
			i18n_staff: function() {
				return this.$t("staff");
			},
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options); // 初始化信息
			this.stafflist_request(); // 获取员工信息
		},
		// 下列触底加载员工列表
		onReachBottom: function() {
			this.stafflist_request();
		},
		// 滚动条事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// ====================================== 初始化信息 ============================================================================
			/** 初始化数据
			 * @param {Object} options
			 */
			getParams: function(options) {
				let staffs = options.staffs;
				if(staffs){
					// 获取选中员工
					// #ifdef H5
					let obj = staffs.replace("\"([^\"]*)\"", "$1");
					this.checkList = JSON.parse(obj);
					// #endif
					// #ifdef MP-QQ||MP-WEIXIN||APP-NVUE||APP-PLUS
					this.checkList = JSON.parse(staffs);
					// #endif
					// 获取选中员工的id
					this.checkIdList = [];
					this.checkList.forEach(item=>{
						_self.checkIdList.push(item.StaffId);
					});
				}
				_self.search.topMchId = this.global.organ.getIndustryId(); // 当前组织信息
				_self.search.mchId = this.global.organ.getBranchId(); // 当前门店信息
			},
			// ====================================== 监听事件 ============================================================================
			/** 搜索当前员工信息
			 * @param {Object} e
			 */
			confirm: function(e) {
				this.stafflist_request(true);
			},
			/** 取消搜索员工信息
			 * @param {Object} e
			 */
			cancel: function(e) {
				this.stafflist_request(true);
			},
			/** 点击员工列
			 * @param {Object} item
			 */
			clickItem: function(item) {
				let hasItem = this.checkIdList.includes(item.StaffId);
				if(hasItem){
					// 移除当前元素
					let index = this.checkIdList.indexOf(item.StaffId);
					this.checkIdList.splice(index , 1);
					this.checkList.splice(index , 1);
				}else{
					// 添加当前列表
					this.checkIdList.push(item.StaffId);
					this.checkList.push(item);
				}
			},
			/** 移除当前员工信息
			 * @param {Object} e
			 */
			del : function(e){
				let index = e.currentTarget.dataset.index;
				this.checkIdList.splice(index , 1);
				this.checkList.splice(index , 1);
			},
			/** 点击底部确认按钮
			 * @param {String} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'confirm' :
						// 返回到上一页面
						uni.$emit('staffs', {
							checkList:this.checkList,
							checkIdList:this.checkIdList
						});
						uni.navigateBack();
						break;
					default: break;
				}
			},
			// ====================================== 公共方法 ============================================================================
			/** 判断当前项(员工)是否选中
			 * @param {Number} staffId 员工Id
			 */
			isCheck : function(staffId){
				return this.checkIdList.includes(staffId);
			},
			// ====================================== 请求事件 ============================================================================
			/**
			 * 获取员工列表信息
			 * @param {Boolean} first 是否加载首页（默认false）
			 */
			stafflist_request: function(first = false) {
				this.search.pageIndex = first ? 1 : this.search.pageIndex;
				if (this.status == 'loading' || (this.status === 'noMore' && this.search.pageIndex != 1)) {
					return;
				}
				this.global.staffR.getListPage({
					data: _self.search,
					before: function() {
						_self.status = 'loading';
						if (_self.search.pageIndex == 1) {
							_self.staff_list = [];
						}
					},
					success: function(data) {
						if (Array.isArray(data)) {
							_self.staff_list = _self.staff_list.concat(data);
							_self.search.pageIndex++;
							if (data.length >= _self.search.pageSize) {
								_self.status = 'more';
							} else {
								_self.status = 'noMore';
							}
						}
					},
					fail: function() {
						_self.status = 'more';
					}
				});
			},
			// ===============================================================================================================================
		}
	}
</script>

<style scoped lang="scss">
.item-box {
		display: flex ;
		flex-flow: row wrap;
		// 每个员工项
		.item-inline{
			display: flex ;
			flex-direction: row;
			background-color: #F0F0F0;
			color : #333333;
			margin : 10rpx;
			// 关闭按钮
			.item-inline-close{
				font-size: 24rpx;
				vertical-align: middle;
				position: relative;
				display: -webkit-inline-box;
				display: -webkit-inline-flex;
				display: inline-flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				align-items: center;
				-webkit-box-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
				box-sizing: border-box;
				padding: 0rpx 16rpx;
				height: 48rpx;
				font-family: Helvetica Neue, Helvetica, sans-serif;
				white-space: nowrap;
			}
		}
	}
</style>
