// 所有请求统一暴露
import * as activity from './system/activity'
import * as login from './employee/login'
import * as menu from './system/menu'
import * as customer from './customer/index'
import * as flow from './system/flow'
import * as role from './system/role'

export default {
    activity,
    login,
    menu,
    customer,
    flow,
    role
}