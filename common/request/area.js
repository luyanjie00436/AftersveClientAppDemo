/**
 * 地区
 * @author 陆彦捷
 * @property {function} getTrees 请求所有的地区
 */
import web from '@/common/variable/website.js';		// 网络位置
import login from '@/common/storage/loginstorage.js';	// 登录
import changeobjF from '@/common/function/changeobjectecordname.js';	// 格式化数据
module.exports = {
	/** 请求所有地区（树形图）
	 * @param {Object} obj
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论成功、失败都执行）
	 */
	getTrees : function (obj) {
		// 参数
		let before ;		// 请求前执行方法
		let success ;		// 请求完成执行方法
		let fail;			// 请求失败执行方法
		let complete;		// 回调函数
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
			url: web.website + '/api/Share/Areas',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							success(changeobjF.change(result.data.Data, "code", "name",	"Children"), result.data.ResultMsg);
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
}