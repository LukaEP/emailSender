const nodemailer = require('nodemailer');
const inbox = require('inbox');

//Send Email
exports.sendEmail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.USER_SERVICE_CONNECT,
            auth: {
                user: process.env.USER_EMAIL_CONNECT,
                pass: process.env.USER_PASSWORD_CONNECT
            }
        });

        let info = await transporter.sendMail({
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text
        });
        
        res.status(200).send({message: "Email Sended"});
    } catch (error) {
        res.status(500).send({message: `Error: ${error}`});
    }
};

exports.inbox = async (req, res) => {
    try {
        const client = inbox.createConnection(false, "imap.gmail.com", {
            secureConnection: true,
            auth: {
                user: req.body.email,
                pass: req.body.password
            }
        });

        client.connect();
        client.on("connect", function () {
            console.log("Successfuly connected to server");
            client.openMailbox("INBOX", function (error, mailbox){
                if (error) throw error;
                console.log("Message count in INBOX: " + mailbox.count);
                client.listMessages(-10, function (err, messages) {
                    if (err) throw err;
                    res.status(200).send({message: messages});
                });
            }); 
        });

    } catch (error) {
        res.status(500).send({message:`Error: ${error}`});
    }
};