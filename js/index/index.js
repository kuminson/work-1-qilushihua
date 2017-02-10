$(function(){
	// banner轮播
	bannerSlider();

	// 微调banner轮播样式
	minAdjustBannerstyle();

	// 添加tab页
	addTabs();

	// 网上展厅轮播
	picSlider();

	// 临时性 页面跳转
	// 档案动态
	$(".md_more").on("click",function(){
		var fstnav = $(".nl_first");
		for(var i=0; i<fstnav.length; i++){
			if(fstnav.eq(i).html() == "档案动态"){
				fstnav.eq(i).trigger("click");
				return false;
			}
		}
	});
	// 档案动态文章
	$(".mdcl_imgbox,.mdcl_title,.mdcl_text").on("click",function(){
		var url = "/html/innerPage.html?"
							+"fst=" + "档案动态"
							+"&type=" + "article";
		window.location.href = encodeURI(url);
	});
	// tab页title
	$(".tab_title").on("click",function(){
		var scdnav = $(".nlsl_second");
		for(var i=0; i<scdnav.length; i++){
			if(scdnav.eq(i).html() == $(this).html()){
				scdnav.eq(i).trigger("click");
				return false;
			}
		}
	});
	// tab页text
	$(".mdcl_text").on("click",function(){
		// 找到二级菜单名
		var thisId = $(this).closest(".ofhide").attr("id");
		var thisHtml = $(".tab_title[href='#"+thisId+"']").html();
		// 找到一级菜单名
		var fstnav = $(".nlsl_second");
		for(var i=0; i<fstnav.length; i++){
			if(fstnav.eq(i).html() == thisHtml){
				var fsthtml = fstnav.eq(i).closest(".n_list").find(".nl_first").html();
				break;
			}
		}
		var url = "/html/innerPage.html?"
							+"fst=" + fsthtml
							+"&scd=" + thisHtml
							+"&type=" + "article";
		window.location.href = encodeURI(url);
	});
	// 网上展厅
	$(".mst_text").on("click",function(){
		var fstnav = $(".nl_first");
		for(var i=0; i<fstnav.length; i++){
			if(fstnav.eq(i).html() == $(this).html()){
				fstnav.eq(i).trigger("click");
				return false;
			}
		}
	});
	// 网上展厅轮播
	$(".ms_img").on("click",function(){
		var url = "/html/innerPage.html?"
							+"fst=" + "网上展厅"
							+"&type=" + "pic";
		window.location.href = encodeURI(url);
	});

});

// 微调banner轮播样式
function minAdjustBannerstyle(){
	// 调整banner样式
	$(".banner").find(".bx-viewport").css({
		border: "none",
		left: "0"
	});
	$(".banner").find(".bx-pager").css("bottom", "30px");
}

// banner轮播
function bannerSlider(){
	$("#b_slider").bxSlider({
		captions:true,
		auto:true,
		pause:10000
	});
}

// 添加tab页
function addTabs(){
	var option = {
		heightStyle:"fill",
		event: "mouseover",
		activate:function(e,ui){
			ui.newTab.children("a").css("cursor", "pointer");
		}
	}
	// 添加法律法规tab页
	$("#ml_tab").tabs(option);
	// 添加情报信息tab页
	$("#mi_tab").tabs(option);
	// 添加资料下载tab页
	$("#md_tab").tabs(option);
}

// 网上展厅轮播
function picSlider(){
	$("#m_slider").bxSlider({
		slideWidth:1000,
		slideHeight:150,
		minSlides:5,
		maxSlides:5,
		ticker:true,
		tickerHover:true,
		useCSS:false,
		speed:100000,
		startSlides:0,
		slideMargin:10
	});
	$(".m_show").find(".bx-viewport").css({
		left: "0"
	});
}