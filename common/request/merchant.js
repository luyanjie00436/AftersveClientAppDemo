/**
 * 与组织、门店、商户有关请求
 * @author 陆彦捷
 * 组织/门店
 * @property {Function} getListAll_merchant 获取所有组织（不包含门店）
 * @property {Function} getListPage 获取组织/门店列表
 * @property {Function} getCurrentList 获取当前组织列表
 * @property {Function} getSvcInfo 获取服务商信息
 * @property {Function} getCurrentInfo 获取当前的组织信息
 * @property {Function} getCurrentBranchInfo 获取当前用户的门店信息
 * @property {Function} getInfo 根据id获取组织/门店的基础信息
 * @property {Function} getDetail 根据id获取组织/门店的详细信息（包括TopName）
 * @property {Function} addInfo 创建组织/门店
 * @property {Function} updateInfo 更新组织/门店信息
 * @property {Function} deleteInfo 根据id删除组织
 * @property {Function} applyInfo 申请加入组织/门店
 * @property {Function} trialInfo 成为体验用户
 * @property {Function} switchInfo 切换主企业
 * 组织架构
 * @property {Function} getTrees_fullOrg 获取完整的树形图组织架构
 * @property {Function} getTrees_org 获取组织架构
 * @property {Function} getAreaOrg 获取区域组织架构
 */

import publicF from '@/common/function/publicfunc.js'; // 公共的方法
import changeobjF from '@/common/function/changeobjectecordname.js';	// 修改数据
import web from '@/common/variable/website.js'; // 服务端地址
import login from '@/common/storage/loginstorage.js'; // 登录
import organ from '@/common/storage/organstorage.js'; // 组织

module.exports = {
	// ========================================= 组织/门店 ======================================================
	/** 获取所有的组织(不包含门店)
	 * @param {Object} obj
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
	 */
	getListAll_merchant(obj) {
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
			url: web.website + '/api/SvcMerchant/Get?parentId=0',
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
	/** 获取组织/门店（分页）
	 * @param {Object} obj
	 * @property {Object} data  请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
	 */
	getListPage(obj) {
		// 参数
		let data ; // 请求数据
		let before;
		let success ;
		let fail;
		let complete;
		if (Boolean(obj)) {
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求
		if(data.orgId == 0 || data.orgId == '0'){
			delete data.orgId;
		}
		let params = publicF.urlEncode(data);
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMerchant/Page?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
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
	/** 获取当前的组织列表
	 * @param {Object} obj
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
	 */
	getCurrentList(obj) {
		// 参数
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 完成回调函数
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
			url: web.website + '/api/SvcMerchant/GetUserMchs',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
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
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 获取服务商信息
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功执行方法
	 * @property {Function} fail 请求失败执行方法
	 * @property {Function} complete 请求回调函数（不论成功失败都执行）
	 */
	getSvcInfo: function(obj) {
		// 请求参数
		let data;			// 请求数据
		let before;			// 请求前执行方法
		let success;		// 请求成功执行方法
		let fail;			// 请求失败执行方法
		let complete;		// 请求回调函数
		if(Boolean(obj)){
			data = obj.data;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		let params = publicF.urlEncode(data)
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcCategory/GetSvcMch?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode === 200) {
					if (result.data.ResultCode === '0') {
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
			fail : function(errors){
				if(typeof(fail) === "function"){
					fail(errors);
				}
			},
			complete: function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		})
	},
	/** 获取当前的组织信息
	 * @param {Object} obj
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
	 */
	getCurrentInfo: function(obj) {
		// 获取参数
		let before;			// 请求前执行方法
		let success ;		// 请求成功执行方法
		let fail;			// 请求失败执行方法
		let complete ;		// 请求回调函数
		if (Boolean(obj)) {
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
			url: web.website + '/api/SvcMerchant/GetDefMch',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if (typeof(success) === "function") {
							success(result.data.Data, result.data.ResultMsg);
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
	/** 获取当前门店信息
	* @param {Object} obj
	* @property {Function} before 请求前执行方法
	* @property {Function} success 请求成功执行方法
	* @property {Function} fail 请求失败执行方法
	* @property {Function} complete 请求回调函数（不论成功失败都执行）
	 */
	getCurrentBranchInfo: function(obj) {
		// 参数
		let before;		// 请求前方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 回到函数
		if(Boolean(obj)){
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		let id = organ.getBranchId();
		// 请求
		if(typeof(before) == "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/Merchant/Info/' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
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
					fail(errors)
				}
			},
			complete: function() {
				if (typeof(complete) === "function") {
					complete();
				}
			}
		});
	},
	/** 根据id获取组织/门店基础信息
	 * @param {Object} obj
	 * @property {Object} id 组织Id 
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
	 */
	getInfo(obj) {
		// 参数
		let id;			// 组织id
		let before;		// 请求前执行方法
		let success ;	// 请求成功后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 回调函数（无论成功、失败都执行）
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
			url: web.website + '/api/SvcMerchant/Info/' + id,
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
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 根据id获取组织/门店详细信息
	 * @param {Object} obj
	 * @property {Object} id 组织Id 
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
	 */
	getDetail(obj) {
		// 参数
		let id;		// 组织id
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail ;		// 请求失败后执行方法
		let complete;	// 回调函数（无论成功、失败都执行）
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
			url: web.website + '/api/SvcMerchant/Detail/' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							success(result.data.Data ,result.data.ResultMsg);
						}
						return;
					}
				}
				if(typeof(fail) === "function"){
					fail(result);
				}
			},
			fail: function(erros) {
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
	/**创建加入组织/门店
	 * @param {Object} obj
	 * @property {Object} data  请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
	 */
	addInfo : function (obj) {
		// 参数
		let data;		// 请求数据
		let before;	// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail;	// 请求失败后执行方法
		let complete;// 回调函数（不论成功、失败都执行）
		if(Boolean(obj)){
			data = obj.data;
			before = obj.data;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMerchant/Create',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			data: data,
			method: 'POST',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function" ){
							success(result.data.Data ,result.data.ResultMsg);
						}
						return;
					}  
				} 
			},
			fail: function(errors) {
				if(typeof(fail) === "function"){
					fail(errors);
				}
			},
			complete: function() {
				if(typeof(complete) === "function" ){
					complete();
				}
			}
		});
	},
	/** 编辑组织/门店信息
	 * @param {Object} obj
	 * @property {Object} data  请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
	 */
	updateInfo : function (obj) {
		// 参数
		let data;		// 请求数据
		let before;	// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail ;	// 请求失败后执行方法
		let complete = null;// 回调函数（不论成功、失败都执行）
		if(Boolean(obj)){
			data = obj.data;
			before = obj.data;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMerchant/Update',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			data: data,
			method: 'POST',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function" ){
							success(result.data.Data , result.data.ResultMsg);
						}
						return;
					}  
				} 
			},
			fail: function(errors) {
				if(typeof(fail) === "function"){
					fail(errors);
				}
			},
			complete: function() {
				if(typeof(complete) === "function" ){
					complete();
				}
			}
		});
	},
	/** 删除当前组织/门店
	 * @param {Object} obj
	 * @property {Object} id 组织Id 
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
	 */
	deleteInfo(obj) {
		// 参数
		let id;		// 组织id
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 回调函数（无论成功、失败都执行）
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
			url: web.website + '/api/SvcMerchant/Delete/' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							success(result.data.Data ,result.data.ResultMsg);
						}
						return;
					}
				}
				if(typeof(fail) === "function"){
					fail(result);
				}
			},
			fail: function(erros) {
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
	/** 申请加入组织/门店
	 * @param {Object} obj
	 * @property {Object} data  请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
	 */
	applyInfo(obj) {
		// 参数
		let data; // 请求数据
		let before ; // 请求前执行方法
		let success ; // 请求成功后执行方法
		let fail; // 请求失败后执行方法
		let complete; // 请求回调函数（不论请求成功、失败都执行）
		if (Boolean(obj)) {
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		uni.showLoading();
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMerchant/Join',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			data: data,
			method: 'POST',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
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
	/** 成为体验用户
	 * @param {Object} obj
	 * 	@property {Object} data 请求数据
	 * 	@property {Function} before 请求前执行方法
	 * 	@property {Function} success  请求成功后执行方法
	 * 	@property {Function} fail  请求失败后执行方法
	 * 	@property {Function} complete  回调函数（无论成功或失败都执行）
	 */
	trialInfo: function(obj) {
		// 请求参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 回调函数
		if (Boolean(obj)) {
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
			url: web.website + '/api/SvcMerchant/Trial',
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
			fail: function(errors) {
				if (typeof(fail) === "function") {
					fail(errors)
				}
			},
			complete: function() {
				if (typeof(complete) === "function") {
					complete();
				}
			}
		});
	},
	/** 切换主企业
	 * @param {Object} obj
	 * 	@property {Object} data 请求数据
	 * 	@property {Function} before 请求前执行方法
	 * 	@property {Function} success  请求成功后执行方法
	 * 	@property {Function} fail  请求失败后执行方法
	 * 	@property {Function} complete  回调函数（无论成功或失败都执行）
	 */
	switchInfo(obj) {
		// 参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 回调函数（无论成功或失败都执行）
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
			url: web.website + '/api/SvcUser/ChangeMch?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken(),
			},
			method: 'POST',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							success(result.data.Data ,result.data.ResultMsg);
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
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		})
	},
	// ========================================= 组织架构 ==========================================================
	/** 获取完整的组织架构
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功执行方法
	 * @property {Function} fail 请求失败执行方法
	 * @property {Function} complete 请求回调函数（不论成功失败都执行）
	 */
	getTrees_fullOrg: function(obj) {
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
		let params = publicF.urlEncode(data);
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrganization/GetFullOrg?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							let fullData = result.data.Data;
							let childrenData = result.data.Data.Children;
							success({fullData , childrenData} , result.data.ResultMsg);
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
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 获取组织架构
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功执行方法
	 * @property {Function} fail 请求失败执行方法
	 * @property {Function} complete 请求回调函数（不论成功失败都执行）
	 */
	getTrees_org: function(obj){
		// 参数
		let data;		// 请求数据
		let before ;	// 请求前方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 请求回调函数
		if(Boolean(obj)){
			data = obj.data;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求信息
		let params = publicF.urlEncode(data);
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrganization/GetOrgs?' + params,
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
			complete: function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 获取区域组织架构
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功执行方法
	 * @property {Function} fail 请求失败执行方法
	 * @property {Function} complete 请求回调函数（不论成功失败都执行）
	 */
	getAreaOrg: function(obj){
		// 参数
		let data;			// 请求数据
		let before;		// 请求前执行方法
		let success;		// 请求成功执行方法
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
		var params = publicF.urlEncode(data);
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrganization/LoadOrg?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							var fullData = result.data.Data;
							var childrenData = result.data.Data[0].Children;
							success({fullData , childrenData} , result.data.ResultMsg);
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
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	// ========================================================================================================================
}
