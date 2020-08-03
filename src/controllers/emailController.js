const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
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
};