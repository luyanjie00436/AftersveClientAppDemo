<template>
	<view class="flex flex-direction ">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_staff.manageName }}</block>
		</cu-custom>
		<!-- 搜索员工信息 -->
		<luyj-search-bar class="bg-white" v-model="search.searchKey" radius="80"  cancelColor="#999999" :placeholder="i18n_staff.searchkeyPlaceholder" @confirm="confirm" @cancel="cancel" ></luyj-search-bar>
		
		<!-- 搜索条件下拉栏 -->
		<view class="u-m-p-50 bg-white ">
			<view class="u-demo-area u-flex u-row-center">
				<label style="width: 50%;" class="text-center" @click="changBranchs">
					<text>{{ mchName ? mchName : '无'}}</text>
					<u-icon name="arrow-down" size="28" color="#909399" ></u-icon>
				</label>
				<!-- 部门 -->
				<luyj-data-picker style="width: 50%;" :placeholder="i18n_merchant.branch.orgPlaceholder"
					:border="false" :preload="true" :localdata="organtrees" :value="search.orgId"
					:popup-title="i18n_merchant.branch.orgTitle" @change="org_change">
				</luyj-data-picker>
				<!-- 部门 -->
			</view>
		</view>
		
		<!-- 员工列表 -->
		<uni-list>
			<uni-list-item showArrow v-for="(item , index) in staff_list" :key="index" :title="item.Name + '(' + item.StaffNo + ')'"
			 :note="item.Mobile"
			 :thumb="item.Avatar? item.Avatar :logo_my" thumbSize="lg"
			 :to="'/pages_basic/staff/staffdetail?StaffId=' + item.StaffId"></uni-list-item>
			 <!-- 加载更多 -->
			 <uni-load-more :contentText="loadContentText" :status="status" @clickLoadMore="stafflist_request"></uni-load-more>
			 <!-- 加载更多 -->
		</uni-list>
		<!-- 员工列表 -->
		
		<!-- 弹出框（邀请新成员） -->
		<organ-invte  :MchId="search.mchId" :orgId="search.orgId"   @show="showModal"></organ-invte>
		<!-- 弹出框（邀请新成员） -->
		
		<!-- 返回顶部 -->
		<u-back-top :scrollTop="scrollTop">
		</u-back-top>
		<!-- 返回顶部 -->
		
		<bottom-btns :btns="btn_list" @click="clickBottom"></bottom-btns>
		
	</view>
</template>

<script>
	/**
	 * 员工信息列表
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				scrollTop: 0,		// 滚动的起始位置
				logo_my : this.global.statics.login.logo_my,
				// 与系统有关参数
				mchName:'',				// 门店名称
				search : {
					searchKey : '',		// 搜索关键字
					topMchId: 0,		// 总店id
					mchId : 0 ,			// 门店id
					orgId : null,		// 部门id
					pageIndex : 1,		// 当前页码
					pageSize : 20 ,		// 最大显示页码
				},
				organtrees :[],			// 部门树
				
				loadContentText: this.global.params.loadContentText, // 加载中
				status : 'more',		// 下拉框状态
				staff_list :[],			// 员工信息
				pattern: this.global.params.fab_pattern, // 悬浮按钮样式(邀请新成员)
				showModalF : null ,						// 弹出邀请新成员的方法
				btn_list: [{
					name: '邀请成员',
					icon: 'cuIcon-add',
					clickName: 'add',
				}] 
			}
		},
		computed:{
			// 国际化语言
			i18n_merchant : function(){
				return this.$t("merchant");
			},
			i18n_staff : function(){
				return this.$t("staff");
			},
		},
		onLoad:function(options){
			_self = this;
			this.getParams(options);		// 初始化信息
			this.getOrg();					// 获取当前部门信息
			this.stafflist_request();		// 获取员工信息
		},
		onShow:function(){
			// 接收参数
			this.$once("query",query=>{
				_self.search.mchId = query.MchId;
				_self.mchName = query.Name;
				_self.stafflist_request(true);
			});
		},
		// 下列触底加载员工列表
		onReachBottom:function(){
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
			getParams : function(options){
				_self.search.topMchId = this.global.organ.getIndustryId();	// 当前组织信息
				_self.mchName = this.global.organ.getName();						// 获取名称
				_self.search.mchId = this.global.organ.getBranchId();	// 当前门店信息
				// 部门
				this.search.orgId = Boolean(options.OrgId) ? options.OrgId : this.search.orgId;
			},
			// ====================================== 监听事件 ============================================================================
			/** 搜索当前员工信息
			 * @param {Object} e
			 */
			confirm : function(e){
				this.stafflist_request(true);
			},
			/** 取消搜索员工信息
			 * @param {Object} e
			 */
			cancel : function(e){
				this.stafflist_request(true);
			},
			/** 切换门店
			 * @param {Object} e
			 */
			changBranchs : function(e){
				uni.navigateTo({
					url:'/pages_basic/branchs-select?MchId=' + _self.search.mchId + '&OrgId=' + _self.search.orgId
				});
			},
			/** 切换部门
			 * @param {Object} e
			 */
			org_change: function(e) {
				var value = e.detail.value;
				if (value.length > 0) {
					this.search.orgId = value[value.length - 1].value;
				} else {
					this.search.orgId = null;
				}
				// 获取员工信息
				this.stafflist_request(true);
			},
			/** 初始化加载弹出邀请新成员方法
			 * @param {Object} e
			 */
			showModal : function(e){
				this.showModalF = e ;
			},
			/** 点击底部按钮触发事件
			 * @param {Object} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'add':
						this.showModalF();
						break;
					default:break;
				}
			},
			// ====================================== 请求事件 ============================================================================
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
			 * 获取员工信息
			 * @param {Boolean} first 是否加载首页（默认false）
			 */
			stafflist_request : function(first = false){
				this.search.pageIndex = first ? 1 : this.search.pageIndex;
				if(this.status == 'loading' || (this.status === 'noMore' && this.search.pageIndex != 1)){
					return;
				}
				this.global.staffR.getListPage({
					data : _self.search,
					before : function(){
						_self.status = 'loading';
						if(_self.search.pageIndex == 1){
							_self.staff_list = [];
						}
					},
					success : function(data){
						if(Array.isArray(data)){
							_self.staff_list = _self.staff_list.concat(data);
							_self.search.pageIndex ++ ;
							if(data.length >= _self.search.pageSize ){
								_self.status = 'more';
							}else{
								_self.status = 'noMore';
							}
						}
					},
					fail : function(){
						_self.status = 'more';
					}
				});
			}
			// ===============================================================================================================================
		}
	}
</script>

<style>

</style>
