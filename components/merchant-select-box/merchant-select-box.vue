<template>
	<view class="box" @click="changCust">
		<text class="item text-cut" :class="current.MchId ? '' :'text-gray'">{{ current.MchId ? current.MchNo  + '-' +  current.Name : i18n_mchCustomer.detail.custMchPlaceholder}}</text>
		<view class="right_icon text-xxl"  >
			<text  class="cuIcon cuIcon-right text-grey"></text>
		</view>
	</view>
</template>

<script>
	/**
	 * 选择商户组件
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		name:"merchant-select-box",
		props:{
			/**
			 * 选中的门店Id
			 */
			mchId : {
				type: Number,
				default: 0
			},
			
		},
		data() {
			return {
				current :{
					MchId:0,			// id
				},	// 当前商户、组织
			};
		},
		computed:{
			i18n_mchCustomer :function(){
				return this.$t("mchCustomer");
			}
		},
		watch:{
			mchId : function(val){
				this.getMchInfo(val);
			}
		},
		created:function(){
			_self = this;
			this.$emit("init" , this.init);		// 获取参数
			// 初始化组织id
			if(Boolean(this.mchId)){
				this.getMchInfo(this.mchId);
			}
		},
		methods:{
			// =================================== 监听事件 =========================================================================
			/** 跳转到修改商户信息页面
			 * @param {Object} e
			 */
			changCust : function(e){
				uni.navigateTo({
					url:'/pages_basic/merchant-select?MchId=' + _self.current.MchId
				});
			},
			/**
			 * 页面通讯参数
			 */
			init : function(){
				uni.$once("query",(query)=>{
					_self.current = query;
					_self.$emit("change",{detail:query});
				});
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
			// =========================================================================================================================
		}
	}
</script>

<style scoped  lang="scss">
.box{
	display: flex;
	.item {
		flex : 1;
		height: 100%;
		align-self: center;
	}
	.right_icon {
		height: 100%;
		align-self: center;
	}
}
</style>
