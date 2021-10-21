<template>
	<view class="flex flex-direction">
		<!-- 标题 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_order.serviceOrderSuspend }}</block>
		</cu-custom>
		<uni-forms ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
			<!-- 结束工单原因 -->
			<uni-forms-item name="Msg">
				<view class="cu-form-group solid-bottom" name="Msg">
					<view class="title text-bold">
						<text>{{ i18n_order.service.suspendMsg }}</text>
						<text class="text-red">*</text>
					</view>
					<textarea v-model="current.Msg" :placeholder="i18n_order.service.suspendMsgPlaceholder"
						></textarea>
				</view>
			</uni-forms-item>
			<!-- 结束工单原因 -->
		</uni-forms>
		
		<bottom-btns :btns="btn_list" @click="clickBottom"></bottom-btns>
	</view>
</template>

<script>
	/**
	 * 受理工单-结束工单
	 * @author 陆彦捷
	 */
	var _self;
	export default {
		data() {
			return {
				// 与样式有关参数
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				// 与系统有关参数
				OrderId: 0, // 工单Id
				current: {
					OrderId: 0, // 
					Msg: '', // 描述，工单的处理结果
				},
				imgList: [], // 暂存图片
				rules: {
					Msg: {
						rules: [{
							required: true,
							errorMessage: '请输入结束原因'
						}]
					},
				},
				btn_list: this.global.params.btn_list_commit
			}
		},
		computed: {
			i18n: function() {
				return this.$t('basic');
			},
			i18n_order: function() {
				return this.$t('order')
			}
		},
		onReady: function() {
			// 初始化表单验证
			this.$refs.form.setRules(this.rules);
		},
		onLoad: function(options) {
			_self = this;
			this.getParams(options);
		},
		methods: {
			// =============================================== 初始化方法 =================================================================
			/** 初始化工单
			 * @param {Object} options 对象参数
			 */
			getParams: function(options) {
				this.OrderId = Boolean(options.OrderId) ? parseInt(options.OrderId) : 0;
				// 如果不存在id,返回上一页
				if (!Boolean(this.OrderId) && this.preview) {
					uni.navigateBack();
				}
				this.current.OrderId = this.OrderId;
			},
			// =============================================== 监听事件 ===================================================================
			/** 修改相关图片组
			 * @param {Object} e
			 */
			imgChange : function(e){
				this.imgList = e;
			},
			/** 点击底部按钮
			 * @param {String} name
			 */
			clickBottom  : function(name){
				switch(name){
					case 'submit' :
						// 验收并提交工单申请
						this.$refs['form']
							.submit()
							.then(result => {
								_self.submit();
							})
							.catch(errors => {})
						break;
					default : break;
				}
			},
			/** 提交验收申请工单
			 * @param {Object} e
			 */
			submit: function(e) {
				uni.showModal({
					title:  _self.i18n.modal_submit_title,
					content: _self.i18n.modal_submit_content,
					success: function(result) {
						_self.suspend();
					}
				});
			},
			
			/**
			 * 结束工单
			 */
			suspend: function() {
				_self.global.repairOrderR.finishInfo({
					data: _self.current,
					before: function() {
						uni.showLoading({
							title: _self.i18n.requestLoadingMessage
						});
					},
					success: function(datas , message) {
						uni.hideLoading();
						if (Boolean(datas)) {
							uni.navigateBack();
							uni.showToast({
								title: _self.i18n.requestSuccessMessage
							});
							return;
						}
						// 提交失败提示
						uni.showToast({
							title: message,
							icon: 'none'
						});
					},
					fail: function(errors) {
						// uni.hideLoading();
					}
				});
			}
			// ===========================================================================================================================
		}
	}
</script>

<style>

</style>
