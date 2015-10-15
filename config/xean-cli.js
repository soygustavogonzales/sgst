var cli_input = require('cli-input'),
lineByLine = require('line-by-line'),
q = require('q'),
asciiArt = require('ascii-art'),
ttycolor = require('ttycolor'),
fs = require('fs'),
fs_extra = require('fs-extra'),
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
                  .then(function(data){
                    prompt(['module name'])
                    .then(function(res){
                      //console.log(templates.path.module);
                      var nameModule = res.map.name;
                      var text = fs.readFileSync('./templates/schema-paths/template.gulp.paths.module.json', 'utf-8');

                      [{type:'html'},{type:'css'},{type:'js'}].forEach(function(obj){
                          //console.log(JSON.stringify(this));
                          var PathTemplate = JSON.stringify(JSON.parse(text)[obj.type]);
                          var PathTemplateJson = JSON.parse(PathTemplate.replace(/\{\[moduleName\]\}/ig,nameModule));
                          this[obj.type][Object.keys(PathTemplateJson)] = PathTemplateJson[Object.keys(PathTemplateJson)]; 
                          
                      },gulp_paths)

                      var newJson_ = 'module.exports = \n'+JSON.stringify(gulp_paths,null,'\t');
                      fs.writeFileSync('./sample.js',newJson_);
                      process.exit(0);
                    });
                  });
                  
                });
                //Object.prototype.toString.call()
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

function writeFiles(pathLayout, pathNewFile, moduleName, nameFile) {
  /*
  readFileByLine = lineByLine(pathFile);
  readFileByLine.on('line', function(line, lineCount, byteCount) {
    // do something with the line of text 
    console.log(line)
  });

  readFileByLine.on('error', function(e) {
    console.log(e)
    // something went wrong 
  });
  */
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
        defer.resolve(true)
      }
    });
    return defer.promise;
}

startMenu();