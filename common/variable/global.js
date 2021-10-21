/**
 * 全局变量
 * @autho 陆彦捷 
 * @description  全局变量的引用文件
 * @property {String} website 请求的地址
 * @property {Object} static 图片的路径
 * // 方法类
 * @property {Object} publicF 一些通用的方法
 * @property {Object} changeobjF 格式化数据
 * @property {Object} filterobjF 过滤obj值
 * @property {Object} loginF 登录公共方法 
 * @property {Object} merchantF 组织、门店、部门的公共方法
 * @property {Object} repairF 报障的公共方法 
 * @property {Object} repairOrderF 工单公共方法
 * // 测试数据
 * @property {Object} grids 目录或功能索引的宫格
 * @property {Object} params 一些组件的常用参数
 * @property {Object} mylist 我的页面-列表
 * @property {Object} rules 验证规则
 * @property {Object} merchant 组织
 * @property {Object} problems 常见问题
 * @property {Object} orders 工单信息
 * // 本地缓存
 * @property {Object} login 登录:本地登录缓存数据的设置或获取方法集合
 * @property {Object} organ 组织：本地组织缓存数据的设置或获取方法集合
 * @property {Object} user 个人：本地个人缓存数据的设置或获取方法集合
 * @property {Object} staff 员工：本地个人缓存数据的设置或获取方法集合
 * // 页面请求
 * @property {Object} imgR 图片
 * @property {Object} login 登录等请求
 * @property {Object} userR 用户
 * @property {Object} merchantR 请求组织/商户/门店
 * @property {Object} departmentR 部门
 * @property {Object} staffR 员工
 * @property {Object} msgR 通知 
 * @property {Object} industryR 行业
 * @property {Object} areaR 地区
 * @property {Object} mchCustomerR 客户
 * @property {Object} categoryR 分类 
 * @property {Object} brandR 品牌 
 * @property {Object} modelR  型号
 * @property {Object} productR 产品 
 * @property {Object} deviceR 设备 
 * @property {Object} repairOrderR 工单 
 */
// import i18n from ''
import web from '@/common/variable/website.js';			// 存放请求服务器地址
import statics from '@/common/variable/imgPath.js';		// static的相对路径
// 方法类
import publicF from '@/common/function/publicfunc.js';		// 一些公用的方法
import changeobjF from '@/common/function/changeobjectecordname.js'; // 格式化值
import filterobjF from '@/common/function/filterobject.js';			// 过滤obj值
import loginF from '@/common/function/login.js';	// 登录公用方法
import merchantF from '@/common/function/merchant.js';		// 组织的宫格方法
import repairF from '@/common/function/repair.js';			// 报障的公共方法
import repairOrderF from '@/common/function/repairOrderFunction.js';	// 工单公用方法
// 测试数据
import grids from '@/common/data/grids.js';				// 宫格的列表内容
import params from '@/common/data/compent_params.js';	// 组件参数
import mylist from '@/common/data/my_list.js';			// 我的页面列表
import rules from '@/common/data/rules.js';			// 验证规则
import status from '@/common/data/status.js';		// 申请状态
import merchants from '@/common/data/merchant.js';		// 组件
import problems from '@/common/data/problem.js';		// 常见问题
import orders from '@/common/data/order.js';			// 工单信息
import messages from '@/common/data/msg.js';			// 请求数据
// 本地缓存
import login from '@/common/storage/loginstorage.js';		// 登录
import organ from '@/common/storage/organstorage.js';		// 组织
import user from '@/common/storage/userstorage.js';			// 人员
import staff from '@/common/storage/staffstorage.js';		// 员工
// 页面请求事件
import imgR from '@/common/request/img.js';					// 图片请求
import loginR from '@/common/request/login.js';				// 登录等请求
import userR from '@/common/request/user.js';				// 用户
import merchantR from '@/common/request/merchant.js';		// 组织、商户、门店
import departmentR from '@/common/request/department.js';	// 部门
import staffR from '@/common/request/staff.js';				// 员工
import msgR from '@/common/request/msg.js';					// 通知请求
import industryR from '@/common/request/industry.js';		// 行业
import areaR from '@/common/request/area.js';				// 地区
import mchCustomerR from '@/common/request/mchCustomer.js';	// 客户请求
import productR from '@/common/request/product.js';			// 产品请求
import categoryR from '@/common/request/category.js';		// 分类
import brandR from '@/common/request/brand.js';				// 品牌
import modelR from '@/common/request/model.js';				// 型号
import deviceR from '@/common/request/device.js';			// 设备
import repairOrderR from '@/common/request/repairorder.js';	// 工单
module.exports = {
	maxrequest : 10 ,			// 连续请求最多次数10次
	website: web.website,		// 映射修改
	statics,					// 相对static路径
	// 方法类
	publicF ,			// 公用的方法
	changeobjF ,		// 格式化值
	filterobjF,			// 过滤obj值
	loginF ,			// 登录公用方法
	merchantF,			// 组织的公共方法
	repairF,			// 报障的公共方法
	repairOrderF ,		// 工单公用方法
	// 测试数据
	grids ,				// 目录或功能索引的宫格
	params,				// 参数
	mylist,				// 我的页面-列表
	rules ,				// 验证规则
	status,				// 申请状态
	merchants,			// 组织
	problems,				// 常见问题
	orders ,				// 工单信息
	messages,				// 消息
	// 页面的storage及其引用
	login,			// 登录地址
	organ ,			// 组织
	user,			// 个人
	staff,			// 员工
	// 页面的请求事件
	imgR  ,				// 图片请求
	loginR,				// 登录等请求
	userR,				// 用户
	merchantR ,		// 组织、商户、门店
	departmentR,			// 部门
	staffR ,			// 员工
	msgR,				// 通知
	industryR,		// 行业
	areaR,			// 地区
	mchCustomerR,	// 客户
	categoryR,		// 分类
	brandR,			// 品牌
	modelR ,		// 型号信息
	productR,		// 产品请求
	deviceR  ,		// 设备信息
	repairOrderR,	// 工单
}