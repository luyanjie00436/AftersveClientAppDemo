/**
 *  常见问题
 * @author 陆彦捷
 * @date 2021.07.09  问题列表
 */
module.exports = {
	list :[{
		id : 1 , 
		title : '斑马ZT-210 故障排除检查表',
		desc : '<h1>定义和用法</h1><p>valueOf() 方法可以字符串返回数字。</p>',
		Category : '电子设备>打印机',
		ModelName:'ZT-210',
		tags :['打印机','故障排除']
	},
	{
		id : 2 , 
		title : '电子秤故障排除',
		desc : '<h1>定义和用法</h1><p>valueOf() 方法可以字符串返回数字。</p>',
		Category : '电子设备>电子秤',
		ModelName :'',
		tags :['故障排除']
	},
	{
		id : 3 , 
		title : '通用问题',
		desc : '<h1>定义和用法</h1><p>valueOf() 方法可以字符串返回数字。</p>',
		Category : '',
		ModelName:'',
		tags :['通用问题']
	},
	],
	// 当前问题
	current :{
		id : 1 ,
		title : '斑马ZT-210 故障排除检查表',
		desc :'<h1>下载地址</h1><p><a href="https://www.dcloud.io/hbuilderx.html">https://www.dcloud.io/hbuilderx.html</a></p><p><img src="https://img2020.cnblogs.com/blog/1602649/202012/1602649-20201220161959440-198670061.png" alt="" loading="lazy" /></p><p>&nbsp;说明</p><table border="0"><tbody><tr><td><p>BuilderX标准版和App版的区别</p><p>BuilderX标准版可直接用于web开发、markdown、字处理场景。当用来做App开发时需要安装插件。App开发版预置了App/uni-app开发所需的插件，开箱即用。标准版也可以在插件安装界面安装App开发所需插件，App开发版预集成App开发所需插件。App开发插件体积大的原因主要有2方面：真机运行基座，Android版、iOS版、iOS模拟器版，加起来体积就1百多M。真机运行基座需要把所有模块都内置进去，方便大家开发调试。开发者自己做app打包是不会这么大的，因为可以在manifest里选模块来控制体积。uni-app的编译器，依赖webpack和各种node模块，node_modules就是这么一个生态现状，文件超级多，几万个文件，解压起来很慢。</p></td></tr></tbody></table><p>&nbsp;这里，我下载Windows 标准版。</p><h1>安装</h1><p>下载后，将压缩包复制到适当的位置，找到Hbuilder X（HbuilderX.exe）可执行程序，双击即可启动程序。</p><h1>参考网址</h1><p>https://blog.csdn.net/cnds123/article/details/106873406</p>',
		Category : '电子设备>打印机',
		ModelName:'ZT-210',
		tags :['打印机','故障排除']
	},
	// 按型号划分查询的列表
	models_list :[
		{
			"ModelId": 1,
			"MchId": 1,
			"CategoryId": 3,
			Category : '电子设备>打印机',
			Count: 3,			// 型号所包含的问题数量
			"Name": "HP1108",
			"Sort": 0,
		},
		{
			"ModelId": 2,
			"MchId": 1,
			"CategoryId": 3,
			Category : '电子设备>打印机',
			Count: 3,			// 型号所包含的问题数量
			"Name": "HP M126a",
			"Sort": 0,
		},
		{
			"ModelId": 3,
			"MchId": 1,
			"CategoryId": 3,
			Category : '电子设备>打印机',
			Count: 3,			// 型号所包含的问题数量
			"Name": "M1213NF",
			"Sort": 0,
		},
		{
			"ModelId": 4,
			"MchId": 1,
			"CategoryId": 3,
			Category : '电子设备>打印机',
			Count: 3,			// 型号所包含的问题数量
			"Name": "M128",
			"Sort": 0,
		},
		{
			"ModelId": 5,
			"MchId": 1,
			"CategoryId": 3,
			Category : '电子设备>打印机',
			Count: 3,			// 型号所包含的问题数量
			"Name": "P1108",
			"Sort": 0,
		}
	],
	//  按分类划分查询的的列表
	category_list : [{
			"CategoryId": 1,
			"MchId": 1,
			"ParentId": 0,
			"Name": "PDA及配件",
			 Count : 3 ,
			"Sort": 0,
			"Children": [],
		},
		{
			"CategoryId": 2,
			"MchId": 1,
			"ParentId": 0,
			"Name": "网络网关",
			Count : 3 ,
			"Sort": 1,
			"Children": [],
		},
		{
			"CategoryId": 3,
			"MchId": 1,
			"ParentId": 0,
			"Name": "打印机配件",
			Count : 3 ,
			"Sort": 2,
			"Children": [],
		},]
}