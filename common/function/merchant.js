/**
 * 组织、门店、部门的公用方法
 * @author 陆彦捷
 *@property {function} getManagesName 返回负责人名称数组 
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
		mylang = zhCN;
		break;
}

module.exports = {
	/**返回负责人名称数组
	 * @param {Arrary} stafflist 员工信息数组
	 * @param {Arrary} managerIds 负责人Id数组
	 * @return {Array} 负责人名称数组
	 */
	getManagesName : function(stafflist , managerIds){
		var tempNames = [];
		if(!Boolean(stafflist) || !Boolean(managerIds)){return tempNames};
		if(stafflist.length === 0|| managerIds.length == 0){return tempNames};
		managerIds.forEach(id =>{
			var temp = stafflist.find(item=>{
				return id == item.StaffId;
			});
			if(Boolean(temp.Name)){
				tempNames.push(temp.Name);
			}
		});
		return tempNames;
	},
	/**返回商户类型
	 * @param {Array} types 商户类型（目前传值0,1,2）
	 * @return {Array} 商户类型数组
	 */
	getTypesName : function(types){
		var array = [];
		var a = types.includes(0);
		var b = types.includes(1);
		var c = types.includes(2);
		if(types.includes(0)){
			array.push(mylang.merchant.merchant.typeCus); 
		}
		if(types.includes(1)){
			array.push(mylang.merchant.merchant.typeSup); 
		}
		if(types.includes(2)){
			array.push(mylang.merchant.merchant.typeSvc); 
		}
		return array;
	}
}