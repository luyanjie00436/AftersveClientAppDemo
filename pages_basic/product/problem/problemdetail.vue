<template>
	<view class="flex flex-direction ">
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ current.title ? current.title :'常见问题' }}</block>
		</cu-custom>
		<!-- 常见问题 -->
		<form>
			<!-- 标题 -->
			<view class="cu-form-group text-df">
				<view class="title text-bold">标题</view>
				<text class="text-grey">{{current.title}}</text>
			</view>
			<!-- 分类 -->
			<view class="cu-form-group text-df">
				<view class="title text-bold">分类</view>
				<text class="text-grey">{{ current.Category }}</text>
			</view>
			<!-- 型号 -->
			<view class="cu-form-group">
				<view class="title text-bold">型号</view>
				<text class="text-grey">{{current.ModelName}}</text>
			</view>
			<!-- 标签 -->
			<view class="cu-form-group">
				<view class="title text-bold">标签</view>
				<view>
					<view v-for="(item,index) in current.tags" :key="index" class="cu-tag ">{{ item }}</view>
				</view>
			</view>
			<!-- 常见问题详情 -->
			<view class="cu-form-group margin-top">
				<rich-text :nodes="current.desc"></rich-text>
			</view>
		</form>
	</view>
</template>

<script>
	/**
	 *  常见问题详情
	 *  @author 陆彦捷
	 *  @date 2021.07.09 样式初始化
	 */
	
	import problems from '@/common/data/problem.js';		// 常见问题
	
	var _self ;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview : this.global.publicF.hasBack() ,		// 是否可返回上一页
				// 与系统有关参数
				current :{}
			}
		},
		onLoad:function(options){
			_self = this;
			this.getParams(options);			// 初始化参数
			this.currentProblem_request();		// 获取当前问
		},
		methods: {
			// =================================================== 初始化 =====================================================================
			/** 初始化参数
			 * @param {Object} options 
			 */
			getParams : function(options){
			},
			// =================================================== 监听事件 ===================================================================
			// =================================================== 请求事件 ===================================================================
			/**
			 * 获取当前问题请求
			 */
			currentProblem_request : function(){
				uni.showLoading();
				setTimeout(function(){
					uni.hideLoading();
					_self.current = problems.current;
				} , 1000);
			},
			// ===============================================================================================================================
		}
	}
</script>

<style>

</style>
