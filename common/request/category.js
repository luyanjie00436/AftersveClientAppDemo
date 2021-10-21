/**
 * 获取分类信息请求
 * @author 陆彦捷
 * @property {Function} getTrees 获取当前商户的分类-树形图结构
 * @property {Function} getTreesFormat 获取当前商户的分类(格式化后的树形结构图)
 * @property {Function} deleteInfo 删除当前分类id
 * @property {Function} getCustomerTree 获取客户的设备分类
 */
import web from '@/common/variable/website.js';			// 服务器路径
import publicF from '@/common/function/publicfunc.js';		// 请求数据
import changeobjF from '@/common/function/changeobjectecordname.js';	// 格式化后的值
import login from '@/common/storage/loginstorage.js';	// 登录
module.exports = {
	/** 获取当前商户的分类-树形图结构
	 * @param {Object} obj
	 * 	@property {Object} data 请求数据
	 *  @property {Function} before 请求前执行方法 
	 *  @property {Function} success 请求成功后执行方法 
	 *  @property {Function} fail 请求失败后执行方法 
	 *  @property {Function} complete 请求回调函数（不论成功、失败都执行） 
	 */
	getTrees : function(obj){
		let mchId;			// 商户Id
		let before ;		// 请求前方法
		let success;		// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 请求回调函数（不论成功或失败都执行的方法）
		if(Boolean(obj)){
			mchId = Boolean(obj.mchId) ? obj.mchId : 0;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcCategory/Tree?mchId=' + mchId,
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
	/** 获取当前商户的分类(格式化后的树形结构图)
	 * @param {Object} obj
	 * 	@property {Object} data 请求数据
	 *  @property {Function} before 请求前执行方法 
	 *  @property {Function} success 请求成功后执行方法 
	 *  @property {Function} fail 请求失败后执行方法 
	 *  @property {Function} complete 请求回调函数（不论成功、失败都执行） 
	 */
	getTreesFormat : function(obj){
		// 参数
		let data;		// 请求数据
		let before;		// 请求前方法
		let success;	// 请求成功执行方法
		let fail;		// 请求失败执行方法
		let complete;	// 请求回调函数（不论成功或失败都执行的方法）
		if(Boolean(obj)){
			data = obj.data;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		// 请求数据
		var params = publicF.urlEncode(data);
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcCategory/Tree?' + params ,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'GET',
			success:function(result){
				if(result.statusCode === 200){
					if(result.data.ResultCode === "0"){
						if(typeof(success) === "function" ){
							success(changeobjF.change(result.data.Data, "CategoryId", "Name", "Children") ,result.data.ResultMsg);
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
	/** 删除当前分类id
	 * @param {Object} obj
	 * 	@property {Number} id 分类Id
	 *  @property {Function} before 请求前执行方法 
	 *  @property {Function} success 请求成功后执行方法 
	 *  @property {Function} fail 请求失败后执行方法 
	 *  @property {Function} complete 请求回调函数（不论成功、失败都执行） 
	 */
	deleteInfo: function(obj) {
		// 参数
		let  id;		// 设备分类id
		let before;		// 请求前执行方法
		let success ;	// 请求成功执行方法
		let fail ;		// 请求失败执行方法
		let complete ;	// 请求回调函数
		if(Boolean(obj)){
			id = Boolean(obj.id)? obj.id : 0 ;
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
			url: web.website + '/api/SvcCategory/Delete/' + id,
			header: {
				Authorization: 'Bearer ' + login.getToken()
			},
			method: 'POST',
			success: function(result) {
				if (result.statusCode == 200) {
					if (result.data.ResultCode == "0") {
						if(typeof(success) === "function"){
							success(result.data.Data, result.data.ResultMsg);
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
					fail(erros);
				}
			},
			complete:function(){
				if(typeof(complete) === "function"){
					complete();
				}
			}
		})
	},
	// =================================== 客户设备分类 =============================================================
	/** 获取客户的设备分类-树形图结构
	 * @param {Object} obj
	 * 	@property {Number} mchId 商户id
	 *  @property {Function} before 请求前执行方法 
	 *  @property {Function} success 请求成功后执行方法 
	 *  @property {Function} fail 请求失败后执行方法 
	 *  @property {Function} complete 请求回调函数（不论成功、失败都执行） 
	 */
	getCustomerTree : function(obj){
		let mchId		// 商户Id
		let before;		// 请求前方法
		let success ;	// 请求成功执行方法
		let fail ;		// 请求失败执行方法
		let complete ;	// 请求回调函数（不论成功或失败都执行的方法）
		if(Boolean(obj)){
			mchId = Boolean(obj.mchId) ? obj.mchId : 0;
			before = obj.before;
			success = obj.success;
			fail = obj.fail;
			complete = obj.complete;
		}
		if(typeof(before) === "function" ){
			before();
		}
		uni.request({
			url: web.website + '/api/SvcCategory/CustTree?customId=' + mchId,
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
	// ==============================================================================================================
}