$(function(){
	// 初始化分页
	initPaginator();

	// 初始化页面
	initPage();

	// 动态绑定侧边栏二级菜单映射导航栏二级菜单点击事件
	scdSideToScdNav();

	// 临时性 页面跳转 有后台支持时 删除此函数
	tempPageTurn();
});

// 初始化分页
function initPaginator(){
	$("#mrp_paging").jqPaginator({
		totalCounts: 300,
		pageSize: 10,
	    visiblePages: 5,
	    currentPage: 1,
	    first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',
        next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
        last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
        page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
	    onPageChange: function (num, type) {

	    }
	});
}

// 获取页面url信息
function GetUrlParms(){
    var args=new Object();
    var query=location.search.substring(1);//获取查询串
    var pairs=query.split("&");//在逗号处断开
    for(var   i=0;i<pairs.length;i++){
        var pos=pairs[i].indexOf('=');//查找name=value
        if(pos==-1){
	        continue;//如果没有找到就跳过
        }
        var argname=pairs[i].substring(0,pos);//提取name
        var value=pairs[i].substring(pos+1);//提取value
        args[argname]=decodeURI(value);//存为属性
    }
    return args;
}

// 初始化页面
function initPage(){
	// 获取数据
	var urlData = {};
	urlData = GetUrlParms();

	// ajax 获取二三级菜单及内容
	$.ajax({
		url: '/work-1-qilushihua/html/navscd.json',
		type: 'GET',
		dataType: 'json',
		success:function(data){
			// 加载二级菜单
			if(urlData.fst == undefined){
				return false;
			}
			var navscd = data;
			var $scdside = $(".mls_title");
			$scdside.remove();
			for(var i=0; i<navscd[urlData.fst].length; i++){
				var tab = '<li class="mls_title">'
										+'<a href="javascript:void(0)" class="mlst_link">- '
												+navscd[urlData.fst][i]
										+'</a></li>';
				$("#ml_second").append(tab);
			}
			// 选中二级菜单
			$scdside = $(".mls_title"); //重新获取
			if(urlData.scd != undefined && urlData.scd != "undefined"){
				for(var i=0; i<$scdside.length; i++){
					var scdsidecont = /- (.+)/g.exec($scdside.eq(i).find(".mlst_link").html())[1];
					if(scdsidecont == urlData.scd){
						$scdside.eq(i).addClass("active");
					}
				}
			}
		},
		error:function(){
			alert("链接服务器失败");
		}
	});
	
	// 加载nav一级菜单
	var $fstnav = $(".nl_first");
	$(".n_list").removeClass("active");
	for(var i=0; i<$fstnav.length; i++){
		if($fstnav.eq(i).html() == urlData.fst){
			$fstnav.eq(i).closest(".n_list").addClass("active");
		}
	}

	// 加载侧边栏菜单
	$("#ml_title").html(urlData.fst);
	if(urlData.scd == undefined || urlData.scd == "undefined"){
		$("#mrh_title").html(urlData.fst);
	}else{
		$("#mrh_title").html(urlData.scd);
	}
	// 加载面包屑
	$(".mrhp_list").not(".first").remove();
	$("#mrh_pst").append('<li class="mrhp_list">'+urlData.fst+'</li>');
	if(urlData.scd != undefined && urlData.scd != "undefined"){
		$("#mrh_pst").append('<li class="mrhp_list">'+urlData.scd+'</li>');
	}

	// 加载内容
	switch(urlData.type){
		case "textlist":
			$(".mrc_textlist").removeClass("hide");
			$(".mrc_info").removeClass("hide");
			$(".mr_pagbox").removeClass("hide");
			break;
		case "article":
			$(".mrc_article").removeClass("hide");
			$(".mr_turn").removeClass("hide");
			break;
		case "imglist":
			$(".mrc_imglist").removeClass("hide");
			$(".mrc_info").removeClass("hide");
			$(".mr_pagbox").removeClass("hide");
			break;
		case "pic":
			$(".mrc_pic").removeClass("hide");
			$(".mr_turn").removeClass("hide");
			break;
		default:
			$(".mrc_textlist").removeClass("hide");
			$(".mrc_info").removeClass("hide");
			$(".mr_pagbox").removeClass("hide");
	}
}

// 动态绑定侧边栏二级菜单映射导航栏二级菜单点击事件
function scdSideToScdNav(){
	$("body").on("click",".mlst_link",function(){
		var $scdnav = $(".nlsl_second");
		for(var i=0; i<$scdnav.length; i++){
			var scdside = /- (.+)/g.exec($(this).html())[1];
			if($scdnav.eq(i).html() == scdside){
				$scdnav.eq(i).trigger("click");
			}
		}
	});
}

// 临时性 页面跳转 有后台支持时 删除此函数
function tempPageTurn(){
	// 文章列表跳转文章页面
	$("body").on("click",".mrctlt_title",function(){
		// 获取数据
		var urlData = {};
		urlData = GetUrlParms();
		// 拼接url
		var url = "/work-1-qilushihua/html/innerPage.html?"
							+"fst=" + urlData.fst
							+"&scd=" + urlData.scd
							+"&type=" + "article";
		window.location.href = encodeURI(url);
	});
	// 图片列表跳转图片页面
	$("body").on("click",".mrcil_imgbox",function(){
		// 获取数据
		var urlData = {};
		urlData = GetUrlParms();
		// 拼接url
		var url = "/work-1-qilushihua/html/innerPage.html?"
							+"fst=" + urlData.fst
							+"&scd=" + urlData.scd
							+"&type=" + "pic";
		window.location.href = encodeURI(url);
	});
	$("body").on("click",".mrcil_title",function(){
		$(this).closest(".mrci_list").find(".mrcil_imgbox").trigger("click");
	});
}