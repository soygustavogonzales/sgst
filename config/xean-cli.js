var cli_input = require('cli-input'),
lineByLine = require('line-by-line'),
q = require('q'),
asciiArt = require('ascii-art'),
ttycolor = require('ttycolor'),
fs = require('fs'),
fs_extra = require('fs-extra'),
wrench = require('wrench'),
path = require('path');
var sets = cli_input.sets,
definitions = sets.definitions,
name = path.basename(process.argv[1]),
def = definitions.confirm.clone(),
ttycolor = ttycolor.defaults(),
ps = cli_input(),
gulp_paths = require('./gulp.paths')
;
var templates = new Object();
templates.path = require('./templates.paths.config.js');


var schema = {
  parameter: {type:'string'},
}

var parameter = definitions.question.clone({
  key:'name',
  parameters: ['enter command'],
  message:"%s >",
  required:true,
  repeat:true
});

function readFile(path){

  var defer = q.defer();
    fs.readFile(path,'utf-8',function(err,data){
        if(err){
         throw err;
         defer.reject(false)
        }
        else{ defer.resolve(data)};
    });
    return defer.promise;

};

function prompt(parameters,callback){
  var defer = q.defer();
  var parameters_ = definitions.question.clone({key:'name',parameters: parameters,message:"%s >",required:true,repeat:true});
  var schema = {schema:{type:'string'}};
  ps.run([parameters_], schema, function(err,res){
    if(err)
      defer.reject(err);
    else
      defer.resolve(res);      
  });
  return defer.promise;
};

function startCLI() {

  ps.run([definitions.question.clone({key:'name',parameters: ['enter command'],message:"%s >",required:true,repeat:true})], {schema:{type:'string'}}, function(err,res){
    for(i in (res.map)){
        var command = res.map[i];
        command = command.trim()
        var command_ = command.split(/\s+/ig);

        switch(command_[0]){
          case('create'):
            switch(command_[1]){
              case('module'):
                readFile('tree.json')
                .then(function(data){
                  return JSON.parse(data);
                })
                .then(function(tree){

                  var pages = tree.pages.map(function(element){
                    return Object.keys(element).toString();
                  });
                  
                  console.log('Elija un número ¿En que página desea crear este nuevo módulo?');
                  selectOption(pages,'Que número?')
                  .then(function(pageName){
                    prompt(['module name'])
                    .then(function(res){
                      //console.log(templates.path.module);
                      var moduleName = res.map.name;
                      var text = fs.readFileSync('./templates/schema-paths/template.gulp.paths.module.json', 'utf-8');

                      [{type:'html'},{type:'css'},{type:'js'}].forEach(function(obj){
                          
                          var PathTemplate = JSON.stringify(JSON.parse(text)[obj.type]);
                          var PathTemplateJson = JSON.parse(PathTemplate.replace(/\{\[moduleName\]\}/ig,moduleName));
                          this[obj.type][Object.keys(PathTemplateJson)] = PathTemplateJson[Object.keys(PathTemplateJson)]; 
                          
                      },gulp_paths)

                      var newJson_ = 'module.exports = \n'+JSON.stringify(gulp_paths,null,'\t');
                      fs.writeFileSync('./sample.js',newJson_);
                      return {
                        pageName:pageName,
                        moduleName:moduleName
                      }
                    })
                    .then(function(data){

                      copyRecursiveSync('./templates/module','../public/modules/'+data.moduleName)
                      data.srcDest = '../public/modules/'+data.moduleName;
                      
                      return data  
                    })
                    .then(function(data){

                      console.log(JSON.stringify(data));
                      inspectRecursiveSync(data.srcDest,data);
                      process.exit(0);

                    })
                  });
                  
                });
                break;
              case('page'):
                break;
              case('submodule'):
                break;
            }
            break;
          case('remove'):
            console.log('remove');
            break;
          default:
            console.log('nothing');
        }
    }
  });  

}

function inspectRecursiveSync(src,opt) {


  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {

    fs.readdirSync(src).forEach(function(childItemName) {
      inspectRecursiveSync(path.join(src, childItemName),opt);
    });

  } else {

    var text = fs.readFileSync(src, 'utf-8');
    if(text.trim().length>0){

      var text_ = text.replace(/\{\[moduleName\]\}/ig,opt.moduleName)
                  .replace(/\{\[parentModuleName\]\}/ig,opt.pageName)
      fs.writeFileSync(src,text_);
      console.log(src);
      
    }

  }
};

function copyRecursiveSync(src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else {
    fs.linkSync(src, dest);
  }
};

function writeFiles(pathLayout, pathNewFile, moduleName, nameFile) {
 
  var defer = q.defer();
  fs_extra.copy(pathLayout, pathNewFile +"/"+moduleName+ "/"+ nameFile, function (err) {
    if (err){
      return console.error(colors.error(err))
      defer.reject(err)
    } else{
      console.log(colors.info("\nNew file in: \n "+ pathNewFile +"/"+colors.verbose(moduleName)+"/"+colors.verbose(nameFile)))
      defer.resolve(true)
    }
  }) // copies file 
  return defer.promise
}

function startMenu(){
 console.log('xean --> \ncreate module'
    +'\n create page'
    +'\n create submodule'
  );
 startCLI()
 
}

function create(command){
  if(command[1]){

  }
};

function selectOption(options,msj){
    var defer = q.defer();
    ps.on('invalid', function(line, index, options, ps) {
      if(isNaN(index)) {
        console.error('%s ! not a number %s', name, line);
      }else{
        console.error(
          '%s ! not a known option index %s', name, line);
      }
    })


    var opts = {list: options};
    var def = definitions.option.clone();
    def.message = msj+'(%s)?';
    def.parameters = ['1-' + options.length];
    opts.prompt = def;

    ps.select(opts, function(err, res, index, line) {
      if(err || !res){
        defer.reject(false)
      }else{
        console.log('Elegiste %s, Genial.', res.value.toUpperCase());
        defer.resolve(res.value)
      }
    });
    return defer.promise;
}

startMenu();