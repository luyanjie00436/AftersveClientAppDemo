<template>
	<view class="bg-white padding">
		<!-- 正常工单步骤或取消工单 -->
		<luyj-steps :options="status != 'Cancel' ? steps_row : steps_row_cancel" :active="active" :activeColor="activeColor"></luyj-steps>
	</view>
</template>

<script>
	export default {
		name:"order-steps",
		props:{
			status : {
				type : String,
				default:''
			}
		},
		data() {
			return {
				activeColor : this.global.params.activeColor,			// 激活状态的颜色
				steps_row: this.global.params.steps_row, 				// 工单流程步骤
				steps_row_cancel: this.global.params.steps_row_cancel, // 取消的步骤条
			};
		},
		computed:{
			/**
			 * 当前的完成状态
			 */
			active : function(){
				return this.global.repairOrderF.getSteps(this.status);
			}
		},
		methods:{
		}
	}
</script>

<style>

</style>
