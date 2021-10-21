<template>
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_merchant.nameManage }}</block>
		</cu-custom>
		<!-- 当前组织 -->
		<uni-list>
			<uni-list-item
				:thumb="(current.Logo == null || current.Logo == '' || current.Logo == 'string') ? organ_default: current.Logo"
				thumbSize="lg">
				<template slot="body" style="width: 65%;">
					<navigator url="/pages_basic/orgation/orgationdetail">
						<view class="text-bold text-cut text-lg">{{ current.Name ?  current.Name:'' }}</view>
						<view class=" cf ">
							<view class="fl text-sm padding-top-xs">
								{{ current.Area1Name }}
								{{(current.Area1Name == null|| current.Area1Name == '') ? '' :'-'}}
								{{ current.Area2Name }}
								{{(current.Area2Name == null|| current.Area2Name == '') ? '' :'-'}}
								{{ current.Area3Name }}
							</view>
							<view class="text-sm fr cu-tag">{{ current.IndustryName }}</view>
						</view>
						<view class="text-sm text-cut text-grey">联系方式：{{ current.LinkTel ? current.LinkTel:'' }}</view>
						<view class="text-sm text-cut text-grey">地址：{{ current.Address ? current.Address :''}}</view>
					</navigator>
				</template>
				<template slot="footer" style="width: 20%;">
					<navigator class="flex  padding-xl justify-center"
						url="/pages_basic/orgation/orgation_switch">
						<view class="cu-tag margin-lr round bg-blue light ">切换</view>
					</navigator>
				</template>
			</uni-list-item>
		</uni-list>
		<!-- 当前列表 -->
		<luyj-grid-link :list="tabber_list" @gridExc="navigateTo"></luyj-grid-link>
		<!-- 邀请新成员弹出框 -->
		<organ-invte :MchId="MchId" :Token="Token" :UserId="UserId" @show="inviteModalShow"></organ-invte>
	</view>
</template>

<script>
	/**
	 * 当前组织管理
	 * @author 陆彦捷
	 * @description 当前组织的管理
	 */
	var _self;
	export default {
		data() {
			return {
				// 页面样式
				preview: this.global.publicF.hasBack(), // 是否跳转到上一页
				tabber_list: this.global.grids.system_list, //  列表显示项
				showInviteF : null,			// 邀请新成员对话框
				organ_default: this.global.static.organ.organ_default,
				// 系统相关数据
				Token: this.global.login.getToken(), // 当前Token
				MchId: this.global.organ.getIndustryId(), //当前组织id
				current: this.global.organ.getCurrentOrg(), // 当前组织信息
			}
		},
		computed:{
			i18n: function(){
				return this.$t("basic")
			},
			i18n_product : function(){
				return this.$t('product');
			},
			i18n_merchant : function(){
				return this.$t('merchant')
			}
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
			if (!this.current) {
				this.request_currenOrg();
			}
		},
		methods: {
			// ============================================== 初始化信息 ============================================
			/** 获取初始化参数
			 * @param {Object} options 参数
			 */
			getParams(options) {
			},
			// ============================================== 监听事件 ==============================================
			/** 跳转到新页面
			 * @param {Object} e
			 */
			navigateTo(e) {
				var exec = e.currentTarget.dataset.exec;
				switch (exec) {
					case 'invite':
						this.showInviteF();
						break;
					default:
						this.default();
						break;
				}
			},
			/** 展开或折叠当前宫格
			 * @param {Object} e
			 */
			showAllGrid(e) {
				var cur_grid = e.currentTarget.dataset.cur;
				// 获取当前列
				var tabber = this.tabber_list.find(function(item) {
					return item.cur == cur_grid;
				})
				if (tabber != undefined) {
					tabber.showAll = !tabber.showAll;
				}
			},
			/**
			 * 打开邀请新成员对方可函数
			 * @param {function} func 打开新成员对话框函数
			 */
			inviteModalShow : function(func){
				this.showInviteF = func;
			},
			// ========================================== 公共方法 =================================================
			/**
			 * 默认方法
			 */
			default () {
				uni.showModal({
					title: '开发中',
					content: '物初蒙稚，待养而成。开发中，敬请期待！'
				})
			},
			// ============================================== 请求事件 ==============================================
			/**
			 * 获取当前的组织信息(并写入local)
			 */
			request_currenOrg() {
				this.global.merchantR.getCurrentInfo({
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success : function(data){
						uni.hideLoading();
						if(Boolean(data)){
							_self.global.organ.setTopName(result.data.Data.Name);
							_self.global.organ.setCurrentOrg(result.data.Data);
							_self.current = result.data.Data;
						}
					},
					fail : function(){
						uni.hideLoading();
					}
				});
			}
			// =======================================================================================================================
		}
	}
</script>

<style>

</style>
