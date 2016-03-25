
#Moonshine
###client-side and server-side password validation

Enforce stronger passwords for users by checking for uppercase/lowercase letters, numbers, and special characters.

You can also check passwords for certain strings, preventing users from entering their name or email in the password, or
check the password for commonly used passwords that you'd like your users to avoid...

##Installation
Install via NPM:

```
npm install validate-password
```

##Usage

Moonshine can be used as a stand alone package:

``` 
<script src="node_modules/validate-password/dist/validate-password.min.js"></script>
```

or as a CommonJS module:

```
var ValidatePassword = require('validate-password');
```

```Validate Password``` will accept two arguments - first, the password as a string:

```
var passwordData = ValidatePassword('aaaaa');

console.log(passwordData.isValid); // false
console.log(passwordData.validationMessage); // 'The password must contain at least one uppercase letter'
```

And, optionally, an array of strings that are not allowed to be in the password:

```
var checkPasswordForName = ValidatePassword('cat123aaBa$%^#$%#$%', ['cat123']);

console.log(passwordData.isValid); // false
console.log(passwordData.validationMessage); // 'The password cannot contain cat123'
```

See the examples directory for more detailed use cases...








