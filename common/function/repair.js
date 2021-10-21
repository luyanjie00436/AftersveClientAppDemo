/**
 * 报障工单公共事件
 * @author 陆彦捷
 * @description 和报障有关的公共事件
 * @property {Functin} toSearch	跳转到SN工单搜索页 
 * @property {Function} snScan	SN扫码报障
 * @property {Function} toType 跳转到分类报障页面  
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

import deviceR from '@/common/request/device.js';					// 设备请求
import repairOrderR from '@/common/request/repairorder.js';			// 工单请求
var _self = module.exports = {
	/** 跳转到SN工单搜索页
	 * @param {Object} obj
	 */
	toSearch : function(obj){
		// 跳转到搜索页
		uni.navigateTo({
			url:'/pages_repair/search?searchKey=' + obj.value
		});
	},
	/** SN扫码报障
	 * @param {Object} e
	 */
	snScan: function(e){
		uni.scanCode({
			success:function(re){
				_self.repairNavigateTo(re.result);
			},
			fail:function(errors){
				// 扫码失败，跳转到搜索页
				uni.showModal({
					title:'扫码失败',
					content:'是否跳转设备报修页面？',
					success:function(result){
						if(result.confirm){
							uni.navigateTo({
								url:'/pages_repair/search?'
							});
						}
					}
				});
				
			}
		});
	},
	/** 根据设备SN进行页面跳转
	 * @param {Object} DeviceSn 设备设备SN码
	 */
	repairNavigateTo : function(DeviceSn){
		let data = {sn : DeviceSn};
		repairOrderR.getInfoByData({
			data : data,
			success : function(data1){
				if(Boolean(data1)){
					// 存在工单则跳转工单跟踪（报障页）
					uni.navigateTo({
						url :'/pages_repair-order/customer/detail?OrderId=' + data1.OrderId
					});
				}else{
					// 查询设备
					deviceR.getInfoByData({
						data : data,
						success : function(data2){
							if(Boolean(data2)){
								// 跳转到SN码报障页面
								uni.navigateTo({
									url:'/pages_repair/repairsn?DeviceSn=' + DeviceSn
								});
							}else{
								uni.showModal({
									title:'SN码不存在',
									content:'是否跳转设备报修页面？',
									success:function(result){
										if(result.confirm){
											uni.navigateTo({
												url:'/pages_repair/search?searchKey='+ DeviceSn
											});
										}
									}
								});
							}
						},
						fail : function(){
							uni.showToast({
								title: mylang.basic.requestFailMessage,
								icon:'none'
							});
						}
					});
				}
			},
			fail: function(){
				console.log("失败");
				uni.showToast({
					title: mylang.basic.requestFailMessage,
					icon:'none'
				});
			}
		});
	},
	/** 跳转到分类报障页面
	 * @param {Object} e
	 */
	toType: function(e){
		uni.navigateTo({
			url:'/pages_repair/repaircate'
		});
	},
}