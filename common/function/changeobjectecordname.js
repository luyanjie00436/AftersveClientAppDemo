/**
 * 修改字段名
 * @autho 陆彦捷
 * @description  循环修改数组或对象的字段名。(为了适配data-com系列控件值 ，修改当前和children对应的名称)
 * @property {Function} change 循环修改数组或对象字段名 
 * @property {Function} changeValeAndtext 递归修改value\text\children
 * @property {Function} changetoLabel 修改对象/数组 所有labelName名称为label
 * @property {Function} changetoLabel_rescusive 递归修改所有labelName 名称为label (这里子级的固定名称为children)
 * @property {Function} changetree_array 递归修改数组的值（用于xiaolu-tree）
 * @property {Function} changetree 递归修改对象的值（用于xiaolu-tree）
 */
module.exports = {
	
	/** 循环修改数组或对象字段名
	 * @param {Object} obj	数组/ 对象 (暂时不做类型验证)
	 * @param {Object} valueName	value对应的属性名
	 * @param {Object} textName		text对应的属性名
	 * @param {Object} childrenName children对应的属性名
	 */
	change: function(obj, valueName = 'value', textName = 'text', childrenName = 'children') {
		//  深拷贝对象(有缺陷，暂时这么用) + 修改children属性名 
		var newData = JSON.parse(JSON.stringify(obj));
		//  属性值(修改属性值)
		if (newData.length == undefined) {
			// 传递的obj类型为对象
			this.changeValeAndtext(newData, valueName, textName , childrenName)
		} else {
			// 传递的obj类型为数组
			for(var i = 0 ; i < newData.length ; i ++){
				this.changeValeAndtext(newData[i], valueName, textName, childrenName);
			}
		}
		return newData;
	},
	
	/** 递归修改value\text\children
	 * @param {Object} object 对象
	 * @param {Object} valueName 原value属性名
	 * @param {Object} textName 原text属性名
	 */
	changeValeAndtext(object, valueName = 'value', textName = 'text' , childrenName = 'children') {
		// 修改value、text、chilren名
		if (valueName != 'value') {
			object["value"] = object[valueName] || object["value"] || '';
			delete object[valueName];
		}
		if (textName != 'text') {
			object['text'] = object[textName] || object ['text'] || '';
			delete object[textName];
		}
		if(childrenName != 'children'){
			object['children'] = object[childrenName] || object["children"] || [];
			delete object[childrenName];
		}
		if(!Boolean(object.children) ){ return;}		// 不存在children时，返回
		if(object.children.length == 0) {return;}	// children值为0时，返回
		// 递归修改chidren
		for(var i = 0 ; i < object.children.length ; i ++){
			this.changeValeAndtext(object.children[i], valueName, textName, childrenName);
		}
	},
	/**
	 * 修改对象/数组 所有labelName名称为label
	 * @param {type}  obj
	 * @param {type}  labelName
	 */
	changetoLabel : function(obj , labelName = 'label'){
		//  深拷贝对象(有缺陷，暂时这么用) + 修改children属性名
		var newData = JSON.parse(JSON.stringify(obj));
		//  属性值(修改属性值)
		if (newData.length == undefined) {
			// 传递的obj类型为对象
			this.changetoLabel_rescusive(newData, labelName)
		} else {
			// 传递的obj类型为数组
			for(var i = 0 ; i < newData.length ; i ++){
				this.changetoLabel_rescusive(newData[i], labelName);
			}
		}
		return newData;
	},
	/**
	 * 递归修改所有labelName 名称为label (这里子级的固定名称为children)
	 * @param {type}  obj
	 * @param {type}  labelName
	 */
	changetoLabel_rescusive : function(obj , labelName = 'label'){
		// 修改 label名
		if (labelName != 'label') {
			obj["label"] = obj[labelName] || obj["label"] || '';
			delete obj[labelName];
		}
		if(Boolean(obj.children)){return;}			// 不存在children时，返回
		if(obj.children.length == 0){return;}		// children长度为0 ，返回
		// 递归修改chidren
		for(var i = 0 ; i < obj.children.length ; i ++){
			this.changetoLabel_rescusive(obj.children[i], labelName);
		}
	},
	/** 递归修改数组的值（用于xiaolu-tree）
	 * @param {Object} obj	需要修改的数组或对象
	 * @param {String} idName id列对应的名称（默认id）
	 * @param {String} nameName name列对应的名称（默认name）
	 * @param {String} childrenName children列对应的名称（children）
	 */
	changetree_array : function(obj ,idName = 'id'  , nameName = 'name' ,childrenName = 'children'  ){
		//  深拷贝对象(有缺陷，暂时这么用) + 修改children属性名
		var newData = JSON.parse(JSON.stringify(obj));
		//  属性值(修改属性值)
		if (newData.length == undefined) {
			// 传递的obj类型为对象
			this.changetree(newData, idName, nameName , childrenName)
		} else {
			// 传递的obj类型为数组
			for(var i = 0 ; i < newData.length ; i ++){
				this.changetree(newData[i], idName, nameName, childrenName);
			}
		}
		return newData;
	},
	/** 递归修改对象的值（用于xiaolu-tree）
	 * @param {Object} object	需要修改的对象
	 * @param {String} idName id列对应的名称
	 * @param {String} nameName name列对应的名称
	 * @param {String} childrenName children列对应的名称
	 */
	changetree : function (object , idName = 'id' , nameName = 'name' , childrenName = 'children'){
		// 修改value、text、chilren名
		if (idName != 'id') {
			object["id"] = object[idName] || object["id"] || '';
			delete object[idName];
		}
		if (nameName != 'name') {
			object['name'] = object[nameName] || object ['name'] || '';
			delete object[nameName];
		}
		if(childrenName != 'children'){
			object['children'] = object[childrenName] || object["children"] || [];
			delete object[childrenName];
		}
		if(!Boolean(object.children)){return;}			// children 不存在返回
		if(object.children.length == 0){return;}		// children 长度大于0返回
		// 递归修改chidren
		for(var i = 0 ; i < object.children.length ; i ++){
			this.changetree(object.children[i], idName, nameName, childrenName);
		}
	}
	
}
