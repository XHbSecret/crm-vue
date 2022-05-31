// 所有请求统一暴露
import * as activity from './system/activity'
import * as login from './employee/login'
import * as menu from './system/menu'
import * as customer from './customer/index'
import * as flow from './system/flow'
import * as role from './system/role'
import * as product from './system/product'
import * as contract from './contract/index'
import * as checkFlow from './check/checkFlow'
import * as echartss from './echartss/index'
import * as sales from './sales/index'

import * as customerContract from'./contract/contract'

import * as backMoney from './back/backMoney'


export default {
    activity,
    login,
    menu,
    customer,
    flow,
    role,
    product,
    contract,
    checkFlow,

    echartss,
    sales,

    customerContract,

    backMoney

}