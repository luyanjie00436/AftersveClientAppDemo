<template>
	<view class="flex flex-direction padding">
		<view class="cu-modal " :class="ModalName" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-bold text-cut">{{ isEdit? '编辑' + i18n.category:'添加' + i18n.category }}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<uni-forms ref="form" :value="current" validate-trigger="bind" err-show-type="undertext">
					<uni-forms-item name="name">
						<view class="cu-form-group solid-bottom">
							<text class="title text-bold">名称</text>
							<input placeholder="请输入名称" :value="current.Name"
								@input="changName($event);binddata('name', $event.detail.value,'form')" />
						</view>
					</uni-forms-item>
					<uni-forms-item name="parentId">
						<view class="cu-form-group solid-bottom">
							<text class="title text-bold">上级分类</text>
							<luyj-data-picker :placeholder="'请选择' + i18n.category"  style="width: 75%;" :preload="true"
								:localdata="category_list" :popup-title="i18n.category"  @nodeclick="changeParentId" :value="current.parentId" >
							</luyj-data-picker>
						</view>
					</uni-forms-item>
					<uni-forms-item>
						<view class="cu-form-group solid-bottom" name="sort">
							<text class="title text-bold">排序</text>
							<uni-number-box min="0" @change="changeSort" :value="current.sort"></uni-number-box>
						</view>
					</uni-forms-item>
				</uni-forms>
				<view class="cu-bar bg-blue" @tap="save('form')">
					<view class="action  margin-0 flex-sub  solid-left">{{isEdit ? '编辑':'添加'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 添加/编辑分类弹出框
	 * @description  添加/编辑分类
	 */

	var _self;
	export default {
		name: "category-add",
		props: {
			// 当前组织id
			MchId: {
				type: Number,
				default: 0
			},
			// 请求Token
			Token: {
				type: String,
				default: ''
			},
			// 分类id
			categoryId :{
				type: Number,
				default: 0,
			},
			// 上级分类（用于添加子级）
			parentId : {
				type:Number,
				default: 0
			},
			// 是否编辑状态
			isEdit :{
				type:Boolean,
				default:false
			},
			// 是否含有上级
			hasParent : {
				type: Boolean,
				default:false
			}
		},
		data() {
			return {
				// 与样式有关参数
				ModalName: 'show', // 当前组织
				// 当前值
				current: {
					categoryId: 0,
					mchId: this.MchId, // 组织id
					parentId: 0, // 上级id
					name: "", // 名称
					sort: 1, // 排序
				},
				category_list: [], // 上级分类
				// 验证
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '请输入名称'
						}]
					},
				},
			};
		},
		computed:{
			i18n : function(){
				return this.$t('basic');
			}
		},
		onReady: function() {
			// 初始化表单验证
			this.$refs.form.setRules(this.rules);
		},
		created: function() {
			_self = this;
			this.init();		// 初始化
			this.categories_request(); // 获取分类请求
			if(this.isEdit){
				this.category_request();		// 获取当前分类
			}
		},
		methods: {
			// ================================================ 初始化 ===========================================
			/**
			 * 初始化方法
			 */
			init : function(){
				this.current.categoryId = this.isEdit ? this.categoryId : 0;	// 分类id
				this.current.parentId = this.hasParent ? this.parentId : 0;		// 上级id
			},
			// ================================================ 监听事件 ==========================================
			/** 隐藏弹出框
			 * @param {Object} e
			 */
			hideModal: function(e) {
				// 隐藏hide
				this.ModalName = '';
			},
			/** 修改名称
			 * @param {Object} e
			 */
			changName: function(e) {
				this.current.value = e.detail.value;
			},
			/** 修改上级分类
			 * @param {Object} item 当前的数值
			 */
			changeParentId: function(item) {
				this.current.parentId = item.value;
			},
			/** 修改排序
			 * @param {Number} value 值
			 */
			changeSort: function(value) {
				this.current.sort = value;
			},
			/** 添加/编辑 分类
			 * @param {Object} form
			 */
			save: function(form) {
				this.$refs[form]
					.submit()
					.then(res => {
						// 表单验证成功后执行方法
						if(_self.isEdit){
							_self.categoryUpdate_request();			// 修改分类
						}else{
							_self.categoryAdd_request();			// 添加分类
						}
					})
					.catch(errors => {
						console.log("验证不通过提示=>",errors);
					});
			},
			// ================================================ 请求方法 ==========================================
			/**
			 * 获取分类请求
			 */
			categories_request: function() {
				console.log("获取分类请求");
				// setTimeout(function(){
				// 	var templist= _self.global.changeobjF.change(_self.global.categories.list, "CategoryId", "Name", "Children");
				// 	_self.category_list = _self.global.filterobjF.filterbyvalue_list(templist , _self.current.categoryId);
				// 	var temp = {
				// 		"value": 0,
				// 		"text": "无",
				// 	};
				// 	_self.category_list.unshift(temp);
				// } , 3000);
			},
			/** 获取当前分类
			 * @param {Object} CategoryId
			 */
			category_request : function(CategoryId){
				uni.showLoading();
				setTimeout( function(){
					uni.hideLoading();
					_self.current.Name = 'PDA及配件';
					_self.current.ParentId = 0;
				} , 3000);
			},
			/**
			 * 添加分类请求
			 */
			categoryAdd_request: function() {
				uni.showLoading();
				uni.request({
					url : _self.website + '/api/MchCategory/Add',
					header: {
						Authorization: 'Bearer ' + _self.Token
					},
					method:'POST',
					data: _self.current,
					success:function(result){
						uni.hideLoading();
						if(result.statusCode == 200){
							if(result.data.ResultCode == "0"){
								uni.showToast({
									title:'添加成功'
								});
								return;
							}
							uni.showToast({
								title: result.data.ResultMsg,
								icon:'none'
							});
							return;
						}
						uni.showToast({
							title:'服务器连接失败！',
							icon:'none'
						});
					},
					fail:function(errors){
						uni.hideLoading();
						uni.showToast({
							title:'系统错误',
							icon:'none'
						});
					},
					complete:function(){
						_self.hideModal();
					}
				})
			},
			/**
			 * 编辑分类请求
			 */
			categoryUpdate_request: function() {
				uni.showLoading();
				uni.request({
					url : _self.website + '/api/MchCategory/Update',
					header: {
						Authorization: 'Bearer ' + _self.Token
					},
					method:'POST',
					data: _self.current,
					success:function(result){
						uni.hideLoading();
						if(result.statusCode == 200){
							if(result.data.ResultCode == "0"){
								uni.showToast({
									title:'更新成功'
								});
								return;
							}
							uni.showToast({
								title: result.data.ResultMsg,
								icon:'none'
							});
							return;
						}
						uni.showToast({
							title:'服务器连接失败！',
							icon:'none'
						});
					},
					fail:function(errors){
						uni.hideLoading();
						uni.showToast({
							title:'系统错误',
							icon:'none'
						});
					},
					complete:function(){
						_self.hideModal();
					}
				})
			}
		}
	}
</script>

<style>

</style>
