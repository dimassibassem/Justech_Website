const nodeMailer = require('nodemailer')

export default (req, res) => {
    const {FirstName} = req.body
    const {LastName} = req.body
    const {Email} = req.body
    const {Phone} = req.body
    const {Company} = req.body
    const {Address} = req.body
    const {Subject} = req.body
    const {Message} = req.body

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NEXT_PUBLIC_MAILER_EMAIL,
            pass: process.env.NEXT_PUBLIC_MAILER_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.NEXT_PUBLIC_MAILER_EMAIL,
        to: 'dimassibassem99@gmail.com',
        subject: `New Message from ${FirstName} ${LastName}`,
        text: `Subject: ${Subject} \n\n Message: ${Message} \n\n Email: ${Email} \n\n Phone: ${Phone} \n\n Company: ${Company} \n\n \n\n Address: ${Address} \n\n`
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
           return res.status(200).json({
                success: false,
                message: error
            })
        }
          return  res.status(200).json({
                success: true,
                message: 'Message sent successfully'
            })

    })

}
