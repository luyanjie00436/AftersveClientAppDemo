# luyj-select-lay
> **组件名：luyj-select-lay**
> 代码块：'luyj-select-lay'
> 关联组件： 无

### 说明

这里是简单的select下拉选择组件。[原插件地址](https://ext.dcloud.net.cn/plugin?id=5070)。本人暂时将其uni_modules化,在加载数据时添加必要的提示。

### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

如需通过`npm`方式使用`uni-ui`组件，另见文档：[https://ext.dcloud.net.cn/plugin?id=55](https://ext.dcloud.net.cn/plugin?id=55)

> **注意事项**
> 为了避免错误使用，给大家带来不好的开发体验，请在使用组件前仔细阅读下面的注意事项，可以帮你避免一些错误。
> - 组件需要依赖 `sass` 插件 ，请自行手动安装

### 基本用法

``` html
<!-- 通用写法 -->
<luyj-select-lay :value="tval" name="name" placeholder="请选择项目" :options="datalist"
	@selectitem="selectitem">
</luyj-select-lay>
<!-- 组件状态：加载中 -->
<luyj-select-lay :value="tval" name="name" placeholder="请选择项目" loading="true" :options="datalist"
			@selectitem="selectitem">
<!-- 禁用组件 -->
<luyj-select-lay :value="tval" name="name2" placeholder="请选择项目(禁用)" :options="datalist"
	:disabled="true">
</luyj-select-lay>
<!-- 自定义数据索引对象 -->
<luyj-select-lay :value="tval" name="name3" slabel="myname" svalue="myvalue" placeholder="请选择项目(自定义数据)"
	:options="datalist2" @selectitem="selectitem2">
</luyj-select-lay>
<!-- 改变下拉框的位置 -->
<luyj-select-lay :value="tval" optionsDirection="top" name="name" placeholder="请选择项目" :options="datalist"
			@selectitem="selectitem">
		</luyj-select-lay>
```

**实际使用下拉框时，可能需要考虑下列穿透问题**

以上实例，使用的测试数据如下：
``` javascript
// data-com 数据
list: [{
		label: "label1",
		value: "value1"
	},
	{
		label: "label2",
		value: "value2"
	},
	{
		label: "label3",
		value: "value3"
	}

],
// 自定义数据
mylist: [{
		myname: "label1",
		myvalue: "value1"
	},
	{
		myname: "label2",
		myvalue: "value2"
	},
	{
		myname: "label3",
		myvalue: "value3"
	}		
],
```

### 属性

|属性名			|类型		|默认值		|	说明		|																							
|:-:			|:-:		|:-:		|	:-:		|
|disabled		|Boolean	|false		|	是否禁用	|
|zindex			|Number		|999		|	层级，防止多个组件一起使用时下拉栏穿透	|
|options		|Array		|[]			|	数据列表	|
|optionsDirection|String	|bottom		|	数据的位置	|
|loading		|Boolean	|false		|	是否加载中	|
|loadingText	|String		|'数据加载中'|	加载时提示文字	|
|name			|String		|''			|	input字段名	|
|value			|String		|''			|	默认展示的value值	|
|placeholder	|String		|''			|	选项值为空时的占位符	|
|slabel			|String		|'label'	|	自定义列表中键值对应关系（自定义列表的值对应label值）	|
|svalue			|String		|'value'	|	自定义列表中键值对应关系（自定义列表的值对应value值)	|

#### optionsDirection 默认值

|值			|说明	|
|:-:		|:-:	|
|top		|数据列表位于输入框上方	|
|bottom		|数据列表位于输入框下方	|

### 事件

|事件名			|说明		|返回值	|																								
|:-:			|:-:		|:-:	|
|@selectitem	|点击项目触发的事件	|参数（索引，该项的值）	|

## 项目路径

* [codechina](https://codechina.csdn.net/qq_28624235/luyj-select-lay)
* [github](https://github.com/luyanjie00436/luyj-select-lay)