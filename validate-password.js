module.exports = function validatePassword(password, forbiddenStrings) {
    var validationData = {
        isValid: true,
        validationMessage: 'The password must contain at least one '
    };
    
    var checkForbiddenStringsData;
                
    if (!password) {
        return validationData;
    }

    if (!hasLowerCase(password)) {
        validationData.validationMessage += 'lowercase letter';
        validationData.isValid = false;
        return validationData;
    }

    if (!hasUpperCase(password)) {
        validationData.validationMessage += 'uppercase letter';
        validationData.isValid = false;
        return validationData;
    }

    if (!hasSpecialChars(password)) {
        validationData.validationMessage += 'special character';
        validationData.isValid = false;
        return validationData;
    }

    if (!hasLetter(password)) {
        validationData.validationMessage += 'letter';
        validationData.isValid = false;
        return validationData;
    }

    if (!hasNumber(password)) {
        validationData.validationMessage += 'number';
        validationData.isValid = false;
        return validationData;
    }
    
    if(typeof forbiddenStrings !== 'undefined') {
        checkForbiddenStringsData = checkForbiddenStrings(password, forbiddenStrings);
        if(checkForbiddenStringsData.value) {
            validationData.isValid = false;
            validationData.validationMessage = 'The password cannot contain ' + checkForbiddenStringsData.foundString;
            return validationData;
        }
    }
    
    return validationData;
}

//Helper Methods

function hasLowerCase(pw) {
    return (pw.toUpperCase() !== pw);
}

function hasUpperCase(pw) {
    return (pw.toLowerCase() !== pw);
}

function hasSpecialChars(pw) {
    return /[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(pw);
}

function hasLetter(pw) {
    return /[a-z]/i.test(pw);  
}

function hasNumber(pw) {
    return /[0-9]/.test(pw);  
}

function checkForbiddenStrings(pw, forbiddenStrings) {
    var checkForbiddenStringData = {
            value: false,
            foundString: ''
        };
        
    var upperCasePw = pw.toUpperCase();
    
    checkForbiddenStringData.value = forbiddenStrings.some(function(forbiddenString) {
         var isForbidden = (upperCasePw.indexOf(forbiddenString.toUpperCase()) > -1)  
         
         if(isForbidden) {
             checkForbiddenStringData.foundString = forbiddenString;
         }
         
         return isForbidden;
    });
    
    return checkForbiddenStringData;        
}