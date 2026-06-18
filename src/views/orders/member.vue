<template>
    <PageView>
        <a-card title="列表">
            <a-row :gutter="10" class="inputGroup">
                <a-col :xs="12" :md="6" :lg="6" :xl="4">
                    <p>账户</p>
                    <a-input v-model="searchData.address" placeholder="账户" @keyup.enter="getListTwo" />
                </a-col>
                <a-col :xs="12" :md="6" :lg="6" :xl="4">
                    <p>虚拟卡开卡状态</p>
                    <a-select v-model="searchData.cardOrderId" style="width:100%" placeholder="虚拟卡开卡状态" @change="getListTwo">
                        <a-select-option value="all">全部</a-select-option>
                        <a-select-option value="no">未申请</a-select-option>
                        <a-select-option value="do">申请</a-select-option>
                        <a-select-option value="doing">已提交上游</a-select-option>
                        <a-select-option value="success">成功</a-select-option>
                    </a-select>
                </a-col>
                <a-col :xs="12" :md="6" :lg="6" :xl="4">
                    <p>实体卡提交上游状态</p>
                    <a-select v-model="searchData.cardTwo" style="width:100%" placeholder="实体卡提交上游状态" @change="getListTwo">
                        <a-select-option value="3">全部</a-select-option>
                        <a-select-option value="0">未提交</a-select-option>
                        <a-select-option value="1">已提交</a-select-option>
                        <a-select-option value="2">成功</a-select-option>
                    </a-select>
                </a-col>
                <a-col :xs="12" :md="6" :lg="6" :xl="4">
                    <p>卡片冻结</p>
                    <a-select v-model="searchData.lockCard" style="width:100%" placeholder="卡片冻结" @change="getListTwo">
                        <a-select-option value="3">全部</a-select-option>
                        <a-select-option value="1">虚拟卡</a-select-option>
                        <a-select-option value="2">实体卡</a-select-option>
                    </a-select>
                </a-col>
                <a-col :xs="12" :md="6" :lg="6" :xl="4">
                    <p>补卡申请</p>
                    <a-select v-model="searchData.changeCard" style="width:100%" placeholder="补卡申请" @change="getListTwo">
                        <a-select-option value="3">全部</a-select-option>
                        <a-select-option value="1">虚拟卡</a-select-option>
                        <a-select-option value="2">实体卡</a-select-option>
                    </a-select>
                </a-col>
                <a-col :xs="12" :md="6" :lg="6" :xl="4">
                    <p style="height: 21px"></p>
                    <a-button-group>
                        <a-button type="primary" :loading="loading" @click="getListTwo">确定筛选</a-button>
                    </a-button-group>
                </a-col>
            </a-row>
            <a-table :loading="loading" :columns="columns" :dataSource="data" :pagination="{ total, pageSize, current }" @change="changePagination" bordered :scroll="{ x: true }">
            </a-table>
        </a-card>
    </PageView>
</template>

<script type="text/jsx">
import h from 'vue'
import Gai from '../../api/Gai'
import listMixin from '../mixin/listMixin'

export default {
    name: 'member',
    mixins: [listMixin],
    data() {
        return {
            columns: [
                {
                    title: '创建时间',
                    dataIndex: 'createdAt'
                },
                {
                    title: '地址',
                    dataIndex: 'address'
                },
                {
                    title: '推荐人',
                    dataIndex: 'myRecommendAddress'
                },
                {
                    title: '账户余额',
                    dataIndex: 'amount'
                },
                {
                    title: '业绩',
                    dataIndex: 'myTotalAmount'
                },
                {
                    title: '虚拟卡级别',
                    dataIndex: 'vip'
                },
                {
                    title: '允许app设置级别',
                    dataIndex: 'canVip',
                    customRender: (v) => {
                        if (v === '1') return '允许'
                        return '不允许'
                    }
                },
                {
                    title: '用户级别',
                    dataIndex: 'vipThree'
                },
                {
                    title: '直推人数',
                    dataIndex: 'historyRecommend',
                },
                {
                    title: '虚拟卡ID',
                    dataIndex: 'cardNumber',
                },
                {
                    title: '实体卡ID',
                    dataIndex: 'cardTwoNumber',
                },
                {
                    title: '虚拟卡开卡状态',
                    dataIndex: 'cardOrderId',
                    customRender: (v) => {
                        if (v === 'no') return '未申请'
                        if (v === 'do') return '申请'
                        if (v === 'doing') return '已提交上游'
                        if (v === 'success') return '成功'
                        return '-'
                    }
                },
                {
                    title: '实体卡提交状态',
                    dataIndex: 'cardTwo',
                    customRender: (v) => {
                        if (v === '1') return '已提交'
                        if (v === '2') return '成功'
                        return '未提交'
                    }
                },
                {
                    title: '身份证正面',
                    dataIndex: 'pic',
                    customRender: (text) => {
                        if (text === 'no') {
                            return h('span', '未提交')
                        }
                        return h('img', {
                            attrs: {
                                src: `/images/${text}`,
                                style: `width: 160px; height: 90px`,
                                alt: '身份证正面'
                            }
                        })
                    }
                },
                {
                    title: '身份证反面',
                    dataIndex: 'picTwo',
                    customRender: (text) => {
                        if (text === 'no') {
                            return h('span', '未提交')
                        }
                        return h('img', {
                            attrs: {
                                src: `/images/${text}`,
                                style: `width: 160px; height: 90px`,
                                alt: '身份证反面'
                            }
                        })
                    }
                },
                {
                    title: '虚拟卡冻结状态',
                    dataIndex: 'lockCard',
                    customRender: (v) => {
                        if (v === '1') return '已冻结'
                        return '未冻结'
                    }
                },
                {
                    title: '实体卡冻结状态',
                    dataIndex: 'lockCardTwo',
                    customRender: (v) => {
                        if (v === '1') return '已冻结'
                        return '未冻结'
                    }
                },
                {
                    title: '虚拟卡申请补卡',
                    dataIndex: 'changeCard',
                    customRender: (v) => {
                        if (v === '1') return '已申请'
                        return '未申请'
                    }
                },
                {
                    title: '实体卡申请补卡',
                    dataIndex: 'changeCardTwo',
                    customRender: (v) => {
                        if (v === '1') return '已申请'
                        return '未申请'
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    width: 110,
                    customRender: (v) => {
                        return (
                            <div>
                                <a-button-group>
                                    <a-button type="primary" style="margin-left: 10px;" onClick={() => {
                                        this.set_vip_level(v.userId, v.vipThree);
                                    }}>设置用户级别</a-button>
                                    <a-button type="primary" style="margin-left: 10px;" onClick={() => {
                                        this.level_update(v.userId);
                                    }}>级别权限</a-button>
                                    {/* <a-button type="primary" style="margin-left: 10px;" onClick={() => {
                                        this.principal_update(v.userId);
                                    }}>实体卡分红级别</a-button> */}
                                    <a-button type="primary" style="margin-left: 10px;" onClick={() => {
                                        this.undo_update(v.userId);
                                    }}>重置申请</a-button>
                                    <a-button type="primary" style="margin-left: 10px;" onClick={() => {
                                        this.bind_card(v.address);
                                    }}>绑定虚拟卡</a-button>
                                </a-button-group>
                            </div>
                        )
                    }
                }
            ],
            searchData: {
                address: '',
                cardTwo: '3',
                cardOrderId: 'all',
                lockCard: '3',
                changeCard: '3',
                isLocation: undefined
            }
        }
    },
    methods: {
        getList() {
            this.loading = true
            Gai.user_list({
                page: this.current,
                ...this.searchData
            }).then((res) => {
                this.data = res.users.map((value, key) => {
                    return { ...value, key }
                })
                this.loading = false
                this.total = parseInt(res.count)
            })
        },
        set_password(user_id) {
            let pass = ""
            this.$confirm({
                title: `设置密码`,
                content: (
                    <a-input style="margin-top:25px;" type="password" placeholder="请输入密码" onInput={(val) => {
                        pass = val.target.value
                    }} />
                ),
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        Gai.set_pass({ user_id, pass  }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        vip_update(user_id, defaultValue) {
            // if (defaultValue === '0') {
            //     defaultValue = undefined
            // }
            let vip = defaultValue;
            this.$confirm({
                title: `修改VIP级别`,
                content: (
                    <a-select style="width:200px" defaultValue={defaultValue} placeholder="选择级别" onChange={(val) => {
                        vip = val;
                    }}>
                        <a-select-option value="0">无VIP级别</a-select-option>
                        <a-select-option value="1">1</a-select-option>
                        <a-select-option value="2">2</a-select-option>
                        <a-select-option value="3">3</a-select-option>
                        <a-select-option value="4">4</a-select-option>
                        <a-select-option value="5">5</a-select-option>
                    </a-select>
                ),
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        if (vip === undefined) {
                            this.$notification.warning({
                                message: '提示',
                                description: '请选择级别'
                            })
                            reject()
                            return;
                        }
                        Gai.vip_update({ user_id, vip }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        bind_card(user_id) {
            let amount = undefined;
            let cardId = undefined;
            let carNum = undefined;
            this.$confirm({
                title: `绑定虚拟卡号`,
                content: (
                    <div>
                        <a-input type="number" style="margin-top:25px;" placeholder="请输入划转出来的金额" onInput={(val) => {
                            amount = val.target.value
                        }} />
                        <a-input style="margin-top:25px;" placeholder="请输入卡片ID" onInput={(val) => {
                            cardId = val.target.value
                        }} />
                        <a-input style="margin-top:25px;" placeholder="卡号" onInput={(val) => {
                            carNum = val.target.value
                        }} />
                    </div>
                ),
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        if (amount === undefined || cardId === undefined) {
                            this.$notification.warning({
                                message: '提示',
                                description: '请填写信息'
                            })
                            reject()
                            return;
                        }
                        Gai.bind_card({ address: user_id, amount, cardId, carNum }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        principal_update(userId) {
            let amount = ""
            this.$confirm({
                title: `设置实体卡分红级别`,
                content: (
                    <a-select style="width:200px" placeholder="选择实体卡分红级别" onChange={(val) => {
                        amount = val;
                    }}>
                        <a-select-option value="7">7</a-select-option>
                        <a-select-option value="6">6</a-select-option>
                        <a-select-option value="5">5</a-select-option>
                        <a-select-option value="4">4</a-select-option>
                        <a-select-option value="3">3</a-select-option>
                        <a-select-option value="2">2</a-select-option>
                        <a-select-option value="1">1</a-select-option>
                    </a-select>
                ),
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        Gai.principal_update({ userId, vipThree: amount }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        balance_update(user_id, defaultValue) {
            let amount = ""
            this.$confirm({
                title: `设置基金`,
                content: (
                    <a-input style="margin-top:25px;" placeholder="请输入" onInput={(val) => {
                        amount = val.target.value
                    }} />
                ),
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        Gai.balance_update({ user_id, amount }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        admin_update_location_new_max(user_id) {
            let amount = ""
            this.$confirm({
                title: `修改待释放余额`,
                content: (
                    <a-input style="margin-top:25px;" placeholder="请输入" onInput={(val) => {
                        amount = val.target.value
                    }} />
                ),
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        Gai.admin_update_location_new_max({ user_id, amount }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        password_update(user_id) {
            let password = ""
            this.$confirm({
                title: `修改密码`,
                content: (
                    <a-input style="margin-top:25px;" placeholder="请输入秘钥" onInput={(val) => {
                        password = val.target.value
                    }} />
                ),
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        Gai.password_update({ user_id, password }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        location_insert(user_id) {
            let amount = undefined;
            this.$confirm({
                title: `入单充值`,
                content: (
                    <a-select style="width:200px" placeholder="选择金额" onChange={(val) => {
                        amount = val;
                    }}>
                        <a-select-option value="50">50</a-select-option>
                        <a-select-option value="100">100</a-select-option>
                        <a-select-option value="300">300</a-select-option>
                    </a-select>
                ),
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        if (amount === undefined) {
                            this.$notification.warning({
                                message: '提示',
                                description: '请选择金额'
                            })
                            reject()
                            return;
                        }
                        Gai.location_insert({ user_id, amount }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        undo_update(userId) {
            this.$confirm({
                title: `提示`,
                content: `确定要重置此账户申请次数?`,
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        Gai.undo_update({ userId }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        recommend_level(user_id, level) {
            let text = level === "1" ? `开启特殊奖励` : `关闭特殊奖励`;
            this.$confirm({
                title: `${text}提示`,
                content: `确定要${text}特殊奖励?`,
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        Gai.recommend_level({ user_id, level }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        dividend_policy(user_id, lockReward) {
            let text = lockReward === "1" ? `开启上级分红` : `关闭上级分红`;
            this.$confirm({
                title: `${text}提示`,
                content: `确定要${text}?`,
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        Gai.dividend_policy({ user_id, lockReward: Number(lockReward) }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        undo_lock(user_id, lock) {
            let text = lock === "1" ? `锁定` : `解锁`;
            this.$confirm({
                title: `${text}提示`,
                content: `确定要${text}此账户吗?`,
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        Gai.undo_lock({ user_id, lock }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        config_update(id, defaultValue) {
            let value = ""
            console.log('defaultValue', defaultValue)
            this.$confirm({
                title: `修改`,
                content: (
                    <a-select allowClear defaultValue={defaultValue} style="width:100%"
                        onChange={(val) => { value = val }} placeholder="请选择">
                        <a-select-option value="1000">1000</a-select-option>
                        <a-select-option value="3000">3000</a-select-option>
                        <a-select-option value="5000">5000</a-select-option>
                        <a-select-option value="10000">10000</a-select-option>
                        <a-select-option value="15000">15000</a-select-option>
                        <a-select-option value="30000">30000</a-select-option>
                    </a-select>
                ),
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        Gai.vip_update({ user_id: id, vip: value }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        set_vip_level(userId, defaultValue) {
            let vipThree = defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : undefined
            this.$confirm({
                title: `设置用户级别`,
                content: (
                    <a-select style="width:200px" defaultValue={vipThree} placeholder="选择级别" onChange={(val) => {
                        vipThree = val
                    }}>
                        <a-select-option value="0">0</a-select-option>
                        <a-select-option value="1">1</a-select-option>
                        <a-select-option value="2">2</a-select-option>
                        <a-select-option value="3">3</a-select-option>
                        <a-select-option value="4">4</a-select-option>
                        <a-select-option value="5">5</a-select-option>
                    </a-select>
                ),
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        if (vipThree === undefined) {
                            this.$notification.warning({
                                message: '提示',
                                description: '请选择级别'
                            })
                            reject()
                            return
                        }
                        Gai.set_vip_three({ userId, vipThree }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        },
        level_update(user_id) {
            let level = undefined;
            this.$confirm({
                title: `修改允许设置级别`,
                content: (
                    <a-select style="width:200px" placeholder="选择是否允许设置级别" onChange={(val) => {
                        level = val;
                    }}>
                        <a-select-option value="0">不允许</a-select-option>
                        <a-select-option value="1">允许</a-select-option>
                    </a-select>
                ),
                centered: true,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        if (level === undefined) {
                            this.$notification.warning({
                                message: '提示',
                                description: '请选择等级'
                            })
                            reject()
                            return;
                        }
                        Gai.level_update({ userId: user_id, canVip: level }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.inputGroup {
    >div {
        margin-bottom: 20px;
    }
}
</style>