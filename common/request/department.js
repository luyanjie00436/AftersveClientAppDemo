/**
 * 与部门有关请求
 * @author 陆彦捷
 * @property {Function} getInfo 根据Id获取部门信息 
 * @property {Function} getTrees 获取部门树形图 
 * @property {Function} addInfo 添加部门信息
 * @property {Function} updateInfo 更新部门信息
 * @property {Function} deleteInfo 根据部门Id, 删除部门信息 
 */
import web from '@/common/variable/website.js'; // 请求网址
import publicF from '@/common/function/publicfunc.js'; // 请求方法
import changeobjF from '@/common/function/changeobjectecordname.js'; // 格式化数据
import filterobjF from '@/common/function/filterobject.js'; // 过滤数据
import login from '@/common/storage/loginstorage.js'; // 登录请求

module.exports = {
	/** 根据Id获取部门
	 * @param {Object} obj
	 * @property {Number} id 部门Id
	 * @property {Function} before 请求前方法（默认null）
	 * @property {Function} success 请求成功后执行方法（默认null）
	 * @property {Function} fail 请求失败后执行方法（默认null）
	 * @property {Function} complete 回调函数执行方法（不论成功、失败都执行。默认为null）
	 */
	getInfo: function(obj) {
		// 请求数据
		let id ;	// id
		let before;	// 请求前执行方法
		let success;	// 请求成功时执行方法
		let fail ;		// 请求失败时执行方法
		let complete ;	// 请求回调函数
		if(Boolean(obj)){
			id = obj.id;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrganization/Info/' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode === 200) {
					if (result.data.ResultCode === "0") {
						if (typeof(success) === "function") {
							success(result.data.Data ,result.data.ResultMsg);
						}
						return;
					}
				}
				if (typeof(fail) === "function") {
					fail(result);
				}
			},
			fail: function(errors) {
				if (typeof(fail) === "function") {
					fail(errors);
				}
			},
			complete: function() {
				if (typeof(complete) === "function") {
					complete();
				}
			}
		});
	},
	/** 获取部门树形图（已数据化）
	 * @param {Object} obj 
	 * @property {Object} data 请求的参数
	 * @property {Boolean} isformat 是否格式化返回值（默认true）
	 * @property {Boolean} isFilter 是否过滤数据（默认false）
	 * @property {Number} orgId 待过滤的部门Id(当isFilter为true是生效) 
	 * @param {Function} before 请求前方法（默认null）
	 * @param {Function} success 请求成功后执行方法（默认null）
	 * @param {Function} fail 请求失败后执行方法（默认null）
	 * @param {Function} complete 回调函数执行方法（不论成功、失败都执行。默认为null）
	 */
	getTrees: function(obj) {
		// 参数
		let data; // 请求参数
		let isformat = true; // 是否格式化
		let isFilter = false; // 是否过滤数据
		let orgId; 			// 组织Id
		let before ; // 请求前执行方法
		let success ; // 请求成功后执行方法
		let fail ; // 请求失败后执行方法
		let complete; // 回调函数（不论成功、失败都执行费）
		if (Boolean(obj)) {
			data = obj.data;
			isformat = (obj.isformat != false);
			isFilter = Boolean(obj.isFilter);
			orgId = obj.orgId;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求
		let params = publicF.urlEncode(data);
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrganization/GetFullOrg?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode === 200) {
					if (result.data.ResultCode === "0" && Boolean(result.data.Data)) {
						if (typeof(success) === "function") {
							var data = result.data.Data;
							// 格式化返回值
							var fullorgTree = isformat ? changeobjF.change(data.Children,"Value", "Name","Children") : data;
							// 过滤返回值
							var organtrees = isFilter? filterobjF.filterbyvalue_list(fullorgTree, orgId) : fullorgTree;
							success(fullorgTree , organtrees);
						}
						return;
					}
				}
				if (typeof(fail) === "function") {
					fail(result);
				}
			},
			fail: function(errors) {
				if (typeof(fail) === "function") {
					fail(errors);
				}
			},
			complete: function() {
				if (typeof(complete) === "function") {
					complete();
				}
			}
		})
	},
	/** 添加部门信息
	 * @param {Object} obj 
	 * @property  {Object} data 请求数据
	 * @property {Function} before 请求前方法（默认null）
	 * @property {Function} success 请求成功后执行方法（默认null）
	 * @property {Function} fail 请求失败后执行方法（默认null）
	 * @property {Function} complete 回调函数执行方法（不论成功、失败都执行。默认为null）
	 */
	addInfo: function(obj) {
		// 请求数据
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
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrganization/Add',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			data: data,
			method: 'POST',
			success: function(result) {
				if (result.statusCode === 200) {
					if (result.data.ResultCode === "0") {
						if (typeof(success) === "function") {
							success(result.data.Data , result.data.ResultMsg);
						}
						return;
					}
				}
				if (typeof(fail) === "function") {
					fail(result);
				}
			},
			fail: function(errors) {
				if (typeof(fail) === "function") {
					fail(errors);
				}
			},
			complete: function() {
				if (typeof(complete) === "function") {
					complete();
				}
			}
		});
	},
	/** 更新部门信息
	* @param {Object} obj
	* @property  {Object} data 请求数据
	* @property {Function} before 请求前方法（默认null）
	* @property {Function} success 请求成功后执行方法（默认null）
	* @property {Function} fail 请求失败后执行方法（默认null）
	* @property {Function} complete 回调函数执行方法（不论成功、失败都执行。默认为null）
	 */
	updateInfo: function(obj) {
		// 请求数据
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
		// 请求方法
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrganization/Update',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			data: data,
			method: 'POST',
			success: function(result) {
				if (result.statusCode === 200) {
					if (result.data.ResultCode === "0") {
						if (typeof(success) === "function") {
							success(result.data.Data ,result.data.ResultMsg);
						}
						return;
					}
				}
				if (typeof(fail) === "function") {
					fail(result);
				}
			},
			fail: function(erros) {
				if (typeof(fail) === "function") {
					fail();
				}
			},
			complete: function() {
				if (typeof(complete) === "function") {
					complete();
				}
			}
		});
	},
	/** 根据部门id,删除部门
	 * @param {Object} obj
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功执行方法
	 * @property {Function} fail 请求失败执行方法
	 * @property {Function} complete 回调函数（不论成功、失败都执行）
	 */
	deleteInfo: function(obj) {
		let id ; 		// 部门id
		let before; 	// 请求前执行方法
		let success ; 	// 请求成功执行方法
		let fail ; 		// 请求失败执行方法
		let complete;	// 请求完成执行方法
		if (Boolean(obj)) {
			id = obj.id;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrganization/Delete/' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			success: function(result) {
				uni.hideLoading();
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0" && result.data.Data) {
						if (typeof(success) === "function") {
							success(result.data.Data , result.data.ResultMsg);
						}
						return;
					}
				}
				if (typeof(fail) === "function") {
					fail(result);
				}
			},
			fail: function(errors) {
				if (typeof(fail) === "function") {
					fail(errors);
				}
			},
			complete: function() {
				if (typeof(complete) === "function") {
					complete();
				}
			}
		});
	},
	// ===============================================================================================================================
}
