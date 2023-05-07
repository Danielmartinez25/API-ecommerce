var SibApiV3Sdk = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY
const tranEmailApi = new Sib.TransactionalEmailsApi()
const enviroment = async () => {
  const {email} = req.body
  const sender = {email : 'danimartinez1325@gmail.com'}
  const receivers = [{email}]
  
}