/**
 * 一些组件的参数
 * @property {Object} serviceIcon 图标-服务 
 * @property {Object} extraIcon 图标-意见反馈
 * @property {Object} loadContentText 点击加载数据
 * @property {Object} fab_pattern 悬浮按钮样式
 */
module.exports ={
	/**
	 * 图标-服务
	 */
	serviceIcon: {
		color: '#AEAEAE',
		size: '22',
		type: 'headphones'
	}, 
	/**
	 * 图标-意见反馈
	 */
	extraIcon: {
		color: '#AEAEAE',
		size: '22',
		type: 'compose'
	}, 
	/**
	 * 点击加载数据
	 */
	loadContentText: {
		contentdown: "点击刷新数据",
		contentrefresh: "正在加载...",
		contentnomore: "没有更多数据了"
	}, 
	/**
	 * 悬浮按钮样式
	 */
	fab_pattern: {
		color: '#7A7E83', // 文字默认颜色
		selectedColor: '#00BEB7',
		backgroundColor: '#fff',
		buttonColor: '#00BEB7'
	}, // 可选配置项样式（悬浮按钮）
	activeColor:'#00BEB7',
	btn_list_confirm :[{
		name: '确定',
		clickName: 'confirm',
	},
	],	
	btn_list_toEdit :[{
		name: '修改',
		icon: 'cuIcon-edit',
		clickName: 'edit',
	},
	],	
	/**
	 * 添加状态底部按钮
	 */
	btn_list_add: [{
		name: '保存',
		icon: 'cuIcon-edit',
		clickName: 'edit',
	},
	] ,
	/**
	 * 编辑状态底部按钮
	 */
	btn_list_edit: [{
		name: '保存',
		icon: 'cuIcon-edit',
		clickName: 'edit',
	},
	{
		name: '删除',
		icon: 'cuIcon-delete',
		clickName: 'delete',
		color : 'red'
	}
	],
	btn_list_commit: [{
		name: '提交',
		icon: 'cuIcon-updown',
		clickName: 'submit',
	},
	] ,
	/**
	 * 组织架构按钮-管理人员
	 */
	btn_list_org_admin: [{
		name: '添加部门',
		icon: 'cuIcon-add',
		clickName: 'addorg',
	},
	{
		name: '添加成员',
		icon: 'cuIcon-add',
		clickName: 'addstaff',
	},
	{
		name: '查看门店',
		icon: 'cuIcon-attention',
		clickName: 'showbrand',
	},
	{
		name: '查看成员',
		icon: 'cuIcon-attention',
		clickName: 'showstaff',
	},
	] ,
	/**
	 * 组织架构按钮 - 普通员工
	 */
	btn_list_org: [{
		name: '查看门店',
		icon: 'cuIcon-attention',
		clickName: 'showbrand',
	},
	{
		name: '查看成员',
		icon: 'cuIcon-attention',
		clickName: 'showstaff',
	},] ,
	/**
	 * 工单流程的步骤条-开始到完成
	 */
	steps_row: [{
			title: '开始'
		},
		{
			title: '已受理'
		},
		{
			title: '处理中'
		},
		{
			title: '待验收'
		},
		{
			title: '完成'
		},
	], 
	/**
	 * 工单处理的步骤条-开始到完成
	 */
	steps_row_cancel: [{
			title: '开始'
		},
		{
			title: '取消'
		},
	], // 取消的步骤条
}