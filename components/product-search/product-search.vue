<template>
	<view  :style="[{height:CustomBar + 'px'}]"  :class="bgColor"  >
		<view class="padding " style="width: 70%; " :style="{'padding-top':StatusBar + 'px'}">
			<uni-easyinput placeholderStyle="color:#E5E5E5"  :styles="searchStyles" suffixIcon="scan" placeholder="KMJP41676请输入设备名称或SN码" @confirm="toSearch"
				@iconClick="toScan"></uni-easyinput>
		</view>
	</view>
</template>

<script>
	/**
	 * 头部搜索栏(输入SN码查询设备报修单)
	 * @author 陆彦捷
	 */
	export default {
		name: "product-search",
		props:{
			// 默认背景颜色样式（无）
			bgColor:{
				type : String,
				default: ''
			}
		},
		data() {
			return {
				// 有关样式的参数
				CustomBar: this.CustomBar, // 导航栏高度
				StatusBar: this.StatusBar, // 状态栏高度
				searchStyles :{
					color : '#FFFFFF',				// 文字颜色
					disableColor : '#eee',		// 禁用背景色
					borderColor:'#e5e5e5'		// 边框颜色
				},		// 输入框的样式
			};
		},
		created: function() {

		},
		methods: {
			// =========================================== 初始化 =======================================================
			/**
			 * 授权可以使用摄像头（为了SN码搜索）
			 */
			autocamera() {
				uni.authorize({
					scope: 'scope.camera'
				});
			},
			// =========================================== 监听事件 =======================================================
			/**跳转到SN码的具体搜索页面
			 * @param {Object} e
			 */
			toSearch(value) {
				console.log(value);
				if(value == 'KMJP41676'){
					// 跳转到设备详情页
					uni.navigateTo({
						url:'/pages_basic/product/product/productdetail?isEdit=true'
					});
				}else{
					// 设备的搜索页面
					uni.navigateTo({
						url: '/pages_basic/product/product/home?searchKey=' + value
					});
				}
			},
			/** 调用扫码方法
			 * @param {Object} e
			 */
			toScan(e) {
				uni.scanCode({
					// #ifndef MP-TOUTIAO
					scanType:['barCode'],		// 设定扫码类型为条形码
					// #endif
					success: function(e) {
						if(e.result == "KMJP41676"){
							// 跳转到设备详情页
							uni.navigateTo({
								url:'/pages_basic/product/product/productdetail?isEdit=true'
							});
						}else{
							// 设备的搜索页面
							uni.navigateTo({
								url: '/pages_basic/product/product/home?searchKey=' + e.result
							});
						}
					},
					fail: function(erros) {
						// 跳转到设备搜索页
						uni.navigateTo({
							url: '/pages_basic/product/product/home?'
						});
					}
				})
			}
		// =====================================================================================================================
		}
	}
</script>

<style>

</style>
