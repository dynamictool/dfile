module.exports = function(RED) {
    var fs = require('fs');
    function dfile(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
			var localdir = config.localdir || false;
			var prefile = config.prefile || false;
			if (localdir && prefile){
				node.warn("Start...");
				let d = new Date();
				let year = d.getFullYear();
				let month = d.getMonth() + 1;
				if(month<10) month = "0" + month;
				let day = d.getDate();
				if(day<10) day = "0" + day;
				let hours = d.getHours();
				if(hours<10) hours = "0" + hours;
				let minutes = d.getMinutes();
				if(minutes) minutes = "0" + minutes;
				
				let fileName = prefile + year + month + day + hours + minutes + "00.txt";
				let fullPath = localdir + '/' + fileName;
				let content = "Noi dung ghi file";
				fs.writeFile(fullPath, content, err => {
					if(err){
						node.warn("-->Error: Can not write file: " + fullPath);
					}else{
						node.warn("Created file: " + fullPath);
					}
				});
			} else {
				node.warn("Please enter config before continue");
			}
            node.send(msg);
        });
    }
    RED.nodes.registerType("dfile",dfile);
}