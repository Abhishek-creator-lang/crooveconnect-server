export const addUserSchema = {
    type:'object',
    properties:{
        email: {type: 'string', format: 'email'},
        password: {type:'string', format: 'nonEmptyOrBlank'},
        name: {type:'string', minLength: 3, maxLength: 30}
    },
    required: ['email', 'password'],
}

export const loginUserSchema = {
    type:'object',
    properties:{
        email: {type: 'string', format: 'email'},
        password: {type:'string', format: 'nonEmptyOrBlank'},
    },
    required: ['email', 'password'],
}


 
