/**
 * 与用户相关的方法
 * @author 陆彦捷
 * @description 
 * @property {Function} getCurrentInfo 获取当前用户
 * @property {Function} getInfogetInfo 根据用户id获取用户
 * @property {Function} bindPhoneInfo 用户绑定方法
 * @property {Function} unbindPhoneInfo 用户解绑方法
 * @event {Function(obj)}  updateInfo 更新用户信息
 * 
 *@property {Function} getCurrentIsAdminBoolean  判断当前用户是否当前组织管理员
 *@property {Function} getIsAdminBoolean  判断当前用户是否组织管理员
 */
import web from '@/common/variable/website.js';		// 请求地址
import login from '@/common/storage/loginstorage.js';	// 登录
import organ from '@/common/storage/organstorage.js';	// 组织
import user from '@/common/storage/userstorage.js';		// 用户

module.exports = {
	/** 获取当前用户消息
	 * @param {Object} obj
	 * 	@property {Function} before 请求前执行方法
	 * 	@property {Function} success 请求成功执行方法
	 * 	@property {Function} fail 请求失败执行方法
	 * 	@property {Function} complete 回调函数（不论成功或失败都执行）
	 */
	getCurrentInfo: function(obj) {
		// 参数
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 请求回调函数（不论请求成功或失败都执行）
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
			url: web.website + '/api/SvcUser/Info/' + user.getUserId(),
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				// 用户信息
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							success(result.data.Data , result.data.ResultMsg);
						}
						return;
					}
				}
				if(typeof(fail) === "function" ){
					fail(result);
				}
			},
			fail:function(errors){
				if(typeof(fail) === "function" ){
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
	/** 获取用户Id
	 * @param {Object} obj
	 * 	@property {Int} id 用户Id
	 * 	@property {Function} before 请求前执行方法
	 * 	@property {Function} success 请求成功执行方法
	 * 	@property {Function} fail 请求失败执行方法
	 * 	@property {Function} complete 回调函数（不论成功或失败都执行）
	 */
	getInfo: function(obj) {
		// 参数
		let id;				// 用户Id
		let before;		// 请求前执行方法
		let  success;		// 请求成功后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 请求回调函数（不论请求成功或失败都执行）
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
			url: web.website + '/api/SvcUser/Info/' + id ,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				// 用户信息
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							success(result.data.Data , result.data.ResultMsg);
						}
						return;
					}
				}
				if(typeof(fail) === "function" ){
					fail(result);
				}
			},
			fail:function(errors){
				if(typeof(fail) === "function" ){
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
	/** 用户绑定
	 * @param {Object} obj
	 * 	@property {Object} data 请求参数
	 * 	@property {Function} before 请求前执行方法
	 * 	@property {Function} success 请求成功执行方法
	 * 	@property {Function} fail 请求失败执行方法
	 * 	@property {Function} complete 回调函数（不论成功或失败都执行）
	 */
	bindPhoneInfo : function(obj) {
		// 请求参数
		let data;			// 请求参数
		let before;			// 请求前执行方法
		let success;		// 请求成功后执行方法
		let fail;			// 请求失败后执行方法
		let complete;		// 请求回调函数（不论请求成功或失败都执行）
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
			url: web.website + '/api/SvcUser/Bind',
			method: 'POST',
			data: data,
			success: function(result) {
				if(result.statusCode == 200){
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							success(result.data.Data , result.data.ServerTime ,result.data.ResultMsg)
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
		})
	},
	/** 用户解绑(用户解绑)
	 * @param {Object} obj
	 */
	unbindPhoneInfo : function(obj){
	},
	/** 更新用户信息
	 * @param {Object} obj
	 * @property {Object} data 请求数据
	 * @property {Function} before 请求前执行方法
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行方法
	 * @property {Function} complete 回调函数
	 */
	updateInfo: function(obj) {
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
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcUser/Update',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
			success: function(result) {
				if (result.statusCode == 200) {
					// 如果是当前用户，修改当前Session
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
			fail: function(errors) {
				if(typeof(errors) === "function"){
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
	// =================================================== 用户权限 ===================================================================
	/** 判断当前用户是否为当前组织管理员
	 * @param {Object} obj
	 * 	@property {Function} before 请求前执行方法
	 * 	@property {Function} success 请求成功执行方法
	 * 	@property {Function} fail 请求失败执行方法
	 * 	@property {Function} complete 回调函数（不论成功或失败都执行）
	 */
	getCurrentIsAdminBoolean : function(obj){
		// 参数
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 请求回调函数（不论请求成功或失败都执行）
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
		let UserId = user.getUserId();
		let MchId = organ.getIndustryId();
		if(!Boolean(UserId) || !Boolean(MchId)){
			if(typeof(success) === "function"){
				success(false , null);	
			}
			return;
		}
		uni.request({
			url: web.website + '/api/Share/CheckAdmin?userId=' + UserId + '&mchId=' + MchId,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				// 用户信息
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							success(result.data.Data , result.data.ResultMsg);
						}
						return;
					}
				}
				if(typeof(fail) === "function" ){
					fail(result);
				}
			},
			fail:function(errors){
				if(typeof(fail) === "function" ){
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
	/** 判断当前用户是否组织管理员
	 * @param {Object} obj
	 * 	@property {Number} mchId 组织id
	 * 	@property {Function} before 请求前执行方法
	 * 	@property {Function} success 请求成功执行方法
	 * 	@property {Function} fail 请求失败执行方法
	 * 	@property {Function} complete 回调函数（不论成功或失败都执行）
	 */
	getIsAdminBoolean : function(obj){
		// 参数
		let mchId;		// 组织id
		let before;		// 请求前执行方法
		let success;	// 请求成功后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 请求回调函数（不论请求成功或失败都执行）
		if(Boolean(obj)){
			mchId = Boolean(obj.mchId) ? obj.mchId :  organ.getIndustryId();
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		
		// 请求方法
		if(typeof(before) === "function"){
			before();
		}
		var UserId = user.getUserId();
		if(!Boolean(UserId) || !Boolean(mchId)){
			if(typeof(success) === "function"){
				success(false , null);	
			}
			return;
		}
		uni.request({
			url: web.website + '/api/Share/CheckAdmin?userId=' + UserId + '&mchId=' + mchId,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success: function(result) {
				// 用户信息
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							success(result.data.Data , result.data.ResultMsg);
						}
						return;
					}
				}
				if(typeof(fail) === "function" ){
					fail(result);
				}
			},
			fail:function(errors){
				if(typeof(fail) === "function" ){
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
	// ================================================================================================================================
}