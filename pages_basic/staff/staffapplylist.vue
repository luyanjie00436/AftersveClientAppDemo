<template>
	<view  class="flex flex-direction">
		<!-- 标题栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_staff.applylist }}</block>
		</cu-custom>
		<!-- 标题栏 -->

		<view class="u-m-p-50 bg-white ">
			<view class="u-demo-area u-flex u-row-center">
				<!-- 门店 -->
				<view style="width: 50vw;" class="text-center" :class="canChangeMch ? '' : 'text-grey'"
					@click="changBranchs">
					<text>{{ mchName ? mchName : '无'}}</text>
					<u-icon name="arrow-down" size="28" color="#909399"></u-icon>
				</view>
				<!-- 门店 -->
				<!-- 状态 -->
				<u-dropdown style="width: 100vw;" :activeColor="activeColor" border-bottom
					:myContentStyle="{width: '100vw',marginLeft: '-50vw'}">
					<u-dropdown-item v-model="search.status" :title="i18n_staff.apply.status" :options="statuses" @change="getJoinList(true)">
					</u-dropdown-item>
				</u-dropdown>
				<!-- 状态 -->
			</view>
		</view>

		<!-- 搜索列表 -->
		<uni-list >
			<!-- :note="'联系方式:申请理由<br>、申请时间、状态'" -->
			<uni-list-item v-for="(item,index) in join_list" :key="index" >
				<template slot="body" style="width: 85vw;">
					<view class="flex flex-direction">
						<view class="text-bold text-cut text-lg fl" >{{item.UserName ? item.UserName :'' }}</view>
						<view class="box1">
							<view class="item-left">联系方式</view>
							<view class="item-right">{{ item.Mobile ? item.Mobile:'' }}</view>
						</view>
						<view class="box1">
							<text class="item-left">申请理由</text>
							<text class="item-right">{{ item.Msg ? item.Msg :'' }}</text>
						</view>
						<view class="box1">
							<text class="item-left">申请时间</text>
							<text class="item-right">
							{{ item.CreateAt ? item.CreateAt :'' }}
							</text>
						</view>
						<view class="box1">
							<text class="item-left">状态</text>
							<text class="item-right">{{ statusO[item.Status]? statusO[item.Status] :'' }}</text>
						</view>
					</view>
				</template>
				<template slot="footer" style="width: 15vw;">
					<!-- 删除、同意、拒绝 -->
					<view class="item-footer-tags" style="background-color: #FFFFFF" >
						<view v-if="item.Status== 'Created'"  class="box cu-tag round bg-blue light " @click="join_agree(item)">{{ i18n.btn_agree}}</view>
						<view  v-if="item.Status== 'Created'" class="box cu-tag round bg-red light " @click="join_disagree(item)">{{ i18n.btn_disagree }}</view>
						<view class="box cu-tag round bg-red padding-lr padding-tb-xs cuIcon-delete " @click="join_delete(item)"></view>
					</view>
				</template>
			</uni-list-item>
			<uni-load-more :contentText="loadContentText" :status="status" @clickLoadMore="getJoinList(false)">
			</uni-load-more>
		</uni-list>
		<!-- 搜索列表 -->
	</view>
</template>

<script>
	/**
	 * 成员申请审核
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				activeColor: this.global.params.activeColor, // 激活状态颜色
				// 系统参数
				search: {
					topMchId: this.global.organ.getIndustryId(), // 当前组织Id
					mchId: this.global.organ.getBranchId(), // 当前门店Id
					status: null, // 状态
					pageIndex: 1, // 默认起始页
					pageSize: 20, // 默认每页条数
				},
				mchName: this.global.organ.getName(), // 当前门店名称
				statuses: this.global.status.joinApplyStatus,
				statusO: this.global.status.joinApplyStatusO,
				loadContentText: this.global.params.loadContentText, // 加载中
				status: 'more', // 下拉框状态
				join_list: [], // 申请列表
			}
		},
		computed: {
			// 国际化
			i18n: function() {
				return this.$t('basic');
			},
			i18n_staff: function() {
				return this.$t('staff');
			},
			// 是否可切换当前门店
			canChangeMch: function() {
				return this.search.mchId === this.search.topMchId;
			}			
		},
		onLoad: function() {
			_self = this;
			this.getJoinList(true); // 获取当前成员申请列表
		},
		onShow: function() {
			// 接收参数
			uni.$once("query",query=>{
				_self.search.mchId = query.MchId;
				_self.mchName = query.Name;
				_self.getJoinList(true);
			});
		},
		methods: {
			// =========================================== 监听事件 =======================================================
			/** 切换门店
			 * @param {Object} e
			 */
			changBranchs: function(e) {
				if (this.canChangeMch) {
					uni.navigateTo({
						url: '/pages_basic/branchs-select?MchId=' + _self.search.mchId
					});
				}
			},
			// =========================================== 请求方法 =======================================================
			/**
			 * 获取当前的申请列表
			 * @param {Boolean} first 是否加载首页
			 */
			getJoinList: function(first = false) {
				this.search.pageIndex = first ? 1 : this.search.pageIndex;
				if (this.status == 'loading' || (this.status === 'noMore' && this.search.pageIndex != 1)) {
					return;
				}
				this.global.staffR.getJoinList({
					data: _self.search,
					before: function() {
						_self.status = 'loading';
						if (_self.search.pageIndex == 1) {
							_self.join_list = [];
						}
					},
					success: function(data) {
						if (Array.isArray(data)) {
							_self.join_list = _self.join_list.concat(data);
							_self.search.pageIndex++;
							if (data.length >= _self.search.pageSize) {
								_self.status = 'more';
							} else {
								_self.status = 'noMore';
							}
						}
					},
					fail: function() {
						_self.status = 'more';
					}
				});
			},
			/** 同意申请
			 * @param {Object} item
			 */
			join_agree :function(item){
				uni.showModal({
					title: _self.i18n.agreeTitle,
					content: _self.i18n.agreeContent,
					success : function(result){
						if(result.confirm){
							_self.joinCheck({id : item.Id , ckStatus :'Agreed' });
						}
					}
				});
			},
			/** 拒绝申请
			 * @param {Object} item
			 */
			join_disagree : function(item){
				uni.showModal({
					title: _self.i18n.disagreeTitle,
					content: _self.i18n.disagreeContent,
					success : function(result){
						if(result.confirm){
							_self.joinCheck({id : item.Id , ckStatus :'Refused' });
						}
					}
				});
			},
			/** 删除申请消息
			 * @param {Object} item
			 */
			join_delete : function(item){
				uni.showModal({
					title: _self.i18n.deleteTitle,
					content: _self.i18n.deleteContent,
					success:function(result){
						if(result.confirm){
							_self.global.staffR.deleteJoinLog({
								id : item.Id,
								before : function(){
									uni.showLoading({
										title : _self.i18n.requestLoadingMessage
									});
								},
								success : function(data){
									uni.hideLoading();
									if(Boolean(data)){
										uni.showToast({
											title:_self.i18n.deleteSuccessMessage
										});
										_self.getJoinList(true);
									}else{
										uni.showToast({
											title:_self.i18n.deleteFailMessage,
											icon:'none'
										});
									}
								},
								fail : function(){
									uni.hideLoading();
									uni.showToast({
										title:_self.i18n.requestFailMessage,
										icon:'none'
									});
								}
							});
						}
					}
				});
			},
			// ================================================ 公共方法 ==============================================================
			joinCheck : function(data){
				_self.global.staffR.joinCheckInfo({
					data : data,
					before : function(){
						uni.showLoading({
							title : _self.i18n.requestLoadingMessage
						});
					},
					success : function(data){
						uni.hideLoading();
						if(Boolean(data)){
							uni.showToast({
								title:_self.i18n.requestSuccessMessage
							});
							_self.getJoinList(true);
						}else{
							uni.showToast({
								title:_self.i18n.requestFailMessage,
								icon:'none'
							});
						}
					},
					fail : function(){
						uni.hideLoading();
						uni.showToast({
							title:_self.i18n.requestFailMessage,
							icon:'none'
						});
					}
				});
			}
			// ========================================================================================================================
		}
	}
</script>

<style scoped lang="scss">
.box1 {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-top: 10rpx;
	padding-left: 10rpx;
	color: #8799a3;
	font-size: 28rpx;
	.item-left {
		width: 120rpx;
		text-align: justify;
		font-weight: bold;
	}
	.item-right{
		flex:1;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}
</style>
