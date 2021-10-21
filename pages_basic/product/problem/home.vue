<template>
	<view class="flex flex-direction bg-white">
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">设备常见问题</block>
		</cu-custom>
		<!-- 常见问题 -->
		<luyj-search-bar radius="80" v-model="searchKey" placeholder="请输入常见问题标题" cancelColor="#999999" @confirm="toSearch" @cancel="toCancel"></luyj-search-bar>
		<!-- 分类、型号、标签 -->
		<view class="grid col-2 paddding">
			<view class="text-center padding">
				<picker @change="bindtypeChange" mode="selector" :range="typeArray" :value="searchType">
					<view class="text-cyan">{{ typeArray[searchType] }}<text class="cuIcon cuIcon-unfold"></text></view>
				</picker>
			</view>
			<view class="text-center padding solid-left " @tap="showModal" :class="[isFilter ? 'text-cyan' :'']" >
				筛选<text class="cuIcon-filter margin-left"></text>
			</view>
		</view>
		<!-- 常见问题列表 -->
		<uni-list>
			<!-- 按问题搜索 -->
			<uni-list-item v-if="searchType == 0 " showArrow v-for="(item,index) in problem_list" :key="index" to="/pages_basic/product/problem/problemdetail?" >
				<template slot="body" class="flex flex-direction">
					<view class="text-cut text-lg">
						<text class="text-bold">{{ item.title }}</text>
					</view>
					<view class="box text-sm ">
						<view class="item-left">
							型号
						</view>
						<view class="item-right ">{{ item.Category? item.Category + ' > ' :'' }}{{ item.ModelName ? item.ModelName : '' }}</view>
					</view>
					<view class="text-sm box ">
						<view class="item-left" >标签</view>
						<text v-for="(tag , i) in item.tags" :key="i" class="cu-tag round">{{ tag }}</text>
					</view>
				</template>
			</uni-list-item>
			<!-- 按分类搜索 -->
			<uni-list-item v-if="searchType == 1" showArrow v-for="(item,index) in category_list" :key="index" clickable @click="changeTypeFirst"
			:title="item.Name" :rightText="item.Count"></uni-list-item>
			<!-- 按型号搜索 -->
			<uni-list-item v-if="searchType == 2" showArrow v-for="(item,index) in model_list" :key="index"
			:title="item.Name" :note="'型号 ' + item.Category" :rightText="item.Count"></uni-list-item>
		</uni-list>
		<!-- 加载更多 -->
		<uni-load-more :contentText="loadContentText" status="noMore"></uni-load-more>
		<!-- 侧边筛选抽屉 -->
		<view class="cu-modal drawer-modal justify-end" :class="modalName=='Modal'?'show':''" @tap="hideModal">
			<!-- Modal模态框 -->
			<view class="cu-dialog basis-xl bg-white" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="padding text-left">
					<form>
						<!-- 搜索关键字（标题） -->
						<view class="cu-form-group ">
							<view class="title text-bold">标题</view>
							<input v-model="searchKey" placeholder="请输入常见问题标题" />
							<!-- <luyj-search-barr  v-model="searchKey" placeholder="请输入常见问题标题" cancelColor="#999999" @confirm="toSearch" @cancel="toCancel"><luyj-search-barar> -->
						</view>
						<!-- 分类 -->
						<view class="cu-form-group ">
							<view class="title text-bold">{{ i18n.category }}</view>
							<input :placeholder="'请输入/选择' + i18n.category" name="input"></input>
						</view>
						<!-- 型号 -->
						<view v-if="searchType != 1" class="cu-form-group ">
							<view class="title text-bold">型号</view>
							<input :placeholder="'请输入/选择' + i18n_product.model " name="input"></input>
						</view>
						<!-- 标签 -->
						<view class="cu-form-group ">
							<view class="title text-bold">标签</view>
							<input placeholder="请输入/选择标签" name="input"></input>
						</view>
					</form>
					<view class="fr margin-top ">
						<button class="cu-btn  padding bg-cyan light" @tap="reset">重置</button>
						<button class="cu-btn padding bg-cyan" @tap="searchSubmit">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 常见问题
	 * @author 陆彦捷
	 * @date 2021.07.09 常见问题的初始页面
	 * @date 2021.07.12 添加筛选框、切换分类
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview : this.global.publicF.hasBack(),
				CustomBar : this.CustomBar,	// 当前导航栏高度
				loadContentText: this.global.params.loadContentText, // 加载中
				modalName : null,	// 侧边筛选框样式
				searchType : 0,		// 搜索方式： 0 : 按问题搜索 ，  1： 按 分类搜索 ， 2 : 按型号搜索
				typeArray: ['按问题搜索' , '按分类搜索', '按型号搜索'],
				isFilter : false ,		// 是否包含筛选条件
				// 与系统有关参数
				searchKey : '',			// 搜索问题
				problem_list:[],		// 常见问题列表
				category_list : [],		// 分类搜索列表
				model_list :[],			// 型号搜索列表
			}
		},
		computed:{
			i18n : function(){
				return this.$t('basic');
			},
			i18n_product : function(){
				return this.$t('product');
			}
		},
		onLoad:function(options){
			_self = this;
			this.getParams(options);			// 获取基本参数
			this.problems_request();			// 获取常见问题列表
		},
		methods: {
			// ========================================= 初始化问题 =================================================================
			/** 初始化参数
			 * @param {Object} options
			 */
			getParams : function(options){
			},
			// ========================================= 监听事件 ===================================================================
			/** 搜索当前设备
			 * @param {Object} e
			 */
			toSearch : function(e){
				console.log("搜索当前设备", e);
			},
			/** 取消搜索
			 * @param {Object} e
			 */
			toCancel : function(e){
				console.log("取消当前搜索",e);
			},
			/** 修改当前分类选择
			 * @param {Object} e
			 */
			bindtypeChange : function(e){
				this.searchType = parseInt( e.detail.value);
			},
			/**
			 * 修改问题分类为按问题搜索（临时）
			 */
			changeTypeFirst : function(e){
				uni.showLoading();
				setTimeout(function(){
					uni.hideLoading();
					this.searchType = 0;
				} , 1000);
			},
			/** 显示当前Modal框
			 * @param {Object} e
			 */
			showModal : function(e){
				this.modalName = 'Modal';
			},
			/** 隐藏当前Moda 框
			 * @param {Object} e
			 */
			hideModal : function(e){
				this.modalName = null;
				this.isFilter = !this.isFilter;
			},
			/** 重置当前按钮
			 * @param {Object} e
			 */
			reset : function(e){
				uni.showLoading();
				setTimeout(function(){
					uni.hideLoading();
				}, 500);
				this.isFilter = false;
			},
			/** 确定并搜索
			 * @param {Object} e
			 */
			searchSubmit : function(e){
				uni.showLoading();
				setTimeout(function(){
					uni.hideLoading();
				} , 500);
				this.modalName = null;
				this.isFilter = !this.isFilter;
			},
			// ========================================= 请求事件 ===================================================================
			/**
			 * 请求常见问题
			 */
			problems_request : function(){
				uni.showLoading();
				setTimeout( function(){
					uni.hideLoading();
					_self.problem_list = _self.global.problems.list;
					_self.category_list = _self.global.problems.category_list;		// 按分类查询列表
					_self.model_list = _self.global.problems.models_list;			// 按型号查询列表
				} , 2000);
			},
			// =====================================================================================================================
		}
	}
</script>

<style scoped lang="scss">
.box {
	display: flex;
	flex-direction: row;
	align-items: center;
	color: #8799a3;
	.item-left {
		width: 70rpx;
		text-align: justify;
		font-weight: bold;
	}
	.item-right{
		flex:1;
		// 省略超出部分
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}
</style>
