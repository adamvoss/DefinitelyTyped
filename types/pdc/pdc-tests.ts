import pdc = require('pdc');

// optional, if pandoc is not in PATH
import * as path from 'path';
pdc.path = path.resolve(process.env["HOME"], '.cabal/bin/pandoc');

pdc('# Heading', 'markdown', 'html', (err: any, result: any) => {
    if (err)
        throw err;

    console.log(result);
});

pdc.path = 'pandoc';

const child_process = pdc.stream("html", "markdown", ["-v"]);
