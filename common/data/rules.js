/**
 * 验证规则
 * @property {Array} mobile 手机号验证规则 
 */
module.exports = {
	/**
	 * 手机号验证
	 */
	mobile: [{
			required: true,
			errorMessage: '请输入手机号'
		},
		{
			pattern: "^[0-9]{11}$",
			errorMessage: '手机号为11位数'
		},
		{
			pattern: "^1[3|5|6|7|8|9][0-9]{9}$",
			errorMessage: '请输入正确的手机号码'
		}
	],
	/**
	 * 邮箱号验证
	 */
	email: [{
			required: true,
			errorMessage: '请输入邮箱地址'
		},
		{
			format: 'email',
			errorMessage: '请输入正确的邮箱地址'
		}
	],
	/**
	 * 商户
	 */
	custMchId: [{
		minimum : 1 ,
		errorMessage: '请选择商户'
	}],
	/**
	 * 门店
	 */
	mchId :[{
		minimum : 1 ,
		errorMessage: '请选择门店'
	}],
	
	/**
	 * 组织
	 */
	topMchId :[{
		minimum : 1 ,
		errorMessage: '请选择组织'
	}],
	/**
	 * 请输入门店地址
	 */
	address :[{
		required: true,
		errorMessage: '请输入门店地址'
	}],
	industryId :[{
			required: true,
			errorMessage: '请选择行业'
		},
		{
			minimum : 1 ,
			errorMessage: '请选择行业'
		}
	],
	/**
	 * 请选择设备分类
	 */
	categoryId :[{
			required: true,
			errorMessage: '请选择分类'
		},
		{
			minimum : 1 ,
			errorMessage: '请选择分类'
		}
	],
	/**
	 * 型号
	 */
	modelId :[{
			required: true,
			errorMessage: '请选择型号'
		},
		{
			minimum : 1 ,
			errorMessage: '请选择型号'
		}
	],
	/**
	 * 供应商
	 */
	supId :[{
			required: true,
			errorMessage: '请选择供应商'
		},
		{
			minimum : 1 ,
			errorMessage: '请选择供应商'
		}
	],
	/**
	 * 员工
	 */
	staffId :[{
			required: true,
			errorMessage: '请选择员工'
		},
		{
			minimum : 1 ,
			errorMessage: '请选择员工'
		}
	],
	/**
	 * 排序
	 */
	sort :[{
			required: true,
			errorMessage: '请输入排序'
		},
		{
			minimum : 0 ,
			errorMessage: '排序值必须大于0'
		}]
}