<template>
	<view class="flex flex-direction">
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">引导</block>
		</cu-custom>
		<uni-list>
			<!-- badgeText="3" showBadge badgeType="error" 不使用角标，未知报障工单数量 -->
			<uni-list-item :thumb="usercreate" thumb-size="lg" showArrow title="报障工单" note="作为服务商、技术员确认并处理客户提交的报障工单。" :to="'/pages/index/index?PageCur=repair'" ></uni-list-item>
			<uni-list-item :thumb="producturl" thumb-size="lg" showArrow :title="i18n_product.productSummary" :note=" i18n_product.category + '、型号、设备信息与维护'" :to="'/pages_basic/device/home?'"></uni-list-item>
			<uni-list-item :thumb="organurl" thumb-size="lg" showArrow title="组织架构管理" :note="'创建' + i18n.branch + '、分公司、完善组织基本信息'" :to="'/pages_basic/orgation/organtion'"></uni-list-item>
			<uni-list-item :thumb="usercreate" thumb-size="lg" showArrow title="创建子账号" note="除【创建者】外拥有管理权限的人，包括【系统管理员】和【普通管理员】" :to="'/pages_basic/user/usercreate'"></uni-list-item>
		</uni-list>
		<button class="margin margin-top-xl bg-cyan cu-btn padding-xl" @click="toIndex">首页</button>
	</view>
</template>

<script>
	/**
	 * 首页导航
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview: this.global.publicF.hasBack(), 		// 是否进入上一页
				usercreate : this.global.statics.basic.usercreate,
				producturl :this.global.statics.basic.product,
				organurl :this.global.statics.basic.organ ,
				// 与系统有关参数
				userName : '',				// 用户名
			}
		},
		computed:{
			i18n : function(){
				return this.$t('basic');
			},
			i18n_product : function(){
				return this.$t('product')
			}
		},
		onLoad:function(options){
			_self = this;
		},
		methods: {
			// =========================================== 初始化 =================================================
			/** 初始化参数
			 * @param {Object} options
			 */
			getParams(options){
			},
			// =========================================== 监听事件 ================================================
			/** 跳转到主页
			 * @param {Object} e
			 */
			toIndex(e){
				uni.redirectTo({
					url:'/pages/index/index'
				});
			}
		}
	}
</script>

<style>

</style>
