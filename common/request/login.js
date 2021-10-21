/**
 * 登录的请求方法
 * @author 陆彦捷
 * @property {Function} login 登录请求方法
 * @property {Function} updatePwd 更新密码
 * 
 */
import web from '@/common/variable/website.js';			// 请求的地址
import login from '@/common/storage/loginstorage.js';	// 登录
import publicF from '@/common/function/publicfunc.js';	// 公共方法
module.exports = {
	/** 登录请求
	 * @param {Object} obj 
	 * @property {Object} 请求数据
	 * @property {Fuction} before  请求前执行方法
	 * @property {Fuction} success  请求成功执行方法
	 * @property {Fuction} nobind  未绑定成功执行费
	 * @property {Fuction} fail  请求失败执行方法
	 * @property {Fuction} complete  回调函数
	 */
	login : function(obj){
		// 参数
		let data;		// 请求的数据
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let nobind ;	// 未绑定成功后执行方法
		let fail ;		// 请求失败后执行方法
		let complete ;	// 回调函数(不论成功或失败都执行)
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			nobind = obj.nobind ;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		uni.showLoading({
			title: '登录中……'
		});
		if(typeof(before) === "function"){
			before;
		}
		// 登录请求
		uni.request({
			url: web.website + '/api/SvcUser/Login',
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "601") {
						// 微信未绑定用户
						if(typeof(nobind) === "function"){
							nobind(result.data.Data , result.data.ResultMsg);
						}
						return;
					} else{
						// 请求成功方法
						if(typeof(success) === "function"){
							success(result.data.Data ,result.data.ServerTime ,result.data.ResultMsg);
						}
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
			complete: function() {
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 更新密码
	 * @param {Object} obj
	 * @property {Object} data 	请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功执行方法
	 * @property {Function} fail 请求失败执行方法
	 * @property {Function} complete 请求回调函数
	 */
	updatePwd(obj) {
		// 请求参数
		let data;		// 请求参数
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行参数
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
			url: web.website + '/api/SvcUser/UpdatePwd?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			success: function(result) {
				uni.hideLoading();
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0" ) {
						if(typeof(success) === "function"){
							success(result.data , result.data.ResultMsg);
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
				if(typeof(complete)){
					complete();
				}
			}
		});
	}
	// ================================================================================================================================
}