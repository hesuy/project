function checkMethod(obj,t){

    if(t=="name"){
        if($(obj).val()==""||$(obj).val()==null||$(obj).val()==undefined){
            $(obj).addClass("error");
            return false;
        }else{
            var reg=/^[\u4e00-\u9fa5_a-zA-Z]+$/; 
            if(!reg.test($(obj).val())){ 
                $(obj).focus();
                $(obj).addClass("error");
                $(obj).val("").attr('placeholder','姓名不能包含特殊字符和数字');
                return false;
             }else{
                $(obj).removeClass("error");
                return true;
             }
        }
    }

    if(t=="mobile"){
        if($(obj).val()==""||$(obj).val()==null||$(obj).val()==undefined){
            $(obj).addClass("error");
            return false;
        }else{
            var reg=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/; 
            if(!reg.test($(obj).val())){
                $(obj).focus();
                $(obj).addClass("error");
                $(obj).val("").attr("placeholder","请输入正确的手机号码");
                return false;
             }else{
                $(obj).removeClass("error");
                return true;
             }
        }
    }
    if(t=="zipCode"){
        if($(obj).val()==""||$(obj).val()==null||$(obj).val()==undefined){
            $(obj).addClass("error");
            return false;
        }else{
            var reg=/^[1-9]\d{5}(?!\d)$/; 
            if(!reg.test($(obj).val())){  
                $(obj).addClass("error");
                $(obj).val("").attr("placeholder","请输入正确的邮编");
                return false;
             }else{
                $(obj).removeClass("error");
                return true;
             }
        }
    }
    if(t=="email"){
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if($(obj).val()!="" && !reg.test($(obj).val())){  
            $(obj).addClass("error");
            $(obj).val("").attr("placeholder","请输入正确的邮箱");
            return false;
         }else{
            $(obj).removeClass("error");
            return true;
         }
    }
    if(t=="address") {
        if($(obj).val()==""||$(obj).val()==null||$(obj).val()==undefined){
            $(obj).addClass("error");
            return false;
        }else{
            $(obj).removeClass("error");
            return true;
        }
    }
    if(t=="area") {
        if($(obj).val()=="0"||$(obj).val()==""||$(obj).val()==null||$(obj).val()==undefined){
            $(obj).addClass("error");
            return false;
        }else{
            $(obj).removeClass("error");
            return true;
        }
    }
    
}