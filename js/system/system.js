$(function(){
	// 绑定点击列表 选中并生成新tabs事件
	asideClickEvent();
	// 触发第一个列表click事件
	$(".al_btn").eq(0).triggerHandler("click");
});

// 添加新的tab页
function addNewTabPage(title,tabsUrl,iconCls,iframe){
	var tabPanel = $("#m_tabs");
	// 判定没有相同tab
	if(tabPanel.tabs("exists",title)){
		return false;
	}
	var iframeCont = '<iframe scrolling="no" frameborder="0"  src="'
						+ tabsUrl
						+'" style="width:100%;height:100%;"></iframe>';
	// iframe链接模式
	if(iframe){
		tabPanel.tabs("add",{
			title:title,
			content:iframeCont,
			iconCls:iconCls,
			fit:true,
			closable:true
		});
	}else{// easyui链接模式
		tabPanel.tabs('add',{
			title:title,
			href:tabsUrl,
			iconCls:iconCls,
			fit:true,
			closable:true
		});
	}
}

// 绑定点击列表 选中并生成新tabs事件
function asideClickEvent(){
	$(".al_btn").on("click",function(){
		// 添加选中状态
		$(".al_btn").removeClass("active");
		$(this).addClass("active");
		// 获取参数
		var tabsUrl = $(this).attr("tabsUrl");
		var title = $(this).attr("title");
		var iframe = $(this).attr("iframe")==1?true:false;
		var iconCls = $(this).attr("iconCls");
		var tabPanel = $("#m_tabs");
		// 判定已有tab
		if(tabPanel.tabs("exists",title)){
			// 选中已有tab
			tabPanel.tabs("select",title);
			return false;
		}
		// 没有tab 添加新tab页
		addNewTabPage(title,tabsUrl,iconCls,iframe);
	});
}