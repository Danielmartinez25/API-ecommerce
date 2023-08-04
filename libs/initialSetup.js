const Role = require("../database/models/role");
module.exports = {
    createRoles : async () =>{
    try {
    const count = await Role.estimatedDocumentCount();
    if(count > 0) return;
    const data = await Promise.all([
        new Role({ name : 'user'}).save(),
        new Role({ name: 'moderator' }).save(),
        new Role({ name: 'admin' }).save(),
    ])
    return console.log(data);
    } catch (error) {
        return console.log(error);
        }
        
}
}