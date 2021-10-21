/**
 * 当前员工
 */
import globalf from '@/common/function/globalfuc.js';	// 全局方法
module.exports = {
	/** 设置当前员工id
	 * @param {Object} id
	 */
	setId : function(id){
		uni.setStorageSync("staff:id", id);
	},
	/**
	 * 获取当前员工id
	 */
	getId : function(){
		try{
			return uni.getStorageSync("staff:id");
		}catch(e){
			return 0;
		}
	},
	/**
	 * 清除staff
	 */
	clear : function (){
		try{
			globalf.clearSingle("staff:id" , "staff");	// 用户名
		}catch(e){
			console.error("清除staff=>",e);
		}
	}
}