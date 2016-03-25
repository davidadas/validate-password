(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ValidatePassword = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])(1)
});