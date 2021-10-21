<template >
	<view class="box text-df" style="display: flex; flex-direction: row;" @click="changBranchs">
		<view class="item ">{{ current.Name ? current.Name :'无' }}</view>
		<view class="right" >
			<text  class="cuIcon cuIcon-right text-grey"></text>
		</view>
	</view>
</template>

<script>
	/**
	 * 跳转到门店选择。选择后并返回值的组件
	 */
	export default {
		name:"branch-select",
		props:{
			/**
			 * 选中的门店Id
			 */
			mchId : {
				type: Number,
				default: 0
			},
			/**
			 * 默认传递的参数
			 */
			query :{
				type:Object,
				default:null
			}
		},
		
		data() {
			return {
				d_mchId : this.mchId,		// 门店Id
				current : {
					
				}
			};
		},
		computed:{
			i18n_merchant :function(){
				return this.$t("merchant");
			}
		},
		watch:{
			mchId : function(val){
				if(val !=  this.d_mchId){
					this.d_mchId = val;
					this.getMchInfo(val)
				}
			}
		},
		created:function(){
			this.getMchInfo(this.d_mchId);
			
			this.$emit('changeF' , this.changeBranch);
		},
		methods:{
			// ======================================= 监听事件 =========================================================
			/** 点击跳转到修改门店
			 * @param {Object} e
			 */
			changBranchs : function(e){
				uni.navigateTo({
					url:'/pages_basic/branchs-select?MchId=' + this.d_mchId
				});
			},
			/**
			 * 获取修改的门店值
			 * @param {Function} func 修改门店的方法（包含当前门店item）
			 */
			changeBranch : function(func){
				uni.$once("query",(query)=>{
					this.current = query.item;
					if(typeof(func) === "function" ){
						func(query.item);
					}
				});
			} ,
			// ====================================== 请求方法 ==========================================================
			/** 获取门店信息
			 * @param {Number} mchId 门店id
			 */
			getMchInfo : function(mchId){
				if(!Boolean(mchId)){return;}
				let that = this;
				this.global.merchantR.getDetail({
					id : mchId,
					success : function(data){
						that.current  = data;
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		display: flex;
		flex-direction: row;
		.item {
			flex :1;
		}
		.right{
			
		}
	}
</style>
