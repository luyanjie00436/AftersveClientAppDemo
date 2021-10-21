/**
 * 品牌的请求方法
 * @event {Function(obj)} getList 获取品牌列表
 * @event {Function(obj)} getListPage 分页获取品牌类别
 * @event {Function(obj)} getTree 获取品牌树形图
 * @event {Function(obj)} getInfo 根据Id获取品牌值
 * @event {Function(obj)} addInfo 添加品牌
 * @event {Function(obj)} updateInfo 更新品牌
 * @event {Function(obj)} deleteInfo 删除品牌
 */

import web from '@/common/variable/website.js';				// 网络路径
import login from '@/common/storage/loginstorage.js';		// 登录
import publicF from '@/common/function/publicfunc.js';		// 公共方法
module.exports = {
	/** 获取品牌
	 * @param {Object} obj
	 *  @property {Function} before  请求前执行方法
	 *  @property {Function} success 请求成功执行方法
	 *  @property {Function} fail 请求失败执行方法
	 *  @property {Function} complete 回调函数
	 */
	getList : function(obj){
		// 参数
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 回调函数
		if(Boolean(obj)){
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
			url: web.website + '/api/SvcBrand/Get?',
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
	/** 分页获取品牌
	 * @param {Object} obj
	 *  @property {Object} data  请求数据
	 *  @property {Function} before  请求前执行方法
	 *  @property {Function} success 请求成功执行方法
	 *  @property {Function} fail 请求失败执行方法
	 *  @property {Function} complete 回调函数
	 */
	getListPage : function(obj){
		// 请求参数
		let data ;			// 请求数据
		let before;			// 请求前执行方法
		let success;		// 请求成功执行方法
		let fail;			// 请求失败执行方法
		let complete;		// 回调函数
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		let params = publicF.urlEncode(data);
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcBrand/Page?' + params,
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
	/** 获取品牌树形图
	 * @param {Object} obj
	 *  @property {Object} data  请求数据
	 *  @property {Function} before  请求前执行方法
	 *  @property {Function} success 请求成功执行方法
	 *  @property {Function} fail 请求失败执行方法
	 *  @property {Function} complete 回调函数
	 */
	getTree : function(obj){
		// 参数
		let data ;		// 请求数据
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
		// 请求方法
		let params = publicF.urlEncode(data);
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcBrand/Tree?' + params,
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
	/** 根据Id获取品牌值
	 * @param {Object} obj
	 *  @property {Number} id  品牌Id
	 *  @property {Function} before  请求前执行方法
	 *  @property {Function} success 请求成功执行方法
	 *  @property {Function} fail 请求失败执行方法
	 *  @property {Function} complete 回调函数
	 */
	getInfo : function(obj){
		// 参数
		let id ;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 回调函数
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
			url: web.website + '/api/SvcBrand/Info/' + id,
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
	/** 添加品牌
	 * @param {Object} obj
	 *  @property {Object} data  请求数据
	 *  @property {Function} before  请求前执行方法
	 *  @property {Function} success 请求成功执行方法
	 *  @property {Function} fail 请求失败执行方法
	 *  @property {Function} complete 回调函数
	 */
	addInfo : function(obj){
		let data ;			// 请求数据
		let before;			// 请求前执行方法
		let success;		// 请求成功执行方法
		let fail;			// 请求失败执行方法
		let complete;		// 回调函数
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
			url: web.website + '/api/SvcBrand/Add',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data : data,
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
	/** 更新品牌
	 * @param {Object} obj
	 *  @property {Object} data  请求数据
	 *  @property {Function} before  请求前执行方法
	 *  @property {Function} success 请求成功执行方法
	 *  @property {Function} fail 请求失败执行方法
	 *  @property {Function} complete 回调函数
	 */
	updateInfo : function(obj){
		// 参数
		let data ;
		let before;
		let success;
		let fail;
		let complete;
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
			url: web.website + '/api/SvcBrand/Update?',
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
	/** 删除品牌
	 * @param {Object} obj
	 *  @property {Int} id  品牌Id
	 *  @property {Function} before  请求前执行方法
	 *  @property {Function} success 请求成功执行方法
	 *  @property {Function} fail 请求失败执行方法
	 *  @property {Function} complete 回调函数
	 */
	deleteInfo : function(obj){
		let id ;			// 品牌Id
		let before;				// 请求前执行方法
		let success;			// 请求成功执行方法
		let fail;				// 请求失败执行方法
		let complete;			// 完成时执行方法
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
			url: web.website + '/api/SvcBrand/Delete/' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
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
	}
}