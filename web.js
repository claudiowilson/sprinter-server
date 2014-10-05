var express = require('express'),
	bodyParser = require('body-parser'),
	exec = require('child_process').exec;


var app = express();
app.use(bodyParser.text({type: 'text/plain'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/interpret/python', function(request, response) {
	console.log(request.body);
	var make = 'echo \'' + request.body.stuff + '\' > test.py';
	var made = exec(make);
	console.log(make);
	var command = 'python test.py';
	console.log(command);
	var child = exec(command, function(error, stdout, stderr) {
		if (error) {
			response.status(200).json({"stdout": null, "stderr": null, "error" : error});
		} else if (stderr) {
			response.status(200).json({"stdout": null, "stderr": stderr, "error" : null});
		} else if (stdout) {
			response.status(200).json({"stdout": stdout, "stderr": null, "error" : null});
		}
	});
});


app.listen(3000, function() {
	console.log('Listening!');
});
