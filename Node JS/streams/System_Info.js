var timer='Time taken';
console.time(timer);
var os=require('os');
var fs=require('fs');

var WritingStream=fs.createWriteStream('System_Info.txt');
// WritingStream.write(" Platform is "+os.platform()+" , System is "+os.arch() +" bit machine\n");
WritingStream.write(JSON.stringify(os.networkInterfaces()))
WritingStream.end();
WritingStream.on("finish",function(){
	console.timeEnd(timer);
	console.log('All done Boss');
})