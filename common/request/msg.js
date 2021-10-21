/**
 * 通知请求方法
 * @property {Function} getCount 获取用户未读通知条数
 * @property {Function} getTypeList 请求用户的通知列表 
 * @property {Function} messageList 根据消息类型获取消息 
 * @property {Function} updateReadInfo 将消息设置为已读 
 * 
 * 
 */
import publicF from '@/common/function/publicfunc.js';		// 公共的方法
import web from '@/common/variable/website.js';				// 服务器地址
import login from '@/common/storage/loginstorage.js';		// 登录
import user from '@/common/storage/userstorage.js';			// 用户
module.exports = {
	/** 获取用户的未读消息条数
	 * @param {Object} obj
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功执行方法
	 * @property {Function} fail 请求失败执行方法
	 * @property {Function} complete 回调函数
	 */
	getCount: function(obj){
		// 参数
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 回调函数
		if(Boolean(obj)){
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
			url: web.website + '/api/SvcMsg/GetMsgCount?userId=' + user.getUserId() + '&isRead=false',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if(typeof(success) === "function" ){
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
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
			complete:function(){
				if(typeof(complete) === "function" ){
					complete();
				}
			}
		});
	},
	/** 请求用户的通知列表
	 * @param {Object} obj
	 * @property {Object} data  请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功执行方法
	 * @property {Function} fail 请求失败执行方法
	 * @property {Function} complete 回调函数
	 */
	getTypeList : function(obj){
		// 参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 回调函数（无论成功、失败都执行）
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
		var param = publicF.urlEncode(data);
		uni.request({
			url: web.website + '/api/SvcMsgType/List?' + param,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success:function(result){
				if (result.statusCode == 200) {
					if(typeof(success) === "function"){
						success(result.data.Data ,result.data.ResultMsg);
					}
					return;
				}
				if(typeof(fail) === "function"){
					fail(result);
				}
			},
			fail:function(errors){
				if(typeof(fail) === "function"){
					fail(errors);
				}
			},
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		})
	},
	/**根据消息类型获取消息
	 * @param {Object} obj
	 * @property {Object} data 
	 * @property {Function} before 
	 * @property {Function} success 
	 * @property {Function} fail 
	 * @property {Function} complete 
	 */
	getList(obj) {
		// 请求数据
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 请求完成执行方法
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		let params = publicF.urlEncode(data);		// 查询消息是否已读
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMsg/GetMessages?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success:function(result){
				if(result.statusCode == 200){
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
			fail:function(errors){
				if(typeof(fail) === "function"){
					fail(errors);
				}
			},
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 将消息设置为已读
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功执行方法
	 * @property {Function} fail 请求失败执行方法
	 * @property {Function} complete 请求完成执行方法
	 */
	updateReadInfo(obj){
		// 请求数据
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 请求完成执行方法
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		let params = publicF.urlEncode(data);		// 查询消息是否已读
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMsg/UpdateRead?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			success:function(result){
				if(result.statusCode == 200){
					if (result.data.ResultCode == "0" ) {
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
			fail:function(errors){
				if(typeof(fail) === "function"){
					fail(errors);
				}
			},
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	}
	// =========================================================================================================================
}