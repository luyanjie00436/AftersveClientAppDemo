<template>
	<view class="flex flex-direction bg-white">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ isEdit ? current.ProductSn :'添加设备'}}</block>
		</cu-custom>
		<!-- 是否加载中…… -->
		<uni-load-more v-if="isLoading" :status="status" :contentText="loadContentText"
			@clickLoadMore="product_request"></uni-load-more>

		<!-- 设备信息列表 -->
		<uni-forms ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
			<!-- SN码 -->
			<uni-forms-item name="ProductSn">
				<view class="cu-form-group solid-bottom" name="ProductSn">
					<text class="title text-bold">SN码</text>
					<input placeholder="请输入SN码" :value="current.ProductSn"
						@input="changeProductSn($event);binddata('ProductSn',$event.detail.value ,'form')"
						:disabled="disabled" />
				</view>
			</uni-forms-item>
			<!-- 名称 -->
			<uni-forms-item name="Name">
				<view class="cu-form-group solid-bottom" name="Name">
					<text class="title text-bold">名称</text>
					<input placeholder="请输入设备名称" :value="current.Name"
						@input="changeName($event);binddata('Name',$event.detail.value,'form')" :disabled="disabled" />
				</view>
			</uni-forms-item>
			<!-- 分类 -->
			<uni-forms-item name="CategoryId">
				<!-- CategoryName 分类名称 -->
				<view class="cu-form-group solid-bottom" name="Name">
					<text class="title text-bold">{{ i18n.category }}</text>
					<input :placeholder="'请输入/选择'+ i18n.category " :value="current.CategoryName" :disabled="disabled" />
				</view>
			</uni-forms-item>
			<!-- 品牌 -->
			<view>品牌</view>
			<!-- 型号 -->
			<uni-forms-item v-if="current.Model" name="ModelId">
				<!-- 型号Model -->
				<view class="cu-form-group solid-bottom" name="Name">
					<text class="title text-bold">{{ i18n_product.model }}</text>
					<input placeholder=" " :value="current.Model" :disabled="disabled" />
				</view>
			</uni-forms-item>
			<!-- 设备描述 -->
			<view class="cu-bar bg-white ">
				<view class="action text-bold">
					设备描述
				</view>
			</view>
			<uni-forms-item name="Msg">
				<view class="cu-form-group solid-bottom" name="Name">
					<textarea placeholder="请输入设备详细信息" :value="current.Msg" :disable="disabled"></textarea>
				</view>
			</uni-forms-item>
			<!-- 设备图片 -->
			<view class=" cu-bar  ">
				<view class="action text-bold text-xl">
					设备图片
				</view>
				<view class="action">
					{{ imgList.length}}/9
				</view>
			</view>
			<uni-form-item>
				<view class="cu-form-group padding-left-xl solid-bottom">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
							:data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view v-if="disabled" class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<9 && disabled">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</uni-form-item>
			<!-- 配送日期 -->
			<uni-forms-item name="DeliveryTime">
				<view class="cu-form-group solid-bottom" name="Name">
					<text class="title text-bold">配送日期</text>
					<!-- <input placeholder="请输入名称" :value="current.DeliveryTime" /> -->
					<picker mode="date" :value="current.DeliveryTime">
						<uni-dateformat format="yyyy-MM-dd" :value="current.DeliveryTime"></uni-dateformat>
					</picker>
				</view>
			</uni-forms-item>
			<!-- 保修周期 -->
			<uni-forms-item name="Guarantee">
				<view class="cu-form-group solid-bottom" name="Name">
					<text class="title text-bold">保修周期（月）</text>
					<!-- <uni-number-box :value="current.Guarantee"></uni-number-box> -->
					<input value="请输入保修周期" :value="current.Guarantee" :disabled="disabled" />
				</view>
			</uni-forms-item>
			<!-- 保修开始日期 -->
			<uni-forms-item name="RepairStart">
				<view class="cu-form-group solid-bottom" name="Name">
					<text class="title text-bold">保修开始日期</text>
					<picker v-if="disabled" mode="date" :value="current.RepairStart">
						<uni-dateformat format="yyyy-MM-dd" :value="current.RepairStart"></uni-dateformat>
					</picker>
					<view v-else style="text-align: left;width: 70%;">
						<uni-dateformat  format="yyyy-MM-dd" :value="current.RepairStart"></uni-dateformat>
					</view>
				</view>
			</uni-forms-item>
			<!-- 保修结束日期 -->
			<uni-forms-item name="RepairEnd">
				<view class="cu-form-group solid-bottom" name="Name">
					<text class="title text-bold">保修结束日期</text>
					<picker v-if="disabled" mode="date" :value="current.RepairEnd">
						<uni-dateformat format="yyyy-MM-dd" :value="current.RepairEnd"></uni-dateformat>
					</picker>
					<view v-else style="text-align: left;width: 70%;">
						<uni-dateformat  format="yyyy-MM-dd" :value="current.RepairEnd"></uni-dateformat>
					</view>
				</view>
			</uni-forms-item>
			<!-- 所属门店 (所属门店控件暂时不细化考虑)-->
			<uni-forms-item name="MchId">
				<!-- MchName 门店名称 -->
				<view class="cu-form-group solid-bottom" name="Name">
					<text class="title text-bold">所属门店</text>
					<input placeholder="请输入名称" :value="current.MchName" :disabled="disabled" />
				</view>
			</uni-forms-item>
			<!-- 门店地址 -->
			<uni-forms-item name="Address">
				<view class="cu-form-group solid-bottom" name="Name">
					<text class="title text-bold">门店地址</text>
					<input placeholder=" " :value="current.Address" disabled />
				</view>
			</uni-forms-item>
			<!-- 厂商 -->
			<uni-forms-item name="SupplierMchId">
				<view class="cu-form-group solid-bottom" name="Name">
					<text class="title text-bold">{{ i18n.supplier }}</text>
					<input placeholder=" " :value="current.SupplierMchName" :disabled="disabled"/>
				</view>
			</uni-forms-item>
		</uni-forms>
		<!-- 编辑和删除：暂时不做 -->
		<button v-if="false" class="cu-btn bg-cyan margin padding round"
			@click="submit('form')">{{ isEdit? '编辑':'添加' }}</button>
		<button v-if="false&isEdit" class="cu-btn bg-red margin-lr margin-bottom padding round"
			@click="product_delete">删除</button>
	</view>
</template>

<script>
	/**
	 * 设备信息的详情
	 * @author 陆彦捷
	 * @description  添加/编辑/查看设备信息
	 * 	注： 重新加载细节，暂时不考虑
	 */

	var _self;
	export default {
		data() {
			return {
				// 样式参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				isEdit: false, // 是否处于编辑状态
				isLoading: false, // 获取是否加载中
				loadContentText: {
					contentdown: "点击刷新数据",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}, // 显示加载数据
				status: 'more', // 加载状态
				// 系统参数
				MchId: this.global.organ.getIndustryId(), // 当前组织
				ProductId: 0, // 设备Id
				current: {
					ProductId: 0, // 设备id
					Name: "", // 名称
					ProductSn: "", // 设备SN码
					DeliveryTime: null, // 配送时间(日期)
					Guarantee: "0", // 保修周期 （联动保修开始日期、保修结束日期）
					RepairStart: null, // 保修开始时间 （联动保修周期、保修结束时间）
					RepairEnd: null, // 保修结束时间（不用于选择）
					CategoryId: 0, // 分类id
					ModelId: 0, // 型号Id
					MchId: 0, // 所属组织/门店		（暂时弄所有的）
					SupplierMchId: 0, // 厂商组织id
					Msg: "", // 详细信息（）
					Imgs: [], // 设备图片[数组形式]
					ImgUrl: "", // 设备图片
				}, // 添加或请求设备时的值
				imgList: [], // 设备的图片组
				rules: {
					ProductSn: {
						rules: [{
							required: true,
							errorMessage: '请输入设备SN码'
						}]
					},
					Name: {
						rules: [{
							required: true,
							errorMessage: '请输入设备名称SN码'
						}]
					},
					DeliveryTime: {
						rules: []
					},
					Guarantee: {
						rules: []
					},
					RepairStart: {
						rules: []
					},
					RepairEnd: {
						rules: []
					},
					CategoryId: {
						rules: []
					},
					MchId: {
						rules: []
					},

					SupplierMchId: {
						rules: []
					},
					SupplierMchId: {
						rules: []
					},
					Msg: {
						rules: []
					},
					Imgs: {
						rules: []
					},
					ImgUrl: {
						rules: []
					},
				}
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
		onReady: function() {
			// 初始化表单验证
			this.$refs.form.setRules(this.rules);
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
			// 获取当前设备
			// if (this.isEdit) {
			this.product_request();
			// }
		},
		methods: {
			// =================================================== 初始化 =========================================
			/** 获取初始化值
			 * @param {Object} options
			 */
			getParams: function(options) {
				this.ProductId = options.ProductId ? options.ProductId : 0; // 设备Id
				this.isEdit = options.isEdit != 'false' ? Boolean(options.isEdit) : false; // 是否编辑状态
			},
			// =================================================== 监听事件 ========================================
			/** 提交表单（添加/删除当前设备信息）
			 * @param {Object} form
			 */
			submit: function(form) {
				this.$refs[form]
					.submit()
					.then(result => {
						console.log("表单验证成功=>", result);
						uni.showModal({
							title: '提交',
							content: '是否提交当前值？',
							success: function(result) {
								if (result.confirm) {
									if (_self.isEdit) {
										_self.productupdate_request(); // 编辑设备请求
									} else {
										_self.productadd_request(); // 添加设备请求
									}
								}
							},
							fail: function(erros) {
								console.log("提交表单Modal:fail=>", erros);
							}
						});
					})
					.catch(errors => {
						_self.message_erros(errors);
					});
				console.log("添加/保存当前设备信息");
			},
			/**
			 * 删除当前设备信息
			 */
			product_delete: function() {
				console.log("删除当前设备");
			},
			/** 修改SN码
			 * @param {Object} e
			 */
			changeProductSn: function(e) {
				this.current.ProductSn = e.detail.value;
			},
			/** 修改设备名称
			 * @param {Object} e
			 */
			changeName: function(e) {
				this.current.Name = e.detail.value;
			},
			/** 修改设备描述
			 * @param {Object} e
			 */
			changeMsg: function(e) {
				console.log("修改设备描述", e);
			},
			/** 修改设备图片
			 * @param {Object} e
			 */
			changeImgs: function(e) {
				console.log("修改设备图片", e);
			},

			// =============== 设备图片组 ===============================
			/**
			 * 选择图片
			 */
			ChooseImage: function() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			/** 查看图片
			 * @param {Object} e
			 */
			ViewImage: function(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			/** 删除图片
			 * @param {Object} e
			 */
			DelImg: function(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1); // 删除当前图片
			},
			// ==========================================================
			/** 修改配送日期
			 * @param {Object} e
			 */
			changeDeliveryTime: function(e) {
				console.log("修改配送日期", e);
			},
			/** 修改保修周期
			 * @param {Object} e
			 */
			changeGuarantee: function(e) {
				console.log("修改保修周期", e);
			},
			/** 修改保修开始日期
			 * @param {Object} e
			 */
			changeRepairStart: function(e) {
				console.log("修改保修开始日期", e);
			},
			/** 修改分类
			 * @param {Object} e
			 */
			changeCategoryId: function(e) {
				console.log("修改分类", e);
			},
			/** 修改型号
			 * @param {Object} e
			 */
			changeModelId: function(e) {
				console.log("修改型号", e);
			},
			/** 修改所属门店
			 * @param {Object} e
			 */
			changeMchId: function(e) {
				console.log("修改所属门店", e);
			},
			/** 修改厂商
			 * @param {Object} e
			 */
			changeSupplierMchId: function(e) {
				console.log("修改厂商=>", e);
			},
			// =================================================== 公共方法 ========================================
			/** 展示错误信息
			 * @param {Array} erros 错误消息组
			 */
			message_erros: function(erros) {
				uni.showToast({
					title: erros[0].errorMessage,
					icon: 'none'
				});
			},
			// =================================================== 请求方法 ========================================
			/**
			 * 获取当前设备请求
			 */
			product_request: function() {
				this.global.productR.productById_request({
					id : _self.ProductId,
					before : function(){
						_self.isLoading = true;
						_self.status = "loading";
					},
					success: function(data){
						_self.isLoading = false;
						_self.status = "more";
						_self.current = data;
						console.log(_self.current);
					},
					fail : function(){
						_self.isLoading = false;
						_self.status = more;
					}
				})
			},
			/**
			 * 添加设备请求
			 */
			productadd_request: function() {
				uni.showLoading();
				setTimeout(function() {
					uni.hideLoading();
					uni.showToast({
						title: '假装添加设备成功'
					});
				}, 3000);
			},
			/**
			 * 更新设备请求
			 */
			productupdate_request: function() {
				uni.showLoading();
				setTimeout(function() {
					uni.hideLoading();
					uni.showToast({
						title: '加载更新设备成功！'
					});
				}, 3000);
			},
			/**
			 * 删除设备请求
			 */
			productdete_request: function() {
				console.log("删除设备请求");
			},
			/**
			 * 分类请求
			 */
			categories_request: function() {
				console.log("分类请求");
			},
			/** 型号请求
			 * @param {Object} CategoryId 分类id
			 */
			models_request: function(CategoryId) {
				console.log("型号请求，CategoryId=>", CategoryId);
			},
			/**
			 *  获取当前用户能够获取到的所有组织
			 */
			Mechants_request: function() {
				console.log("获取当前用户能够获取到的所有组织/门店");
			}
			// ====================================================================================================
		}
	}
</script>

<style>

</style>
