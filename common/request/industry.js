/**
 * 行业
 * @property {type} getTreesFormat 获取行业树(匹配datacom数据)
 */
import web from '@/common/variable/website.js';		// 服务器地址
import login from '@/common/storage/loginstorage.js';	// 登录
import changeobjF from '@/common/function/changeobjectecordname.js';	// 格式化值

module.exports = {
	/** 获取所有行业(匹配datacom数据)
	 * @param {Object} obj
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数（无论成功、失败都执行）
	 */
	getTreesFormat : function (obj) {
		// 参数
		let before ;	// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail ;		// 请求失败执行方法
		let complete ;	// 回调函数
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
			url: web.website + '/api/Share/GetIndustry',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							success(changeobjF.change(result.data.Data,"IndustryId","Name","Children") , result.data.ResultMsg);
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
				if(typeof(complete) == "function"){
					complete();
				}
			}
		});
	},
	// =================================================================================================================================
}