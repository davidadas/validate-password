var validatePassword = require('./validate-password');
var assert = require('assert');

/*
** Letter, number, and special char tests
*/

describe('when we check for letters, numbers, and special chars', function() {
    it('should contain at least one lowercase letter', function() {
        var passwordData = validatePassword('AAAAAAAAA');
        
        assert.equal(passwordData.isValid, false, 'the password should be invalid');
        assert.equal(passwordData.validationMessage, 
                    'The password must contain at least one lowercase letter', 
                    'the correct validation message should be returned');
    });
    
    it('should contain at least one uppercase letter', function() {
        var passwordData = validatePassword('aaaaaaaa');
        
        assert.equal(passwordData.isValid, false, 'the password should be invalid');
        assert.equal(passwordData.validationMessage, 
                    'The password must contain at least one uppercase letter', 
                    'the correct validation message should be returned');
    });
    
    it('should contain a special character', function() {
        var passwordData = validatePassword('aaaaaaaaAAAAA');
        
        assert.equal(passwordData.isValid, false, 'the password should be invalid');
        assert.equal(passwordData.validationMessage, 
                    'The password must contain at least one special character', 
                    'the correct validation message should be returned');
    });
    
    it('should contain a number', function() {
        var passwordData = validatePassword('aaBa$%^#$%#$%');
        
        assert.equal(passwordData.isValid, false, 'the password should be invalid');
        assert.equal(passwordData.validationMessage, 
                    'The password must contain at least one number', 
                    'the correct validation message should be returned');
    });
    
    it('should be valid if it contains one uppercase letter, one lowercase letter, a special char, and a number', function() {
        var passwordData = validatePassword('aaBa$112&bbb');
        
        assert.equal(passwordData.isValid, true, 'the password should be valid');
    });        
});

/*
** Forbidden string tests
*/

describe('when we check for forbidden strings', function() {
    it('should not contain a forbidden string', function() {
        var passwordData = validatePassword('cat123aaBa$%^#$%#$%', ['cat123']);
        
        assert.equal(passwordData.isValid, false, 'the password should be invalid');
    });
    
    it('should be invalid if at least one of the forbidden strings exists', function() {
        var passwordData = validatePassword('cat123aaBa$%^#$%#$%', ['cat123', 'dog456']);
        
        assert.equal(passwordData.isValid, false, 'the password should be invalid');
    });
    
    it('should be invalid if both of the forbidden strings exists', function() {
        var passwordData = validatePassword('cat123aaBa$%^#$%#$%dog456', ['cat123', 'dog456']);
        
        assert.equal(passwordData.isValid, false, 'the password should be invalid');
    });
    
    it('should be invalid and let the user know what part of the password is not allowed for a single forbidden string', function() {
        var passwordData = validatePassword('cat123aaBa$%^#$%#$%dog456', ['cat123']);
        
        assert.equal(passwordData.isValid, false, 'the password should be invalid');
        assert.equal(passwordData.validationMessage, 
            'The password cannot contain cat123', 
            'the correct validation message should be returned');
    });
});