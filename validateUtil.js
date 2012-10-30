
(function(window,undefined){
    var dateRegex = /^(\d{1,4})(-|\/|.)(\d{1,2})\2(\d{1,2})(\s+星期[一二三四五六日]|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday\s*)?$/,
        datetimeRegex = /^(\d{1,4})(-|\/|.)(\d{1,2})\2(\d{1,2})\s+(\d{1,2}):(\d{1,2})(:(\d{1,2}))?$/,
        positiveNumberRegex = /^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})*$/,
        negtiveNumberRegex = /^-([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})*$/,
        natureNumberRegex = /^[0-9]+$/,
        positiveIntRegex = /^[1-9]\d*$/,
        negtiveIntRegex = /^-[1-9]\d*$/,
        emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
        mobileRegex = /^1[3-9]{1}[0-9]{1}[0-9]{8}$/,
        certRegex = /^[0-9A-Z]*$/,
        telFaxRegex = /^(\+?\d+\s)?(\(\d{3,4}\)|\d{3,4}-|\d{3,4})?\d{7,8}(-\d+)?$/,
        postCodeRegex = /^[0-9]{6}$/,
        birthdayRegex = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$/,
        specialStringRegex = new RegExp("[`~!@#$^&*()%+=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"),
        bankNumberRegex = /^(\d){8,24}$/,
        identityCardRegex = /^((\d{15})|(\d{17})|(\d{18})|(\d{17}(X|x)))$/,
        ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/,
        decimalRegex = /^\-?[0-9]*\.?[0-9]+$/;

    var validateUtil = new Object();
   
    validateUtil.trim = function(value){
        if(typeof value == "undefined") return null;
        return value==null? "":value.toString().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
    validateUtil.isNull = function(value){
        return value==null;
    };
    validateUtil.isBlank = function(value){
        if(typeof value == 'undefined') return true;
        return validateUtil.trim(value) == "";

    }
    validateUtil.checkPassword = function(pwd,checkPwd){
        pwd = validateUtil.trim(pwd);
        checkPwd = validateUtil.trim(checkPwd);
        if(pwd ==""||checkPwd=="") return false;
        return pwd == checkPwd;

    };
    validateUtil.isvalidLength = function(value,min,max){
        value = validateUtil.trim(value);
        var length = value.length;
        return length >= min && length <= max;

    };
    validateUtil.isValidDate = function(year,month,day){
        month -= 1;
        try {
            var dt = new Date(year, month, day);
            if (dt.getDate() != day) {
                return false;
            }
            else if (dt.getMonth() != month) {
                return false;
            }
            else if (dt.getFullYear() != year) {
                return false;
            }
        } catch (ex) {
            return false;
        }

        return true;
    };
    validateUtil.isValidDatetime = function(year,month,day,hour,minute,second){
        month -= 1;
        hour = hour || 0;
        minute = minute || 0;
        second = second || 0;
        try {
            var dt = new Date(year, month, day, hour, minute, second);
            if (dt.getDate() != day) {
                return false;
            }
            else if (dt.getMonth() != month) {
                return false;
            }
            else if (dt.getFullYear() != year) {
                return false;
            }
            else if (dt.getHours() != hour) {
                return false;
            }
            else if (dt.getMinutes() != minute) {
                return false;
            }
            else if (dt.getSeconds() != second) {
                return false;
            }
        } catch (ex) {
            return false;
        }

        return true;
    };
    validateUtil.isDate = function(value){
        if(typeof value == "undefined") return false;
        value = validateUtil.trim(value);
        var date;
        if(datetimeRegex.test(value)){
            date = datetimeRegex.exec(value);
            if(date[7]==':') return false;
            return validateUtil.isValidDatetime(date[1],date[3],date[4],date[5],date[6],date[8]);
        }else if(dateRegex.test(value)){
            date = dateRegex.exec(value);
            return validateUtil.isValidDate(date[1],date[3],date[4]);
        }
        return false;
    };
    validateUtil.isPositiveNumber = function(value){
       if(typeof value == "undefined") return false;
       value = BrucefengValidate.trim(value);
      
       if(positiveNumberRegex.test(value)){
        var str = value.replace(/[,]/g,"");
        if(str * 1 > 0) return true;
       }
       return false;
    };
    validateUtil.isZero = function(value){
       if(typeof value == "undefined") return false;
       value = BrucefengValidate.trim(value);
      
       if(positiveNumberRegex.test(value)){
        var str = value.replace(/[,]/g,"");
        if(str * 1 == 0) return true;
       }
       return false;

    };
    validateUtil.isNatureNumber = function(value){
        if(typeof value == "undefined") return false;
        return natureNumberRegex.test(validateUtil.trim(value));
    };
    validateUtil.isNegtiveNumber = function(value){
        if(typeof value == "undefined") return false;
        return negtiveNumberRegex.test(validateUtil.trim(value));
    };
    validateUtil.isPositiveInt = function(value){
        if(typeof value == "undefined") return false;
        return positiveIntRegex.test(validateUtil.trim(value));
    };
    validateUtil.isNegtiveInt = function(value){
        if(typeof value == 'undefined') return false;
        return negtiveIntRegex.test(validateUtil.trim(value));
    };
    validateUtil.isEmail = function(value){
        if(typeof value == 'undefined') return false;
        return emailRegex.test(validateUtil.trim(value));
    };
    validateUtil.isMobile = function(value){
        if(typeof value == 'undefined') return false;
        return mobileRegex.test(validateUtil.trim(value));
    };
    validateUtil.isCert = function(value){
        if(typeof value == 'undefined') return false;
        return certRegex.test(validateUtil.trim(value));
    };
    validateUtil.isPostCode = function(value){
        if(typeof value == 'undefined') return false;
        return postCodeRegex.test(validateUtil.trim(value));
    };
    validateUtil.isTelFax = function(value){
        if(typeof value == 'undefined') return false;
        return telFaxRegex.test(validateUtil.trim(value));
    };
    validateUtil.isBirthday = function(value){
        if(typeof value == 'undefined') return false;
        return birthdayRegex.test(validateUtil.trim(value));
    };
    validateUtil.isSpecialString = function(value){
        if(typeof value == 'undefined') return false;
        return specialStringRegex.test(validateUtil.trim(value));
    };
    validateUtil.isBankNumber = function(value){
        if(typeof value == 'undefined') return false;
        return bankNumberRegex.test(validateUtil.trim(value));
    };
    validateUtil.isIdentityCard = function(value){
        if(typeof value == 'undefined') return false;
        return identityCardRegex.test(validateUtil.trim(value));
    };
    validateUtil.isIp = function(value){
        if(typeof value == 'undefined') return false;
        return ipRegex.test(validateUtil.trim(value));
    };
    validateUtil.isDecial = function(value){
        if(typeof value == 'undefined') return false;
        return decimalRegex.test(validateUtil.trim(value));
    };

    window.validateUtil = validateUtil;

})(window);
