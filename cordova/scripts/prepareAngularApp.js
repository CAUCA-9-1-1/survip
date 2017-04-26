const fs = require('fs');
const readline = require('readline-sync');
const execSync = require('child_process').execSync;

function build(basePath, env) {
    console.log('Building Angular application into "./www" directory.');
    const baseWWW = basePath + '/www';

    console.log(execSync(
        "ng build --target=production --" + env.toLowerCase() + " --output-path cordova/www/ --base-href .",
        {
            maxBuffer: 1024*1024,
            cwd: basePath + '/..'
        }).toString('utf8')
    );

    setUpCordova(baseWWW);
}

function setUpCordova(baseWWW) {
    console.log('Add "cordova.js" inside "index.html"');
    var oldContent = fs.readFileSync(baseWWW + '/index.html', 'utf-8');
    var newContent = oldContent.replace('<app-root>', '<script type="text/javascript" src="cordova.js"></script><app-root>');

    fs.writeFileSync(baseWWW + '/index.html', newContent, 'utf-8');
}

module.exports = function(context) {
    var env = ['SKIP', 'DEV', 'TEST', 'PROD'];
    var index = readline.keyInSelect(env, 'Pour quel environnement voulez-vous compiler? ', {
        //hideEchoBack: true
    });

    if (index === 0 ) {
        // Do nothing and continue
    } else if (index > -1) {
        build(context.opts.projectRoot, env[index]);
    }
};
