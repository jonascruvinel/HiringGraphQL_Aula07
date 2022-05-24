import { createServer } from 'http';
import { readFile } from 'fs';
import { resolve } from 'path';
import { parse } from  'querystring';

const server = createServer((request, response) => {
    switch (request.url){
        case '/status': {
            response.writeHead(200, {
                'Content-Type': 'application/json',
            });
            response.write(
                JSON.stringify({
                    status: 'Ok',
                })
            );
            response.end();
            break;
        }
        case '/sign-in': {
            const path = resolve('../web/src/sign-in.html');
            readFile(path, (error, file) => {
                if(error) {
                    response.writeHead(500, 'Can\t process HTML file');
                    response.end();
                    return;
                }

                response.writeHead(200);
                response.write(file);
                response.end();
            });
            break;
        }
        case '/home': {
            const path = resolve('../web/src/home.html');
            readFile(path, (error, file) => {
                if(error) {
                    response.writeHead(500, 'Can\t process HTML file');
                    response.end();
                    return;
                }

                response.writeHead(200);
                response.write(file);
                response.end();
            });
            break;
        }
        case '/authenticate': {
            let data = '';
            request.on('data', (chunk) => {
                data += chunk;
            });
            request.on('end', () => {
                const params = parse(data);
                response.writeHead(301, {
                    location: '/home',
                });
                response.end(); 
            });
            break;
        }
        default: {
            response.writeHead(404, 'Server not found');
            response.end();
        }
    }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || 'http://127.0.0.1';

server.listen(PORT, '127.0.0.1', () =>{
    console.log(`Server is listem  as ${HOSTNAME}:${PORT}`);
});

