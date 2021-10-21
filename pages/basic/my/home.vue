<template name="my">
	<view class="flex flex-direction">
		<!-- 权限判断 -->
		<!-- 通知 -->
		<view class="cu-custom bg-cyan" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed bg-cyan">
				<view class="text-xxl  padding-sm " @tap="toNotice" :style="{'margin-top':StatusBar + 'px'}">
					<uni-badge size="small" :text="noticeNumber" absolute="rightTop" type="error">
						<text class="cuIcon-noticefill padding-sm-right"></text>
					</uni-badge>
				</view>
			</view>
		</view>
		
		<!-- 导航页 -->
		<view  class="flex flex-direction bg-cyan">
			<!-- 头像 -->
			<navigator class=" flex padding-sm" url="/pages_basic/user/userdetail" >
				<view >
					<image class="cu-avatar round xl margin-left flex-item"
						:src="current.Avatar?current.Avatar: logo_my"></image>
				</view>
				<view class="margin-left " style="width: 55%;">
					<view class="flex flex-direction  padding-left-sm">
						<text class="text-cut text-xl padding-bottom-sm">{{ Boolean(current.Name) ? current.Name : current.LoginName }}</text>
						<teleport v-if="hasMerch" class="cf">
							<view class="fl text-sm text-cut text-bold " style="width: 80%;">
								{{ organName }}
							</view>
						</teleport>
					</view>
				</view>
				<view class="text-sl text-center cf" style="width: 30%;">
					<text class="cuIcon-right"></text>
				</view>
			</navigator>
		</view>
		
		<!-- 列表 ： 根据用户权限展示 -->
		<uni-list  v-for="(list , index) in mylist" :key="index" 
			:class="mylistshow[index] ? 'margin-bottom-sm' :''"
			:border="false">
			<uni-list-item  v-for="(item , i) in list" :key="i"  v-if="itemShow(item , index)"
			showArrow border
			:title="item.title"
			:to="item.to"
			:clickable="!item.to"  @click="clickItem(item)"></uni-list-item>
		</uni-list>
		<!-- 列表:根据用户权限展示 -->
		<!-- 列表：通用 -->
		<uni-list>
			<!-- 客服（微信小程序/百度小程序） -->
			<!-- #ifdef MP-WEIXIN || MP-BAIDU -->
			<uni-list-item showArrow show-extra-icon :extra-icon="serviceIcon" title="服务中心">
				<template slot="body" style="width: 100%;" class="flex flex-direction">
					<button open-type="contact" class=" bg-white cu-btn text "
						style="justify-content: left;padding-left: 0rpx;">服务中心</button>
				</template>
			</uni-list-item>
			<!-- #endif -->
			<!-- 意见反馈（APP、微信小程序、QQ小程序）	 -->
			<!-- #ifdef APP-PLUS || MP-WEIXIN || MP-QQ -->
			<uni-list-item showArrow show-extra-icon :extra-icon="extraIcon" title="意见反馈">
				<template slot="body" style="width: 100%;" class="flex flex-direction">
					<button open-type="feedback" class=" bg-white cu-btn text "
						style="justify-content: left;padding-left: 0rpx;">意见反馈</button>
				</template>
			</uni-list-item>
			<!-- #endif -->
		</uni-list>
		<button class="margin bg-cyan cu-btn padding-lg round" @click="logout">退出</button>
	</view>
</template>

<script>
	/**
	 * 我的：页面主页
	 * @author 陆彦捷
	 * @property {Number} noticeNumber 未读通知数量
	 */
	var _self;
	export default {
		// 输入参数
		props: {
			// 未读通知数量
			noticeNumber: {
				type: Number,
				default: 0
			},
			// 组织Id
			MchId : {
				type: [Number , String],
				default: 0
			}
		},
		data() {
			return {
				// 与样式有关参数
				StatusBar: this.StatusBar, // 状态栏高度
				CustomBar: this.CustomBar, // 导航栏高度
				logo_my : this.global.statics.login.logo_my,		// 图片_我的
				// 系统参数
				mylist : this.global.mylist,						// 用于显示的数组列表
				mylistshow :  new Array(this.global.mylist.length).fill(false),	// 用于显示数组的参数
				serviceIcon: {
					color: '#AEAEAE',
					size: '22',
					type: 'headphones'
				}, // 图标-服务	
				extraIcon: {
					color: '#AEAEAE',
					size: '22',
					type: 'compose'
				}, // 图标-意见反馈	
				// 与系统或权限有关参数
				admin: false, // 是否管理员
				current:{},		// 当前用户信息
				organName: '', // 当前组织名称
				IsCust : false,	// 是否客户
				IsSup : false,	// 是否服务商
				IsSvc : false,	// 是否供应商
			}
		},
		watch:{
			MchId : function(val , oldVal){
				if(Boolean(val) && val != oldVal){
					this.organ_request();		// 获取组织信息
				}
			}
		},
		computed: {
			// 国际化
			i18n : function(){
				return this.$t("basic");
			},
			i18n_login: function(){
				return this.$t('login')
			},
			i18n_product: function() {
				return this.$t('product');
			},
			i18n_merchant: function() {
				return this.$t('merchant');
			},
			// 是否包含组织
			hasMerch: function() {
				return Boolean(this.organName);
			},
			// 判断是否管理员
			isAdmin: function() {
				return this.admin && Boolean(this.MchId);
			},
		},
		// 初始化
		created: function() {
			_self = this;
			this.getUserCur();		// 获取当前用户信息
			// 获取组织
			this.organ_request();
			this.$emit('getUserCur' , this.getUserCur);		// 获取当前用户方法
		},
		methods: {
			// ============================================ 初始化方法 =============================================
			/** 判断是否管理员
			 * @param {Object} val
			 */
			adminF : function(val){
				this.admin = val;
			},
			// ============================================ 监听方法 ===================================================
			/** 切换为通知
			 * @param {Object} e
			 */
			toNotice: function(e) {
				this.$emit('tabbar', "notice");
			},
			/** 点击列表选项
			 * @param {Object} item
			 */
			clickItem : function(item){
				switch(item.value){
					case 'scan' : 
						this.toScan();		// 调用扫一扫查看设备
						break;
					default: break;
				}
			},
			/** 退出当前用户
			 * @param {Object} e
			 */
			logout: function(e) {
				uni.showModal({
					title: _self.i18n_login.modal_exit_title,
					content: _self.i18n_login.modal_exit_content,
					success: function(result) {
						if (result.confirm) {
							_self.global.loginF.login_exit_after();
						}
					}
				})
			},
			// =============================================== 公共方法 ========================================
			/**
			 * 获取当前用户
			 */
			getUserCur: function() {
				this.global.userR.getCurrentInfo({
					success: function(data) {
						_self.current = data;
					}
				});
			},
			/** 获取当前门店的
			 */
			organ_request: function() {
				this.global.merchantR.getCurrentInfo({
					success: function(data) {
						if (Boolean(data)) {
							_self.organName = data.Name;
							_self.IsCust = data.IsCust;
							_self.IsSup = data.IsSup;
							_self.IsSvc = data.IsSvc;
						}
					}
				});
			},
			/** 是否展示当前列表信息
			 * @param {Object} item 当前item 值
			 * @property {Boolean | null} MerchShow 门店
			 * @property {Boolean | null} adminShow 管理员
			 * @property {Boolean | null} isCustShow 客户
			 * @property {Boolean | null} isSupShow 服务商
			 * @property {Boolean | null} isSvcShow 供应商
			 * @param {Number} 当前对应索引列 
			 * @description  根据参数，判断列表是否展示。
			 * 	null : 表示展示
			 *  true 当XX为true时展示
			 *  false 当XX为false时展示
			 */
			itemShow : function(item , index){
				let MerchShow = item.hasMerch == null ? true : item.hasMerch == this.hasMerch; 	// 包含门店
				let adminShow = item.isAdmin == null ? true : item.isAdmin === this.admin;		// 是否管理员
				let CustShow = item.isCust == null ? true : item.isCust === this.IsCust;		// 是否客户
				let SupShow = item.isSup == null ? true : item.isSup === this.IsSup;			// 是否服务商
				let SvcShow = item.isSvc == null ? true : item.isSvc === this.IsSvc;			// 是否供应商
				let show = MerchShow && adminShow && (CustShow || SupShow || SvcShow);			// 是否展示item
				this.mylistshow[index] = show || this.mylistshow[index];
				return show ;
			},
			/**
			 * 调用扫一扫查看设备详情
			 */
			toScan : function () {
				uni.scanCode({
					// #ifndef MP-TOUTIAO
					scanType:['barCode'],		// 设定扫码类型为条形码
					// #endif
					success: function(e) {
						_self.global.productR.productBySn_request({
							data :{sn : e.result},
							success : function(data){
								if(Boolean(data)){
									uni.navigateTo({
										url:'/pages_basic/product/device/detail?DeviceId'+ data.DeviceId
									});
									return;
								}
								uni.showToast({
									title: _self.i18n.searchaFailMessage,
									icon:'none'
								});
							},
							fail : function(){
								uni.showToast({
									title: _self.i18n.searchaFailMessage,
									icon:'none'
								})
							}
						});
					},
					fail: function(e) {
						uni.showToast({
							title:'调用扫码方法失败',
							icon:'none'
						});
						
					}
				})
			}
			// =============================================================================================================
		}
	}
</script>

<style>

</style>
