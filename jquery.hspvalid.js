 
 (function($){
 	
 		// 选项
		 var option = {  
		 	
		 	// 表单元素验证规则属性名
		 	vAttrName: {
		 		required:'required',
		 		length:'length',
		 		rule:'rule',
		 		myrule:'myrule',
		 		valuerange: 'valuerange',
		 		vmethod:'vmethod'		// 自定义验证方法，必须返回true或false
		 	},
		 	
		 	// 规则正则
			vDefReg: {
				number: { 
						   	regex:/^\d*$/, 
						   	desc: '数字' 
						},   
				
				numeric: {
							regex:/^(0|(\-?(([1-9]{1}\d*(\.\d+)?)|(0{1}\.\d+))))?$/, 
						   	desc: '数值' 
						},
						
				integer: {
							regex:/^(0|(\-?[1-9]{1}\d*))?$/, 
						   	desc: '整数' 
						},
						                                                   
				eng: 	{ 
						   	regex:/^[a-zA-Z]*$/, 
						   	desc: '英文字母' 
						},
						
				engWord:{
							regex:/^\w*$/, 
						   	desc: '单词字符'  		//即字母数字下划线 
						},
				
				chs:	{ 
							regex:/^[\u4E00-\u9FA5]*$/, 
							desc: '汉字' 
						},
						
				punct:	{ 	regex:/^\p{Punct}*$/, 
							desc: '标点符号'
						},
				
				engWord$chs: {
							regex:/^(\w|[\u4E00-\u9FA5])*$/,
							desc: '数字单词字符或汉字'
						},
						
				eng$chs: {
							regex:/^[a-zA-Z\u4E00-\u9FA5]*$/,
							desc: '字母或汉字'
						},
				
				number$eng: {
							regex:/^[0-9a-zA-Z]*$/,
							desc: '数字或字母'
						},
						
				number$eng$chs: {
							regex:/^[0-9a-zA-Z\u4E00-\u9FA5]*$/,
							desc: '数字字母或汉字'
						},
				
				email:  {
							regex:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/,
							desc: '电子邮箱'
						},
						
				telephone: {
							regex:/^1[3|4|5|8]{1}[0-9]{9}$/,
							desc: '手机号码'
						},
				
				phoneNum: {
							regex:/^[0-9]{3,4}\-?[0-9]{7,8}$/,
							desc: '固定电话号码'
						},
							
				ftpAbsolutePath: {
						   	regex:/^ftp\:\/{2}([0-9a-zA-Z]+\:[0-9a-zA-Z]+)\@((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:\d{1,5}(\/[0-9a-zA-Z_\-]+)* *$/, 
						   	desc: 'ftp绝对路径'
						},
						
				relativePath: {
							regex:/^((\/{1}[0-9a-zA-Z\u4e00-\u9fa5-_+?]+)+(\.[0-9a-zA-Z\u4e00-\u9fa5-_+?]+)?)? *$/,
							desc: '文件相对路径'
						},
						
				spsign$engWord: {
							regex:/^\w*$/, 
						   	desc: '.-()[]!:=;+,…空格或单词字符'  		
						},
				
				spsign$engWord$chs: {
							regex:/^(\w|[ \u4E00-\u9FA5\.\-\(\)\[\]\!:=;+,…《》、℃])*$/, 
						   	desc: '特殊字符数字单词汉字'
						}
			},
			
			/** 判断select为空的规则 */
			vSelectEmptyRule: 1,	// 0:没有选择选项时为空， 1：选择的选项value为空
			
			vOneChsByteLength: 2	// 一个中文的字节长度
			
		};
		
		// 设置选项
		function setOption(opt) {
			if(opt == null) {
				return;
			}
			updateOpt(option, opt);
		};
		
		// 递归将opt中的选项值更新到option
		function updateOpt(option, opt) {
			var key;
			for(key in option) {
				var optionChild = option[key]
				var optChild = opt[key];
				if(optChild == null || optionChild == null) {
					continue;
				}
				
				var optionChildType = (typeof optionChild);
				var optChildType = (typeof optChild);
				
				if(optionChildType != optChildType) {
					continue;
				}
				
				if(optionChildType == 'object') {
					updateOpt(optionChild, optChild);
				} else {
					continue;
				}
			}
		};
		
		function isEmpty($input){
			
			if($input == null) return false;
			if($input.length <= 0)		// 对象不存在
			{
				return false;
			}
			
			// 获取required属性值
			var required=$input.attr(option.vAttrName.required);
			
			if(required == null) {
				return false;
			}
			
			var req = required.toString();
			req = $.trim(req);
			
			if(req!='true')
			{
				return false;
			}
			
			// 当前表单元素标签名称
			var nodeName=$input.context.nodeName.toUpperCase();
			
			// 标题
			var title=getTitle($input);
			
			if(nodeName=='INPUT' || nodeName=='TEXTAREA')
			{
				if($input.val()==null || $.trim($input.val())=='')
				{
					$input.focus();
					alert(title+"不能为空！");
					return true;
				}
				return false;
			}
			else if(nodeName=='SELECT')
			{
				// 查找已选选项
				var selected$Objs=$input.find("option:selected");	
				
				if( selected$Objs.length <= 0 )	
				{
					$input.focus();
					alert("请选择" + title);
					return true;
				}
				
				// 0:没有选择选项时为空
				if(option.vSelectEmptyRule != 0)
				{
					var val=selected$Objs.val();
					if(val==null || $.trim(val)=='')
					{
						$input.focus();
						alert("请选择" + title);
						return true;
					}
				}
				
				return false;
			}
			
			return false;
			
		};
		
		/** 获取标题 */
		function getTitle($input) {
		
			var title=$input.attr("title");
			
			if(title==null || $.trim(title)=='')
			{
				title=$input.parent().prev().text();
			}
			
			if(title==null || $.trim(title)=='')
			{
				title="该项";
			}
			
			return title;
		};
		
		/** 判断input是否正则验证通过 */
  		function isRegTrue($input, reg, desc ) {
  			if($(this).length <= 0)		// 对象不存在
			{
				alert("function isRegTrue对象不存在！");
				return false;
			}
			
			// 当前表单元素标签名称
			var nodeName=$input.context.nodeName.toUpperCase();
			
			// 标题
			var title=getTitle($input);
			
			// 评价描述信息
			var errMsg='';
			if(desc == null || $.trim(desc) == '')
			{
				errMsg=(title + "格式有误，请您重新输入！");
			}
			else
			{
				errMsg=(title + "格式应该为<" + desc + ">，请您重新输入！");
			}
			
			if(nodeName=='INPUT' || nodeName=='TEXTAREA')
			{
				var $value = $input.val();
				if($value!=null && $.trim($value)!='')
				{
					if(reg.test($value))
					{
						return true;
					}
					else
					{
						$input.focus();
						alert(errMsg);
						return false;
					}
				}
				else
				{
					return true;
				}
				
			}
			
			alert("function isRegTrue对象不是input 或 textarea！");
			return false;
  		};
		
		/** 判断input是否正则验证通过 */
  		function isRuleTrue($input) {
  			
  			// 获取自定义正则myrule
			var myrule=$input.attr(option.vAttrName.myrule);
			
			// 正则规则
			var regRule;
			
			if(myrule!=null && $.trim(myrule)!='')
			{
				try 
				{
					regRule = eval("("+myrule+")");
				}
				catch(e)
				{
				}
			}
			
			// 获取rule属性的正则规则
			if(regRule==null || regRule.regex==null )
			{
				// 验证规则
				var rule=$input.attr(option.vAttrName.rule);
				
				rule=$.trim(rule);
				
				if(rule==null || $.trim(rule)=='')
				{
					return true;
				}
				
				try 
				{
					regRule=option.vDefReg[rule];
				}
				catch(e)
				{
					return true;
				}
			} 
			
			if(regRule==null || regRule.regex==null )
			{
				return true;
			} 			
			
			// 格式正则	
			var reg=regRule.regex;
				
			// 格式描述
			var desc=regRule.desc; 
			
			var regTrue=isRegTrue($input, reg, desc);
				
			if( regTrue && ( rule=="numeric" || rule=="integer" ) )
			{
				var valuerange=$input.attr(option.vAttrName.valuerange);
					
				valuerange=$.trim(valuerange);
					
				if(valuerange!=null && valuerange!='')
				{
					var range=valuerange.split(",");
						
					if(range.length >= 2)
					{
						try
						{
							var minVal=parseInt(range[0]);
							var maxVal=parseInt(range[1]);
								
							var $tsValue=parseInt($input.val());
							
							if(minVal > maxVal) 	// 当minVal 大于 maxVal 则交换
							{		
								var tempVal = minVal;
								minVal = maxVal;
								maxVal = tempVal;
							} 
							
							if( minVal == maxVal && $tsValue != minVal ) // 当minVal 等于 maxVal 
							{
								var title=getTitle($input) + "数值应为" + minVal + ", 请您重新输入！";
								alert(title);
								$input.focus();
								regTrue=false;
							} 
							else if( $tsValue < minVal || $tsValue > maxVal )
							{
								var title=getTitle($input) + "数值范围应为" + minVal + "-" + maxVal + ", 请您重新输入！";
								alert(title);
								$input.focus();
								regTrue=false;
							}
						}
						catch(e)
						{
						}
					}
				}
				
			}
			
			return regTrue;
  		};
 		
 		/** 通过自定义的验证方法验证 */
 		function isMethodTrue($input) {
 			
 			// 获取自定义验证方法字符串
			var vmethod=$input.attr(option.vAttrName.vmethod);
			
			if( vmethod == null || $.trim(vmethod) == '' )
			{
				return true;
			}
			
			var result;
			
			try
			{
				result = eval( vmethod );
			} 
			catch(e){
				alert(e.message + ":" + vmethod);
			}
			
			if( result == null )
			{
				return false;
			}
			
			if( ( typeof result ) != 'boolean' )
			{
				alert('测试方法vmethod:' + vmethod + '必须返回boolean值！');
				return false;
			}
			
			return result;
 		}
 		
 		
 		/** 判断值的字节长度 */
  		function isByteLengthTrue(str, minlimit, maxlimit) {
  			
  			var chsByteLen = option.oneChsByteLength;
  			
  			var byteLen=0;
  			
			// 获取汉字或其他两字节字符数组
			var char = str.match(/[^\x00-\xff]/ig); 
            byteLen = str.length + ( char == null ? 0 : ( char.length * ( chsByteLen - 1 ) ) ); 
  			
  			if(byteLen >= minlimit && byteLen <= maxlimit)
  			{
  				return true;
  			}
  			
  			return false;
  			
  		};
  		
		  		
  		// 验证值的长度是否合法, 表单元素length属性 byte[i,j]:表示字节长度 byteLen>=i && byteLen<=j  /  [i,j] 表示字符长度 charLen>=i && charLen<=j 
  		function isLengthTrue($input)
  		{
  			var nodeName=$input.context.nodeName;
  			
  			if(nodeName.toUpperCase()=='SELECT')
			{
  				return true;
  			}
  		
  			var $value = $input.val();
  			
  			if($value == null || $.trim($value) == '')
  			{
  				return true;
  			}
  			
  			// 标题
			var title=getTitle($input);
  			
  			// 表单长度属性
			var lengthAttr=$input.attr(option.vAttrName.length);
			lengthAttr = $.trim(lengthAttr);
			
			if(lengthAttr==null || lengthAttr=='' || lengthAttr.length < 5)
			{
				return true;
			}
			else
			{
				
				var isByte=lengthAttr.substring(0, 4);
				
				if(isByte=='byte')
				{
					var lenStr=lengthAttr.substring(4);
					lenStr = $.trim(lenStr);
					lenStr=lenStr.substring(1);
					lenStr=lenStr.substring(0, lenStr.length-1);
					
					var limitVals=lenStr.split(',');
					var minLt=parseInt(limitVals[0]);
					var maxLt=parseInt(limitVals[1]);
					
					if(minLt > maxLt) 		// 下限值大于上限值，则交换值
					{
						var tempLt = minLt;
						minLt = maxLt;
						maxLt = tempLt;
					}
					
					// 提示信息
					var msg = title + "字节长度范围应为" + minLt + "-" + maxLt + ", (每个中文字符或全角字符占" + option.oneChsByteLength + "字节)";
					
					if(minLt == maxLt) {	// 当上下限值相等
						msg = title + "字节长度应为" + minLt + ", (每个中文字符或全角字符占" + option.oneChsByteLength + "字节)";
					}
					
					var isLenTrue=isByteLengthTrue($value, minLt, maxLt);
					
					if(!isLenTrue)
					{
						$input.focus();
						alert(msg);
						return false;
					}
					
					return true;
				}
				else
				{
					var lenStr=lengthAttr;
					lenStr=lenStr.substring(1);
					lenStr=lenStr.substring(0, lenStr.length-1);
					
					var limitVals=lenStr.split(',');
					var minLt=parseInt(limitVals[0]);
					var maxLt=parseInt(limitVals[1]);
					
					if(minLt > maxLt) 		// 下限值大于上限值，则交换值
					{
						var tempLt = minLt;
						minLt = maxLt;
						maxLt = tempLt;
					}
					
					// 提示信息
					var msg = title + "字符长度范围应为" + minLt + "-" + maxLt;
					
					if(minLt == maxLt) {	// 当上下限值相等
						msg = title + "字符长度应为" + minLt;
					}
					
					if($value.length >= minLt && $value.length <= maxLt )
					{
						return true;
					}
					
					$input.focus();
					alert(msg);
					return false;
				}
			}
  		};
		
		// 验证表单元素
		$.fn.validateInput = function(opt) {
			
			setOption(opt);
			var $this = $($(this).get(0));
			
			var empty = isEmpty($this);
			if(empty)
			{
				return false;
			}
			
			// 正则验证
			var ruleTrue = isRuleTrue($this);
			if(!ruleTrue)
			{
				return false;
			}
			
			// 自定义方法验证
			var methodTrue = isMethodTrue($this);
			if(!methodTrue)
			{
				return false;
			}
							
			// 长度验证
			var lengthTrue = isLengthTrue($this);
							
			if(!lengthTrue)
			{
				return false;
			}
			
			return true;
			
		};
		
		// 验证表单
		$.fn.validateForm=function(opt){
			
			setOption(opt);
			
			// 获取每一个表单的input, textarea, select 和 button 集合
			var allInput=$(this).find(":input");
						
			var flag = true;
						
			// 迭代验证
			allInput.each(function(){
			
				flag = $(this).validateInput();
				
				// 验证失败，则结束循环
				if(!flag)
				{
					return false;
				}
			});
						
			if(!flag)
			{
				return false;
			}
						
			return true;
			
		};
		
  		
 })(jQuery);	
 	
