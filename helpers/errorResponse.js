module.exports = (res,error,method) => {
    return res.status(error.status || 500).json({
        ok : false,
        msg : error.message || `Ups hubo un error en ${method}`
    })
}