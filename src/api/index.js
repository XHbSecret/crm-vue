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
<<<<<<< HEAD
import * as customerContract from'./contract/contract'
=======
import * as backMoney from './back/backMoney'

>>>>>>> 344e1a19a775cfa584fde5afe20f4a9ea592c637
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
<<<<<<< HEAD
    customerContract,
=======
    backMoney
>>>>>>> 344e1a19a775cfa584fde5afe20f4a9ea592c637
}