<template>
    <PageView>
        <a-card class="cardCon" title="数据" :loading="loading">
            <a-row :gutter="0">
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>总人数:</a> {{ data.totalUser || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>今日注册人数:</a> {{ data.todayUser || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>总充值:</a> {{ data.totalDeposit || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>今日充值:</a> {{ data.todayDeposit || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>划转数量:</a> {{ data.toAmount || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>手续费扣除数量:</a> {{ data.feeAmount || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>虚拟卡开卡数:</a> {{ data.cardTotal || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>实体卡开卡数:</a> {{ data.cardTwoTotal || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>虚拟卡动态数量:</a> {{ data.cardRewardTotal || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>实体卡动态数量:</a> {{ data.cardRewardTwoTota || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>今日提现:</a> {{ data.todayWithdraw || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>总提现:</a> {{ data.totalWithdraw || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
                <a-col :xs="12" :md="8" :lg="6" :xl="6">
                    <a-card-grid>
                        <a-icon type="team" />
                        <div>
                            <a>全网可提余额:</a> {{ data.balanceAll || 0 }}
                        </div>
                    </a-card-grid>
                </a-col>
            </a-row>
        </a-card>
    </PageView>
</template>

<script type="text/jsx">
import Gai from '../../api/Gai'
export default {
    name: 'home',
    data() {
        return {
            loading: true,
            data: {},
        }
    },
    activated() {
        this.getList()
    },
    methods: {
        getList() {
            this.loading = true
            Gai.all().then(res => {
                this.data = res
                this.loading = false
            })
        },
    }
}
</script>

<style scoped lang="less">
.cardCon {
    /deep/ .ant-card-body {
        padding: 0 !important;
    }

    .ant-card-grid {
        padding: 24px 15px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        i {
            font-size: 20px;
            color: #ffffff;
            padding: 10px;
            border-radius: 8px;
            background: #1890ff;
        }
    }
}

.inputGroup {
    >div {
        margin: 20px;
    }
}
</style>