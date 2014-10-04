var express = require('express'),
	bodyParser = require('body-parser'),
	exec = require('child_process').exec;


var app = express();
app.use(bodyParser.text({type: 'text/plain'}));

app.post('/interpet/python', function(request, response) {
	//console.log(request.body);
	var make = 'echo "' + request.body + '" > test.py';
	//console.log(make);
	var made = exec(make);
	var command = 'python test.py';

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
