const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');
const ejs = require('ejs');

require('dotenv').config();

const readHTMLFile = (path, callback) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
        if (err) {
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

async function mailConfig(verificationCode, emailReceiver) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
        },
    });

    // readHTMLFile('./public/pages/auth.html', async (err, html) => {
    //     if (err) throw err;
    //     let template = handlebars.compile(html);
    //     let replacements = { verificationCode: verificationCode, emailReceiver: emailReceiver };
    //     let htmlToSend = template(replacements);
    //     try {
    //         await transporter.sendMail({
    //             from: 'khuongtri91@gmail.com',
    //             to: emailReceiver,
    //             subject: 'Verify your email',
    //             text: `Please click to this link below to confirm your email `,
    //             html: htmlToSend,
    //         });
    //     } catch (err) {
    //         if (err) throw err;
    //     }
    // });
    //prettier-ignore
    let mailOptions = {
        from: 'khuongtri91@gmail.com',
        to: emailReceiver,
        subject: 'Verify your email',
        text: `Please click to this link below to confirm your email `,
        html: `<div style="background-color: #f1f1f1; width: 100%; height: 420px; text-align: center;">
            <div style="display: block">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/medicare-d0b4b.appspot.com/o/image-ui%2Fmain-logo.png?alt=media&token=6f323b37-51c3-4e16-b695-e6bf301914cf"
                    alt=""
                    style="margin-top: 16px; padding-bottom: 30px"
                />
            </div>
            <p style="font-size: 32px; color: black; text-align: center; margin-bottom: 16px; display: block;">
                Please click this button below to verify your email
            </p>
            <div style="background-color: #38b3d1; color: white; font-size: 22px; text-align: center; padding: 4px 16px; border: 1px solid transparent; width: 120px; margin: 0 auto;">
                <a href="http://localhost:4000/auth/verify?email=${emailReceiver}" style="color: white; text-decoration: none;">Confirm</a>
            </div>
        </div>`,
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        if (err) throw err;
    }
}

module.exports = mailConfig;
