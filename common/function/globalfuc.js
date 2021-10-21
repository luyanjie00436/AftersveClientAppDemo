/**
 * 全局方法
 * @author 陆彦捷
 * @date 2021.07.08 同步清除本地单个缓存clearSingle
 */

module.exports ={
	/** 全局清除单个缓存
	 * @param {Object} name	缓存名称
	 * @param {Object} groupName 缓存对应的组名称（如login、organ等）
	 */
	clearSingle : function(name ,groupName){
		try{
			uni.clearStorageSync(name);		// 用户名
		}catch(e){
			//TODO handle the exception
			console.error("清除" + groupName + "=>",e);
		}
	},
	
}