<template>
	<view class="flex flex-direction">
		<!-- 判断操作权限 -->
		<operate-permission :BranchId="MchId" :MchId="MchId" @isAdmin="isAdminF"></operate-permission>
		<!-- 判断操作权限 -->
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{currentOrgName}}</block>
		</cu-custom>
		<!-- 导航栏 -->
		
		<!-- 导航条 -->
		<luyj-tree-navigation slabel="Name" @clickItem="nav_click" @inF="nav_inF"></luyj-tree-navigation>
		<!-- 部门或门店添加按钮 -->
		<uni-list>
			<teleport v-for="(item , index) in currentTree" :key="index">
				<uni-list-item  :showArrow="item.Count > 0 || item.Children.length > 0" :title="item.Name + '(' + (item.Count? item.Count : item.Children.length ) + ')'"
					clickable @click="clickItem(item)">
					<template   slot="footer" >
						<view v-if="mchAdmin && item.Type == 'Organization' " style="display: flex; flex-direction: row;"  @tap.stop="">
							<view class="cuIcon cuIcon-edit bg-cyan round margin-right-xs" @click="editDepartment(item)"></view>
							<view class="cuIcon cuIcon-delete bg-red round margin-right-xs" @click="deleteDepartment(item , index)"></view>
						</view>
					</template>
				</uni-list-item>
			</teleport>
		</uni-list>
		
		<!-- 组织架构列表 -->
		
		<!-- 弹出框（邀请新成员） -->
		<organ-invte  :MchId="MchId" :orgId="OrgId" @show="showModal"></organ-invte>
		<!-- 弹出框（邀请新成员） -->
		
		<!-- 返回顶部 -->
		<u-back-top :scrollTop="scrollTop">
		</u-back-top>
		<!-- 返回顶部 -->
		<!-- 底部按钮 -->
		<bottom-btns :btns="mchAdmin ? btn_list_org_admin : btn_list_org" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 查看组织架构
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式展示
				preview: this.global.publicF.hasBack(),
				scrollTop: 0,		// 滚动的起始位置
				showModalF: null, // 弹出Modal的方法
				// 系统数据相关
				pushNav : null ,					// 添加导航栏方法
				MchId: this.global.organ.getIndustryId(), // 获取当前组织
				OrgId : 0 ,		// 当前部门
				AreaId : null ,	// 当前地区id
				mchAdmin: false, // 是否可编辑
				search:{
					mchId: this.global.organ.getIndustryId(), // 商户id
					parentId : 0 ,		// 上级类型
					parentType : null,	// 上级id
				},						// 搜索条件
				trees:[],		// 完整展示的组织树
				currentTree: [], // 当前组织树
				currentOrgName: '', // 当前商户/组织/门店名称
				
				btn_list_org_admin : this.global.params.btn_list_org_admin,		// 底部按钮-管理人员
				btn_list_org : this.global.params.btn_list_org,					// 底部按钮-普通员工
			}
		},
		computed: {
			// 国际化
			i18n: function() {
				return this.$t('basic');
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
			this.getParams(options);
			
		},
		onShow:function(){
			this.fullOrg_request(); // 加载完整组织架构
		},
		// 滚动条事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// ========================================= 初始化时间 ====================================================
			/** 获取当前参数
			 * @param {Object} options
			 */
			getParams: function(options) {
				this.currentOrgName = options.Name ? options.Name : this.global.organ.getName(); // 当前组织名称
			},
			// ========================================= 监听事件 ====================================================
			/** 判断是否管理员
			 * @param {Boolean} data
			 */
			isAdminF: function(data) {
				this.mchAdmin = data;
			},
			/** 编辑部门
			 * @param {Object} item
			 */
			editDepartment : function(item){
				uni.navigateTo({
					url:'/pages_basic/organ/edit?OrgId=' + item.Value + '&MchId=' + _self.MchId
				})
			},
			/** 删除当前部门
			 * @param {Object} item
			 */
			deleteDepartment: function(item , index) {
				uni.showModal({
					title: '删除部门',
					content: '是否删除当前部门？',
					success: function(result) {
						if (result.confirm) {
							_self.global.departmentR.deleteInfo({
								id: item.Value,
								before: function() {
									uni.showLoading({
										title: _self.i18n.requestLoadingMessage
									});
								},
								success: function() {
									uni.hideLoading();
									_self.currentTree.splice(index ,1);
								},
								fail: function() {
									uni.hideLoading();
									uni.showToast({
										title: _self.i18n.deleteFailMessage,
										icon: 'none'
									});
								}
							})
						}
					}
				});
			},
			
			/** 打开邀请成员页面
			 * @param {function} func 
			 */
			showModal: function(func) {
				this.showModalF = func;
			},
			/**导航栏的方法
			 * @param {Object} e
			 */
			nav_inF : function(e){
				this.pushNav = e.pushTreeStack;
			},
			/** 点击导航栏的某一项
			 * @param {Object} item
			 * @param {Number} index
			 */
			nav_click : function(item ,index){
				if(index == -1){
					// 全部
					this.currentTree = this.trees;
					this.search.parentId = 0;
					this.search.parentType = null;
				}else{
					this.search.parentId = item.Value;
					this.search.parentType = item.Type;
					
					this.AreaId = null;			// 按照目前结构，其他级别地区Id为null
					if(item.Type == "Area"){
						this.AreaId = item.Value;
					} else if(item.Type == "Organization"){
						this.OrgId = item.Value;
					}
					this.currentTree = item.Children;
				}
			},
			/** 点击Item
			 * @param {Object} item
			 */
			clickItem : function(item){
				let children = item.Children;
				if(!Array.isArray(children) ){return;}
				if(children.length > 0){
					this.search.parentId = item.Value;
					this.search.parentType = item.Type;
					
					this.AreaId = null;			// 按照目前结构，其他级别地区Id为null
					if(item.Type == "Area"){
						this.AreaId = item.Value;
					} else if(item.Type == "Organization"){
						this.OrgId = item.Value;
					}
					this.pushNav(item);
					this.currentTree = children;
				}else if(item.Type == "Area"){
					// 跳转到查看门店
					uni.navigateTo({
						url :`/pages_basic/orgation/branchlist?OrgId=${_self.OrgId}&AreaId=${item.Value}`
					});
				}
			},
			/** 点击底部按钮
			 * @param {String} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'addorg':
						// 添加部门
						uni.navigateTo({
							url:'/pages_basic/organ/edit?MchId=' + _self.MchId + '&ParentId=' + _self.OrgId
						})
						break;
					case 'addstaff':
						this.showModalF();		// 添加成员
						break;
					case 'showbrand':
						// 查看门店： 传递部门Id和地区Id
						uni.navigateTo({
							url :`/pages_basic/orgation/branchlist?OrgId=${_self.OrgId}&AreaId=${_self.AreaId}`  
						});
						break;
					case 'showstaff':
						// 查看成员： 传递部门Id和地区Id
						uni.navigateTo({
							url :`/pages_basic/staff/stafflist?OrgId=${_self.OrgId}&AreaId=${_self.AreaId}`
						})
						break;
					default : break;
				}
			},
			//==================================== 请求方法 ===============================================================
			/**
			 * 搜索架构（parentType=null时为完整架构）
			 */
			fullOrg_request: function() {
				this.global.merchantR.getAreaOrg({
					data: _self.search,
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success: function(data) {
						uni.hideLoading();
						if(_self.search.parentType == null){
							_self.trees = data.childrenData;
						}
						_self.currentTree = data.childrenData;
					},
					fail: function() {
						uni.hideLoading();
					}
				});
			},
			//==========================================================================================================
		}
	}
</script>

<style>

</style>
