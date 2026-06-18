import { axios } from '@/utils/request'
const api8005 = `${projectUrl}/api/admin_dhb`
const api8006 = `${projectUrl}/api/admin_dhb`
export default {
    sub_money: (parameter) => {
        return axios({
            url: `${api8005}/sub_money`,
            method: 'get',
            params: parameter
        })
    },
    reward_list: (parameter) => {
        return axios({
            url: `${api8005}/reward_list`,
            method: 'get',
            params: parameter
        })
    },
    dividend_policy: (parameter) => {
        return axios({
            url: `${api8005}/lock_user_reward`,
            method: 'post',
            data: parameter
        })
    },
    buy_list: (parameter) => {
        return axios({
            url: `${api8005}/buy_list`,
            method: 'get',
            params: parameter
        })
    },
    user_list: (parameter) => {
        return axios({
            url: `${api8005}/user_list`,
            method: 'get',
            params: parameter
        })
    },
    location_list: (parameter) => {
        return axios({
            url: `${api8005}/location_list`,
            method: 'get',
            params: parameter
        })
    },
    location_list_2: (parameter) => {
        return axios({
            url: `${api8005}/location_list_2`,
            method: 'get',
            params: parameter
        })
    },
    withdraw_list: (parameter) => {
        return axios({
            url: `${api8005}/withdraw_list`,
            method: 'get',
            params: parameter
        })
    },
    withdraw_pass: (parameter) => {
        return axios({
            url: `${api8005}/withdraw_pass`,
            method: 'post',
            data: parameter
        })
    },
    all: (parameter) => {
        return axios({
            url: `${api8005}/all_info`,
            method: 'get',
            params: parameter
        })
    },
    month_recommend: (parameter) => {
        return axios({
            url: `${api8005}/month_recommend`,
            method: 'get',
            params: parameter
        })
    },
    config: (parameter) => {
        return axios({
            url: `${api8005}/config`,
            method: 'get',
            params: parameter
        })
    },
    config_update: (parameter) => {
        return axios({
            url: `${api8005}/config_update`,
            method: 'post',
            data: parameter
        })
    },
    user_recommend: (parameter) => {
        return axios({
            url: `${api8005}/user_recommend`,
            method: 'get',
            params: parameter
        })
    },
    record_list: (parameter) => {
        return axios({
            url: `${api8005}/record_list`,
            method: 'get',
            params: parameter
        })
    },
    trade_list: (parameter) => {
        return axios({
            url: `${api8005}/card_two_list`,
            method: 'get',
            params: parameter
        })
    },
    /* 登录相关 */
    login: (parameter) => {
        return axios({
            url: `${api8006}/login`,
            method: 'post',
            data: parameter
        })
    },
    admin_list: (parameter) => {
        return axios({
            url: `${api8006}/admin_list`,
            method: 'get',
            params: parameter
        })
    },
    change_password: (parameter) => {
        return axios({
            url: `${api8006}/change_password`,
            method: 'post',
            data: parameter
        })
    },
    create_account: (parameter) => {
        return axios({
            url: `${api8006}/create_account`,
            method: 'post',
            data: parameter
        })
    },
    auth_list: (parameter) => {
        return axios({
            url: `${api8006}/auth_list`,
            method: 'get',
            params: parameter
        })
    },
    user_auth_list: (parameter) => {
        return axios({
            url: `${api8006}/user_auth_list`,
            method: 'get',
            params: parameter
        })
    },
    auth_create: (parameter) => {
        return axios({
            url: `${api8006}/auth_create`,
            method: 'post',
            data: parameter
        })
    },
    auth_delete: (parameter) => {
        return axios({
            url: `${api8006}/auth_delete`,
            method: 'post',
            data: parameter
        })
    },
    my_auth_list: (parameter) => {
        return axios({
            url: `${api8006}/my_auth_list`,
            method: 'get',
            params: parameter
        })
    },
    vip_update: (parameter) => {
        return axios({
            url: `${api8006}/vip_update`,
            method: 'post',
            data: parameter
        })
    },
    balance_update: (parameter) => {
        return axios({
            url: `${api8005}/amount_four_update`,
            method: 'post',
            data: parameter
        })
    },
    principal_update: (parameter) => {
        return axios({
            url: `${api8005}/set_vip_three`,
            method: 'post',
            data: parameter
        })
    },
    set_vip_three: (parameter) => {
        return axios({
            url: `${api8005}/set_vip_three`,
            method: 'post',
            data: parameter
        })
    },
    set_pass: (parameter) => {
        return axios({
            url: `${api8005}/set_pass`,
            method: 'post',
            data: parameter
        })
    },
    admin_update_location_new_max: (parameter) => {
        return axios({
            url: `${api8005}/admin_update_location_new_max`,
            method: 'post',
            data: parameter
        })
    },
    password_update: (parameter) => {
        return axios({
            url: `${api8005}/password_update`,
            method: 'post',
            data: parameter
        })
    },
    bind_card: (parameter) => {
        return axios({
            url: `${api8005}/admin_user_bind`,
            method: 'post',
            data: parameter
        })
    },
    bind_card_2: (parameter) => {
        return axios({
            url: `${api8005}/admin_user_bind_two`,
            method: 'post',
            data: parameter
        })
    },
    location_insert: (parameter) => {
        return axios({
            url: `${api8005}/location_insert`,
            method: 'post',
            data: parameter
        })
    },
    undo_lock: (parameter) => {
        return axios({
            url: `${api8006}/lock_user`,
            method: 'post',
            data: parameter
        })
    },
    recommend_level: (parameter) => {
        return axios({
            url: `${api8006}/admin_recommend_level`,
            method: 'post',
            data: parameter
        })
    },
    undo_update: (parameter) => {
        return axios({
            url: `${api8006}/set_user_count`,
            method: 'post',
            data: parameter
        })
    },
    level_update: (parameter) => {
        return axios({
            url: `${api8006}/set_can_vip`,
            method: 'post',
            data: parameter
        })
    },
    vip_delete: (parameter) => {
        return axios({
            url: `${api8006}/vip_delete`,
            method: 'post',
            data: parameter
        })
    }

}