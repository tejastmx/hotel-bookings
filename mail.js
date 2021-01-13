const mailer = require("nodemailer");
const { Hello } = require("./hello_template");
const { Thanks } = require("./thanks_template");
const server= require("./server")
const getEmailData = (to, name, template,total,date) => {
    let data = null;
let t=parseInt(total)
console.log(name)
console.log(server.total)
    switch (template) {
        case "hello":
            data = {
                from: "Hotelbookings.com<Hotelbookings@gmail.com>",
                to,
                subject: `Hello ${name} your booking is confirmed `,
                html:`<h1>${name}, your booking is confirmed</h1>
                </hr>
                <h2>your date of booking is :${server.date.substring(0, 10)}</h2>
                </hr>
              <h2>Total booking amount: ${server.total} </h2>
             `
            }
            break;

        case "thanks":
            data = {
                from: "Hotelbookings.com<Hotelbookings@gmail.com>",
                to,
                subject: `Hello ${name} `,
                html: Thanks()
            }
            break;
        default:
            data;
    }
    return data;
}


const sendEmail = (to, name, type) => {

    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "sp19669@gmail.com",
            pass: "iloveusonali"
        }
    })

    const mail = getEmailData(to, name, type)
// console.log(type)
    smtpTransport.sendMail(mail, function(error, response) {
        if(error) {
            console.log(error)
        } else {
            console.log( " email sent successfully")
        }
        smtpTransport.close();
    })


}

module.exports = { sendEmail }