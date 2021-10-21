/**
 * 当前组织信息
 * @autho 陆彦捷
 * @description  获取当前的用户信息
 */

module.exports ={
	/** 设置当前组织id
	 * @param {Object} id
	 */
	setIndustryId : function(id){
		uni.setStorageSync("organ:id", id);
	},
	/**
	 * 获取当前组织id
	 */
	getIndustryId: function(){
		try{
			return uni.getStorageSync("organ:id");
		}catch(e){
			return 0;
		}
	},
	/** 设置当前组织名称
	 * @param {Object} name
	 */
	setTopName : function(name){
		return uni.getStorageSync("organ:topName" , name);
	},
	/**
	 * 获取当前组织名称
	 */
	getTopName : function(){
		try{
			return uni.getStorageSync("organ:topName");
		}catch(e){
			return null;
		}
	},
	/**
	 * 设置当前门店id	 
	 * @param {Object} id 门店id
	 */
	setBranchId : function(id){
		uni.setStorageSync("organ:branchid", id);
	},
	/**
	 * 获取当前门店id
	 */
	getBranchId : function(){
		try{
			return uni.getStorageSync("organ:branchid");
		}catch(e){
			return 0;
		}
	},
	/** 设置当前门店名称
	 * @param {Object} name 门店名称
	 */
	setName : function(name){
		uni.setStorageSync("organ:name",name);
	},
	/**
	 * 获取当前门店名称
	 */
	getName: function(){
		try{
			return uni.getStorageSync("organ:name");
		}catch(e){
			return null;
		}
	},
	/** 设置当前门店地址
	 * @param {Object} address 门店地址
	 */
	setAddress : function(address){
		uni.setStorageSync("organ:address",address);
	},
	/**
	 * 获取当前门店名称
	 */
	getAddress: function(){
		try{
			return uni.getStorageSync("organ:address");
		}catch(e){
			return null;
		}
	},
	/** 设置当前（组织/门店）是否为商户
	 * @param {Boolean} isCust
	 */
	setIsCust : function(isCust){
		uni.setStorageSync("organ:isCus",isCust);
	},
	/**
	 * 获取当前（组织/门店）是否为商户
	 */
	getIsCust : function(){
		try{
			return uni.getStorageSync("organ:isCus");
		}catch(e){
			return false;
		}
	},
	/** 设置当前（组织/门店）是否为厂商
	 * @param {Boolean} isSup
	 */
	setIsSup : function(isSup){
		uni.setStorageSync("organ:isSup",isSup);
	},
	/**
	 * 获取当前（组织/门店）是否为厂商
	 */
	getIsSup : function(){
		try{
			return uni.getStorageSync("organ:isSup");
		}catch(e){
			return false;
		}
	},
	/** 设置当前（组织/门店）是否为服务商
	 * @param {Boolean} isSvc
	 */
	setIsSvc : function(isSvc){
		uni.setStorageSync("organ:isSvc",isSvc);
	},
	/**
	 * 设置当前（组织/门店）是否为服务商
	 */
	getIsSvc: function(){
		try{
			return uni.getStorageSync("organ:isSvc");
		}catch(e){
			return false;
		}
	},	
	/** 设置当前组织
	 * @param {Object} organ
	 */
	setCurrentOrg :function(organ){
		uni.setStorageSync("organ:current" , organ);
	},
	/**
	 * 获取当前组织
	 */
	getCurrentOrg : function(){
		try{
			return uni.getStorageSync("organ:current");
		}catch(e){
			return null;
		}
	},
	/** 设置当前门店
	 * @param {Object} branch 门店信息
	 */
	setCurrentBranch :function(branch){
		uni.setStorageSync("organ:currentBranch" , branch);
	},
	/**
	 * 获取当前门店
	 */
	getCurrentBranch : function(){
		try{
			return uni.getStorageSync("organ:currentBranch");
		}catch(e){
			return null;
		}
	},
	/** 设置当前用户的组织列表
	 * @param {Array} organs
	 */
	setmyOrgans : function(organs){
		uni.setStorageSync("organ:mylist" , organs);
	},
	/**
	 * 获取当前用户的组织列表
	 */
	getmyOrgans :function(){
		try{
			return uni.getStorageSync("organ:mylist");
		}catch(e){
			return null;
		}
	},
	/**设置完整组织架构
	 * @param {Object} datas 组织架构数据
	 */
	setFullOrg : function(datas){
		uni.setStorageSync("organ:fullOrg" , datas);
	},
	/**
	 * 获取完整组织架构
	 */
	getFullOrg : function(){
		try{
			return uni.getStorageSync("organ:fullOrg");
		}catch(e){
			return null;
		}
	},
	/**
	 * 清除当前组织信息
	 */
	clear : function(){
		try{
			uni.clearStorageSync("organ:id");		// 组织id
			uni.clearStorageSync("organ:branchid");	// 门店id
			uni.clearStorageSync("organ:name");		// 组织名称
			uni.clearStorageSync("organ:isCus");		// 是否为商户
			uni.clearStorageSync("organ:isSup");		// 是否为厂商
			uni.clearStorageSync("organ:isSvc");		// 是否为服务商
			uni.clearStorageSync("organ:current");		// 组织信息
			uni.clearStorageSync("organ:currentBranch");	// 门店信息
			uni.clearStorageSync("organ:mylist");			// 当前用户的组织列表
			uni.clearStorageSync("organ:fullOrg");			// 当前组织机构树
		}catch(e){
			console.error("清除本地当前组织信息失败=>",e);
		}
	}
}