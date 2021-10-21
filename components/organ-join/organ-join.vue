<template>
	<view>
		<uni-list>
			<!-- 标题 -->
			<view class="text-xl padding-lr padding-top text-bold">
				<text class="text-cyan">加入</text>{{ i18n_merchant.nameAll }}
			</view>
			<!-- 标题 -->
			<luyj-search-bar radius="80" cancelColor="#999999"
				:placeholder="i18n_merchant.nameAllInputplaceholder" v-model="searchKey" @confirm="searchClick"
				@cancel="searchCancel"></luyj-search-bar>
			<uni-list-item v-for="item in organs" :key="item.MchId">
				<template slot="body" style="width: 85%;">
					<view class=" margin-bottom-sm cf">
						<view class="text-bold text-cut text-lg fl" style="width: 80%;">{{ item.Name }}({{item.MchNo}})
						</view>
						<view class="cu-tag margin-left-sm bg-cyan light">
							{{item.TopMchId != item.MchId ? i18n_merchant.nameBranch : i18n_merchant.nameTop}}
						</view>
					</view>
					<view v-if="false" class=" cf ">
						<view v-if="Boolean(item.Area1Name)" class="fl text-sm padding-top-xs">
							{{ item.Area1Name }} {{(item.Area1Name == null|| item.Area1Name == '') ? '' :'-'}}
							{{ item.Area2Name }} {{(item.Area2Name == null|| item.Area2Name == '') ? '' :'-'}}
							{{ item.Area3Name }}
						</view>
						<view class="fl text-sm padding-top-xs">
							无区域信息
						</view>
						<!-- 行业、是否分店 -->
						<view v-if="Boolean(item.IndustryName)" class="text-sm fr ">
							<view class="cu-tag">{{ item.IndustryName }}</view>
						</view>
					</view>
					<view class="text-sm text-cut text-grey box">
						<view class="item-left">联系方式</view>
						<view class="item-right">{{Boolean(item.LinkTel) ? item.LinkTel :'' }}</view>
					</view>
					<view class="text-sm text-cut text-grey box">
						<view class="item-left">地址</view>
						<view class="item-right text-cut">{{ Boolean(item.Address) ? item.Address :'' }}</view>
					</view>
				</template>
				<template slot="footer" style="width: 15%;">
					<view class="flex  padding-xl justify-center" @click="joinOrgan(item.MchId , item.Name)">
						<view class="cu-tag round bg-cyan ">申请加入</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<!-- 申请加入组织对话框 -->
		<view class="cu-modal" :class="ModalName == 'join'? 'show' :''" @tap="hideModal">
			<view  class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-bold text-cut">{{currentName}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action text-bold">
						申请理由
					</view>
				</view>
				<view  class="cu-form-group">
					<input maxlength="-1"  v-model="currentMsg"
					placeholder="请输入申请理由" />
				</view>
				<view class="cu-bar bg-cyan" @tap="join_request(currentMchId ,currentMsg)">
					<view class="action  margin-0 flex-sub  solid-left">提交申请</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 加入组织/门店 -列表
	 * @author 陆彦捷
	 * @description  通过搜索组织/门店的名称代码加入
	 */
	var _self;
	export default {
		name: "organ-join",
		data() {
			return {
				searchKey: '', // 搜索值
				// 测试组织名称
				organs: [],
				ModalName: null, // 显示模态框
				currentMchId: 0, // 当前组织Id
				currentName: '', // 当前组织名称
				currentMsg: '', // 当前申请理由
			};
		},
		computed: {
			i18n: function() {
				return this.$t("basic");
			},
			i18n_merchant: function() {
				return this.$t("merchant");
			}
		},
		created: function() {
			_self = this;
			// 获取当前用户Id及其请求消息
			this.Token = this.global.login.getToken(); // 获取Token
			this.UserId = this.global.login.getUserId(); // 获取UserId
		},
		methods: {
			// ======================================= 监听事件 ========================================
			/** 搜索组织方法
			 * @param {Object} e 
			 */
			searchClick(e) {
				this.search_request();
			},
			/** 点击搜索框边上的取消按钮时操作
			 * @param {Object} e
			 */
			searchCancel(e) {
				this.searchKey = '';
			},
			/** 点击弹出申请组织对话框
			 * @param {int} MchId 组织Id
			 * @param {string} Name 组织名称
			 */
			joinOrgan(MchId, Name) {
				this.currentMchId = MchId;
				this.currentName = Name;
				this.ModalName = 'join';
			},
			/** 隐藏对话框
			 * @param {Object} e
			 */
			hideModal(e) {
				this.ModalName = null;
				this.currentMchId = 0;
				this.currentName = '';
				this.currentMsg = '';
			},
			/**
			 * 搜索组织
			 */
			search_request() {
				this.global.merchantR.getListPage({
					data: {
						searchKey: _self.searchKey
					},
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage,
						})
					},
					success: function(data) {
						uni.hideLoading();
						_self.organs = data;
					},
					fail: function(erros) {
						uni.hideLoading();
						uni.showToast({
							title: _self.i18n.requestFailMessage
						});
					}
				})
			},
			/** 申请加入组织
			 * @param {int} MchId 组织Id
			 * @param {string} Msg 申请理由
			 */
			join_request(MchId, Msg) {
				this.global.merchantR.applyInfo({
					data: {
						mchId: MchId,
						msg: Msg
					},
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage,
						})
					},
					success: function(data) {
						uni.hideLoading();
						_self.hideModal(); // 关闭申请理由模态框
						uni.showModal({
							title:'成功',
							showCancel:false,
							content:'提交申请成功！请内心等待管理员同意。'
						});
					},
					fail: function(errors) {
						uni.hideLoading();
						_self.hideModal(); // 关闭申请理由模态框
						// 体系是信息
						var message = '';
						if(Boolean(errors.data)){
							message = errors.data.ResultMsg;
						}else{
							message = _self.i18n.requestFailMessage
						}
						uni.showToast({
							title: message,
							icon:'none'
						});
					}					
				});
			}
		}
	}
</script>

<style scoped lang="scss">
.box {
	display: flex;
	flex-direction: row;
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
