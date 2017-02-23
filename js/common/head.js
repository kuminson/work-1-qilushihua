$(function(){
	// 绑定一级菜单跳转路径
	fstNavGoToUrl();
	// 绑定二级菜单跳转路径
	scdNavGoToUrl();
});

// 绑定一级菜单跳转路径
function fstNavGoToUrl(){
	$(".nl_first").on("click",function(){
		// 不跳转项
		switch($(this).html()){
			case "首 页":
				window.location.href = "/work-1-qilushihua/index.html";
				return false;
				break;
			case "业务系统":
			case "档案查询":
				return false;
				break;
		}
		// 拼接url
		var url = "/work-1-qilushihua/html/innerPage.html?"
					+"fst="+$(this).html();
		if($(this).html() == "网上展厅"){
			url += "&type=imglist";
		}else{
			url += "&type=textlist";
		}
		// 跳转页面
		window.location.href = encodeURI(url);
	});
}

// 绑定二级菜单跳转路径
function scdNavGoToUrl(){
	$(".nlsl_second").on("click",function(){
		// 不跳转项
		var $fstnav = $(this).closest('.n_list').find('.nl_first');
		if($fstnav.html() == "业务系统"){
			return false;
		}
		// 拼接url
		var url = "/work-1-qilushihua/html/innerPage.html?"
							+"fst="+$fstnav.html()
							+"&scd="+$(this).html();
		if($fstnav.html() == "网上展厅"){
			url += "&type=imglist";
		}else{
			url += "&type=textlist";
		}
		// 跳转
		window.location.href = encodeURI(url);
	});
}