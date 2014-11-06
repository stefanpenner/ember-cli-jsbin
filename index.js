var glob = require('glob');
var fs = require('fs');
/*
 * <script type="text/x-esnext" id="app/app">
 * // content of the app/app.js
 * </script>
 *
 *
 */
var modules = glob.sync('app/**/*.js').map(function(file) {
  return {
    moduleName: file.replace('.js',''),
    moduleBody: fs.readFileSync(file).toString()
  };
})

var templates = glob.sync('app/**/*.hbs').map(function(file) {
  return {
    moduleName: file.replace('.hbs', ''),
    moduleBody: fs.readFileSync(file).toString()
  };
})


modules.push({
  moduleName: "app/config/environment",
  moduleBody: 
   "export default { modulePrefix: 'app', locationType: 'hash'};\n"
});

var result = modules.map(function(module) {
  return "<script type='text/x-esnext' id='" + module.moduleName +"'>\n"  +
           module.moduleBody +
         "</script>\n";
}).join('\n');

var templateModules = templates.map(function(module) {
  return "<script type='text/x-handlebars' id='" + module.moduleName +"'>\n"  +
           module.moduleBody +
         "</script>\n";
}).join('\n');

var index = '<script src="http://static.iamstef.net/ember-cli-jsbin/jquery/dist/jquery.js"></script>\n' +
'<script src="http://static.iamstef.net/ember-cli-jsbin/loader.js/loader.js"></script>\n' +
'<script src="http://static.iamstef.net/ember-cli-jsbin/handlebars/handlebars.js"></script>\n' +
'<script src="http://static.iamstef.net/ember-cli-jsbin/ember/ember.js"></script>\n' +
'<script src="http://static.iamstef.net/ember-cli-jsbin/ember-load-initializers/ember-load-initializers.js"></script>\n' +

'<script src="http://static.iamstef.net/ember-cli-jsbin/ember-resolver/dist/ember-resolver.js"></script>\n' +
'<script src="http://static.iamstef.net/ember-cli-jsbin/ember-cli-shims/app-shims.js"></script>\n' +
'<script src="http://static.iamstef.net/ember-cli-jsbin/ember-cli.js"></script>\n' +
'<meta name="ember-app" content="app" mode="auto-run">\n' + result + '\n' +
  templateModules;

console.log(index);
