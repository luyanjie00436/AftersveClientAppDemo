/**
 * 与工单有关请求
 * @description 按照查询工单信息、报修、报障工单方法、受理工单方法分类
 * 报障
 * @property {Function} getInfo  根据工单id获取当前工单的信息
 * @property {Function} getInfoByData 根据SN码查询有效工单	
 * @property {Function} saveInfo 保存当前工单
 * @property {Function} repairSubmit_request 提交当前工单
 * @property {Function} updateInfo 更新当前工单信息
 *  报障工单
 * @property {Function} getCustomerList  获取报障工单
 * @property {Function} getCustomerListTop1  获取就近的报障工单
 * @property {Function} cancelInfo  : 根据工单id取消工单
 * @property {Function} recallInfo : 根据工单id撤回工单
 * @property {Function} validatiaonInfo ： 验收通过
 * @property {Function} rateInfo 根据工单id ,客户评价工单
 *  
 *  受理工单
 * @property {Function} getSeviceList  获取受理工单列表
 * @property {Function} getSeviceListTop1  获取就近的受理工单
 *  @property {Function} acceptRepairInfo : 受理工单 - 服务商确认
 *  @property {Function} acceptSvcInfo ： 受理工单 - 供应商确认
 *	@property {Function} assignInfo ： 受理工单-派单（维修厂商）
 *	@property {Function} confirmInfo ： 受理工单-服务商确认服务信息
 *	@property {Function} svcAssignInfo ： 受理工单-服务商派工
 *  @property {Function} beforeValidationInfo ： （服务商） 申请工单验收
 *  @property {Function} newOrderInfo ： （服务商）转移工单
 *  @property {Function} finishInfo : （平台/服务商）结束工单
 * 其他
 * @property {Function} getImgList  根据工单id获取工单图片
 * @property {Function} getLogList  根据工单id获取工单Log
 */
import web from '@/common/variable/website.js';			// 网址
import publicF from '@/common/function/publicfunc.js';	// 公共方法
import login from '@/common/storage/loginstorage.js'; 	// 登录的本地缓存
import organ from '@/common/storage/organstorage.js';	// 组织\商户、门店

module.exports = {
	// ========================================================== 报障 =================================================================
	/** 根据工单id获取工单信息
	 * @param {Object} obj 
	 * @property {Number} id 工单id 
	 * @property {Function} before 请求方法执行前函数
	 * @property {Function} success 请求调用成功时执行函数
	 * @property {Function} fail 请求调用失败时执行函数
	 * @property {Function} complete 请求的回调函数
	 */
	getInfo: function(obj) {
		// 参数
		let id;			// 工单id
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail;		// 请求失败时执行方法
		let complete;	// 请求回调函数
		if(Boolean(obj)){
			id = obj.id;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求方法
		if (typeof(before) === "function") {
			before();
		}
		// 请求方法
		uni.request({
			url: web.website + '/api/SvcOrder/Detail/' + id,
			header: {
				Authorization: 'Bearer ' +login.getToken()
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
	/** 根据Sn码查询有效工单
	 * @param {Object} obj
	 * 	@property {Object} data 请求数据
	 * 	@property {Function} before 请求方法执行前函数（默认为null）
	 *  @property {Function} success 请求调用成功时执行函数(默认为null)
	 *  @property {Function} fail 请求调用失败时执行函数(默认为null)
	 *  @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
	 */
	getInfoByData : function(obj){
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
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/Proces?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if(typeof(success) === "function"){
						success(result.data.Data ,result.data.ResultMsg);
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
		})
	},
	/** 保存当前工单信息
	 * @param {Object} obj
	 * 	@property {Boolean} isEdit 工单是否已编辑
	 * 	@property {Object} data 请求数据
	 * 	@property {Function} before 请求方法执行前函数（默认为null）
	 *  @property {Function} success 请求调用成功时执行函数(默认为null)
	 *  @property {Function} fail 请求调用失败时执行函数(默认为null)
	 *  @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
	 */
	saveInfo: function(obj) {
		// 请求参数
		let isEdit;				// 是否编辑
		let data ;				// 请求数据
		let before ;			// 请求前执行方法
		let success ;			// 请求成功执行方法
		let fail;				// 请求失败执行方法
		let complete ;			// 回调函数
		if(Boolean(obj)){
			isEdit = Boolean( obj.isEdit);
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求事件
		var url = "";
		if (isEdit) {
			url = "/api/SvcOrder/Update";
		} else {
			url = "/api/SvcOrder/Add";
		}
		if(typeof(before) === "function"){
			before();
		}
		
		uni.request({
			url: web.website + url,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if(typeof(success) === "function"){
						success(result.data , result.data.ResultMsg);
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
		})
	},
	/** 提交当前工单信息
	 * @param {Object} obj
	 * 	@property {Object} data 请求数据
	 * 	@property {Function} before 请求方法执行前函数（默认为null）
	 *  @property {Function} success 请求调用成功时执行函数(默认为null)
	 *  @property {Function} fail 请求调用失败时执行函数(默认为null)
	 *  @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
	 */
	submitInfo : function(obj){
		// 参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success ;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete ;	// 请求完成执行方法
		if(obj){
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
		uni.request({
			url: web.website + "/api/SvcOrder/Submit",
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if(typeof(success) === "function"){
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
				}
				if(typeof(fail) === "function"){
					fail(result);
				}
			},
			fail: function(errors) {
				if(typeof(fail) === "function" ){
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
	/** 更新当前工单信息
	 * @param {Object} obj
	 * 	@property {Object} data 请求数据
	 * 	@property {Function} before 请求方法执行前函数（默认为null）
	 *  @property {Function} success 请求调用成功时执行函数(默认为null)
	 *  @property {Function} fail 请求调用失败时执行函数(默认为null)
	 *  @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
	 */
	updateInfo : function(obj){
		// 参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success ;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete ;	// 请求完成执行方法
		if(obj){
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
		uni.request({
			url: web.website + "/api/SvcOrder/Update",
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if(typeof(success) === "function"){
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
				}
				if(typeof(fail) === "function"){
					fail(result);
				}
			},
			fail: function(errors) {
				if(typeof(fail) === "function" ){
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
	// ========================================================== 报障工单 ==============================================================
	/** 获取报障工单
	 * @param {Object} obj 
	 * @property {Object} data 请求数据 
	 * @property {Function} before	请求前方法(默认值null)
	 * @property {Function} sucess 执行成功后的方法(默认值null)
	 * @property {Function} fail 执行失败后的方法(默认值null)
	 * @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
	 */
	getCustomerList: function(obj) {
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
		var params = publicF.urlEncode(data);
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/Page?' + params,
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
	/** 获取最近的报障工单
	 * @param {Object} obj 
	 * @property {Object} data 请求前数据
	 * @property {Function} before	请求前方法(默认值null)
	 * @property {Function} sucess 执行成功后的方法(默认值null)
	 * @property {Function} fail 执行失败后的方法(默认值null)
	 * @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
	 */
	getCustomerListTop1: function(obj) {
		// 参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 回调函数(不论成功、失败都执行费)
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.fail;
		}
		// 请求
		let params = publicF.urlEncode(data);
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/Page?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode === 200) {
					if (result.data.ResultCode === "0") {
						if (typeof(success) === "function") {
							var data = result.data.Data;
							if (Boolean(data)) {
								if (data.length > 0) {
									success(data[0] ,result.data.ResultMsg);
									return;
								}
							}
							success(null , result.data.ResultMsg);
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
	/** 根据工单id取消工单(POST)
	 * @property {Number} id 工单id
	 * @property {Function} before	请求前方法(默认值null)
	 * @property {Function} sucess 执行成功后的方法(默认值null)
	 * @property {Function} fail 执行失败后的方法(默认值null)
	 * @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
	 */
	cancelInfo: function(obj) {
		// 请求参数
		let id;			// 工单id
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
		// 请求
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/CancelOrder?orderId=' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
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
	/** 根据工单id撤回工单(POST)
	 * @param {Object} obj
	 * @property {Number} id 工单id
	 * @property {Function} before	请求前方法(默认值null)
	 * @property {Function} sucess 执行成功后的方法(默认值null)
	 * @property {Function} fail 执行失败后的方法(默认值null)
	 * @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
	 */
	recallInfo: function(obj) {
		// 请求参数
		let id;			// 工单id
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
		// 请求
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/Withdraw?orderId=' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
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
	/** 工单验收通过
	* @param {Object} obj
	* @property {Object} data 请求数据id
	* @property {Function} before	请求前方法(默认值null)
	* @property {Function} sucess 执行成功后的方法(默认值null)
	* @property {Function} fail 执行失败后的方法(默认值null)
	* @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
	 */
	validatiaonInfo: function(obj) {
		// 请求参数
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
			url: web.website + '/api/SvcOrder/UserCheck?',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data : data,
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data.Data ,result.data.ResultMsg);
					}
					return;
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
	/** 根据工单id,客户评价工单
	* @param {Object} obj
	* @property {Object} data 请求数据id
	* @property {Function} before	请求前方法(默认值null)
	* @property {Function} sucess 执行成功后的方法(默认值null)
	* @property {Function} fail 执行失败后的方法(默认值null)
	* @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
	 */
	rateInfo: function(obj) {
		// 请求参数
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
			url: web.website + '/api/SvcOrder/UserScore',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
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
	// ================================================= 受理工单 ===================================================================
	/** 获取受理工单
	 * @param {Object} obj   
	 * @property {Object} data 请求前数据 
	 * @param {Function} before	请求前方法（默认为null）
	 * @param {Function} success 执行成功后的方法(默认为null)
	 * @param {Function} fail 执行失败后的方法(默认为null)
	 * @param {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）(默认为null)
	 */
	getSeviceList: function(obj) {
		// 参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 回调函数
		if(Boolean(obj)){
			data  = obj.data;
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
			url: web.website + '/api/SvcOrder/Page?' + params,
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
	/** 获取最近的受理工单
	 * @param {Object} obj   
	 * @param {Object} data 请求参数
	 * @param {Function} before	请求前方法(默认值null)
	 * @param {Function} success 执行成功后的方法(默认值null)
	 * @param {Function} fail 执行失败后的方法(默认值null)
	 * @param {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
	 */
	getSeviceListTop1: function(obj) {
		// 参数
		let data;		// 请求数据
		let before;		// 请求前方法
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
		var params = publicF.urlEncode(data);
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/Page?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode === 200) {
					if (result.data.ResultCode === "0") {
						if (typeof(success) === "function") {
							var data = result.data.Data;
							if (Boolean(data)) {
								if (data.length > 0) {
									success(data[0] , result.data.ResultMsg);
									return;
								}
							}
							success(null , result.data.ResultMsg);
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
	/** 受理工单 - 确认（服务商商确认）
	 * @param {Object} obj
	 * 	@property {Object} data 请求数据
	 * 	@property {Function}  before 请求前执行方法 
	 * 	@property {Function} success 请求成功后执行方法 
	 * 	@property {Function}  fail 请求失败后执行方法 
	 * 	@property {Function} complete 回调函数（不论请求成功或失败都执行） 
	 */
	acceptRepairInfo : function(obj){
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
			complete = obj.complete
		}
		// 请求信息
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/RepairConfirm',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data);
					}
					return;
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
	/** 受理工单 - 确认(供应商确认)
	 * @param {Object} obj
	 * 	@property {Object} data 请求数据
	 * 	@property {Function}  before 请求前执行方法 
	 * 	@property {Function} success 请求成功后执行方法 
	 * 	@property {Function}  fail 请求失败后执行方法 
	 * 	@property {Function} complete 回调函数（不论请求成功或失败都执行） 
	 */
	acceptSvcInfo : function(obj){
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
			complete = obj.complete
		}
		// 请求信息
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/SvcConfirm',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
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
	/** 受理工单 -派单、确认信息（维修厂商）
	 * @param {Object} obj
	 * 	@property {Object} data 请求数据
	 * 	@property {Function}  before 请求前执行方法 
	 * 	@property {Function} success 请求成功后执行方法 
	 * 	@property {Function}  fail 请求失败后执行方法 
	 * 	@property {Function} complete 回调函数（不论请求成功或失败都执行） 
	 */
	assignInfo : function(obj){
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
			complete = obj.complete
		}
		// 请求信息
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/RepairAssign',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
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
	/**  受理工单- 确认服务信息（服务商）
	 * @param {Object} obj 
	 * 	@property {Object} data 请求数据
	 * 	@property {Function} before 请求方法执行前函数（默认为null）
	 * 	@property {Function} success 请求调用成功时执行函数(默认为null)
	 * 	@property {Function} fail 请求调用失败时执行函数(默认为null)
	 * 	@property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
	 */
	confirmInfo : function(obj){
		let data ;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败时执行方法
		let complete;	// 请求完成后执行方法
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete
		}
		// 请求信息
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/SvcConfirm',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
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
	/** 受理工单 -服务商确认工单
	 * @param {Object} obj
	 * 	@property {Object} data 请求数据
	 * 	@property {Function}  before 请求前执行方法 
	 * 	@property {Function} success 请求成功后执行方法 
	 * 	@property {Function}  fail 请求失败后执行方法 
	 * 	@property {Function} complete 回调函数（不论请求成功或失败都执行） 
	 */
	svcAssignInfo : function(obj){
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
			complete = obj.complete
		}
		// 请求信息
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/SvcAssign',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
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
	/** 服务商 - 申请工单验收
	 * @param {object} obj 
	 * 	@property {Object} data 请求数据
	 * 	@property {Function} before 请求方法执行前函数（默认为null）
	 * 	@property {Function} success 请求调用成功时执行函数(默认为null)
	 * 	@property {Function} fail 请求调用失败时执行函数(默认为null)
	 * 	@property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
	 */
	beforeValidationInfo : function(obj){
		// 获取参数
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
			complete = obj.complete
		}
		// 请求服务商信息
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/RepairSubmit',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
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
	/** 服务商 - 转移工单
	 * @param  {Object} obj 
	 * 	@property {Number} orderId 工单id
	 * 	@property {Number} serviceMchId 转移服务商
	 * 	@property {Function} beforeF 请求方法执行前函数（默认为null）
	 * 	@property {Function} successF 请求调用成功时执行函数(默认为null)
	 * 	@property {Function} failF 请求调用失败时执行函数(默认为null)
	 * 	@property {Function} completeF 请求的回调函数（不论方法成功或失败都执行）(默认为null)
	 */
	newOrderInfo : function(obj){
		// 获取参数
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
			complete = obj.complete
		}
		
		// 请求信息
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/NewOrder',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
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
	/** 受理工单 : 中止（/结束）工单
	 * @param  {Object} obj 
	 * 	@property {Object} data 请求数据
	 * 	@property {Function} before 请求方法执行前函数（默认为null）
	 * 	@property {Function} success 请求调用成功时执行函数(默认为null)
	 * 	@property {Function} fail 请求调用失败时执行函数(默认为null)
	 * 	@property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
	 */
	finishInfo : function(obj){
		// 获取参数
		let data ;			// 请求数据
		let before;			// 请求前执行方法
		let success;		// 请求完成执行方法
		let fail;			// 请求失败执行方法
		let complete;		// 请求回调函数
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete
		}
		// 请求信息
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcOrder/SvcFinish',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode === 200) {
					if (typeof(success) === "function") {
						success(result.data.Data , result.data.ResultMsg);
					}
					return;
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
	// ============================================= 其他 ==========================================================================
	/**根据工单Id获取工单图片
	 * @param {Object} obj
	 * @property   {Number} id 工单id
	 * @property {Function} before 请求方法执行前函数（默认为null）
	 * @property {Function} success 请求调用成功时执行函数(默认为null)
	 * @property {Function} fail 请求调用失败时执行函数(默认为null)
	 * @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
	 */
	getImgList: function(obj) {
		// 请求参数
		let id ;		// 工单Id
		let before ;		// 请求前执行方法
		let success;		// 请求成功时执行方法
		let fail;			// 请求失败时执行方法
		let complete;		// 回调函数
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
			url: web.website + '/api/SvcOrderImg/List?orderId=' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode === 200) {
					if (result.data.ResultCode === "0") {
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
	/** 根据工单id获取工单Log
	* @param  {Object} obj 
	* @property  {Number} 工单id
	* @property {Function} before 请求方法执行前函数（默认为null）
	* @property {Function} success 请求调用成功时执行函数(默认为null)
	* @property {Function} fail 请求调用失败时执行函数(默认为null)
	* @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
	 */
	getLogList: function(obj) {
		// 请求参数
		let id ;		// 工单Id
		let before ;		// 请求前执行方法
		let success;		// 请求成功时执行方法
		let fail;			// 请求失败时执行方法
		let complete;		// 回调函数
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
			url: web.website + '/api/SvcOrderLog/Get?orderId=' + id,
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
	// =============================================================================================================================
}
