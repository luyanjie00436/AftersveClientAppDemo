/**
 * 与组织有
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
	// 客户类型列表
	merType:[{
			value: 0,
			text: mylang.merchant.merchant.typeCus
		},
		{
			value: 1,
			text: mylang.merchant.merchant.typeSup
		},
		{
			value: 2,
			text: mylang.merchant.merchant.typeSvc
		},
	]
}
