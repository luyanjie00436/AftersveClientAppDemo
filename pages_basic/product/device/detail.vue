<template>
	<view class="flex flex-direction">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_product.device.nameBasic}}</block>
		</cu-custom>
		<!-- 是否加载中…… -->
		<uni-load-more v-if="status != 'noMore'" :status="status" :contentText="loadContentText"
			@clickLoadMore="product_request"></uni-load-more>

		<!-- 设备信息列表 -->
			<!-- SN码 -->
			<view class="cu-form-group text-df" name="DeviceSn">
				<text class="title text-bold">{{ i18n_product.device.deviceSn }}</text>
				<text class="text-grey">{{ current.DeviceSn}}</text>
			</view>
			<!-- 名称 -->
			<view class="cu-form-group text-df" name="Name">
				<text class="title text-bold">{{ i18n_product.device.name }}</text>
				<text class="text-grey">{{ current.Name}}</text>
			</view>
			<!-- 分类 -->
			<view class="cu-form-group text-df" name="CategoryName">
				<text class="title text-bold">{{ i18n_product.device.category }}</text>
				<text class="text-grey">{{ current.CategoryName}}</text>
			</view>
			<!-- 品牌 -->
			<view class="cu-form-group text-df" name="BrandName">
				<text class="title text-bold">{{ i18n_product.device.brand }}</text>
				<text class="text-grey">{{ current.BrandName }}</text>
			</view>
			<!-- 品牌 -->
			<!-- 型号 -->
			<view class="cu-form-group text-df " name="ModelName">
				<text class="title text-bold">{{ i18n_product.device.model }}</text>
				<text class="text-grey">{{ current.ModelName}}</text>
			</view>
			<!-- 设备描述 -->
			<view class="cu-form-group text-df">
				<view class="title text-bold">
					{{ i18n_product.device.mgs }}
				</view>
				<text class="text-grey">{{ current.Msg }}</text>
			</view>
			<!-- 设备图片  : 没有相关方法，暂时隐藏 -->
			<!-- 配送日期 -->
			<view  class="cu-form-group text-df" name="DeliveryTime">
				<text class="title text-bold">{{ i18n_product.device.deliveryTime }}</text>
				<uni-dateformat class="text-grey" format="yyyy-MM-dd" :date="current.DeliveryTime"></uni-dateformat>
			</view>
			<!-- 保修周期 -->
			<view class="cu-form-group" name="Guarantee">
				<text class="title text-bold">{{ i18n_product.device.guarantee }}</text>
				<text class="text-grey">{{ current.Guarantee }}</text>
			</view>
			<!-- 保修开始日期 -->
			<view  class="cu-form-group text-df" name="RepairStart">
				<text class="title text-bold">{{ i18n_product.device.repairStart }}</text>
				<uni-dateformat  class="text-grey" format="yyyy-MM-dd" :date="current.RepairStart"></uni-dateformat>
			</view>
			<!-- 保修结束日期 -->
			<view v-if="false" class="cu-form-group text-df" name="RepairEnd">
				<text class="title text-bold">{{ i18n_product.device.repairEnd }}</text>
				<uni-dateformat class="text-grey"  format="yyyy-MM-dd" :date="current.RepairEnd"></uni-dateformat>
			</view>
			<!-- 所属门店 (所属门店控件暂时不细化考虑)-->
			<view v-if="false" class="cu-form-group text-df" name="MchName">
				<text class="title text-bold">{{ i18n_product.device.mchId }}</text>
				<text class="text-grey">{{ current.MchName }}</text>
			</view>
			<!-- 门店地址 -->
			<view v-if="false" class="cu-form-group text-df" name="Name">
				<text class="title text-bold">{{ i18n_product.device.address }}</text>
				<text class="text-grey">{{ current.Address }}</text>
			</view>
			<!-- 厂商 -->
			<view v-if="false" class="cu-form-group text-df" name="SupplierMchName">
				<text class="title text-bold">{{ i18n_product.device.supplier }}</text>
				<text class="text-grey"> {{ current.SupplierMchName }}</text>
			</view>
		</uni-forms>
		<!-- 底部按钮 -->
		
	</view>
</template>

<script>
	/**
	 * 设备信息的详情
	 * @author 陆彦捷
	 * @description  添加/编辑/查看设备信息
	 */
	var _self;
	export default {
		data() {
			return {
				// 样式参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				// 系统参数
				loadContentText: this.global.params.loadContentText, // 显示加载数据
				status: 'more', // 加载状态
				// 系统参数
				DeviceId: 0, // 设备Id
				current: {
				}, // 添加或请求设备时的值
				imgList: [], // 设备的图片组
			}
		},
		computed: {
			i18n: function() {
				return this.$t('basic');
			},
			i18n_product: function() {
				return this.$t('product');
			},
			// 是否禁止写
			disabled: function() {
				return false;
			}
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
			// 获取当前设备
			this.product_request();
		},
		methods: {
			// =================================================== 初始化 =========================================
			/** 获取初始化值
			 * @param {Object} options
			 */
			getParams: function(options) {
				this.DeviceId = options.DeviceId ? options.DeviceId : 0; // 设备Id
			},
			// =================================================== 请求方法 ========================================
			/**
			 * 获取当前设备请求
			 */
			product_request: function() {
				this.global.deviceR.getInfo({
					id : _self.DeviceId,
					before : function(){
						_self.status = "loading";
					},
					success: function(data){
						if(Boolean(data)){
							_self.status = "noMore";
							_self.current = data;
							return;
						}
						_self.status = "more";
					},
					fail : function(){
						_self.status = "more";
					}
				})
			},
			// ====================================================================================================
		}
	}
</script>

<style>

</style>
