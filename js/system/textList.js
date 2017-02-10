$(function(){
	// 初始化datagrid
	initTextListGrid();
	// 初始化下拉框
	initComboBox();
});

// 初始化datagrid
function initTextListGrid(){
	var textColumns =[[
	{
		"field":"",
		"checkbox":true
	},{
		"field":"title",
		"title":"题名",
		"align":"left",
		"width":60
	},{
		"field":"time",
		"title":"时间",
		"align":"left",
		"width":20
	},{
		"field":"position",
		"title":"位置",
		"align":"left",
		"width":20
	}
	]];
	$("#art_grid").datagrid({
		toolbar:"#tb",
		method: "get",
		url:  "/html/system/textList.json" ,
		fitColumns: true,
		fit:true,
		columns: textColumns,
		resizeHandle: "both",
		loadMsg: "请稍后...",
		striped: true,
		pagination: true,
		rownumbers: true,
		pageNumber: 1,
		pageSize: 20,
		pageList: [20,40,60]
	});
}

// 初始化下拉框
function initComboBox(){
	$("#t_pstion").combobox({
		url:"/html/system/textComboBox.json",
		method: "get",
		valueField:'value',
		textField:'text',
		groupField:'group'
	});
}