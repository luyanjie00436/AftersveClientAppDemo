<template>
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_merchant.name }}</block>
		</cu-custom>

		<!-- 受邀请加入组织 - 组件 -->
		<organ-invited ></organ-invited>
		<!-- 申请企业 -->
		<organ-join></organ-join>
		<!-- 创建组织/门店 -->
		<view class="margin-top-sm">
			<uni-list>
				<uni-list-item showArrow to="/pages_basic/orgation/orgation_create?currentPage=organ">
					<!-- <template slot="header">头部（图标）</template> -->
					<template slot="body">
						<view class="text-xl padding-xs text-bold">
							<text class="text-cyan">创建</text>组织/{{ i18n.branch}}
						</view>
						<view class=" text-df padding-lr text-grey" style="line-height: 50rpx;">
							创建组织/{{ i18n.branch }}。您将成为管理员,可邀请组织成员共同使用,协同办公。</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- 成为体验用户 -->
		<view v-if="showTrail" class="margin-top-sm ">
			<uni-list>
				<uni-list-item>
					<template slot="body">
						<view class="text-xl padding-xs text-bold">
							<text class="text-cyan">成为体验用户</text>
						</view>
						<view class=" text-df padding-lr text-grey" style="line-height: 50rpx;">
							模拟用户体验。为您提供管理员权限,预先为您导入相关数据,模拟组织/{{ i18n.branch }}的工作流程。</view>
					</template>
				</uni-list-item>
				<uni-forms :rules="rules" ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
					<uni-forms-item name="name" required>
						<view class="cu-form-group solid">
							<view class="title padding-left-xl">{{ i18n_merchant.name }}</view>
							<input  v-model="current.name" :placeholder="i18n_merchant.merchant.namePlaceholder" type="text" name="input"
								></input>
						</view>
					</uni-forms-item>
					<uni-forms-item name="cateId" required>
						<view class="cu-form-group padding-sm ">
							<view class="title padding-left-xl">{{ i18n_merchant.merchant.industry }}</view>
							<luyj-data-picker :placeholder=" i18n_merchant.merchant.industryPlaceholder" style="width: 70%;" :border="false" 
								v-model="current.cateId"
								:preload="true" :localdata="industry_list" :popup-title="i18n_merchant.merchant.industryTitle"
								></luyj-data-picker>
						</view>
					</uni-forms-item>
				</uni-forms>

				<button class=" margin-lr margin-bottom bg-cyan cu-btn padding-lg light"
					@click="click_trail">立即体验</button>
			</uni-list>
		</view>
		<navigator class="margin-lr margin-top round bg-cyan cu-btn padding-lg" url="" @tap="toSkip">
			<view>首页</view>
		</navigator>
	</view>
</template>

<script>
	/**
	 * 创建或加入组织
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 其他参数
				preview: this.global.publicF.hasBack(), // 是否可查看上一页
				forceIndex: false, // 强制不判断，不跳转
				// 系统参数
				industry_list: [], // 所属行业
				current: {
					name: '', // 企业名称
					userId: this.global.user.getUserId(), // 当前用户id
					cateId: '', // 行业id
				},
				rules: {
					// 组织名称
					name: {
						rules: [{
							required: true,
							errorMessage: '请输入组织名名称'
						}],
					},
					cateId: {
						rules: this.global.rules.industryId,
					},
				},
			}
		},
		computed: {
			// 国际化
			i18n: function() {
				return this.$t("basic");
			},
			i18n_merchant: function() {
				return this.$t("merchant");
			},
			// 是否展示-成为体验用户
			showTrail: function() {
				return !(Boolean(this.global.login.getSkip()) || Boolean(this.global.organ.getBranchId()));
			},
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
			this.init();
		},
		onShow:function(){
			if(this.showTrail){
				// 初始化表单验证
				this.$refs.form.setRules(this.rules);
			}
		},
		methods: {
			// ================================= 初始化方法 ==================================================
			/** 获取参数
			 * @param {Object} options
			 */
			getParams(options) {
			},
			/**
			 * 初始化方法
			 */
			init: function() {
				// 加载行业
				this.global.industryR.getTreesFormat({
					success: function(data) {
						_self.industry_list = data;
					}
				});
			},
			// ================================= 监听事件 =================================================
			/** 修改当前行业
			 * @param {Object} e
			 */
			changeIndustry: function(e) {
				console.log("this.cateId", this.current.cateId);
			},
			/** 成为体验用户
			 * @param {Object} e
			 */
			click_trail(e) {
				_self.$refs['form']
					.submit()
					.then(result => {
						_self.global.merchantR.trialInfo({
							data: _self.current,
							before: function() {
								uni.showLoading({
									title: _self.i18n.requestLoadingMessage
								});
							},
							success: function(data) {
								uni.hideLoading();
								_self.global.login.setSkipTrue(); // 设置跳过此步骤为true
								uni.navigateTo({
									url:'/pages/index/index'
								});
								uni.showToast({
									title: _self.i18n.requestSuccessMessage
								});
							},
							fail: function(errors) {
								uni.hideLoading();
								uni.showToast({
									title: _self.i18n.requestFailMessage,
									icon: 'none'
								});
							}
						});
					})
					.catch(errors => {
					});
			},
			/**
			 * 跳过此步骤
			 * @param {Object} e
			 */
			toSkip: function(e) {
				this.global.login.setSkipTrue(); // 设置跳过此步骤为true
				// 跳转到主页
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			// ===================================================================================================
		}
	}
</script>

<style>

</style>
