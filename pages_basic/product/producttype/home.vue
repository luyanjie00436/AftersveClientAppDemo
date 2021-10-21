<template>
	<view class="flex flex-direction ">
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n.category }}</block>
		</cu-custom>
		
		<!-- 选择门店	 -->
		<view v-if="switBranch"  class="u-m-p-50 bg-white solids margin-xs">
			<view class="u-demo-area u-flex u-row-center margin-sm">
				<label style="width: 100vw;" class="text-center" @click="changBranchs">
					<text>{{ mchName ? mchName : '无'}}</text>
					<u-icon name="arrow-down" size="28" color="#909399" ></u-icon>
				</label>
			</view>
		</view>
		
		<luyj-tree :searchIf="false"  :trees="category_list" :props="props">
		</luyj-tree>
	</view>
</template>

<script>
	/**
	 * 设备分类
	 * @author 陆彦捷
	 * @description 查看设备分类
	 */
	var _self;
	export default {
		data() {
			return {
				preview: this.global.publicF.hasBack(),		// 是否返回上一页
				mchName : this.global.organ.getTopName() ? this.global.organ.getTopName() : this.global.organ.getName(),		// 组织/门店名称
				search :{
					mchId : this.global.organ.getIndustryId(),
				},
				Self : true ,				// 是否当前组织
				props:{
					id: 'CategoryId',
					label: 'Name',
					children: 'Children',
				},
				// 数据相关参数
				category_list: [],
				currentCategoryId: -1, // 当前选中的节点
			}
		},
		computed:{
			i18n : function(){
				return this.$t('basic');
			},
			// 是否选择切换门店
			switBranch : function(){
				return this.global.organ.getIsSup() || this.global.organ.getIsSvc();
			}
		},
		onLoad: function(options) {
			// =============================== 测试的onLoad 方法 ===========================================
			_self = this;
			this.checkList = []
			this.getCatories(); // 获取分类信息
		},
		onShow : function(){
			uni.$once("query",query=>{
				if(Boolean(query)){
					this.search.mchId = query.MchId;
					this.mchName = query.Name;
					this.Self = query.Self;
					this.getCatories();			//  重新获取分类
				}
			});
		},
		methods: {
			// =========================================== 监听方法 =========================================
			/** 切换客户
			 * @param {Object} e
			 */
			changBranchs : function(e){
				uni.navigateTo({
					url:'/pages_basic/customer/customer-select?Self=' + _self.Self + '&MchId=' +  _self.search.mchId
				});
			},
			// ============================================ 公共方法 ==========================================
			/**
			 * 获取当前分类
			 */
			getCatories : function(){
				var func = ( this.Self ? this.global.categoryR.getTrees : this.global.categoryR.getCustomerTree) 
				func({
					mchId : _self.search.mchId,
					before : function(){
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success : function(data){
						uni.hideLoading();
						_self.category_list = data;
					},
					fail: function(){
						uni.hideLoading();
					}
				});
			},
			// ==============================================================================================================
		}
	}
</script>

<style>
</style>