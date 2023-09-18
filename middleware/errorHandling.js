function handleError(err) {
    let msg = err.message;
    if (err && err.errors) {
        if (err.name && err.name == "SequelizeUniqueConstraintError") {
            let field = err['errors'][0]["path"].split("_").join(" ")
            if (field) {
                let strr = field.split("_").join(" ");
                let label = (strr.charAt(0).toUpperCase() + strr.slice(1))
                msg = `${label} is already exists!`
            } else {
                msg = "Already exists!"
            }
        } else if (err.errors.length > 0 && err.errors[0]['value'] == "Validation error") {
            msg = err.errors[0]['message']
        } else {
            msg = err.message
        }
    }
    return msg
}

module.exports.handleError = handleError