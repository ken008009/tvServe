<template>
    <PageView>
        <a-card title="列表">
            <a-row :gutter="10" class="inputGroup">
                <a-col :xs="12" :md="6" :lg="6" :xl="4">
                    <a-input v-model="searchData.address" placeholder="账户" @keyup.enter="getListTwo" />
                </a-col>
                <!-- <a-col :xs="12" :md="6" :lg="6" :xl="4">
                    <a-select allowClear v-model="searchData.status" style="width:100%" placeholder="全部" @change="getListTwo">
                        <a-select-option value="0">未提交</a-select-option>
                        <a-select-option value="1">已提交</a-select-option>
                        <a-select-option value="2">成功</a-select-option>
                    </a-select>
                </a-col> -->
                <a-col :xs="12" :md="6" :lg="6" :xl="4">
                    <a-button-group>
                        <a-button type="primary" :loading="loading" @click="getListTwo">确定筛选</a-button>
                    </a-button-group>
                </a-col>
            </a-row>
            <a-table :loading="loading" :columns="columns" :dataSource="data" :pagination="{ total, pageSize, current }"
                @change="changePagination" bordered :scroll="{ x: true }">
            </a-table>
        </a-card>
    </PageView>
</template>

<script type="text/jsx">
import Gai from '../../api/Gai'
import listMixin from '../mixin/listMixin'
export default {
    name: 'dealList',
    mixins: [listMixin],
    data() {
        return {
            columns: [
                {
                    title: '账户',
                    dataIndex: 'address',
                    customRender: (v) => v,
                },
                {
                    title: '数量',
                    dataIndex: 'num',
                },
                {
                    title: '创建时间',
                    dataIndex: 'createdAt',
                },
                {
                    title: '姓',
                    dataIndex: 'lastName',
                },
                {
                    title: '名',
                    dataIndex: 'firstName',
                },
                {
                    title: '邮箱',
                    dataIndex: 'email',
                },
                {
                    title: '国家区号',
                    dataIndex: 'countryCode',
                },
                {
                    title: '手机号',
                    dataIndex: 'phone',
                },
                {
                    title: '城市',
                    dataIndex: 'city',
                },
                {
                    title: '国家',
                    dataIndex: 'country',
                },
                {
                    title: '街道',
                    dataIndex: 'street',
                },
                {
                    title: '邮编',
                    dataIndex: 'postalCode',
                },
                {
                    title: '州/省份',
                    dataIndex: 'state',
                },
                {
                    title: '出生时间',
                    dataIndex: 'birthDate',
                },
                {
                    title: '手机国家区号',
                    dataIndex: 'phoneCountryCode',
                },
                {
                    title: '身份证号',
                    dataIndex: 'idCard',
                },
                {
                    title: '性别',
                    dataIndex: 'gender',
                    customRender: (v) => {
                        if (v === 'g') return '男'
                        return '女'
                    }
                }
                // {
                //     title: '操作',
                //     key: 'action',
                //     fixed: 'right',
                //     width: 110,
                //     customRender: (v) => {
                //         return (
                //             <div>
                //                 <a-button-group>
                //                     <a-button type="primary" style="margin-left: 10px;" onClick={() => {
                //                         this.bind_card(v.id);
                //                     }}>绑定实体卡号</a-button>
                //                 </a-button-group>
                //             </div>
                //         )
                //     }
                // }
            ],
            searchData: {
                address: '',
                status: undefined,
            },
        }
    },
    methods: {
        getList() {
            this.loading = true
            Gai.card_two_list_new({
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
        bind_card(user_id) {
            let amount = undefined;
            let cardId = undefined;
            this.$confirm({
                title: `绑定实体卡号`,
                content: (
                    <div>
                        <a-input type="number" style="margin-top:25px;" placeholder="请输入划转出来的金额" onInput={(val) => {
                            amount = val.target.value
                        }} />
                        <a-input style="margin-top:25px;" placeholder="请输入卡片ID" onInput={(val) => {
                            cardId = val.target.value
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
                        Gai.bind_card_2({ id: user_id, amount, cardId }).then(res => {
                            resolve()
                            this.getList()
                        }).catch(res => {
                            reject()
                        })
                    })
                }
            })
        }
    },
}
</script>

<style scoped lang="less">
.inputGroup {
    >div {
        margin-bottom: 20px;
    }
}
</style>