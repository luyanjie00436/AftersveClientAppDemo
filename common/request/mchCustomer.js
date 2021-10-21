/**
 * 客户信息
 * @event {Function(obj)} getShortList 客户信息列表（只包含主要内容）
 * @event {Function(obj)} getList 获取客户列表
 * @event {Function(obj)} getInfo 根据id获取客户信息
 * @event {Function(obj)} AddInfo 添加客户信息
 * @event {Function(obj)} UpdateInfo 更新客户信息
 */
import web from '@/common/variable/website.js';		// 网络位置
import login from '@/common/storage/loginstorage.js';	// 登录
import publicF from '@/common/function/publicfunc.js';	// 宫格方法
module.exports = {
	/** 客户信息列表（只包含主要内容）
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论成功、失败都执行）
	 */
	getShortList : function(obj){
		// 参数
		let data ;			// 当前门店id
		var before ;		// 请求方法
		var success;		// 请求成功执行方法
		var fail ;			// 请求失败执行方法
		var complete;		// 回调函数（无论成功/失败都执行）
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		var params = publicF.urlEncode(data);
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchCustom/ShortList?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
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
					fail(errors);
				}
			},
			complete: function() {
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 获取客户列表
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论成功、失败都执行）
	 */
	getList : function(obj){
		// 参数
		let data ;			// 当前门店id
		var before ;		// 请求方法
		var success;		// 请求成功执行方法
		var fail ;			// 请求失败执行方法
		var complete;		// 回调函数（无论成功/失败都执行）
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		var params = publicF.urlEncode(data);
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchCustom/Page?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
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
					fail(errors);
				}
			},
			complete: function() {
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 根据Id获取客户信息
	 * @param {Object} obj
	 * @property {Number} id 客户Id
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论成功、失败都执行）
	 */
	getInfo : function(obj){
		// 参数
		let id ;			// 当前门店id
		var before ;		// 请求方法
		var success;		// 请求成功执行方法
		var fail ;			// 请求失败执行方法
		var complete;		// 回调函数（无论成功/失败都执行）
		if(Boolean(obj)){
			id = obj.id;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchCustom/Info/' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
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
					fail(errors);
				}
			},
			complete: function() {
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 添加客户信息
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论成功、失败都执行）
	 */
	AddInfo : function(obj){
		// 参数
		let data ;			// 请求数据
		let before ;		// 请求方法
		let success;		// 请求成功执行方法
		let fail ;			// 请求失败执行方法
		let complete;		// 回调函数（无论成功/失败都执行）
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchCustom/Add',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
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
					fail(errors);
				}
			},
			complete: function() {
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 更新客户信息
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论成功、失败都执行）
	 */
	UpdateInfo : function(obj){
		// 参数
		let data ;			// 请求数据
		let before ;		// 请求方法
		let success;		// 请求成功执行方法
		let fail ;			// 请求失败执行方法
		let complete;		// 回调函数（无论成功/失败都执行）
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchCustom/Update',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data : data,
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
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
					fail(errors);
				}
			},
			complete: function() {
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	// ===============================================================================================================================
}