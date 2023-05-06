const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
module.exports = {
  confirmRegister: async (data) => {
    const { name, token, email } = data;
    try {
      const infoMail = await transport.sendMail({
        from: "Project Manager <info@projectmanager.com>",
        to: email,
        subject: "Confirma tu cuenta",
        text: "Confirmar tu cuenta en Project Manajer",
        html: `
            <p>Hola ${name} hace click en el siguiente enlace para confirmar</p>
            <a href="${process.env.URL_FRONTEND}/confirm/${token}">Confirmar cuenta</a>
            `,
      });
      console.log(infoMail);
    } catch (error) {
      console.log(error);
    }
  },
  forgotPassword: async (data) => {
    const { name, token, email } = data;

    try {
      const infoMail = await transport.sendMail({
        from: "Project Manager <info@projectmanager.com>",
        to: email,
        subject: "Reestablecé tu contraseña",
        text: "Reestablecé tu contraseña en Project Manager",
        html: `
                <p>Hola ${name}, hacé click en el siguiente enlace para <a href="${process.env.URL_FRONTEND}/recover-password/${token}">reestablecer tu contraseña</a> <p/>
                
                `,
      });
      console.log(infoMail);
    } catch (error) {
      console.log(error);
    }
  },
};
