<template>
	<view>
		<teleport v-if="!readonly">
			<!-- 图片 -->
			<luyj-choose-img :titleText="i18n_order.repair.imgs" title-class="bg-cyan light" :imgList="imgPaths"
				@imgChange="changeImgs"></luyj-choose-img>
			<!-- 图片 -->
			<!-- 视频 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">
				<text>{{ i18n_order.repair.videos }}</text>
			</view>
			<view class="padding-lr-xl padding-tb">
				<uni-file-picker ref="videos" :auto-upload="false" file-mediatype="video" @select="selectVideos" @delete="removeVideo">
					<button class="cu-btn bg-cyan">{{ i18n.btn_videoSelect }}</button>
				</uni-file-picker>
			</view>	
			<!-- 视频 -->
			<!-- 请上传图片、视频、文件 -->
			<!-- #ifdef H5 || MP-WEIXIN -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">
				<text>{{ i18n_order.repair.files }}</text>
			</view>
			<view class="padding-lr-xl padding-tb">
				<uni-file-picker ref="files" :auto-upload="false" file-mediatype="all" @select="select" @delete="remove">
					<button class="cu-btn bg-cyan">{{ i18n.btn_fileSelect }}</button>
				</uni-file-picker>
			</view>
			<!-- #endif -->
		</teleport>
		<teleport v-else>
			<!-- 图片与视频 -->
			<luyj-choose-img :edit="false" :titleText="i18n_order.repair.imgs" title-class="bg-cyan light" :imgList="imgPaths"
				@imgChange="changeImgs"></luyj-choose-img>
			<!-- 视频 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">
				<text>{{ i18n_order.repair.videos }}</text>
			</view>
			<view class="padding-lr-xl padding-tb flex flex-direction">
				<view v-for="(item , index) in videoFiles" :key="index" class="down_box margin-bottom-xs" @click="downFile(item)">
					<view class="item-left text-cut text-blue" style="text-decoration: underline;">{{ item.file_name }}</view>
				</view>
			</view>	
			<!-- 视频 -->
			<!-- 文件 -->
			<view class=" bg-cyan light text-bold text-xl padding-sm padding-left-xl padding-right ">
				<text>{{ i18n_order.repair.files }}</text>
			</view>
			<view class="padding-lr-xl padding-tb flex flex-direction">
				<view v-for="(item , index) in files" :key="index" class="down_box margin-bottom-xs" @click="downFile(item)">
					<view class="item-left text-cut text-blue" style="text-decoration: underline;">{{ item.file_name }}</view>
				</view>
			</view>	
		</teleport>
	</view>
</template>

<script>
	/**
	 * 图片、视频和文件展示
	 * @author 陆彦捷
	 * @description 图片、视频和文件的上传、展示、下载
	 *@event {Function()} loading 是否加载中
	 *@event {Function()} change 修改图片并上传方法
	 */
	export default {
		name:"myfiles",
		props:{
			// 是否只读
			readonly : {
				type: Boolean,
				default: false
			},
			// 图片
			imgList:{
				type:Array,
				default: () => {
					return []
				}
			},
			// 视频列表
			videoList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			// 文件列表
			fileList : {
				type:Array,
				default:()=>{
					return []
				}
			}
		},
		data() {
			return {
				imgLoading : false ,	// 图片否上传中
				imgPaths :[],		// 图片
				imgFiles :this.imgList,		// 图片组
				
				videoLoading: false,	// 视频是否上传中
				videoPaths:[],			// 视频路径
				videoFiles:this.videoList,			// 视频组
				
				fileLoading : false ,	// 文件是否上传中
				filePaths :[],		// 文件的路径
				files :this.fileList,			// 文件
			};
		},
		computed:{
			// 国际化
			i18n: function() {
				return this.$t('basic');
			},
			i18n_order: function() {
				return this.$t("order");
			},
			// 是否加载中
			isLoading: function(){
				return this.imgLoading || this.fileLoading || this.videoLoading;
			}
		},
		watch:{
			imgList:function(val){
				this.imgFiles = val;
				this.imgPaths = this.getPaths(val);
			},
			videoList: function(val){
				this.videoFiles = val;
				this.videoPaths = this.getPaths(val);
			},
			fileList: function(val){
				this.files = val;
				this.filePaths = this.getPaths(val);
			},
			// 是否加载中
			isLoading : function(val ,oldVal){
				if(val != oldVal){
					this.$emit("loading" , val)
				}
			},
			// 图片、视频修改
			imgFiles : function(val){
				this.outputfiles();
			},
			// 文件修改
			files : function(val){
				this.outputfiles();
			}
		},
		created:function(){
			this.imgPaths = this.getPaths(this.imgFiles);
			this.videoFiles = this.getPaths(this.videoFiles);
			this.filePaths = this.getPaths(this.filePaths);
		},
		methods:{
			// ========================================================================================================================
			/** 修改相关图片
			 * @param {Array} imgs
			 */
			changeImgs: function(imgs) {
				let that = this;
				// 上传图片
				this.global.imgR.imgListIncreUpload({
					imgs : imgs,			// 要上传的文件
					beforeImgs:  that.imgFiles,		// 当前文件路径
					before : function(){
						that.imgLoading = true;
					},
					success : function(files , paths){
						that.imgLoading = false;
						that.imgFiles = files;
						that.imgPaths = paths;
					},
					fail : function(result){
						that.imgLoading = false;
						that.imgPaths = imgs;
					},
				} , false);
				
			},
			/** 选择视频
			 * @param {Object} e
			 */
			selectVideos : function(e){
				let that = this;
				let picker_videos = this.$refs['videos'].files;
				let init_index = that.videoFiles.length;		// 用于修改路径的起始值
				uni.uploadFile();
				this.global.imgR.imgListIncreUpload({
					imgs : e.tempFilePaths,			// 要上传的文件
					beforeImgs:  that.videoFiles,		// 当前文件路径
					before : function(){
						that.videoLoading = true;
					},
					itemsuccess : function(file , index , message){
						if(file){
							that.videoFiles.push(file);
							that.videoPaths.push(file.file_url);
							picker_videos[init_index + index].progress = 100;
							picker_videos[init_index + index].status = 'success';
							picker_videos[init_index + index].url = file.file_url;
						}else{
							picker_videos[init_index + index].status = 'error';
						}
					},
					itemfail : function(file , index , errors){
						picker_videos[init_index + index].status = 'error';
					},
					success : function(files , paths){
						that.videoLoading = false;
					},
					fail : function(files, paths , errors){
						that.videoLoading = false;
					}					
				} , false);
			},
			/** 移除视频
			 * @param {Object} e
			 */
			removeVideo : function(e){
				// 移除视频路径
				this.videoPaths = this.videoPaths.filter(url=>{
					return url != e.tempFilePath;
				});
				// 移除视频对象
				this.videoFiles = this.videoFiles.filter(item=>{
					return item.file_url != e.tempFilePath
				});
			},
			/** 选择文件
			 * @param {Object} e
			 */
			select : function(e){
				let that = this;
				let picker_files = this.$refs['files'].files;
				let init_index = that.files.length;		// 用于修改路径的起始值
				uni.uploadFile();
				this.global.imgR.imgListIncreUpload({
					imgs : e.tempFilePaths,			// 要上传的文件
					beforeImgs:  that.files,		// 当前文件路径
					before : function(){
						that.fileLoading = true;
					},
					itemsuccess : function(file , index , message){
						if(file){
							that.files.push(file);
							that.filePaths.push(file.file_url);
							picker_files[init_index + index].progress = 100;
							picker_files[init_index + index].status = 'success';
							picker_files[init_index + index].url = file.file_url;
						}else{
							picker_files[init_index + index].status = 'error';
						}
					},
					itemfail : function(file , index , errors){
						picker_files[init_index + index].status = 'error';
					},
					success : function(files , paths){
						that.fileLoading = false;
					},
					fail : function(files, paths , errors){
						that.fileLoading = false;
					}					
				} , false);
			},
			/** 移除文件
			 * @param {Object} e
			 */
			remove : function(e){
				// 移除文件路径
				this.filePaths = this.filePaths.filter(url=>{
					return url != e.tempFilePath;
				});
				// 移除文件对象
				this.files = this.files.filter(item=>{
					return item.file_url != e.tempFilePath
				});
			},
			/**
			 * 输出所有的文件对象
			 */
			outputfiles : function(){
				let allFiles = (this.imgFiles? this.imgFiles :[]).concat((this.files? this.files:[]) , (this.videoFiles ? this.videoFiles :[]));
				let allFile_ids = this.getFileIds(allFiles);
				this.$emit('change' , allFiles , allFile_ids);
			},
			// ============================================ 公共方法 ======================================================================
			/** 获取文件ids
			 * @param {Array} files
			 */
			getFileIds : function(files){
				return files.map((item , index) =>{
					return item.file_id;
				});
			},
			/** 获取文件路径
			 * @param {Array} files
			 */
			getPaths : function(files){
				return files.map((item , index) =>{
					return item.file_url;
				});
			},
			/** 下载当前文件
			 * @param {Object} item
			 */
			downFile : function(item){
				console.log("下载当前文件" ,item.file_url);
				uni.downloadFile({
					url : item.file_url,
					success:function(res){
						if(res.statusCode === 200){
							console.log('下载成功！');
						}
					}
				});
			},
			downtest : function(){
				uni.downloadFile({
					url : "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/efbcdc79-10ac-4e03-8751-1dff98c628f1.txt",
					success:function(res){
						if(res.statusCode === 200){
							console.log('下载成功！');
						}
					},
					fail:function(){
						console.log("提交失败！");
					}
				});
			},
		// =============================================================================================================================
		},
	}
</script>

<style scoped lang="scss">
.down_box{
	display: flex;
	flex-direction: row;
	font-size: 28rpx;
	.item-left {
		flex:1;
		font-size: 28rpx;
	}
}
</style>
