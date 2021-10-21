/**
 * 获取型号有关请求
 * @property {function} getListPage 分页获取型号
 * @event {Function()} getTree 获取格式化后的型号信息
 * @event {Function(obj)} getInfo 根据Id获取型号信息
 * @event {Function(obj)} addInfo 添加型号
 * @event {Function(obj)} updateInfo 更新型号
 * @event {Function(obj)} deleteInfo 删除型号
 */
import web from '@/common/variable/website.js';			// 网络
import publicF from '@/common/function/publicfunc.js';	// 通用方法
import changeobjF from '@/common/function/changeobjectecordname.js';	// 格式化数据
import login from '@/common/storage/loginstorage.js';	// 登录
module.exports ={
	/** 分页获取型号
	 * @param {Object} obj
	 * @property {Object} data 请求数据 
	 * @property {Function} before 请求前执行方法 
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行操作 
	 * @property {Function} complete 回调函数(不论成功或失败都执行) 
	 */
	getListPage : function(obj){
		// 参数
		let data ;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		//请求失败执行方法
		let complete;	// 回调函数
		
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求
		if(Boolean(data)){
			// 如果分类id为0 , 删除分类的categoryId对象
			if(!data.categoryId){
				delete data.categoryId;
			}
		}
		let params = publicF.urlEncode(data);
		if(!Boolean(params)){return;}
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url :web.website + '/api/SvcModel/Page?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success:function(result){
				if(result.statusCode === 200){
					if(result.data.ResultCode === "0"){
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
			fail:function(errors){
				if( typeof(fail) === "function" ){
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
	/** 获取型号（已格式化、不分页）
	 * @param {Object} obj
	 *  @property {Object} data 请求数据 
	 * @property {Function} before 请求前执行方法 
	 * @property {Function} success 请求成功后执行方法
	 * @property {Function} fail 请求失败后执行操作 
	 * @property {Function} complete 回调函数(不论成功或失败都执行) 
	 */
	getTree : function(obj){
		// 参数
		let data ;		//请求数据
		let before;		// 请求前执行方法
		let success;	// 请求后执行方法
		let fail;		// 请求失败后执行方法
		let complete;	// 回调函数
		
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求
		if(Boolean(data)){
			// 如果分类id为0 , 删除分类的categoryId对象
			if(!data.categoryId){
				delete data.categoryId;
			}
		}
		var params = publicF.urlEncode(data);
		if(!Boolean(params)){return;}
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url :web.website + '/api/SvcModel/Get?' + params,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success:function(result){
				if(result.statusCode === 200){
					if(result.data.ResultCode === "0"){
						if(typeof(success) === "function" ){
							success(changeobjF.change(result.data.Data, "ModelId", "Name") , result.data.ResultMsg);
						}
						return;
					}
				}
				if(typeof(fail) === "function" ){
					fail(result);
				}
			},
			fail:function(errors){
				if( typeof(fail) === "function" ){
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
	/** 根据id获取型号信息
	 * @param {Object} obj
	 *  @property {Number} id  型号id
	 *  @property {Function} before  请求前执行方法
	 *  @property {Function} success 请求成功执行方法
	 *  @property {Function} fail 请求失败执行方法
	 *  @property {Function} complete 回调函数
	 */
	getInfo : function(obj){
		// 参数
		let id ;		// 型号id
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
		// 请求方法
		if(typeof(before) === "function"){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcModel/Info/' + id,
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
	/** 添加型号
	 * @param {Object} obj
	 *  @property {Object} data  请求数据
	 *  @property {Function} before  请求前执行方法
	 *  @property {Function} success 请求成功执行方法
	 *  @property {Function} fail 请求失败执行方法
	 *  @property {Function} complete 回调函数
	 */
	addInfo : function(obj){
		let data ;			// 请求数据
		let before;			// 请求前执行方法
		let success;		// 请求成功执行方法
		let fail;			// 请求失败执行方法
		let complete;		// 回调函数
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
			url: web.website + '/api/SvcModel/Add',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data : data,
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
	/** 更新型号
	 * @param {Object} obj
	 *  @property {Object} data  请求数据
	 *  @property {Function} before  请求前执行方法
	 *  @property {Function} success 请求成功执行方法
	 *  @property {Function} fail 请求失败执行方法
	 *  @property {Function} complete 回调函数
	 */
	updateInfo : function(obj){
		// 参数
		let data ;		// 请求数据
		let before;		// 请求前执行方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败方法
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
			url: web.website + '/api/SvcModel/Update',
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			data: data,
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
	/** 删除型号
	 * @param {Object} obj
	 *  @property {Int} id  型号id
	 *  @property {Function} before  请求前执行方法
	 *  @property {Function} success 请求成功执行方法
	 *  @property {Function} fail 请求失败执行方法
	 *  @property {Function} complete 回调函数
	 */
	deleteInfo : function(obj){
		let id ;				// 型号id
		let before;				// 请求前执行方法
		let success;			// 请求成功执行方法
		let fail;				// 请求失败执行方法
		let complete;			// 完成时执行方法
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
			url: web.website + '/api/SvcModel/Delete/' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
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
	}
	// ==========================================================================================================================
}