const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
    pool:true,
    maxConnections:1,
    service:"naver",
    host:"smtp.naver.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PW
    },
    tls:{
        rejectUnauthorized:false
    }
})

module.exports = smtpTransport;