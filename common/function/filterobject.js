/**
 * 过滤data-com控件的值
 * @autho 陆彦捷
 * @date 2021.06.25
 * @description  1.通过value过滤
 */
module.exports = {
	/** 过滤list数组内 与"value"字段等于传入值的对象，及其子对象
	 * @param {Object} list 数组
	 * @param {Object} value value值
	 * @description 这里用于编辑时不选择本身，以及下一级
	 *  注：这里对象没有用深拷贝。会影响本身的值。这里只是为了特定情况而这么做的。
	 * 注： 这里与 filterbyvalue 对象互相递归调用
	 */
	filterbyvalue_list : function(list ,value){
		if(list != null){
			for(var index = 0 ; index < list.length ; index ++){
				var item = this.filterbyvalue(list[index] , value);
				if(item == null){
					list.splice(index,1);			// 删除为空的元素
					break;
				}
			}
		}
		return list;
	},
	/** 过滤obj对象 obj内"value"字段等于传入值的对象，及其子对象
	 * @param {Object} obj obj对象（默认符合data-com，不进行验证）
	 * @param {Object} value value值
	 * @description 这里用于编辑时不选择本身，以及下一级
	 *  注：这里没有用深拷贝，如果有有序操作可能会影响值。
	 * 注： 这里与filterbyvalue_list对象互相递归调用
	 */
	filterbyvalue : function (obj , value){
		if(!obj){return null;}
		if(obj.value == value){ 
			// 令当前对象等于空
			obj = null;
		}else if(obj.children != null){
			if(obj.children.length > 0){
				this.filterbyvalue_list(obj.children , value);
			}
		}
		return obj;
	}
}