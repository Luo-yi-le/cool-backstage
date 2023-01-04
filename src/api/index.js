import admin from "./admin";
import wechat from "./wechat";
import mailer from "./mailer";
// const admin = require('./admin');

export default {
    ...admin,
    ...wechat,
    ...mailer
}
