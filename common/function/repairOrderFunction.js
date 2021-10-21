/**
 * 工单的公共方法
 * @description tranformStatus : 根据value值获取工单状态
 * 				tranformStatusCNName ： 根据工单状态返回中文的工单名称
 * 				getStatuClass 据工单状态，返回工单状态的背景色
 */
module.exports ={
	/** 根据value值获取工单状态
	 * @param {Number} value 值
	 * @param {String} orderType 工单类型
	 * 	@value customer 报障工单
	 *  @value service 受理工单
	 * @return {String} 工单状态字符串
	 */
	tranformStatus : function(value , orderType="customer"){
		var status = '';		// 工单状态
		switch(orderType){
			case 'customer': 
				// 报障工单状态
				switch(value){
					case -1: status = '';break;  // 全部
					// case 0:	status = 'Created';	break;	// 未提交、
					case 1:	status = 'Created,Unprocessed';	break; // 待受理
					case 2: status = 'SvcConfirmed,RepairConfirm,Processing';break; // 处理中
					case 3:	status = 'Uncheck';	break;	// 待验收
					case 4:	status = 'Checked,Finished';break;	// 已完成
					case 5:	status = 'Cancel'; break; // 已取消 -Cancel
					default:break;
				}
				break;
			case 'service': 
				switch(value){
					case -1 :status = '';break;	// 全部
					case 0 :status = 'Unprocessed';break;// 待受理
					case 1 :status = 'SvcConfirmed';break; // 已受理
					case 2 :status = 'RepairConfirm,Processing';break; // 处理中
					case 3 : status = 'Uncheck';break;// 待验收
					case 4 :status = 'Checked,Finished';	break;	// 已完成
					default:break;
				}
				break;
			default:break;
		}
		return status;
	},
	/** 根据工单状态返回中文的工单名称
	 * @param {String} status 状态名称
	 * 	@value Created 草稿
	 *  @value Unprocessed 未处理
	 *  @value SvcConfirmed 已受理
	 *  @value RepairConfirm 维修已确认
	 *  @value Processing 处理中
	 *  @value Uncheck 待验收
	 *  @value Checked 已验收
	 *  @value Finished 已完成
	 *  @value Cancel 已取消
	 * @param {String} orderType 工单类型
	 * 	@value customer 报障工单
	 *  @value service 受理工单
	 * @return {String} 工单状态的中文字符串
	 * @description 暂时与orderType无关，根据
	 */
	tranformStatusCNName : function(status ,orderType = "customer"){
		var statusCn = '';
		switch(status){
			case 'Created': statusCn='草稿';	break;// 草稿 
			case 'Unprocessed':	statusCn='未处理'; break;// 未处理 
			case 'SvcConfirmed': statusCn='已受理';	break;	// 已受理 
			case 'RepairConfirm':statusCn='维修已确认';	break;// 维修已确认 
			case 'Processing': 	statusCn='处理中';break;	// 处理中 
			case 'Uncheck': statusCn='待验收';break;	// 待验收 
			case 'Checked': statusCn='已验收';break;	// 已验收 
			case 'Finished':statusCn='已完成';break;	// 已完成 
			case 'Cancel':statusCn='已取消';break;	// 已取消 
			default:break;
		}
		return statusCn;
	},
	/** 根据工单状态，返回工单状态的背景色
	 * @param {String} status 状态名称
	 * 	@value Created 草稿
	 *  @value Unprocessed 未处理
	 *  @value SvcConfirmed 已受理
	 *  @value RepairConfirm 维修已确认
	 *  @value Processing 处理中
	 *  @value Uncheck 待验收
	 *  @value Checked 已验收
	 *  @value Finished 已完成
	 *  @value Cancel 已取消
	 * @param {String} orderType 工单类型
	 * 	@value customer 报障工单
	 *  @value service 受理工单
	 * @return {String} 工单状态的中文字符串
	 * @description 
	 */
	getStatuClass(status ,orderType = "customer"){
		var bgColor = '';			// 背景色
		switch(orderType){
			case 'customer' : 
				// 报障工单
				switch(status){
					case 'Unprocessed': bgColor = 'bg-red';break;
					case 'Processing': bgColor = 'bg-cyan';break;
					case 'Uncheck': bgColor = 'bg-orange';break;
					case 'Finished': bgColor = 'bg-grey' ;break;
					case 'Cancel': bgColor = 'bg-grey';break;
					default: bgColor = 'bg-grey';break;
				}
				break;
			case 'service' : 
				// 受理工单状态
				switch(status){
						case 'Unprocessed': bgColor = 'bg-red';break;
						case 'Processing': bgColor = 'bg-cyan';break;
						case 'Uncheck': bgColor = 'bg-orange';break;
						case 'Finished': bgColor = 'bg-grey' ;break;
						default:bgColor = 'bg-grey';break;
					}
				break;
			default:bgColor = 'bg-grey';break;
		}
		return bgColor;
	},
	/** 根据工单状态，返回步骤
	 * @param {String} status 状态名称
	 * 	@value Created 草稿
	 *  @value Unprocessed 未处理
	 *  @value SvcConfirmed 已受理
	 *  @value RepairConfirm 维修已确认
	 *  @value Processing 处理中
	 *  @value Uncheck 待验收
	 *  @value Checked 已验收
	 *  @value Finished 已完成
	 *  @value Cancel 已取消
	 * @return {Number} 当前工单的步骤 0 ~4
	 * @description 
	 */
	getSteps : function(status ){
		var steps = 0			// 当前步骤
		switch(status){
			case 'Created': steps = 0;break;		
			case 'Unprocessed': steps = 0;break;
			case 'SvcConfirmed': steps = 1;break;
			case 'RepairConfirm': steps = 2;break;
			case 'Processing': steps = 2;break;
			case 'Uncheck': steps = 3;break;
			case 'Checked': steps = 4;break;
			case 'Finished': steps = 4 ;break;
			case 'Cancel': steps = 1;break;
			default: steps = 0;break;
		}
		return steps;
	}
}