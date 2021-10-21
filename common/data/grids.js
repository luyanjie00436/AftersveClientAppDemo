/**
 * 目录的宫格索引
 */
import lang from '@/common/variable/lang.js'; // 语言
import zhCN from '../../utils/lang/zh-Cn.js';		// 中文
var mylang ;
// 根据配置文件选择语言
switch (lang.locale) {
	case 'zh-CN':
		mylang = zhCN;
		break;
	default:
		mylang = zhCN;;
		break;
}

module.exports = {
	system_list: [{
			title: '成员管理',
			cur: 'applications',
			bgColor: 'bg-blue light', // 背景颜色
			color: 'blue',
			title_show: false,
			showAll: false,
			colNumber: 3, // 显示的列数
			iconsList: [{
					cuIcon: 'group_fill',
					color: 'blue',
					name: mylang.merchant.nameArch,
					url: '/pages_basic/orgation/organtion'
				},
				{
					cuIcon: 'friendadd',
					color: 'blue',
					name: '新成员申请',
					url:'/pages_basic/staff/staffapplylist?preview=true'
				},
				{
					cuIcon: 'friendaddfill',
					color: 'blue',
					name: '邀请新成员',
					exec: 'invite'
				},
			]
		},
		{
			title: '基础数据',
			cur: 'basic',
			bgColor: '', // 背景颜色
			color: 'blue',
			title_show: true,
			showAll: false,
			colNumber: 5, // 显示的列数
			iconsList: [{
					cuIcon: 'text',
					color: 'yellow',
					name: '基本信息',
					url: '/pages_basic/orgation/orgationdetail?preview=true'
				},
				{
					cuIcon: 'peoplelist',
					color: 'blue',
					name: '员工管理',
					url: '/pages_basic/staff/stafflist?preview=true'
				},

			]
		}, {
			title: mylang.product.productSummary,
			cur: 'goods',
			bgColor: '', // 背景颜色
			color: 'blue',
			title_show: true,
			showAll: false,
			colNumber: 5, // 显示的列数
			iconsList: [{
					cuIcon: 'list',
					color: 'yellow',
					name: mylang.product.categoryManage,
					url: '/pages_basic/product/producttype/home?preview=true'
				},
				{
					cuIcon: 'goodsnew',
					color: 'blue',
					name: mylang.product.modelManage,
					url: '/pages_basic/product/productmodel/home?preview=true'
				},
				{
					cuIcon: 'shake',
					color: 'olive',
					name: mylang.product.deviceManage,
					url: '/pages_basic/product/product/home?preview=true'
				},
				{
					cuIcon: 'questionfill',
					color: 'yellow',
					name: mylang.product.problemMange,
					url: '/pages_basic/product/problem/home?preview=true'
				}
			]
		}		
	], 
	// 产品目录的列表
	product_list: [{
		title: mylang.product.productSummary,
		cur: 'goods',
		bgColor: '', // 背景颜色
		color: 'blue',
		title_show: false,
		showAll: false,
		colNumber: 5, // 显示的列数
		iconsList: [{
				// 分类
				cuIcon: 'list',
				color: 'yellow',
				name: mylang.product.categoryManage,
				url: '/pages_basic/product/producttype/home?preview=true'
			},
			{
				// 模型
				cuIcon: 'goodsnew',
				color: 'blue',
				name: mylang.product.modelManage,
				url: '/pages_basic/product/productmodel/home?preview=true'
			},
			{
				// 设备
				cuIcon: 'shake',
				color: 'olive',
				name: mylang.product.deviceManage,
				url: '/pages_basic/product/device/home?preview=true'
			},
			{
				// 问题
				cuIcon: 'questionfill',
				color: 'yellow',
				name: mylang.product.problemMange,
				url: '/pages_basic/product/problem/home?preview=true'
			}
		]
	}, ], //  列表显示项
}
