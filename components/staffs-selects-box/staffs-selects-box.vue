<template >
	<view class="box text-df"  @click="toChange">
		<view class="item " >
			<view v-if="list.length > 0" class="item-box" >
				<view  v-for="(item, index) in list" :key="index" class="item-inline">
					<view>{{ item.Name }}</view>
					<view class="item-inline-close " @tap.stop="del" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
			</view>
			<view v-else class="text-grey" >无</view>
		</view>
		<view class="right" >
			<text  class="cuIcon cuIcon-right text-grey"></text>
		</view>
	</view>
</template>

<script>
	/**
	 * 员工选择控件(多选)
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		name:"staffs-selects-box",
		props:{
			/**
			 * 部门Id -如果部门id非0 ，则搜索部门值
			 */
			orgId : {
				type:[Number , String],
				default:0
			},
			/**
			 * 选中的员工(包含员工id ,名称)
			 */
			staffs : {
				type:Array,
				default:()=>{
					return [];
				}
			}
		},
		
		data() {
			return {
				list : this.staffs ? this.staffs :[],			// 员工列表
			};
		},
		computed:{
			i18n_merchant :function(){
				return this.$t("merchant");
			}
		},
		watch:{
			orgId : function(val, oldval){
				if(Boolean(val) && val != oldval ){
					this.getList(val);
				}
			}
		},
		created:function(){
			_self = this;
			this.getList(this.orgId);		// 获取部门主管
			this.$emit('changeF' , this.change);
		},
		methods:{
			// ======================================= 监听事件 =========================================================
			/** 跳转到修改员工页面
			 * @param {Object} e
			 */
			toChange : function(e){
				// #ifdef H5
					let items = encodeURIComponent(JSON.stringify(this.list));
				// #endif
				// #ifdef MP-QQ||MP-WEIXIN
					let items = JSON.stringify(this.list);
				// #endif
				uni.navigateTo({
					url:'/components/staffs-selects-box/staffs-select?staffs=' + items
				});
			},
			/**
			 * 获取修改员工值
			 * @param {Function} func 修改门店的方法（包含当前门店item）
			 */
			change : function(func){
				uni.$once("staffs",(item)=>{
					this.list = item.checkList ;
					if(typeof(func) === "function" ){
						func(item.checkList , item.checkIdList);
					}
				});
			} ,
			/** 移除当前的员工
			 * @param {Object} e
			 */
			del : function(e){
				this.list.splice( e.currentTarget.dataset.index , 1);
			},
			// ====================================== 请求方法 ==========================================================
			/**获取员工数组（获取部门主管）
			 * @param {Number} orgId 
			 */
			getList : function(orgId){
				if(!Boolean(orgId)){return;}
				let that = this;
				this.global.staffR.getMangesList({
					data :{
						orgId: orgId
					},
					success : function(data){
						that.list = data;
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
	// 主管选项
	.item-box {
		display: flex ;
		flex-flow: row wrap;
		// 每个员工项
		.item-inline{
			display: flex ;
			flex-direction: row;
			background-color: #F0F0F0;
			color : #333333;
			margin : 10rpx;
			// 关闭按钮
			.item-inline-close{
				font-size: 24rpx;
				vertical-align: middle;
				position: relative;
				display: -webkit-inline-box;
				display: -webkit-inline-flex;
				display: inline-flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				align-items: center;
				-webkit-box-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
				box-sizing: border-box;
				padding: 0rpx 16rpx;
				height: 48rpx;
				font-family: Helvetica Neue, Helvetica, sans-serif;
				white-space: nowrap;
			}
		}
	}
	
</style>
