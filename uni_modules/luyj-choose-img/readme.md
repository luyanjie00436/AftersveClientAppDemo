# luyj-choose-img
> 代码块 `luyj-choose-img`

# 说明

本组件于是基于[ColorUI-uniAPP](https://ext.dcloud.net.cn/plugin?id=239)模板表单中图片。用于图片的选择。

# 安装方式

* 本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。
* 本组件的样式基于ColorUI 。所以，若要使用先依照官网下载并下源码解压，复制根目录的 /colorui 文件夹到你的根目录。然后在App.vue 引入关键Css `main.css` `icon.css`。

``` html
<style>
    @import "colorui/main.css";
    @import "colorui/icon.css";
    @import "app.css"; /* 你的项目css */
    ....
</style>
```

# 基本用法

在 ``template`` 中的使用
``` html
<luyj-choose-img @imgChange="imgChange"></luyj-choose-img>
```

其中，``@imgChange``是改变选择图片时的传出方法

# 属性

|属性名					|类型			|默认值		|说明			|													
|:-:					|:-:			|:-:		|:-:			|													
| titleText				|String			|图片组		|标题，选择图片组插件的标题	|
|showTitleBar			|Boolean		|true		|是否展示标题栏	|
|imgMaxCount			|Number			|9			|最大上传的图片数	|

# 事件

| 事件名		| 说明		|	返回参数 
| :-:			| :-:		| :-:	
|@imgChange		| 修改图片后，执行方法			| 数组，修改后图片的本地路径