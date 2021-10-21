<template>
	<view class="flex flex-direction">
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_merchant.switchName}}</block>
		</cu-custom>
		<uni-list>
			<uni-list-item showSwitch 
				:thumb="(item.Logo == null || item.Logo == '' || item.Logo == 'string') ? organ_default: item.Logo"
				thumbSize="lg" v-for="(item, index) in organ_list" :key="index">
				<template slot="body" style="width: 60%;">
					<navigator :url="'/pages_basic/orgation/orgationdetail?MchId=' + item.MchId">
						<navigator v-if="item.IsAdmin" class=" cf " :url="'/pages_basic/system/home?MchId=' + item.MchId ">
							<view class="fl text-bold text-cut text-lg" >{{ item.Name }}</view>
							<view class="fr padding-sm cu-tag text-sm margin-right">{{ i18n_merchant.merchant.switchManage }}</view>
						</navigator>
						<view v-else class="text-bold text-cut text-lg">{{ item.Name }}</view>
						<view class=" cf ">
							<view class="fl text-sm padding-top-xs">
								{{ item.Area1Name }} {{(item.Area1Name == null|| item.Area1Name == '') ? '' :'-'}}
								{{ item.Area2Name }} {{(item.Area2Name == null|| item.Area2Name == '') ? '' :'-'}}
								{{ item.Area3Name }}
							</view>
							<view class="text-sm fr cu-tag">{{ item.IndustryName }}</view>
						</view>
						<view class="text-sm text-cut text-grey">联系方式：{{ item.LinkTel ? item.LinkTel : '' }}</view>
						<view class="text-sm text-cut text-grey">地址：{{ item.Address }}</view>
					</navigator>
				</template>
				<template slot="footer" style="width: 20%;">
					<view class="flex solid-bottom padding justify-center">
						<view v-if="BranchId == item.MchId" class=" padding-sm cu-tag margin-xs bg-cyan">{{ i18n_merchant.merchant.switchCurrent }}
						</view>
						<view v-else class=" padding-sm cu-tag margin-xs bg-cyan light" @click="changeMch"
							:data-id="item.MchId" :data-name="item.Name">{{ i18n_merchant.merchant.switchName }}</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<!-- 创建或加入组织 -->
		<uni-list class="margin-top-xs">
			<uni-list-item :thumb="organizationHL" showArrow title="创建或加入组织"
			to="/pages_basic/orgation/orgation_createOrJoin"></uni-list-item>
		</uni-list>
		<!-- 跳过此步骤 -->
		<navigator v-if="isSkip" class="flex flex-direction" url="" @tap="toSkip">
			<button class="margin padding-lg bg-grey cu-btn round" >跳过此步骤</button>
		</navigator>
		<!-- 悬浮按钮 -->
		<navigator url="/pages_basic/orgation/orgation_create">
			<uni-fab ref="fab" :pattern="pattern" horizontal="left" vertical="bottom" direction="horizontal" />
		</navigator>
	</view>
</template>

<script>
	/**
	 * 切换当前组织
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 页面样式参数
				preview: this.global.publicF.hasBack(), // 是否返回上级页面
				organizationHL : this.global.statics.fabIcon.organizationHL,		// 组织图标
				organ_default : this.global.statics.organ.organ_default,			// 组织图片
				currentPage : '',	// 当前页面
				pattern: this.global.params.fab_pattern,
				// 系统数据相关
				organ_list: [], 					// 获取用户当前组织
				BranchId: this.global.organ.getBranchId(), // 获取当前门店
			}
		},
		computed:{
			// 国际化
			i18n : function(){
				return this.$t("basic");
			},
			i18n_merchant : function(){
				return this.$t("merchant");
			},
			// 是否显示跳过此步骤
			showSkip : function(){
				return !(Boolean(this.global.login.getSkip())  || Boolean(this.BranchId));
			}
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options); // 获取参数
		},
		onShow:function(){
			if (!Boolean(this.BranchId)) {
				this.mchId_request(); // 获取当前主企业
			}
			this.userMchs_request();	// 获取组织、门店
		},
		methods: {
			// =========================================== 初始化方法 ===============================================
			/** 获取页面初始化时参数
			 * @param {Object} options 页面传参
			 */
			getParams(options) {
				// this.currentPage = options.currentPage ? options.currentPage : 'index';		 // 当前页面属性
			},
			// =========================================== 监听事件 =================================================
			/**
			 * 切换主企业
			 * @param {Object} e  切换主企业的相关参数 
			 */
			changeMch(e) {
				uni.showModal({
					title: '设置',
					content: '将' + e.currentTarget.dataset.name + '设置为主企业（注：设置将立即生效，请谨慎选择）',
					success: function(result) {
						if (result.confirm) {
							// 切换当前企业为主企业
							_self.MchId = e.currentTarget.dataset.id;
							_self.changeMch_request(e.currentTarget.dataset.id, e.currentTarget.dataset.name);
						}
					}
				});
			},
			/**
			 * 跳过此步骤
			 * @param {Object} e
			 */
			toSkip : function(e){
				this.global.login.setSkipTrue();	// 设置跳过此步骤为true
				// 跳转到主页
				uni.navigateTo({
					url :'/pages/index/index'
				});
			},
			// ============================================ 请求 ====================================================
			/**
			 * 获取当前的组织列表
			 */
			userMchs_request() {
				this.global.merchantR.getCurrentList({
					before : function(){
						uni.showLoading({
							title:_self.i18n.requestLoadingMessage
						});
					},
					success : function(data){
						uni.hideLoading();
						_self.organ_list = data;
					},
					fail : function(errors){
						uni.hideLoading();
						_self.organ_list = [];
					}
				});
			},
			/**
			 * 获取当前组织
			 */
			mchId_request() {
				this.global.merchantR.getCurrentInfo({
					success : function(data){
						if(Boolean(data)){
							_self.global.organ.setIndustryId(data.TopMchId);
							_self.global.organ.setBranchId(data.MchId);
							_self.BranchId = data.MchId;
						}
					},
					fail : function(e){
						_self.BranchId = 0;
					}
				});
			},
			/** 切换组织
			 * @param {int} mchId 组织Id
			 * @param {string} name 当前组织名称
			 */
			changeMch_request(mchId, name) {
				this.global.merchantR.switchInfo({
					data :{
						mchId
					},
					before : function(){
						uni.showLoading();
					},
					success : function(data){
						uni.hideLoading();
						if(Boolean(data)){
							_self.global.organ.setIndustryId(data.TopMchId);
							_self.global.organ.setBranchId(data.MchId);
							_self.BranchId = data.MchId;
							_self.global.organ.setName(name);
							_self.global.organ.setAddress(data.Address);
							_self.global.organ.setIsCust(data.IsCust);
							_self.global.organ.setIsSup(data.IsSup);
							_self.global.organ.setIsSvc(data.IsSvc);
							_self.global.staff.setId(data.StaffId);		// 员工id
							_self.global.login.setToken(data.Token);
						}
					},
					fail: function(){
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage,
							icon:'none'
						});
					}
				});
			}
			// ==================================================================================================================	
		}
	}
</script>

<style>

</style>
