//const { exec } = require('child_process');
const { spawn } = require('child_process');
const escape = require('escape-html');
const express = require('express');
const { domain, debugPort } = require('process');
const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/:domain', (req, res) => {
    var query = req.params.domain;
    if (query.endsWith(".ia")) {
        console.log("ARCTICNET DOMAIN");
        /*exec(`whois ${req.params.domain} -h whois.arcticnet.net`, (err, stdout, stderr) => {
            if (err) {
                console.error(err)
            } 
            else {
                res.send(`<html><head><title>WHOIS lookup for ${escape(req.params.domain)}</title></head><body><pre>${stdout}</pre></body></html>`);
            }
        });*/
        var userInput = req.params.domain;
        var args = [ userInput, '-h', 'whois.arcticnet.net' ];
        var cmd = 'whois';
        var subprocess = spawn(cmd, args);
        var stderr = '';
        var stdout = '';
        subprocess.stdout.on('data', function(data) {
            stdout += data;
        });
        subprocess.stderr.on('data', function(data) {
            stderr += data;
        });
        subprocess.on('close', function(exitCode) {
            //console.log('echo: ' + stdout);
            res.send(`<html><head><title>WHOIS lookup for ${escape(req.params.domain)}</title></head><body><pre>${stdout}</pre></body></html>`);
        });
    }
    else {
        console.log("NORMAL DOMAIN");
        var userInput = req.params.domain;
        var args = [ userInput ];
        var cmd = 'whois';
        var subprocess = spawn(cmd, args);
        var stderr = '';
        var stdout = '';
        subprocess.stdout.on('data', function(data) {
            stdout += data;
        });
        subprocess.stderr.on('data', function(data) {
            stderr += data;
        });
        subprocess.on('close', function(exitCode) {
            //console.log('echo: ' + stdout);
            res.send(`<html><head><title>WHOIS lookup for ${escape(req.params.domain)}</title></head><body><pre>${stdout}</pre></body></html>`);
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/views/index.html');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})