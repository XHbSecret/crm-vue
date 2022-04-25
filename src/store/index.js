import { createStore } from 'vuex'
import employee from './modules/employee'
// import customer from './modules/customer'
const store = createStore({
    modules:{
        employee:employee,
        // customer
    }
})
export default store