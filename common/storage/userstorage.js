/**
 * 当前用户信息
 * @autho 陆彦捷
 * @description  设置和获取当前用户信息
 */
module.exports ={
	/** 设置当前用户id
	 * @param {Object} id
	 */
	setUserId : function(id){
		uni.setStorageSync("user:id", id);
	},
	/**
	 * 获取当前用户id
	 */
	getUserId : function(){
		try{
			return uni.getStorageSync("user:id");
		}catch(e){
			return 0;
		}
	},
	/** 设置用户的姓名
	 * @param {String} name 姓名
	 */
	setName : function(name){
		uni.setStorageSync("user:name", name);
	},
	/**
	 * 返回用户的姓名
	 */
	getName : function(){
		try{
			return uni.getStorageSync("user:name");
		}catch(e){
			return null;
		}
	},
	/** 设置当前用户登录名
	 * @param {string} login_name 登录名
	 */
	setLoginName :function (login_name){
		uni.setStorageSync("user:login_name",login_name);
	},
	/**
	 * 返回当前用户登录名
	 */
	getLoginName: function(){
		try{
			return uni.getStorageSync("user:login_name");
		}catch(e){
			return null;
		}
	},
	/** 设置用户绑定手机号
	 * @param {String} mobile
	 */
	setMobile: function(mobile){
		uni.setStorageSync("user:mobile",mobile);
	},
	/**
	 * 获取用户绑定手机号
	 */
	getMobile : function(){
		try{
			return uni.getStorageSync("user:mobile");
		}catch(e){
			return null;
		}
	},
	/** 设置当前用户的头像路径
	 * @param {string} avatar 当前用户头像的路径
	 */
	setAvatar : function(avatar){
		uni.setStorageSync("user:avatar",avatar);
	},
	/**
	 * 获取当前用户的头像路径
	 */
	getAvatar : function(){
		try{
			return uni.getStorageSync("user:avatar");
		}catch(e){
			return null;
		}
	},
	/**
	 * 清除用户信息
	 */
	clearUser : function (){
		try{
			uni.clearStorageSync("user:id");
			uni.clearStorageSync("user:name");
			uni.clearStorageSync("user:login_name");
			uni.clearStorageSync("user:mobile");
			uni.clearStorageSync("user:avatar");
		}catch(e){
			console.error("清除本地信息失败")
		}
	}
}