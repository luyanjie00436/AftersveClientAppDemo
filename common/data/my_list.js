import lang from '@/common/variable/lang.js'; // 语言
import zhCN from '../../utils/lang/zh-Cn.js'; // 中文
var mylang;
// 根据配置文件选择语言
switch (lang.locale) {
	case 'zh-CN':
		mylang = zhCN;
		break;
	default:
		mylang = zhCN;;
		break;
}
/**
 * 对象参数说明
 * @property {Boolean} hasMerch 
 * 	@value true 当前item在包含当前组织时显示
 *  @value false 当前item在不包含当前组织时显示
 *  @value null 不论是否包含组织，都显示
 * @property {Boolean} isAdmin
 *  @value true 当前item是管理员时显示
 *  @value false 当前item不是管理员时显示
 *  @value null 当前item 无论是否管理员都显示
 */
let mylist = [
	[{
			// 加入组织/门店
			title: mylang.merchant.joinName,
			to: '/pages_basic/orgation/orgation_createOrJoin',
			hasMerch: false,
			isAdmin : null
		},
		{
			// 切换组织/门店
			title: mylang.merchant.switchName,
			to: '/pages_basic/orgation/orgation_switch',
			hasMerch: null,
			isAdmin : null
		},
		{
			// 我的组织
			title: mylang.merchant.nameMy,
			to: '/pages_basic/orgation/orgationdetail',
			hasMerch: true,
			isAdmin: null
		},
		{
			// 组织架构
			title: mylang.merchant.nameArch,
			to: '/pages_basic/orgation/organtion',
			hasMerch: true,
			isAdmin : null
		},
	],
	
	[{
		// 客户列表
		title: mylang.mchCustomer.nameMange,
		to: '/pages_basic/customer/customerlist',
		hasMerch: true,
		isAdmin: null,
		isCust : false,
		isSup : true,
		isSvc : true,
	}],
	
	[
		{
			// 员工列表
			title: mylang.staff.manageName,
			to: '/pages_basic/staff/stafflist',
			hasMerch: true,
			isAdmin: true
		},
		{
			// 员工个人信息
			title: mylang.staff.mydetail,
			to: '/pages_basic/staff/staffdetail',
			hasMerch: true,
			isAdmin: null
		},
		
		{
			// 成员申请审核列表
			title: mylang.staff.applylist,
			to: '/pages_basic/staff/staffapplylist',
			hasMerch: true,
			isAdmin: true
		},
		{
			// 邀请新成员
			title: mylang.staff.invitionName,
			to: '/pages_basic/staff/staffinvition',
			hasMerch: true,
			isAdmin: null
		}
	],
	
	[
		{
			// 品牌
			title: mylang.product.brandMange,
			to: '/pages_basic/product/brand/brandlist',
			hasMerch: true,
			isAdmin: null,
		},
		{
			// 设备分类
			title: mylang.product.categoryManage,
			to: '/pages_basic/product/producttype/home',
			hasMerch: true,
			isAdmin: null
		},
		{
			// 型号
			title: mylang.product.modelManage,
			to: '/pages_basic/product/productmodel/home',
			hasMerch: true,
			isAdmin: null
		},
		{
			// 产品
			title: mylang.product.productManage,
			to: '/pages_basic/product/product/home',
			hasMerch: true,
			isAdmin: null,
			isCust : false,
			isSup : true,
			isSvc : true,
		},
		{
			// 设备
			title: mylang.product.deviceManage,
			to: '/pages_basic/product/device/home',
			hasMerch: true,
			isAdmin: null
		},
		{
			// 常见问题
			title: mylang.product.problemMange,
			to: '/pages_basic/product/problem/home',
			hasMerch: true,
			isAdmin: null
		}
	],
	
	[
		{
			// 修改密码
			title: mylang.login.changePassword,
			to: '/pages_basic/my/changepassword',
			hasMerch: null,
			isAdmin: null
		}
	]

]

export default mylist;
