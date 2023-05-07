const SibApiV3Sdk = require("sib-api-v3-sdk");
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sender = {
  email: "danimartinez@gmail.com",
  name: "New Home Company",
};
module.exports = {
  confirmRegister : async (data) => {
    const {email,name,token} = data
    const receivers = [
      {
        email
      }
    ]
    try {
      const sendMail = await apiInstance.sendTransacEmail({
        sender,
        to: receivers,
        subject: `Confirmar tu cuenta`,
        textContent: "Confirmar tu cuenta en New Home Company",
        htmlContent: `
        <p>Hola ${name} hace click en el siguiente enlace para confirmar</p>
            <a href="${process.env.HOST}:${process.env.PORT}/confirm/${token}">Confirmar cuenta</a>
        `,
      });
      console.log(sendMail);
    } catch (error) {
      console.error(error);
    }
  }
}
