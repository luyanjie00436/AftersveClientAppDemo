/**
 * 与员工有关请求
 * @author 陆彦捷
 * @property {Function} getAllList 获取员工信息（全部） 
 * @property {Function} getMangesList 分页获取员工信息 
 * @property {Function} getCurrentInfo 获取当前员工信息 
 * @property {Function} getInfo 根据Id获取员工信息 
 * @property {Function} changestaff_request 修改员工信息 
 * @property {Function} getJoinList 获取成员申请 
 * @property {Function} inviteInfo 邀请新成员 
 * @property {Function} invitionCheckInfo 同意或拒绝邀请 
 * @property {Function} joinCheckInfo 成员申请审核 
 * @property {Function} deleteJoinLog 审核消息的删除 
 */
import web from '@/common/variable/website.js'; // 服务器地址
import publicF from '@/common/function/publicfunc.js'; // 公共方法
import login from '@/common/storage/loginstorage.js'; // 登录
import organ from '@/common/storage/organstorage.js'; // 组织
module.exports = {
	/** 获取员工信息（全部）
	 * @param {Object} obj 
	 * @param {Object} data 请求数据
	 * @property  {Function} before  请求前执行方法（默认为null）
	 * @property {Function} success 请求成功后执行方法（默认为null）
	 * 	@value {Object} data 请求返回的参数
	 * @property {Function} fail 请求失败后执行方法（默认为null）
	 * 	@value {Object} errors 请求失败返回的参数
	 * @property {Function} completeF请求的回调函数（不论请求成功或失败都执行，默认为null）
	 */
	getAllList: function(obj) {
		// 参数
		let data;			// 请求数据
		let before;			// 请求前执行方法
		let success;		// 请求成功执行方法
		let fail;			// 请求失败执行方法
		let complete;		// 回调函数
		if (Boolean(obj)) {
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
			url: web.website + '/api/SvcMchStaff/Get?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if (typeof(success) === "function") {
							success(result.data.Data , result.data.resultMsg);
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
	/** 获取部门主管
	 * @param {Object} obj 
	 * @property {Object} data 请求数据
	 * @property  {Function} before  请求前执行方法（默认为null）
	 * @property {Function} success 请求成功后执行方法（默认为null）
	 * @property {Function} fail 请求失败后执行方法（默认为null）
	 * @property {Function} completeF请求的回调函数（不论请求成功或失败都执行，默认为null）
	 */
	getMangesList : function(obj){
		// 参数
		let data;			// 请求数据
		let before;			// 请求前执行方法
		let success;		// 请求成功执行方法
		let fail;			// 请求失败执行方法
		let complete;		// 回调函数
		if (Boolean(obj)) {
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
			url: web.website + '/api/SvcOrganization/GetManagers?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
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
	/** 分页获取员工信息
	 * @param {Number} MchId 商户id
	 * @param {Function} beforeF  请求前执行方法（默认为null）
	 * @param {Function} successF 请求成功后执行方法（默认为null）
	 * 	@value {Object} data 请求返回的参数
	 * @param {Function} failF 请求失败后执行方法（默认为null）
	 * 	@value {Object} errors 请求失败返回的参数
	 * @param {Function} completeF请求的回调函数（不论请求成功或失败都执行，默认为null）
	 */
	getListPage: function(obj) {
		// 参数
		let data;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	//回调函数
		if (Boolean(obj)) {
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
			url: web.website + '/api/SvcMchStaff/Page?' + params,
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
	/** 获取当前员工信息
	 * @param {Object} obj 
	 * 	@property {Function} before 请求前执行方法
	 * 	@property {Function} success 成功时执行方法（默认为null）
	 * 	@property {Function} fail 失败时执行方法(默认为null)
	 * 	@property {Function} compelete 方法调用完成执行方法（不论成功或失败都调用, 默认为空）
	 */
	getCurrentInfo: function(obj) {
		// 参数
		let before;		// 请求前执行方法
		let success ;	// 成功时执行方法
		let fail ;		// 失败时执行方法
		let compelete ;	// 回调函数
		if (Boolean(obj)) {
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			compelete = obj.complete;
		}
		// 请求
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcUser/GetMchStaff?mchId=' + organ.getIndustryId() + '&userId=' +
				login.getUserId(),
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				if (result.statusCode === 200) {
					if (result.data.ResultCode === '0') {
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
				if (typeof(compelete) === "function") {
					compelete();
				}
			}
		})
	},
	/** 获取员工信息
	 * @param {Object} obj
	 * @property {Number} id 员工id
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数
	 */
	getInfo: function(obj) {
		// 参数
		let id; // 员工id
		let before; // 请求前执行方法
		let success; // 请求成功执行方法
		let fail; // 请求失败执行方法
		let complete; // 回调函数
		if (Boolean(obj)) {
			id = obj.id;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		if (!Boolean(id)) {
			return;
		}
		// 请求方法
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMchStaff/Info/' + id,
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
	/**修改员工信息
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 完成时执行方法
	 */
	updateInfo: function(obj) {
		// 参数
		let data; // 请求数据
		let before; // 请求前执行方法
		let success; // 请求成功执行方法
		let fail; // 请求失败执行方法
		let complete; // 回调函数
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
			url: web.website + '/api/SvcMchStaff/Update',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode == 200) {
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
			fail: function(erros) {
				if (typeof(fail) === "function") {
					fail(result);
				}
			},
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	// 成员邀请和审核
	/** 获取成员申请列表
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success  请求成功后执行方法
	 * @property {Function} fail  请求失败后执行方法
	 * @property {Function} complete  回调函数（不论成功失败都执行）
	 */
	getJoinList : function(obj){
		// 参数
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
		let params = publicF.urlEncode(data);
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcJoinLog/Page?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			data: data,
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
				if (typeof(errors)) {
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
	/** 邀请新成员
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success  请求成功后执行方法
	 * @property {Function} fail  请求失败后执行方法
	 * @property {Function} complete  回调函数（不论成功失败都执行）
	 */
	inviteInfo: function(obj) {
		// 参数
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
		// 请求
		if (typeof(before) === "function") {
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMerchant/Invitation',
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
				if (typeof(errors)) {
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
	/** 同意或拒绝邀请
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success  请求成功后执行方法
	 * @property {Function} fail  请求失败后执行方法
	 * @property {Function} complete  回调函数（不论成功失败都执行）
	 */
	invitionCheckInfo: function(obj){
		// 参数
		let data; // 请求数据
		let before; // 请求前执行方法
		let success; // 请求成功执行方法
		let fail; // 请求失败执行方法
		let complete; // 回调函数
		if (Boolean(obj)) {
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		let params = publicF.urlEncode(data);
		// 请求方法
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcMerchant/InvitationCheck?' + params,
			header:{
				Authorization : 'Bearer ' + login.getToken()
			},
			method:'POST',
			success:function(result){
				if(result.statusCode == 200){
					if(typeof(success) === "function"){
						success(result.data.Data , result.data.ResultMsg) 
					}
					return;
				}
				if(typeof(fail) === "function"){
					fail(result);
				}
			},
			fail:function(errors){
				if(typeof(fail) === "function"){
					fail(errors);;
				}
			},
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		});
	},
	/** 审核员工加入组织
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success  请求成功后执行方法
	 * @property {Function} fail  请求失败后执行方法
	 * @property {Function} complete  回调函数（不论成功失败都执行）
	 */
	joinCheckInfo : function(obj){
		// 参数
		let data;			// 请求消息
		let before;			// 请求前执行方法
		let success;		// 请求成功后执行方法
		let fail ;			// 请求失败后执行方法
		let complete ;		// 完成后执行方法
		if (Boolean(obj)) {
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
			url: web.website + '/api/SvcMerchant/JoinCheck',
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
				if (typeof(errors)) {
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
	/** 删除申请消息
	 * @param {Object} obj
	 * @property {Number} id 当前的item
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success  请求成功后执行方法
	 * @property {Function} fail  请求失败后执行方法
	 * @property {Function} complete  回调函数（不论成功失败都执行）
	 */
	deleteJoinLog : function(obj){
		// 参数
		let id;			// 请求消息
		let before;			// 请求前执行方法
		let success;		// 请求成功后执行方法
		let fail ;			// 请求失败后执行方法
		let complete ;		// 完成后执行方法
		if (Boolean(obj)) {
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
			url: web.website + '/api/SvcJoinLog/Delete/' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
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
				if (typeof(errors)) {
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
