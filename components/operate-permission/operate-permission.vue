<template>
	<view>
		
	</view>
</template>

<script>
	/**
	 * 判断操作权限
	 * @property {Number} BranchId 门店Id(默认当前门店)
	 * @property {Number} MchId 组织Id(默认当前组织Id) 
	 */
	
	var _self;
	export default {
		name:"operate-permission",
		props:{
			BranchId :{
				type: Number ,
				// default: organ.getBranchId()
				default: 0
			},
			MchId : {
				type: Number,
				// default: organ.getIndustryId()
				default: 0
			}
		},
		data() {
			return {
				d_branchId : this.BranchId? this.BranchId : this.global.organ.getBranchId(),
				d_mchId : this.MchId ? this.MchId :  this.global.organ.getIndustryId(),
				branchAdmin : false ,			// 是否门店管理员
				topAdmin: false ,				// 是否组织管理员
			};
		},
		computed:{
			/**
			 * 判断是否管理员
			 */
			isAdmin: function() {
				return (this.branchAdmin || this.topAdmin) && Boolean(this.d_branchId);
			},
			/**
			 * 判断是否显示删除键
			 */
			canDelete: function() {
				return (this.topAdmin) && (this.d_branchId != this.MchId) && Boolean(this.d_branchId);
			},
		},
		watch:{
			BranchId : function(val){
				if(Boolean(val)){
					this.d_branchId = val;
					this.checkAdmin();
				}
			},
			MchId : function(val){
				if(Boolean(val)){
					this.d_mchId = val;
					this.checkTopAdmin();
				}
			},
			isAdmin :function(val){
				this.$emit("isAdmin" , val);
			},
			canDelete :function(val){
				this.$emit("canDelete" , val);
			}
		},
		created:function(){
			_self = this;
			// 判断是否管理员
			if(Boolean(this.d_branchId)){
				this.checkAdmin();
			}
			if(Boolean(this.d_mchId)){
				this.checkTopAdmin();
			}
		},
		methods:{
			/** 
			 * 判断当前用户是否为门店管理员
			 */
			checkAdmin: function() {
				this.global.userR.getIsAdminBoolean({
					mchId: _self.d_branchId,
					success: function(data) {
						_self.branchAdmin = data;
					}
				});
			},
			/**
			 * 判断当前用户是否为组织管理员
			 */
			checkTopAdmin: function() {
				this.global.userR.getIsAdminBoolean({
					mchId: _self.d_mchId,
					success: function(data) {
						_self.topAdmin = data;
					}
				});
			},
		}
	}
</script>

<style>

</style>
