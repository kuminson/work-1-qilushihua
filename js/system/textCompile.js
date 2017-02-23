
$(function(){
	// 实例化富文本编辑器
	var ue = UE.getEditor('editor');
	// 初始化标题文本框
	initTextBox();
	// 初始化date
	initDateBox();
	// 初始化下拉列表
	initComboBox();
	// 弹性高度
	$(window).resize(function(){
		var ueHeight = $(window).height()-parseInt($(".main").css("padding-top"))
										-parseInt($(".main").css("padding-bottom"))
										-$(".m_title").height()
										-parseInt($(".m_title").css("margin-bottom"))
										-$(".m_box").height()
										-parseInt($(".m_box").css("margin-bottom"))
										-$(".m_btn").height()
										-parseInt($(".m_btn").css("margin-top"))
										-$("#edui1_toolbarbox").height()
										-$("#edui1_bottombar").height()-2;
		ue.setHeight(ueHeight);
	});
	ue.addListener( 'ready', function( editor ) {
		$(window).trigger("resize");
	 } );
});

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
		url: "/work-1-qilushihua/html/system/textComboBox.json",
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