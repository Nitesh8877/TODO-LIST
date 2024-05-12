const USER_STATUS={
    ACTIVE:"Active",
    INACTIVE:"Inactive"
}
const responseCode={
    OK:200,
    BAD_REQUEST:400,
    CREATED:201,
    NO_CONTENT:204,
    FORBIDEN:403,
    INTERENAL_SERVER_ERROR:500,
    UNAUTHORIZED:401,CONFLICT:409
}

const responseMessage={
    USER_CREATED_SUCCESS:"Registration successfully",
    LOGIN_SUCCESS:"Login successfully",
    LOGOUT_SUCCESS:"Logout successfully",
    USER_UPDATE:"User updated successfully",
    USER_DELETE:"User delete successfully",
    USER_GET_SUCCESS:"User get successfully",
    EMAIL_ALREADY:"Email alredy exist",
    USER_NOT:"User not found",
    INVALID_CREDENTIAL:"Invalid credential",
    TODO_CREATED:"Todo created successfully",
    TODO_UPDATED:"Todo updated successfully",
    TODO_DELETED:"Todo deleted successfully",
    TODO_GET_SUCCESS:"Todo get successfully",
    NOT_FOUND:"Record not found"

}
const todoStatus={
   PENDING: 'Pending', COMPLETED:'Completed'
}

module.exports={
    USER_STATUS,responseCode,responseMessage,todoStatus
}