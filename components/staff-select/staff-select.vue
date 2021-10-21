<template >
	<view class="box text-df" style="display: flex; flex-direction: row;" @click="toChange">
		<view class="item " :class="current.Name ?'' : 'text-grey'">{{ current.Name ? current.Name :'无' }}</view>
		<view class="right" >
			<text  class="cuIcon cuIcon-right text-grey"></text>
		</view>
	</view>
</template>

<script>
	/**
	 * 点击跳转员工选择
	 */
	export default {
		name:"staff-select",
		props:{
			/**
			 * 选中的员工
			 */
			staffId : {
				type: Number,
				default: 0
			},
		},
		
		data() {
			return {
				d_staffId: this.staffId,		// 员工Id
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
			staffId : function(val){
				if(val !=  this.d_staffId){
					this.d_staffId = val;
					this.getInfo(val)
				}
			}
		},
		created:function(){
			this.getInfo(this.d_staffId);
			
			this.$emit('changeF' , this.change);
		},
		methods:{
			// ======================================= 监听事件 =========================================================
			/** 跳转到修改员工页面
			 * @param {Object} e
			 */
			toChange : function(e){
				uni.navigateTo({
					url:'/pages_basic/staff/staff-select?StaffId=' + this.d_staffId
				});
			},
			/**
			 * 获取修改员工值
			 * @param {Function} func 修改门店的方法（包含当前门店item）
			 */
			change : function(func){
				uni.$once("staff",(staff)=>{
					this.current = staff.item;
					if(typeof(func) === "function" ){
						func(staff.item);
					}
				});
			} ,
			// ====================================== 请求方法 ==========================================================
			/** 获取门店信息
			 * @param {Number} staffId 员工Id
			 */
			getInfo : function(staffId){
				if(!Boolean(staffId)){return;}
				let that = this;
				this.global.staffR.getInfo({
					id : staffId,
					success : function(data){
						that.current  = data;
					}
				});
			},
			// ==============================================================================================================
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
