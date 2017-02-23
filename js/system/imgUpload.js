$(function(){
	// 初始化标题文本框
	initTextBox();
	// 初始化date
	initDateBox();
	// 初始化下拉列表
	initComboBox();
	// 初始化文件上传
	initImgUpload();
	// 弹性高度
	autoHeight();
	// 绑定点击提交事件
	$("#mb_submit").linkbutton({
		onClick:function(){
			// 获取文件名称
			var fileString = $("#mb_upload").filebox("getText");
			// 拆分
			var files = fileString.split("&&");
			// 加载
			$(".mi_list").remove();
			for(var i=0; i<files.length; i++){
				var tab = '<li class="mi_list success">'
							+'<strong class="mil_title">'+files[i]+'</strong>'
							+'<span class="mil_state">√成功</span>'
						+'</li>';
				$("#m_imglist").append(tab);
			}
		}
	});
});
// 弹性高度
function autoHeight(){
	var allHeight =  $(window).height()-parseInt($(".main").css("padding-top"))
										-parseInt($(".main").css("padding-bottom"))
										-$(".m_box").height()
										-parseInt($(".m_box").css("margin-bottom"))
										-($(".m_btn").height()*2)
										-(parseInt($(".m_btn").css("margin-top"))*2)-2;
	$(window).resize(function(){
		$(".m_imglist").height(allHeight);
	});
	$(window).trigger("resize");
}

// 初始化文件上传
function initImgUpload(){
	$("#mb_upload").filebox({
		buttonText:"选择文件",
		accept:"image/jpg/png/gif",
		multiple:true,
		separator:"&&"
	});
}

// 初始化标题文本框
function initTextBox(){
	$("#mt_name").textbox({
		width:"70%",
		height: "30px",
		prompt:"请输入文章标题",
		label:"题名：",
		labelAlign:"right"
	});
}

// 初始化date
function initDateBox(){
	$("#md_data").datebox({
		required:true,
		label:"日期：",
		width:"250px",
		height: "30px",
		labelAlign:"right",
		currentText:"今天",
		closeText:"关闭",
		okText:"确定",
		formatter:function(date){
			var y = date.getFullYear();
            var m = date.getMonth()+1;
            var d = date.getDate();
            return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
		},
		parser:function(s){
            if (!s) return new Date();
            var ss = (s.split('-'));
            var y = parseInt(ss[0],10);
            var m = parseInt(ss[1],10);
            var d = parseInt(ss[2],10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
                return new Date(y,m-1,d);
            } else {
                return new Date();
            }
        }

	});
	$("#md_data").datebox("setValue","today");
}

// 初始化下拉框
function initComboBox(){
	$("#mp_pstion").combobox({
		url: "/work-1-qilushihua/html/system/textCompileComboBox.json",
		method: "get",
		valueField:'value',
		textField:'text',
		groupField:'group',
		width:"250px",
		height: "30px",
		label:"位置：",
		labelAlign:"right"
	});
}