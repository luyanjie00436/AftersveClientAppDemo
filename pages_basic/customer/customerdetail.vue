<template>
	<view class="flex flex-direction">
		<!-- 权限判断 -->
		<!-- 权限判断 -->
		<operate-permission @isAdmin="adminF"></operate-permission>
		<!-- 权限判断 -->
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_mchCustomer.nameBasic }}</block>
		</cu-custom>
		<!-- 导航栏 -->
		<uni-load-more v-if="status != 'noMore'" :contentText="loadContentText" :status="status" @clickLoadMore="getInfo(CustMchId)"></uni-load-more>
		<!-- 表单内容 -->
		<form>
			<!-- 客户名称 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_mchCustomer.detail.name }}</view>
				<text class="text-grey">{{ current.Name}}</text>
			</view>
			<!-- 客户编码 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_mchCustomer.detail.custNo }}</view>
				<text class="text-grey">{{ current.CustNo }}</text>
			</view>
			<!-- 客户 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_mchCustomer.detail.custMch }}</view>
				<text class="text-grey">{{ current.CustMchName }}</text>
			</view>
			<!-- 邮政编码 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_merchant.postCode }}</view>
				<text class="text-grey">{{ current.PostCode }}</text>
			</view>
			<!-- 地址 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_merchant.address }}</view>
				<text class="text-grey">{{ current.Address }}</text>
			</view>
			<!-- 联系方式 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_merchant.linkTel }}</view>
				<text class="text-grey">{{ current.LinkTel }} ({{ current.LinkMan }})</text>
			</view>
			<!-- 创建时间 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_mchCustomer.detail.createAt }}</view>
				<uni-dateformat class="text-grey"
					:date="current.CreateAt" :threshold="[60000, 3600000]"></uni-dateformat>
			</view>
			<!-- 更新时间 -->
			<view class="cu-form-group solid-bottom text-df">
				<view class=" title text-bold">{{ i18n_mchCustomer.detail.updateAt }}</view>
				<uni-dateformat class="text-grey"
					:date="current.UpdatedAt" :threshold="[60000, 3600000]"></uni-dateformat>
			</view>
		</form>
		<!-- 表单内容 -->
		<!-- 底部按钮 -->
		<bottom-btns v-if="isAdmin" :btns="btn_list" @click="clickBottom"></bottom-btns>
		<!-- 底部按钮 -->
	</view>
</template>

<script>
	/**
	 * 客户详细信息
	 * @author 陆彦捷
	 */
	var _self = this;
	export default {
		data() {
			return {
				// 样式有关参数
				preview : this.global.publicF.hasBack(),	// 是否返回上一页
				// 系统有关参数
				isAdmin : false,			// 是否管理员
				CustomId: 0 ,				// 客户Id
				current : {
					CustomId : '',		// 客户Id
					CustMchId : '',		// 客户组织Id
					CustMchName :'',	// 显示客户名称
					CustMchNo : '',		// 客户编码
					MchId : 0 ,			// 组织Id
					Name : '',			// 名称
					PostCode :'',		// 邮政编码
					Address : '',		// 地址
					LinkMan :'',		// 联系人
					LinkTel :'',		// 联系电话
					CreateAt :'',		// 创建时间
					UpdateAt :'',		// 更新时间
				},				// 返回值
				loadContentText: this.global.params.loadContentText,
				status: 'more',			// 状态-更多
				btn_list:this.global.params.btn_list_toEdit,
			}
		},
		computed:{
			// 国际化
			i18n : function(){
				return this.$t('basic');
			},
			i18n_mchCustomer : function(){
				return this.$t('mchCustomer');
			},
			i18n_merchant : function(){
				return this.$t('merchant');
			}
		},
		onLoad:function(options){
			_self = this;
			this.getParams(options);
			if(Boolean(this.CustomId)){
				// 获取组织信息
				this.getInfo(this.CustomId);
			}else{
				// 返回上一页
				uni.navigateBack();
			}
		},
		methods: {
			// ============================================ 初始化 ===================================================================================
			/** 初始化参数
			 * @param {Object} options
			 */
			getParams : function(options){
				this.CustomId = Boolean(options.CustomId ) ?  options.CustomId : 0 ;
			},
			// ============================================ 监听事件 =================================================================================
			/** 判断是否当前管理员
			 * @param {Boolean} value 是否当前管理员
			 */
			adminF : function(value){
				this.isAdmin = value;
			},
			/** 点击底部事件
			 * @param {String} name
			 */
			clickBottom : function(name){
				switch(name){
					case 'edit' : 
						uni.navigateTo({
							url :"/pages_basic/customer/customer_edit?CustomId=" + _self.CustomId
						})
						break;
					default:break;
				}
			},
			// =========================================== 请求事件 =======================================================================
			/** 获取客户id
			 * @param {Number} customId
			 */
			getInfo : function(customId){
				this.global.mchCustomerR.getInfo({
					id :customId,
					before : function(){
						_self.status = 'loading';
					},
					success : function(data){
						if(Boolean(data)){
							_self.status = 'noMore';
							_self.current = data;
							return;
						}
						_self.status = 'more';
					},
					fail : function(){
						_self.status =  'more';
					}
				});
			}
			// =======================================================================================================================================
		}
	}
</script>

<style>

</style>
