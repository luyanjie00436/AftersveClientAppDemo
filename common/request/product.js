/**
 * 产品
 * @author 陆彦捷
 * @description  产品信息
 * @event {Function()} getList 获取产品列表
 * @event {Function()} getListPage 分页获取产品列表
 * @event {Function()} getInfo 根据Id获取产品信息
 * @event {Function()} AddInfo 添加产品信息
 * @event {Function()} UpdateInfo 更新产品信息
 * @event {Function()} deleteInfo 删除产品型 
 */
import web from '@/common/variable/website.js';		// 路径
import publicF from '@/common/function/publicfunc.js';	// 公共方法
import login from '@/common/storage/loginstorage.js';	// 登录
module.exports = {
	/** 获取产品列表
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论请求成功或失败都执行）
	 */
	getList : function(obj){
		// 获取参数
		let data;		// 请求数据
		let before ;	// 请求前执行方法
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
		// 请求信息
		let params = publicF.urlEncode(data);
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchProduct/Get?'+ params,
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
	/** 分页获取产品列表
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论请求成功或失败都执行）
	 */
	getListPage : function(obj){
		// 获取参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求信息
		let params = publicF.urlEncode(data);
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchProduct/Page?'+ params,
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
	/** 根据id获取产品信息
	 * @param {Object} obj
	 * @property {Number} id 产品id
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论请求成功或失败都执行）
	 */
	getInfo : function(obj){
		// 获取参数
		let id;			// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 回调函数
		if(Boolean(obj)){
			id = obj.id;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求信息
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchProduct/Info/' + id,
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
	/** 添加产品信息
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论请求成功或失败都执行）
	 */
	AddInfo : function(obj){
		// 获取参数
		let data;		// 请求数据
		let before ;	// 请求前执行方法
		let success ;	// 请求成功执行方法
		let fail ;		// 请求失败执行方法
		let complete ;	// 回调函数
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求信息
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchProduct/Add',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data : data,
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
	/** 更新产品信息
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论请求成功或失败都执行）
	 */
	UpdateInfo : function(obj){
		// 获取参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 回调函数
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		
		// 请求信息
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchProduct/Update',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
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
	/** 删除产品信息
	 * @param {Object} obj
	 * @property {Number} id 产品id
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论请求成功或失败都执行）
	 */
	deleteInfo : function(obj){
		// 获取参数
		let id ;		// 产品id
		let before;		// 请求前执行方法
		let success ;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 回调函数
		if(Boolean(obj)){
			id = obj.id;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		
		// 请求信息
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchProduct/Delete/'+ id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
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
	// ============================================================================================================================
}