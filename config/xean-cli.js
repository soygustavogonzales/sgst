var cli_input = require('cli-input'),
lineByLine = require('line-by-line'),
q = require('q'),
asciiArt = require('ascii-art'),
ttycolor = require('ttycolor'),
fs = require('fs'),
path = require('path');

var sets = cli_input.sets,
definitions = sets.definitions,
name = path.basename(process.argv[1]),
def = definitions.confirm.clone(),
ttycolor = ttycolor.defaults(),
ps = cli_input()
;
readFile();
function readFile(){
    //console.info(fs.readFileSync('tree.js'));

    fs.readFile('tree.js', function(err,data){
      if(err){
        throw err
      }else{
        console.log(data);
      } 
        console.log(data);
    });

};


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

function startCLI() {
  ps.run([parameter], {schema:schema}, function(err,res){
    //console.log(JSON.stringify(res.map))
    for(i in (res.map)){
        var command = res.map[i];
        command = command.trim()
        var command_ = command.split(/\s+/ig);

        switch(command_[0]){
          case('create'):
            switch(command_[1]){
              case('module'):
                readFile()
                console.log(command_[1]);
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
    process.exit(0)
  });  

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

function selectOption(options){

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
		def.message = 'which language floats your boat (%s)?';
		def.parameters = ['1-' + options.length];
		opts.prompt = def;

		ps.select(opts, function(err, res, index, line) {
		  if(err || !res) return console.error(err);
		  console.log('%s, really? cool.', res.value);
		  process.exit(res ? 0 : 1);
		});
}

//selectOption(['Javascript','Ruby','Perl',]);

startMenu();