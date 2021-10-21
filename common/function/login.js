/**
 * 登录的方法
 * @author 陆彦捷
 * @property {function} login_after 登录的后续操作及判断（登录、注册（后续可能）、绑定后返回的数据）
 */
import login from '@/common/storage/loginstorage.js';		// 登录
import organ from '@/common/storage/organstorage.js';		// 组织
import user from '@/common/storage/userstorage.js';			// 用户
import staff from '@/common/storage/staffstorage.js'
import merchantR from '@/common/request/merchant.js';		// 组织请求
module.exports ={
	/**
	 * 退出登录的后续操作（清除storage）
	 */
	login_exit_after : function(){
		// 跳转到登录页
		// #ifdef MP-WEIXIN
		uni.navigateTo({
			url: '/pages/login/login-weixin/login-weixin'
		});
		// #endif
		// #ifndef MP-WEIXIN
		uni.navigateTo({
			url: '/pages/login/login'
		});
		// #endif
	}
}