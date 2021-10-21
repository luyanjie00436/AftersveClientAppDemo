<template>
	<view class="flex flex-direction bg-white" style="height: 100vh;">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-cyan" :isBack="preview">
			<block slot="content">{{ i18n_product.productSummary }}</block>
		</cu-custom>
		<!-- 宫格链接 -->
		<luyj-grid-link :list="tabber_list"></luyj-grid-link>
		<!-- 返回首页 -->
		<navigator url="/pages/index/index" class="flex flex-direction">
			<button class="bg-cyan cu-btn padding round margin">首页</button>
		</navigator>
	</view>
</template>

<script>
	/**
	 * 产品目录
	 * @陆彦捷
	 * @description 链接分类、型号、设备按钮
	 */
	export default {
		data() {
			return {
				// 布局样式
				preview: this.global.publicF.hasBack(), // 是否返回上一页
				tabber_list:this.global.grids.product_list, //  列表显示项
			}
		},
		computed:{
			i18n : function(){
				return this.$t('basic');
			},
			i18n_product : function(){
				return this.$t('product');
			}
		},
		onLoad: function(options) {
			this.getParams(options);
		},
		methods: {
			//=========================================== 初始化方法 =======================================
			/** 初始化参数
			 * @param {Object} options 初始化参数
			 */
			getParams: function(options) {

			},
			// =============================================================================================
		}
	}
</script>

<style>
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>
