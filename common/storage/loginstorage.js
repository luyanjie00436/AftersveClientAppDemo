/**
 * 登录信息的验证
 * @autho 陆彦捷
 @description  注：当前程序上登录名（loginName）和手机号（Mobile）部分，后期可能会分开（因为返回参数中没有loginName）
 */
import globalf from '@/common/function/globalfuc.js';	// 全局方法
module.exports ={
	/** 设置当前登录的信息
	 * @param {String} Mobile	手机号码
	 * @param {DateTime} ServerTime 系统响应的登录时间
	 * @param {String} Token	Token的值
	 * @param {String} TokenExp	Token的有效时间（单位s）
	 * @param {Number} UserId	用户UserId
	 * @param {String}   OpenId	微信OpenId
	 */
	setloginMessage: function(Mobile , ServerTime , Token , TokenExp ,UserId , OpenId = null){
		try{
			uni.setStorageSync("login:loginName", Mobile);		// 手机号码
		}catch(e){}
		try{
			uni.setStorageSync("login:serverTime",Date(ServerTime));	 // 服务时间
		}catch(e){}
		try{
			uni.setStorageSync("login:token", Token);			// Token值
		}catch(e){}
		try{
			uni.setStorageSync("login:tokenExp", TokenExp);		// Token的有效时间
		}catch(e){}
		try{
			uni.setStorageSync("login:userId", UserId);			// 用户UserId
		}catch(e){}
		try{
			uni.setStorageSync("login:openId", OpenId);			// 微信号
		}catch(e){}
	},
	/**
	 * 获取当期用户名
	 */
	getLoginName(){
		try{
			return uni.getStorageSync("login:loginName");
		}catch(e){
			return null;
		}
	},
	/**
	 * 获取当前手机号码
	 */
	getMobile(){
		try{
			return uni.getStorageSync("login:mobile");
		}catch(e){
			return null;
		}
	},
	/** 设置当前Token值
	 * @param {String} token
	 */
	setToken : function(token){
		uni.setStorageSync("login:token", token);			// Token值
	},
	/** 获取当前的Token值
	 * @return {String} Token值
	 */
	getToken: function(){
		try{
			return uni.getStorageSync("login:token");
		}catch(e){
			return null;
		}
	},
	/**
	 * 获取当前UserId
	 */
	getUserId(){
		try{
			return uni.getStorageSync("login:userId");
		}catch(e){
			return 0;
		}
	},
	/** 设置用户openId
	 * @param {Object} OpenId openId
	 */
	setOpenId : function(OpenId){
		uni.setStorageSync("login:openId",OpenId);
	},
	/**
	 * 返回用户openId
	 */
	getOpenId : function(){
		try{
			return uni.getStorageSync("login:openId");
		}catch(e){
			return null;
		}
	},
	/** 设置组织列表数量
	 * @param {Object} mchLength 数量
	 */
	setMchLength : function(mchLength){
		uni.setStorageSync("login:mchLength",mchLength);
	},
	/**
	 * 获取组织列表数量
	 */
	getMchLength : function(){
		try{
			return uni.getStorageSync("login:mchLength");
		}catch(e){
			return 0;
		}
	},
	/**
	 * 设置跳过此步骤为true
	 */
	setSkipTrue : function(){
		uni.setStorageSync("login:skip" , true);
	},
	/**
	 * 获取跳过此步骤值
	 */
	getSkip : function(){
		try{
			return uni.getStorageSync("login:skip");
		}catch(e){
			return false;
		}
	},
	/**
	 * 清除当前登录信息
	 */
	clearloginMessage: function(){
		// 用户名
		try{
			globalf.clearSingle("login:loginName" , "login");	// 用户名
			globalf.clearSingle("login:mobile" , "login");	// 手机号码
			globalf.clearSingle("login:serverTime" , "login");	// 系统响应的登录时间
			globalf.clearSingle("login:token" , "login");	// Token值
			globalf.clearSingle("login:tokenExp" , "login");	// Token的有效时间（单位s）
			globalf.clearSingle("login:userId" , "login");	// UserId
			globalf.clearSingle("login:openId" , "login");	// 清除openId
			globalf.clearSingle("login:mchLength" , "login");	// 清除用户包含的组织长度
			globalf.clearSingle("login:skip" , "login");	// 清除跳过创建/加入组织步骤
		}catch(e){
			console.error("清除login=>",e);
		}
	},
	/**
	 * 判断用户是否处于登录状态。（实际与Token、以及有效期有关，暂时只判断登录名）
	 * 注：由于本地时间与服务器时间差。这里不取本地这里不做
	 */
	isLogin(){
		try{
			// 判断获取值非空
			if( !Boolean(uni.getStorageSync("login:loginName")) && !Boolean(uni.getStorageSync("login:serverTime")) && !Boolean(uni.getStorageSync("login:tokenExp"))){
				return false;
			}
			// 获取或判断当前是否登录
			var loginName = uni.getStorageSync("login:loginName");
			var serverTime = new Date(uni.getStorageSync("login:serverTime"))  ;
			var tokenExp = uni.getStorageSync("login:tokenExp");
			var lastTime = new Date(uni.getStorageSync("login:serverTime")) ;
			 lastTime.setSeconds(lastTime.getMinutes() + tokenExp)  ;		// 当前时间，加上Token有效时间单位s
			return Boolean(loginName) &&  (new Date().setSeconds( new Date().getSeconds() + 100 ) >= serverTime ) && new Date() <= lastTime;
		}catch(e){
			console.log("isLogin=>" ,e);
			return false;
		}
	},
	
}