<template>
	<view >
		<view v-if="showBtn" class="place"></view>
		<view v-if="showBtn" class="button-groups " >
			<view v-for="(item,index) in btns" :key="index" class="box" @click="clickItem(item)">
				<!-- 包含url -->
				<navigator v-if="item.url" :url="item.url " :style="{'color':item.color}" class="text-cyan" >
					<text v-if="item.icon"  class="cuIcon text-xl margin-right-sm" :class="item.icon"></text>
					<text class="text-df text-bold " >{{item.name}}</text>
				</navigator>
				<!-- 包含url -->
				<!-- 不包含url -->
				<view v-else class="text-cyan" :style="{'color':item.color}">
					<text v-if="item.icon" class="cuIcon text-xl margin-right-sm" :class="item.icon"></text>
					<text class="text-df text-bold " >{{item.name}}</text>
				</view>
				<!-- 不包内含url -->
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 底部按钮组
	 * @property {Array} btns 按钮
	 * 	@property {String} name 按钮显示名称 
	 * 	@property {String} url 跳转路径（只对当前项目有效）
	 * 	@property {String} icon 图标名称（依据ColorUI） 
	 * 	@property {String} clickName 点击执行方法 
	 * 	@property {String} color 字体颜色 
	 */
	export default {
		name:"bottom-btns",
		props:{
			// 按钮
			btns :{
				type:Array,
				default:()=>{
					return []
				}
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			// 是否显示按钮
			showBtn : function(){
				return Array.isArray(this.btns) ? this.btns.length > 0  : false;
			}
		},
		methods:{
			/** 点击当前项
			 * @param {Object} item
			 */
			clickItem : function(item){
				if(Boolean(item.clickName)){
					this.$emit('click' , item.clickName)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 底部按钮
	.button-groups {
		z-index: 9999;
		width: 100vw;
		height: 100rpx;
		position: fixed;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;		// 水平居中
		justify-content: center;	// 垂直居中
		bottom: 0;
		background-color: #FFFFFF;
		border-top:  1rpx solid #E8E8E8;
		// 子按钮
		.box {
			flex-grow: 1;
			text-align: center;
			border-right: 1rpx solid #E8E8E8;
		}
		.box:last-child{
			border-right: none;
		}
	}
	
	
	.place {
		width: 100vw;
		height: 100rpx;
	}
	// margin
	.margin-right-sm{
		margin-right: 20rpx;
	}
	// text属性
	.text-df {
		font-size: 28rpx;
	}
	.text-xl{
		font-size: 36rpx;
	}
	.text-bold{
		font-weight: bold;
	}
	.text-cyan{
		color: #1CBBB4;
	}
</style>
