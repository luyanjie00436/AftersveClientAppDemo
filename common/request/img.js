/**
 * 图片方法
 * @author 陆彦捷
 * @description  根据图片地址，上传图片
 * @property {Function} imgUpload 根据图片地址上传图片 
 * @property {Function} imgListUpload 批量上传本地图片
 * @event {Function()} imgListIncreUpload 批量上传本地图片（与原图片地址进行对比）
 */

import web from '@/common/variable/website.js'; // 请求服务器地址
import login from '@/common/storage/loginstorage.js'; // 登录

module.exports = {
	/** 根据图片地址上传图片
	 * @param {Object} obj 
	 * @property {String} imgUrl 本地路径
	 * @property  {String} LoadingText 加载时提示信息（默认提示信息"图片上传中……"）
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 上传成功后执行方法（默认为null）
	 * @property {Function} fail 上传失败后执行方法(默认为null)
	 * @property {Function} complete 请求回调函数（不论请求成功或失败都执行，默认为null）
	 * @param {Boolean}  showTitle 是否展示loading标题，默认为true
	 */
	imgUpload: function(obj , showTitle = true) {
		//参数
		let imgUrl;
		let LoadingText = '图片上传中……'
		let before;		// 操作前方法
		let success;
		let fail;
		let complete;
		if (Boolean(obj)) {
			imgUrl = obj.imgUrl;
			LoadingText = Boolean(obj.LoadingText) ? obj.LoadingText : LoadingText;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求
		if(showTitle){
			uni.showLoading({
				title: LoadingText
			});
		}
		if(typeof(before) == "function"){
			before();
		}
		uni.uploadFile({
			url: web.website + '/api/Share/Upload',
			filePath: imgUrl,
			name: 'files',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			success: function(result) {
				if(showTitle){
					uni.hideLoading();
				}
				if (result.statusCode == 200) {
					var data = JSON.parse(result.data);
					if (typeof(success) == "function") {
						success(data.Data , result.data.ResultMsg );
					}
					return;
				}
				if (typeof(fail) === "function") {
					fail(result , result.data.ResultMsg);
				}
			},
			fail: function(errors) {
				if(showTitle){
					uni.hideLoading();
				}
				if (typeof(fail) === "function") {
					fail(errors , null);
				}
			},
			complete: function() {
				if (typeof(complete) === "function") {
					complete();
				}
			}
		});
	},
	/** 批量上传图片(使用递归图片上传方法)
	 * @param {Object} obj
	 * @property {Number} index 索引
	 * @property {Array} imgs 图片组
	 * @property {Number} size 图片组长度（默认imgs的长度）
	 * @property {Array} imgsResult 图片组的返回值（默认[]）
	 * @property {Array} before 请求前执行方法
	 * @property {Function} success 成功后执行方法（以最后的index为准）
	 * @property {Function} fail 失败后的执行方法（以最后的index为准）
	 * @property {Function} complete 执行完成后的回调函数（以最后的index为准）
	 * @param {Boolean} showTitle 是否展示title标题，默认为true
	 */
	imgListUpload: function(obj , showTitle = true) {
		var _self = this;
		// 参数
		let index = 0;			// 索引
		let imgs = [];			// 图片组
		let size = 0;			// 图片组的大小
		let imgsResult = [];	// 图片组的返回值
		let before;			// 请求前执行方法
		let success;		// 成功后执行方法（以最后的index为准）
		let fail;		// 失败后执行方法（以最后的index为准）
		let complete;	// 完成后方法（不论成功、失败都执行）
		if (Boolean(obj)) {
			index = Boolean(obj.index) ? obj.index : 0;
			imgs = Boolean(obj.imgs) ? obj.imgs : imgs;
			size = Boolean(obj.size) ? obj.size : imgs.length;
			imgsResult = Boolean(obj.imgsResult) ? obj.imgsResult : imgsResult;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 上传图片
		if(typeof(before) == "function" && index == 0){
			before();
		}
		if (index < size) {
			this.imgUpload({
				imgUrl: imgs[index],
				LoadingText: "上传第" + (index + 1) + "张图片",
				success: function(data , message) {
					imgsResult.push(data);
					if(index === (size - 1)){
						if(typeof(success) == "function"){
							success(imgsResult , message);
						}
					}
				},
				fail: function(errors) {
					imgsResult.push(imgs[index]);
					if(index === (size - 1)){
						if(typeof(fail) == "function"){
							fail(imgsResult , errors);
						}
					}
				},
				complete: function() {
					// 回调函数
					if (index === (size - 1)) {
						// 图片上传完成
						if(typeof(complete) === "function"){
							complete();
						}
					} else {
						// 未完成图片上传
						_self.imgListUpload({
							index : index + 1,
							imgs,
							size ,
							imgsResult,
							success,
							fail,
							complete
						});
					}
				}
			} , showTitle);
		}
	},
	/** 增量式批量上传（使用递归调用方法）
	 * @param {Object} obj
	 * @property {Number} index 索引
	 * @property {Array} imgs 图片组
	 * @property {Number} size 图片组长度（默认imgs的长度）
	 * @property {Array} imgsResult 图片组的返回值（默认[]）
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 成功后执行方法（以最后的index为准）
	 * @property {Function} fail 失败后的执行方法（以最后的index为准）
	 * @property {Function} complete 执行完成后的回调函数（以最后的index为准）
	 * @param {Boolean} showTitle 是否显示loading标题，默认为true
	 */
	imgListIncreUpload: function(obj ,showTitle = true) {
		var _self = this;
		// 参数
		let index = 0;			// 索引
		let beforeImgs =[];		// 上传之前的图片数组
		let imgs = [];			// 图片组
		let size = 0;			// 图片组的大小
		let imgsResult = [];	// 图片组的返回值
		let imgsPaths = [];		// 图片的返回路径
		let before;				// 请求前只执行方法
		let itemsuccess;			// 每次请求成功执行方法
		let itemfail;			// 每个请求失败执行方法
		let success;		// 成功后执行方法（以最后的index为准）
		let fail;		// 失败后执行方法（以最后的index为准）
		let complete;	// 完成后方法（不论成功、失败都执行）
		if (Boolean(obj)) {
			index = Boolean(obj.index) ? obj.index : 0;
			beforeImgs = Boolean(obj.beforeImgs) ? obj.beforeImgs : beforeImgs;
			imgs = Boolean(obj.imgs) ? obj.imgs : imgs;
			size = Boolean(obj.size) ? obj.size : imgs.length;
			imgsResult = Boolean(obj.imgsResult) ? obj.imgsResult : imgsResult;
			imgsPaths = Boolean(obj.imgsPaths) ? obj.imgsPaths:imgsPaths;
			before = obj.before;
			itemsuccess = obj.itemsuccess;
			itemfail = obj.itemfail;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 上传图片
		if(typeof(before) == "function" && index == 0){
			before();
		}
		if (index < size) {
			let temp = beforeImgs.find(function(item){
				return item.file_url == imgs[index];
				return true;
			});
			if(!Boolean(temp)){
				// 上传图片
				this.imgUpload({
					imgUrl: imgs[index],
					LoadingText: "上传第" + (index + 1) + "张图片",
					success: function(data , message) {
						imgsResult.push(data);
						imgsPaths.push(data ? data.file_url : null);
						if(typeof(itemsuccess) == "function"){
							itemsuccess(data , index ,message);
						}						
						if(index === (size - 1)){
							if(typeof(success) === "function"){
								success(imgsResult , imgsPaths , message);
							}
						}
					},
					fail: function(errors) {
						imgsResult.push(imgs[index]);
						imgsPaths.push(imgs[index]);
						if(typeof(itemfail) == "function"){
							itemfail(null , index ,errors);
						}
						if(index === (size - 1)){
							if(typeof(fail) === "function"){
								fail(imgsResult , imgsPaths , errors);
							}
						}
					},
					complete: function() {
						// 回调函数
						if (index === (size - 1)) {
							// 图片上传完成
							if(typeof(complete) === "function"){
								complete();
							}
						} else {
							// 未完成图片上传
							_self.imgListIncreUpload({
								index : index + 1,
								imgs,
								size ,
								imgsResult,
								imgsPaths,
								before,
								itemsuccess,
								itemfail,
								success,
								fail,
								complete
							},showTitle);
						}
					}
				} , showTitle);
			}else{
				imgsResult.push(temp);
				imgsPaths.push(temp.file_url);
				if(typeof(itemsuccess) == "function"){
					itemsuccess(temp , index ,"成功");
				}	
				if (index === (size - 1)) {
					// 成功后执行方法
					if(typeof(success) === "function"){
						success(imgsResult ,imgsPaths ,"成功");
					}
					// 图片上传完成
					if(typeof(complete) === "function"){
						complete();
					}
				} else {
					// 未完成图片上传
					_self.imgListIncreUpload({
						index : index + 1,
						beforeImgs,
						imgs,
						size ,
						imgsResult,
						imgsPaths,
						before,
						itemsuccess,
						itemfail,
						success,
						fail,
						complete
					} , showTitle);
				}
			}
		}
	},
	// ================================================================================================================================
}
