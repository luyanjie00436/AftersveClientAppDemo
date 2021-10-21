/**
 * 与设备有关请求
 * @property {Function} getListPage 分页请求设备列表信息
 * @property {Function} getCustList 分页获取客户设备信息
 * @property {Function} getInfo 根据设备Id,获取设备信息
 * @event {Function()} getInfoImgs 根据id获取设备的图片
 * @property {Function} getInfoByData 根据SN码，获取设备信息
 * @author 陆彦捷
 */
import web from '@/common/variable/website.js';		// 路径
import publicF from '@/common/function/publicfunc.js';	// 公共方法
import login from '@/common/storage/loginstorage.js';	// 登录
import organ from '@/common/storage/organstorage.js';	// 组织、商户、门店

module.exports = {
	/** 分页请求设备列表信息
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论请求成功或失败都执行）
	 */
	getListPage: function(obj) {
		// 获取参数
		let data ;		// 请求数据
		let before;		// 请求前执行方法
		let success ;	// 请求成功执行方法
		let fail ;		// 请求失败执行方法
		let complete;	// 回调函数
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		
		// 请求信息
		if(data.categoryId === 0 || !Boolean(data.categoryId)){
			delete data.categoryId;
		}
		if(data.vueId === 0 || !Boolean(data.vueId) ){
			delete data.vueId;
		}
		var params = publicF.urlEncode(data);
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcDevice/Page?'+ params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode === "0") {
						if(typeof(success) === "function" ){
							success(result.data.Data , result.data.ResultMsg);
						}
						return;
					}
				}
				if(typeof(fail) === "function" ){
					fail(result);
				}
			},
			fail: function(errors) {
				if(typeof(fail) === "function"){
					fail(errors);
				}
			},
			complete:function(){
				if(typeof(complete) === "function" ){
					complete();
				}
			}
		});
	},
	/**
	 * 分页获取客户设备信息
	 * @param {Object} obj 
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论请求成功或失败都执行）
	 */
	getCustList : function(obj){
		// 获取参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete ;	// 回调函数
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		
		// 请求信息
		if(data.categoryId === 0 || !Boolean(data.categoryId)){
			delete data.categoryId;
		}
		if(data.vueId === 0 || !Boolean(data.vueId) ){
			delete data.vueId;
		}
		var params = publicF.urlEncode(data);
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchCustom/GetDevices?'+ params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode === "0") {
						if(typeof(success) === "function" ){
							success(result.data.Data ,result.data.ResultMsg);
						}
						return;
					}
				}
				if(typeof(fail) === "function" ){
					fail(result);
				}
			},
			fail: function(errors) {
				if(typeof(fail) === "function"){
					fail(errors);
				}
			},
			complete:function(){
				if(typeof(complete) === "function" ){
					complete();
				}
			}
		});
	},
	/**
	 * 根据Id获取设备信息
	 * @property {Number} id 设备Id
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论请求成功或失败都执行）
	 */
	getInfo: function(obj) {
		// 参数
		let id ;		// 设备id
		let before ;	// 请求前执行方法
		let success ;	// 请求成功执行方法
		let fail ;		// 请求失败执行方法
		let complete ;	// 回调函数
		if(Boolean(obj)){
			id = obj.id;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcDevice/Info/' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode === 200) {
					if (result.data.ResultCode === "0") {
						if(typeof(success) === "function"){
							success(result.data.Data , result.data.ResultMsg);
						}
						return;
					}
				}
				if(typeof(fail) === "function"){
					fail(result);
				}
			},
			fail: function(errors) {
				if(typeof(fail) === "function"){
					fail();
				}
			},
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 根据图片id, 获取设备的图片
	 * @param {Object} obj
	 */
	getInfoImgs : function(obj){
		console.log("获取设备图片");
	},
	/** 根据Sn码(参考条件)，获取设备信息
	 * @param {Object} obj
	 * @property {Object} data 返回数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论请求成功或失败都执行）
	 */
	getInfoByData: function(obj) {
		// 参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 回调函数
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求
		if(typeof(before) === "function"){
			before();
		}
		var param = publicF.urlEncode(data);
		uni.request({
			url: web.website + '/api/SvcDevice/Device?' + param,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode === 200) {
					if (result.data.ResultCode === "0") {
						if(typeof(success) === "function"){
							success(result.data.Data);
						}
						return;
					}
				}
				if(typeof(fail) === "function"){
					fail(result);
				}
			},
			fail: function(errors) {
				if(typeof(fail) === "function"){
					fail(fail);
				}
			},
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	// =======================================================================================================================
}
