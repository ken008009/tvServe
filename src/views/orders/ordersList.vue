<template>
    <PageView>
        <a-card title="列表">
            <a-row :gutter="10" class="inputGroup">
                <a-col :xs="12" :md="6" :lg="6" :xl="4">
                    <a-input v-model="searchData.address" placeholder="账户" @keyup.enter="getListTwo" />
                </a-col>
                <a-col :xs="12" :md="6" :lg="6" :xl="4">
                    <a-select allowClear v-model="searchData.reason" style="width:100%" placeholder="类型"
                        @change="getListTwo">
                        <template v-for="(item, index) in Object.values(reasonType)">
                            <a-select-option :value="Object.keys(reasonType)[index]">{{item}}</a-select-option>
                        </template>
                        <!-- <a-select-option value="area">团队收益</a-select-option>
                        <a-select-option value="stake_reward">质押收益</a-select-option>
                        <a-select-option value="area_three">平级收益</a-select-option>
                        <a-select-option value="area_two">社区收益</a-select-option>
                        <a-select-option value="recommend">直推收益</a-select-option> -->
                    </a-select>
                </a-col>
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

const reasonType = {
    '11': '实体卡开卡收益',
    '6': '虚拟卡开卡收益',
    '5': '划转',
    '2': '提现',
    '1': '充值',
    '9': '开实体卡',
    '3': '开虚拟卡',
    '4': '虚拟卡充值'
}

export default {
    name: 'ordersList',
    mixins: [listMixin],
    data() {
        return {
            reasonType,
            columns: [
                {
                    title: '时间',
                    dataIndex: 'createdAt',
                },
                {
                    title: '金额',
                    dataIndex: 'amount',
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                    customRender: (v) => v || "系统",
                },
                {
                    title: '收益类型',
                    dataIndex: 'reason',
                    customRender: (v) => reasonType[v] || '-',
                },
                {
                    title: '订单号',
                    dataIndex: 'addressTwo',
                    customRender: (v) => v || '-',
                },
                {
                    title: '级别',
                    dataIndex: 'one',
                }
            ],
            searchData: {
                address: '',
                reason: undefined,
            },
        }
    },
    methods: {
        getList() {
            this.loading = true
            Gai.reward_list({
                page: this.current,
                ...this.searchData
            }).then((res) => {
                this.data = res.rewards.map((value, key) => {
                    return { ...value, key }
                })
                this.loading = false
                this.total = parseInt(res.count)
            })
        },
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