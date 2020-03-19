const fs = require('fs');

['.npmrc', '.yarnrc'].map(fileName => {
    fs.readFile(fileName, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/keystone-npm/g, 'keystone-alpha');

        fs.writeFile(fileName, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
});