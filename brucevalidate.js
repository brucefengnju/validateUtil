
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

    var bruceValidate = new Object();
   
    bruceValidate.trim = function(value){
        if(typeof value == "undefined") return null;
        return value==null? "":value.toString().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
    bruceValidate.isNull = function(value){
        return value==null;
    };
    bruceValidate.isValidDate = function(year,month,day){
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
    bruceValidate.isValidDatetime = function(year,month,day,hour,minute,second){
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
    bruceValidate.isDate = function(value){
        if(typeof value == "undefined") return false;
        value = bruceValidate.trim(value);
        var date;
        if(datetimeRegex.test(value)){
            date = datetimeRegex.exec(value);
            if(date[7]==':') return false;
            return bruceValidate.isValidDatetime(date[1],date[3],date[4],date[5],date[6],date[8]);
        }else if(dateRegex.test(value)){
            date = dateRegex.exec(value);
            return bruceValidate.isValidDate(date[1],date[3],date[4]);
        }
        return false;
    };
    bruceValidate.isPositiveNumber = function(value){
       if(typeof value == "undefined") return false;
       value = BrucefengValidate.trim(value);
      
       if(positiveNumberRegex.test(value)){
        var str = value.replace(/[,]/g,"");
        if(str * 1 > 0) return true;
       }
       return false;
    };
    bruceValidate.isZero = function(value){
       if(typeof value == "undefined") return false;
       value = BrucefengValidate.trim(value);
      
       if(positiveNumberRegex.test(value)){
        var str = value.replace(/[,]/g,"");
        if(str * 1 == 0) return true;
       }
       return false;

    };
    bruceValidate.isNatureNumber = function(value){
        if(typeof value == "undefined") return false;
        return natureNumberRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isNegtiveNumber = function(value){
        if(typeof value == "undefined") return false;
        return negtiveNumberRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isPositiveInt = function(value){
        if(typeof value == "undefined") return false;
        return positiveIntRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isNegtiveInt = function(value){
        if(typeof value == 'undefined') return false;
        return negtiveIntRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isEmail = function(value){
        if(typeof value == 'undefined') return false;
        return emailRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isMobile = function(value){
        if(typeof value == 'undefined') return false;
        return mobileRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isCert = function(value){
        if(typeof value == 'undefined') return false;
        return certRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isPostCode = function(value){
        if(typeof value == 'undefined') return false;
        return postCodeRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isTelFax = function(value){
        if(typeof value == 'undefined') return false;
        return telFaxRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isBirthday = function(value){
        if(typeof value == 'undefined') return false;
        return birthdayRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isSpecialString = function(value){
        if(typeof value == 'undefined') return false;
        return specialStringRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isBankNumber = function(value){
        if(typeof value == 'undefined') return false;
        return bankNumberRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isIdentityCard = function(value){
        if(typeof value == 'undefined') return false;
        return identityCardRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isIp = function(value){
        if(typeof value == 'undefined') return false;
        return ipRegex.test(bruceValidate.trim(value));
    };
    bruceValidate.isDecial = function(value){
        if(typeof value == 'undefined') return false;
        return decimalRegex.test(bruceValidate.trim(value));
    };

    window.bruceValidate = bruceValidate;

})(window);
