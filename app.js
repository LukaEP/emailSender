var http = require('http');
const nodemailer = require('nodemailer');
const formidable = require('formidable');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'lukae.paiva@gmail.com',
        clientId: '71250279492-33jocr473mk6pc22dd8t44vduv3de9cv.apps.googleusercontent.com',
        clientSecret: '_ygfl62zndeJZBqwN2yB4eqN',
        refreshToken: ''
    }
});

http.createServer(function (req, res) {
    if (req.url == "/send") {
        var form = formidable.IncomingForm();
        form.parse(req, function (err, fields) {
            var mailoptions = {
                from: 'lukae.paiva@gmail.com',
                to: fields.whom,
                subject: fields.title,
                text: fields.message
            }
            transporter.sendMail(mailoptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Email Sent: ' + info);
                }
            });
        });
    } else {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write('<form action="send" method="post" enctype="multipart/form-data">');
        res.write('<label>Send to Whom? </label>');
        res.write('<input type="input" name="whom"><br><br>');
        res.write('<label>Title: </label>');
        res.write('<input type="input" name="title"><br><br>');
        res.write('Message: ');
        res.write('<textarea rows="10" cols="30" style="resize: none;" name="message"></textarea><br><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);