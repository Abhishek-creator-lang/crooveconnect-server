/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./knexfile.ts":
/*!*********************!*\
  !*** ./knexfile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\n__webpack_require__(/*! ts-node/register */ \"ts-node/register\");\nconst environments = ['development', 'staging', 'production'];\nconst connection = {\n    port: 5432,\n    host: process.env.DB_HOST,\n    database: process.env.DB_NAME,\n    user: process.env.DB_USER,\n    password: process.env.DB_PASSWORD,\n    ssl: {\n        rejectUnauthorized: false, // Set to true if you have a valid SSL certificate\n    },\n};\nconst commonConfig = {\n    client: 'pg',\n    connection: connection, // Use the connection object instead of a connection string\n    pool: {\n        min: 2,\n        max: 10,\n    },\n    migrations: {\n        tableName: 'knex_migrations',\n        directory: 'src/database/migrations',\n    },\n    seeds: {\n        directory: 'src/database/seeds',\n    },\n};\nconsole.log(commonConfig, 'commonConfig');\nexports[\"default\"] = Object.fromEntries(environments.map((env) => [env, commonConfig]));\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./knexfile.ts?");

/***/ }),

/***/ "./src/database/index.ts":
/*!*******************************!*\
  !*** ./src/database/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.database = void 0;\nconst knex_1 = __importDefault(__webpack_require__(/*! knex */ \"knex\"));\nconst knexfile_1 = __importDefault(__webpack_require__(/*! ../../knexfile */ \"./knexfile.ts\"));\nexports.database = (0, knex_1.default)(knexfile_1.default[\"development\" || 0]);\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/database/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)({ path: `.env.${\"development\"}` });\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst database_1 = __webpack_require__(/*! ./database */ \"./src/database/index.ts\");\nconst router_1 = __webpack_require__(/*! ./router */ \"./src/router/index.ts\");\nconst errorHandler_1 = __webpack_require__(/*! ./lib/errorHandler */ \"./src/lib/errorHandler.ts\");\nconst PORT = process.env.PORT || 9999;\nconst app = (0, express_1.default)();\ndatabase_1.database.migrate\n    .latest()\n    .then(function () {\n    return database_1.database.seed.run();\n})\n    .then(function () {\n    console.log('finished');\n});\napp.use(body_parser_1.default.json());\napp.use((0, cors_1.default)());\nrouter_1.allRoutes.map(route => app.use('/api', route));\napp.use(errorHandler_1.errorHandler);\napp.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {\n    console.log(`Server is running on port ${PORT}`);\n}));\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/index.ts?");

/***/ }),

/***/ "./src/lib/apiError.ts":
/*!*****************************!*\
  !*** ./src/lib/apiError.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ApiError = void 0;\nconst errorResponseMessage_1 = __webpack_require__(/*! ./errorResponseMessage */ \"./src/lib/errorResponseMessage.ts\");\n/**\n * @class API Error class.\n */\nclass ApiError extends Error {\n    constructor(message, status, code) {\n        super(message);\n        this._status = status;\n        this._code = code;\n        Object.setPrototypeOf(this, ApiError.prototype); // to ensure instanceof works\n    }\n    /**\n     * Sends error JSON to response stream.\n     * @param {Response} res Server response.\n     */\n    send(res) {\n        // set status\n        res.status(this._status || 500);\n        // send JSON\n        res.json({\n            isError: true,\n            code: this._code || errorResponseMessage_1.errorResponseMessage.INTERNAL_ERROR,\n            message: this.message,\n        });\n    }\n    /**\n     * @return {JSON} error.\n     */\n    get() {\n        // return JSON\n        return {\n            isError: true,\n            status: this._status || 500,\n            code: this._code || errorResponseMessage_1.errorResponseMessage.INTERNAL_ERROR,\n            message: this.message,\n        };\n    }\n}\nexports.ApiError = ApiError;\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/lib/apiError.ts?");

/***/ }),

/***/ "./src/lib/error.ts":
/*!**************************!*\
  !*** ./src/lib/error.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.errors = void 0;\nconst apiError_1 = __webpack_require__(/*! ./apiError */ \"./src/lib/apiError.ts\");\nconst errorConstant_1 = __webpack_require__(/*! ./errorConstant */ \"./src/lib/errorConstant.ts\");\nconst { mapValues } = __webpack_require__(/*! lodash */ \"lodash\");\n// Transform error value into error functions\nexports.errors = mapValues(errorConstant_1.errorCodes, (val, key) => {\n    return message => new apiError_1.ApiError(message || val.message, val.status, key);\n});\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/lib/error.ts?");

/***/ }),

/***/ "./src/lib/errorConstant.ts":
/*!**********************************!*\
  !*** ./src/lib/errorConstant.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.errorCodes = void 0;\n/**\n * Defined API errors.\n */\nexports.errorCodes = {\n    VERSION_MISMATCH: {\n        status: 400,\n        code: 'VERSION_MISMATCH',\n        message: 'API version mismatch!',\n    },\n    ENDPOINT_NOT_FOUND: {\n        code: 'ENDPOINT_NOT_FOUND',\n        status: 404,\n        message: 'No such route exists!',\n    },\n    INTERNAL: {\n        code: 'INTERNAL',\n        status: 500,\n        message: 'Internal server error!',\n    },\n    BAD_REQUEST: {\n        code: 'BAD_REQUEST',\n        status: 400,\n        message: 'Bad Request!',\n    },\n    UNAUTHORIZED: {\n        code: 'UNAUTHORIZED',\n        status: 401,\n        message: 'Unauthorized access!',\n    },\n    NOT_IMPLEMENTED: {\n        code: 'NOT_IMPLEMENTED',\n        status: 501,\n        message: 'Resource method not implemented!',\n    },\n    INVALID_INPUT: {\n        code: 'INVALID_INPUT',\n        status: 400,\n        message: 'Invalid input in request!',\n    },\n    INVALID_INPUT_FORMAT: {\n        code: 'INVALID_INPUT_FORMAT',\n        status: 400,\n        message: 'Invalid input in format!',\n    },\n    INVALID_USER: {\n        code: 'INVALID_USER',\n        status: 400,\n        message: 'Incorrect email or pasword!',\n    },\n    USER_NOT_FOUND: {\n        code: 'USER_NOT_FOUND',\n        status: 400,\n        message: 'User details not found!',\n    },\n    USER_NOT_HAVE_PERMISSION: {\n        code: 'USER_NOT_HAVE_PERMISSION',\n        status: 400,\n        message: 'User details not found!',\n    },\n    DETAILS_NOT_FOUND: {\n        code: 'DETAILS_NOT_FOUND',\n        status: 400,\n        message: 'Details Not found!',\n    },\n    USER_ALREADY_EXIST: {\n        code: 'USER_ALREADY_EXIST',\n        status: 400,\n        message: 'User already exist!',\n    },\n};\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/lib/errorConstant.ts?");

/***/ }),

/***/ "./src/lib/errorHandler.ts":
/*!*********************************!*\
  !*** ./src/lib/errorHandler.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n// const ApiError = require('./ApiError');\n// const errors = require('./errors');\n// const logger = require('./logger');\n// const _ = require('lodash');\n// const {v4: uuidv4} = require('uuid');\n// const config = require('./config')();\n// const knex = require('./knex');\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.errorHandler = errorHandler;\nconst apiError_1 = __webpack_require__(/*! ./apiError */ \"./src/lib/apiError.ts\");\nconst error_1 = __webpack_require__(/*! ./error */ \"./src/lib/error.ts\");\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\n/**\n * Express error handler middleware.\n * Should be the last middleware used.\n *\n * @param {Error|*} err Error value\n * @param {Request} req Express request\n * @param {Response} res Express response\n * @param {Function} next Next function\n */\nfunction errorHandler(err, req, res, next) {\n    return __awaiter(this, void 0, void 0, function* () {\n        console.log('hey 1234');\n        if (res.headersSent) {\n            // end if headers have already been sent\n            console.log('inside');\n            res.end();\n        }\n        else {\n            // send error\n            if (err instanceof apiError_1.ApiError) {\n                // send API error\n                //   logger.error(errorFormatter(err, req));\n                //   const errorId = await saveErrorLogs(err, req);\n                //   err.errorId = errorId;\n                console.log('inside');\n                err.send(res);\n            }\n            else {\n                // log internal error\n                //   logger.error(errorFormatter(err, req));\n                //   const errorId = await saveErrorLogs(err, req);\n                console.log(\"outside\");\n                // send default API error\n                const details = inspectDetail(err);\n                const defaultError = error_1.errors.INTERNAL(details);\n                //   defaultError.errorId = errorId;\n                defaultError.send(res);\n            }\n        }\n    });\n}\n/**\n * Inspect err object and return related error detail if any.\n *\n * @param {*} err - error to inspect.\n * @return {Object} error details, or undefined.\n */\nfunction inspectDetail(err) {\n    if (err instanceof Error && _.has(err, 'message')) {\n        return err.message;\n    }\n    // return default detail\n    return 'Unknown Error';\n}\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/lib/errorHandler.ts?");

/***/ }),

/***/ "./src/lib/errorResponseMessage.ts":
/*!*****************************************!*\
  !*** ./src/lib/errorResponseMessage.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.errorResponseMessage = void 0;\nexports.errorResponseMessage = {\n    INTERNAL_ERROR: 'Internal Server Error!',\n    REQUIRED_AUTH_TOKEN: 'Auth token is required!',\n    INVALID_AUTH_TOKEN: 'Auth token is invalid or expired!',\n    NOT_INITIALIZED_ERROR: 'Not initialized. Call getConfig.init() once at start!',\n    UNKNOWN_ERROR: 'Unknown Error!',\n    INVALID_MODULE_PATH: 'Invalid module path!',\n    INVALID_ROUTE_PATH: 'Invalid route folder path!',\n    INVALID_FUNCTION_HANDLER: 'Valid function handler not found for route!',\n    DATE_ERROR: 'Should be a date!',\n    NON_EMPTY_OR_BLANK_ERROR: 'Should not be empty or blank!',\n    NUMBER_ERROR: 'Should be a numeric!',\n    BOOLEAN_ERROR: 'Should be a true/false!',\n    INVALID_MOBILE_NO: 'Should be a mobile number!',\n    POSITIVE_NUMBER_ERROR: 'Should be positive number!',\n    INACTIVE_USER: 'Account deactivated by the administrator!',\n    INVALID_EMAIL: 'Invalid Email'\n};\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/lib/errorResponseMessage.ts?");

/***/ }),

/***/ "./src/lib/hepler.ts":
/*!***************************!*\
  !*** ./src/lib/hepler.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.authenticateToken = exports.valiadateRole = exports.isPasswordValid = exports.generateToken = exports.getEncryptedPassword = exports.asyncHandler = void 0;\nconst error_1 = __webpack_require__(/*! ./error */ \"./src/lib/error.ts\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\nconst asyncHandler = fn => (req, res, next) => {\n    Promise.resolve(fn(req, res, next)).catch(next);\n};\nexports.asyncHandler = asyncHandler;\nconst getEncryptedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () { return yield bcrypt.hash(password, 10); });\nexports.getEncryptedPassword = getEncryptedPassword;\nconst generateToken = payload => {\n    const secretKey = process.env.JSON_SECRET_KEY; // Replace with your own secret key\n    const options = {\n        expiresIn: '24h', // Token expiration time\n    };\n    const token = jwt.sign(payload, secretKey, options);\n    return token;\n};\nexports.generateToken = generateToken;\nconst isPasswordValid = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () { return yield bcrypt.compare(password, hashedPassword); });\nexports.isPasswordValid = isPasswordValid;\nconst valiadateRole = roles => {\n    return function (req, res, next) {\n        if (roles === null || roles === void 0 ? void 0 : roles.find(role => role === req.role)) {\n            next();\n        }\n        else {\n            throw error_1.errors.USER_NOT_HAVE_PERMISSION();\n        }\n    };\n};\nexports.valiadateRole = valiadateRole;\nconst authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {\n    const authHeader = req.headers['authorization'];\n    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token> // No token present\n    try {\n        if (token == null)\n            throw error_1.errors.UNAUTHORIZED();\n        const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);\n        if (decoded) {\n            req.role = decoded.role;\n            req.email = decoded.email;\n            next();\n        }\n        else {\n            req.email = '';\n            throw error_1.errors.UNAUTHORIZED();\n        }\n    }\n    catch (err) {\n        throw error_1.errors.UNAUTHORIZED();\n    }\n});\nexports.authenticateToken = authenticateToken;\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/lib/hepler.ts?");

/***/ }),

/***/ "./src/lib/successConstant.ts":
/*!************************************!*\
  !*** ./src/lib/successConstant.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.successCodes = void 0;\n/**\n * Defined API errors.\n */\nexports.successCodes = {\n    SUCCESSFULL_LOGIN: {\n        status: 200,\n        code: 'SUCCESSFULL_LOGIN',\n        message: 'Login Successfull!',\n    },\n    SUCCESSFULL_SIGNUP: {\n        status: 400,\n        code: 'SUCCESSFULL_SIGNUP',\n        message: 'Signup Successfull!',\n    },\n};\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/lib/successConstant.ts?");

/***/ }),

/***/ "./src/lib/tv4format.ts":
/*!******************************!*\
  !*** ./src/lib/tv4format.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.tvFormat = void 0;\nconst errorResponseMessage_1 = __webpack_require__(/*! ./errorResponseMessage */ \"./src/lib/errorResponseMessage.ts\");\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\n// A practical regex for RFC 2822 email spec. @see http://stackoverflow.com/a/1373724/1531054\nconst REGEX_EMAIL = /^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n/**\n * Extra formats for tv4 JSON schema validator. You can add your validators here as well.\n * @type {Object}\n */\nexports.tvFormat = {\n    // anything parcelable to a valid Date Object\n    date: (data) => {\n        let valid = _.isFinite(data) || _.isString(data) || _.isDate(data);\n        valid = valid && new Date(data).toString() !== 'Invalid Date';\n        return valid ? null : errorResponseMessage_1.errorResponseMessage.DATE_ERROR;\n    },\n    // string with something to read. i.e not empy or blank\n    nonEmptyOrBlank: (data) => {\n        return data.length > 0 && !/^\\s+$/.test(data) ?\n            null :\n            errorResponseMessage_1.errorResponseMessage.NON_EMPTY_OR_BLANK_ERROR;\n    },\n    // string parcelable to a number\n    numberString: (data) => {\n        return !isNaN(data) ? null : errorResponseMessage_1.errorResponseMessage.NUMBER_ERROR;\n    },\n    // true or false string\n    booleanString: (data) => {\n        return data === 'true' || data === 'false' ?\n            null :\n            errorResponseMessage_1.errorResponseMessage.BOOLEAN_ERROR;\n    },\n    // email address\n    email: (data) => {\n        return REGEX_EMAIL.test(data) ? null : errorResponseMessage_1.errorResponseMessage.INVALID_EMAIL;\n    },\n    mobileNumber: function (data) {\n        return /^[0-9]{10,15}$/.test(data) ? null : errorResponseMessage_1.errorResponseMessage.INVALID_MOBILE_NO;\n    },\n    positiveNumeric: function (data) {\n        return data >= 0 ? null : errorResponseMessage_1.errorResponseMessage.POSITIVE_NUMBER_ERROR;\n    },\n};\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/lib/tv4format.ts?");

/***/ }),

/***/ "./src/lib/validate.ts":
/*!*****************************!*\
  !*** ./src/lib/validate.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.validate = validate;\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst tv4 = __webpack_require__(/*! tv4 */ \"tv4\");\nconst error_1 = __webpack_require__(/*! ./error */ \"./src/lib/error.ts\");\nconst tv4format_1 = __webpack_require__(/*! ./tv4format */ \"./src/lib/tv4format.ts\");\n// add formats\ntv4.addFormat(tv4format_1.tvFormat);\n/**\n * Validate data against schema.\n * Throws API error if data is invalid.\n *\n * @param {*} data data to validate.\n * @param {object} schema tv4 schema object.\n */\nfunction validate(data, schema) {\n    // validate\n    const result = tv4.validateResult(data, schema, false, true);\n    // proceed if valid\n    if (result.valid) {\n        return;\n    }\n    // extract error message\n    let message;\n    if (_.has(result.error, 'dataPath') && result.error.dataPath.length) {\n        message = `${result.error.message} at ${result.error.dataPath}`;\n    }\n    else {\n        message = result.error.message;\n    }\n    console.log(error_1.errors.INVALID_INPUT(message), 'hey123');\n    // send validation error with message\n    throw error_1.errors.INVALID_INPUT(message);\n}\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/lib/validate.ts?");

/***/ }),

/***/ "./src/models/IngredinetsModal.ts":
/*!****************************************!*\
  !*** ./src/models/IngredinetsModal.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.IngredinetsModal = void 0;\nconst database_1 = __webpack_require__(/*! src/database */ \"./src/database/index.ts\");\nconst Model_1 = __webpack_require__(/*! ./Model */ \"./src/models/Model.ts\");\nclass IngredinetsModal extends Model_1.Model {\n    static get ingredinetsTable() {\n        if (!this.tableName) {\n            throw new Error('You must set a table name!');\n        }\n        console.log(this.tableName, 'this.tableName');\n        return (0, database_1.database)(this.tableName);\n    }\n    static ingredients() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const rawData = yield this.ingredinetsTable.select('ingredients.id as ingredient_id', 'ingredients.name as ingredient_name', 'ingredient_categories.id as category_id', 'ingredient_categories.name as category_name')\n                .leftJoin('ingredient_categories', 'ingredients.category_id', 'ingredient_categories.id');\n            console.log(rawData, 'rawData');\n            const groupedByCategory = rawData === null || rawData === void 0 ? void 0 : rawData.reduce((result, item) => {\n                const { category_id, category_name, ingredient_id, ingredient_name } = item;\n                // Check if the category already exists in the result\n                if (!result[category_id]) {\n                    result[category_id] = {\n                        category_id,\n                        category_name,\n                        ingredients: [], // Initialize an empty ingredients array\n                    };\n                }\n                // Add the ingredient to the category's ingredients list\n                result[category_id].ingredients.push({\n                    ingredient_id,\n                    ingredient_name,\n                });\n                return result;\n            }, {});\n            const response = Object.values(groupedByCategory);\n            return response;\n        });\n    }\n}\nexports.IngredinetsModal = IngredinetsModal;\nIngredinetsModal.tableName = 'ingredients';\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/models/IngredinetsModal.ts?");

/***/ }),

/***/ "./src/models/Model.ts":
/*!*****************************!*\
  !*** ./src/models/Model.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Model = void 0;\nconst database_1 = __webpack_require__(/*! ../database */ \"./src/database/index.ts\");\nclass Model {\n    static get table() {\n        if (!this.tableName) {\n            throw new Error('You must set a table name!');\n        }\n        console.log(this.tableName, 'this.tableName');\n        return (0, database_1.database)(this.tableName);\n    }\n    static all() {\n        return __awaiter(this, void 0, void 0, function* () {\n            return this.table;\n        });\n    }\n    static insert(data) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const [result] = yield this.table.insert(data).returning('*');\n            return result;\n        });\n    }\n    static update(id, data) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const [result] = yield this.table.where({ id }).update(data).returning('*');\n            return result;\n        });\n    }\n    static delete(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return this.table.where({ id }).del();\n        });\n    }\n    static findById(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return this.table.where('id', id).first();\n        });\n    }\n    static findBy(data) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return this.table.where(data).first();\n        });\n    }\n}\nexports.Model = Model;\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/models/Model.ts?");

/***/ }),

/***/ "./src/models/RecipeIngredientsModal.ts":
/*!**********************************************!*\
  !*** ./src/models/RecipeIngredientsModal.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RecipeIngredientsModal = void 0;\nconst database_1 = __webpack_require__(/*! src/database */ \"./src/database/index.ts\");\nconst Model_1 = __webpack_require__(/*! ./Model */ \"./src/models/Model.ts\");\nclass RecipeIngredientsModal extends Model_1.Model {\n    static get recipeTable() {\n        if (!this.tableName) {\n            throw new Error('You must set a table name!');\n        }\n        console.log(this.tableName, 'this.tableName');\n        return (0, database_1.database)(this.tableName);\n    }\n    static getFilteredRecipes(filters) {\n        return __awaiter(this, void 0, void 0, function* () {\n            // Start building the query\n            const { difficulty, rating, isFavorite, cuisine, ingredients, // List of ingredient IDs or names to filter recipes\n             } = filters || {};\n            const query = this.recipeTable\n                .join('recipe_ingredients', 'recipes.id', '=', 'recipe_ingredients.recipe_id')\n                .join('ingredients', 'recipe_ingredients.ingredient_id', '=', 'ingredients.id')\n                .join('ingredient_categories', 'ingredients.category_id', '=', 'ingredient_categories.id')\n                .leftJoin('user_feedback', 'recipes.id', '=', 'user_feedback.recipe_id') // For rating and favorites\n                .select('recipes.id as recipe_id', 'recipes.name as recipe_name', 'recipes.description as recipe_description', 'recipes.instructions as recipe_instructions', 'recipes.difficulty as recipe_difficulty', 'recipes.cooking_time as recipe_cooking_time', 'recipes.cuisine as recipe_cuisine', 'user_feedback.rating as recipe_rating', 'user_feedback.is_favorite as recipe_is_favorite', 'ingredients.id as ingredient_id', 'ingredients.name as ingredient_name', 'ingredient_categories.id as category_id', 'ingredient_categories.name as category_name', 'recipe_ingredients.quantity as ingredient_quantity');\n            // Apply filters conditionally\n            if (difficulty) {\n                query.where('recipes.difficulty', difficulty);\n            }\n            if (rating) {\n                query.where('user_feedback.rating', '>=', rating);\n            }\n            if (isFavorite) {\n                query.where('user_feedback.is_favorite', isFavorite);\n            }\n            if (cuisine) {\n                query.where('recipes.cuisine', 'like', `%${cuisine}%`);\n            }\n            // Filter recipes by ingredients\n            if (ingredients && ingredients.length > 0) {\n                query.whereIn('ingredients.id', ingredients); // Match recipes using specific ingredient IDs\n            }\n            // Execute the query\n            const rawData = yield query;\n            // Transform data to group recipes with their ingredients\n            const groupedRecipes = rawData.reduce((result, row) => {\n                const { recipe_id, recipe_name, recipe_description, recipe_instructions, recipe_difficulty, recipe_cooking_time, recipe_cuisine, recipe_rating, recipe_is_favorite, ingredient_id, ingredient_name, category_id, category_name, ingredient_quantity, } = row;\n                // Check if the recipe already exists in the result\n                if (!result[recipe_id]) {\n                    result[recipe_id] = {\n                        recipe_id,\n                        recipe_name,\n                        recipe_description,\n                        recipe_instructions,\n                        recipe_difficulty,\n                        recipe_cooking_time,\n                        recipe_cuisine,\n                        recipe_rating,\n                        recipe_is_favorite,\n                        ingredients: [],\n                    };\n                }\n                // Add the ingredient to the recipe's ingredient list\n                result[recipe_id].ingredients.push({\n                    ingredient_id,\n                    ingredient_name,\n                    category_id,\n                    category_name,\n                    ingredient_quantity,\n                });\n                return result;\n            }, {});\n            // Convert the result object into an array\n            return Object.values(groupedRecipes);\n        });\n    }\n    static getTrendingRecipes() {\n        return __awaiter(this, arguments, void 0, function* (limit = 10) {\n            const query = this.recipeTable\n                .leftJoin('user_feedback', 'recipes.id', '=', 'user_feedback.recipe_id')\n                .select('recipes.id as recipe_id', 'recipes.name as recipe_name', 'recipes.description as recipe_description', 'recipes.instructions as recipe_instructions', 'recipes.difficulty as recipe_difficulty', 'recipes.cooking_time as recipe_cooking_time', 'recipes.cuisine as recipe_cuisine', database_1.database.raw('COALESCE(AVG(user_feedback.rating), 0) as average_rating'), // Average rating\n            database_1.database.raw('COUNT(user_feedback.is_favorite) FILTER (WHERE user_feedback.is_favorite = true) as favorite_count'), // Favorite count\n            database_1.database.raw('COUNT(user_feedback.id) as feedback_count') // Total feedback count\n            )\n                .groupBy('recipes.id') // Group by recipe ID for aggregate functions\n                .orderByRaw('favorite_count DESC, average_rating DESC, feedback_count DESC') // Sort by popularity metrics\n                .limit(limit); // Limit the number of results\n            const trendingRecipes = yield query;\n            return trendingRecipes;\n        });\n    }\n    static getRecipeDetailsById(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const recipe = yield this.recipeTable\n                .leftJoin('recipe_ingredients', 'recipes.id', 'recipe_ingredients.recipe_id')\n                .leftJoin('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')\n                .leftJoin('ingredient_categories', 'ingredients.category_id', 'ingredient_categories.id')\n                .select('recipes.id', 'recipes.name', 'recipes.description', 'recipes.instructions', 'recipes.difficulty', 'recipes.cooking_time', 'recipes.cuisine', database_1.database.raw(\"json_agg(json_build_object('name', ingredients.name, 'category', ingredient_categories.name, 'quantity', recipe_ingredients.quantity)) as ingredients\"))\n                .where('recipes.id', id)\n                .groupBy('recipes.id')\n                .first(); // Retrieve only one record\n            return recipe;\n        });\n    }\n}\nexports.RecipeIngredientsModal = RecipeIngredientsModal;\nRecipeIngredientsModal.tableName = 'recipes';\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/models/RecipeIngredientsModal.ts?");

/***/ }),

/***/ "./src/models/UserModel.ts":
/*!*********************************!*\
  !*** ./src/models/UserModel.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UserModel = exports.Role = void 0;\nconst Model_1 = __webpack_require__(/*! ./Model */ \"./src/models/Model.ts\");\nvar Role;\n(function (Role) {\n    Role[\"Admin\"] = \"admin\";\n    Role[\"User\"] = \"user\";\n})(Role || (exports.Role = Role = {}));\nconst defaultUserData = {\n    role: Role.User,\n};\nclass UserModel extends Model_1.Model {\n    static create(data) {\n        const _super = Object.create(null, {\n            insert: { get: () => super.insert }\n        });\n        return __awaiter(this, void 0, void 0, function* () {\n            return _super.insert.call(this, Object.assign(Object.assign({}, data), defaultUserData));\n        });\n    }\n    static findByEmail(email) {\n        return this.findBy({ email });\n    }\n}\nexports.UserModel = UserModel;\nUserModel.tableName = 'users';\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/models/UserModel.ts?");

/***/ }),

/***/ "./src/router/RecipeManagement/recipeController.ts":
/*!*********************************************************!*\
  !*** ./src/router/RecipeManagement/recipeController.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getRecipeByid = exports.getTrendingRecipes = exports.getRecipe = exports.getIngredients = void 0;\nconst IngredinetsModal_1 = __webpack_require__(/*! src/models/IngredinetsModal */ \"./src/models/IngredinetsModal.ts\");\nconst RecipeIngredientsModal_1 = __webpack_require__(/*! src/models/RecipeIngredientsModal */ \"./src/models/RecipeIngredientsModal.ts\");\nconst error_1 = __webpack_require__(/*! src/lib/error */ \"./src/lib/error.ts\");\nconst getIngredients = (req) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const ingredients = yield IngredinetsModal_1.IngredinetsModal.ingredients();\n        return ingredients;\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.getIngredients = getIngredients;\nconst getRecipe = (req) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { difficulty, rating, isFavorite, cuisine, ingredients } = req.query;\n        const recipes = yield RecipeIngredientsModal_1.RecipeIngredientsModal.getFilteredRecipes({\n            difficulty: difficulty ? Number(difficulty) : undefined, // Convert to number if present\n            rating: rating ? Number(rating) : undefined, // Convert to number if present\n            isFavorite: isFavorite === 'true', // Convert to boolean\n            cuisine: cuisine || undefined,\n            ingredients: ingredients, // Pass string directly\n        });\n        return recipes;\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.getRecipe = getRecipe;\nconst getTrendingRecipes = () => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const recipes = yield RecipeIngredientsModal_1.RecipeIngredientsModal.getTrendingRecipes();\n        return recipes;\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.getTrendingRecipes = getTrendingRecipes;\nconst getRecipeByid = (req) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { id } = req.params;\n        if (!id) {\n            throw new Error('Recipe ID is required.');\n        }\n        const recipe = yield RecipeIngredientsModal_1.RecipeIngredientsModal.getRecipeDetailsById(Number(id));\n        if (!recipe) {\n            throw error_1.errors.DETAILS_NOT_FOUND();\n        }\n        return recipe;\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.getRecipeByid = getRecipeByid;\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/router/RecipeManagement/recipeController.ts?");

/***/ }),

/***/ "./src/router/RecipeManagement/recipeRoutes.ts":
/*!*****************************************************!*\
  !*** ./src/router/RecipeManagement/recipeRoutes.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.recipeRouter = void 0;\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst recipeController_1 = __webpack_require__(/*! ./recipeController */ \"./src/router/RecipeManagement/recipeController.ts\");\nconst hepler_1 = __webpack_require__(/*! src/lib/hepler */ \"./src/lib/hepler.ts\");\nexports.recipeRouter = (0, express_1.Router)();\nexports.recipeRouter.get('/get-recipe', (0, hepler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {\n    const data = yield (0, recipeController_1.getRecipe)(req);\n    res.status(200).json({ data });\n})));\nexports.recipeRouter.get('/get-ingredients', (0, hepler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {\n    const data = yield (0, recipeController_1.getIngredients)(req);\n    res.status(200).json({ data });\n})));\nexports.recipeRouter.get('/get-trending-recipe', (0, hepler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {\n    const data = yield (0, recipeController_1.getTrendingRecipes)();\n    res.status(200).json({ data });\n})));\nexports.recipeRouter.get('/get-recipe/:id', (0, hepler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {\n    const data = yield (0, recipeController_1.getRecipeByid)(req);\n    res.status(200).json({ data });\n})));\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/router/RecipeManagement/recipeRoutes.ts?");

/***/ }),

/***/ "./src/router/index.ts":
/*!*****************************!*\
  !*** ./src/router/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.allRoutes = void 0;\nconst recipeRoutes_1 = __webpack_require__(/*! ./RecipeManagement/recipeRoutes */ \"./src/router/RecipeManagement/recipeRoutes.ts\");\nconst userManagementRoutes_1 = __webpack_require__(/*! ./userManagement/userManagementRoutes */ \"./src/router/userManagement/userManagementRoutes.ts\");\nexports.allRoutes = [userManagementRoutes_1.userRouter, recipeRoutes_1.recipeRouter];\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/router/index.ts?");

/***/ }),

/***/ "./src/router/userManagement/userManagementRoutes.ts":
/*!***********************************************************!*\
  !*** ./src/router/userManagement/userManagementRoutes.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.userRouter = void 0;\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst userManagementcontroller_1 = __webpack_require__(/*! ./userManagementcontroller */ \"./src/router/userManagement/userManagementcontroller.ts\");\nconst validate_1 = __webpack_require__(/*! ../../lib/validate */ \"./src/lib/validate.ts\");\nconst userManagementschema_1 = __webpack_require__(/*! ./userManagementschema */ \"./src/router/userManagement/userManagementschema.ts\");\nconst hepler_1 = __webpack_require__(/*! src/lib/hepler */ \"./src/lib/hepler.ts\");\nconst successConstant_1 = __webpack_require__(/*! src/lib/successConstant */ \"./src/lib/successConstant.ts\");\nexports.userRouter = (0, express_1.Router)();\nexports.userRouter.post('/user', (0, hepler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {\n    (0, validate_1.validate)(req.body, userManagementschema_1.addUserSchema);\n    const data = yield (0, userManagementcontroller_1.addUser)(req.body);\n    res.json(successConstant_1.successCodes.SUCCESSFULL_SIGNUP);\n})));\nexports.userRouter.post('/login', (0, hepler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {\n    (0, validate_1.validate)(req.body, userManagementschema_1.loginUserSchema);\n    const data = yield (0, userManagementcontroller_1.loginUser)(req.body);\n    res.set('Authorization', `Bearer ${data}`);\n    res.header('Access-Control-Expose-Headers', 'Authorization');\n    res.json(successConstant_1.successCodes.SUCCESSFULL_LOGIN);\n})));\nexports.userRouter.get('/get-profile', (0, hepler_1.asyncHandler)(hepler_1.authenticateToken), (0, hepler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {\n    // const { email = '' } = req \n    const data = yield (0, userManagementcontroller_1.getUserDetail)('');\n    data.password = '';\n    res.status(200).json({ data });\n})));\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/router/userManagement/userManagementRoutes.ts?");

/***/ }),

/***/ "./src/router/userManagement/userManagementcontroller.ts":
/*!***************************************************************!*\
  !*** ./src/router/userManagement/userManagementcontroller.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getUserDetail = exports.loginUser = exports.addUser = void 0;\nconst error_1 = __webpack_require__(/*! src/lib/error */ \"./src/lib/error.ts\");\nconst hepler_1 = __webpack_require__(/*! src/lib/hepler */ \"./src/lib/hepler.ts\");\nconst UserModel_1 = __webpack_require__(/*! src/models/UserModel */ \"./src/models/UserModel.ts\");\nconst addUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const userDetails = yield UserModel_1.UserModel.findByEmail(payload.email);\n        if (userDetails) {\n            throw error_1.errors.USER_ALREADY_EXIST();\n        }\n        const updatedPayload = {\n            email: payload.email,\n            password: yield (0, hepler_1.getEncryptedPassword)(payload.password),\n            name: payload.name,\n        };\n        yield UserModel_1.UserModel.create(updatedPayload);\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.addUser = addUser;\nconst loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const userDetails = yield UserModel_1.UserModel.findByEmail(payload.email);\n        if (!userDetails) {\n            throw error_1.errors.USER_NOT_FOUND();\n        }\n        const tokenPayload = {\n            email: userDetails === null || userDetails === void 0 ? void 0 : userDetails.email,\n            role: userDetails === null || userDetails === void 0 ? void 0 : userDetails.role,\n            loggedInTime: new Date(),\n        };\n        const isUserValid = yield (0, hepler_1.isPasswordValid)(payload.password, userDetails === null || userDetails === void 0 ? void 0 : userDetails.password);\n        if (isUserValid) {\n            return (0, hepler_1.generateToken)(tokenPayload);\n        }\n        else {\n            throw error_1.errors.INVALID_USER();\n        }\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.loginUser = loginUser;\nconst getUserDetail = (email) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const userDetails = yield UserModel_1.UserModel.findByEmail(email);\n        return userDetails;\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.getUserDetail = getUserDetail;\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/router/userManagement/userManagementcontroller.ts?");

/***/ }),

/***/ "./src/router/userManagement/userManagementschema.ts":
/*!***********************************************************!*\
  !*** ./src/router/userManagement/userManagementschema.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.loginUserSchema = exports.addUserSchema = void 0;\nexports.addUserSchema = {\n    type: 'object',\n    properties: {\n        email: { type: 'string', format: 'email' },\n        password: { type: 'string', format: 'nonEmptyOrBlank' },\n        name: { type: 'string', minLength: 3, maxLength: 30 }\n    },\n    required: ['email', 'password'],\n};\nexports.loginUserSchema = {\n    type: 'object',\n    properties: {\n        email: { type: 'string', format: 'email' },\n        password: { type: 'string', format: 'nonEmptyOrBlank' },\n    },\n    required: ['email', 'password'],\n};\n\n\n//# sourceURL=webpack://kenx-postgres-boilerplate/./src/router/userManagement/userManagementschema.ts?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("knex");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ "ts-node/register":
/*!***********************************!*\
  !*** external "ts-node/register" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("ts-node/register");

/***/ }),

/***/ "tv4":
/*!**********************!*\
  !*** external "tv4" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tv4");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;