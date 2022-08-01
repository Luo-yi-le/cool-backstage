<template>
  <el-table :data="list" style="width: 100%; padding-top: 15px">
    <el-table-column label="Order_No" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope"> ¥{{ scope.row.price | toThousandFilter }} </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{ row }">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger",
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30);
    },
  },
  data() {
    return {
      list: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.list = [
        {
          order_no: "dbB2fe56-5D73-4ccc-5d7d-C7cF739eEF6d",
          timestamp: 1201984049869,
          username: "Larry Allen",
          price: 7090,
          status: "pending",
        },
        {
          order_no: "8dEcA4e6-79E6-E79e-4B83-bf48A96BF9f5",
          timestamp: 1201984049869,
          username: "Brian Taylor",
          price: 10276.7,
          status: "success",
        },
        {
          order_no: "Ac671A92-137e-E5Cf-8EFF-17Df31DCC39e",
          timestamp: 1201984049869,
          username: "Anthony Thompson",
          price: 9700.1,
          status: "pending",
        },
        {
          order_no: "c8F3bDCf-7431-6b64-C9fC-fCCD9dAcc86e",
          timestamp: 1201984049869,
          username: "Donna Thompson",
          price: 10818.94,
          status: "success",
        },
        {
          order_no: "e0fB3cdf-5c9D-48df-59cB-B4ADE61CBEe8",
          timestamp: 1201984049869,
          username: "Jeffrey Jones",
          price: 12844.34,
          status: "pending",
        },
        {
          order_no: "bBBfFB71-1Bf8-9d62-4D7e-cdd42E16FC23",
          timestamp: 1201984049869,
          username: "David Clark",
          price: 11195.63,
          status: "success",
        },
        {
          order_no: "2E9A12C2-CCf1-D5B6-5F75-eD7b44Fda6Ab",
          timestamp: 1201984049869,
          username: "Timothy Walker",
          price: 8491.1,
          status: "success",
        },
        {
          order_no: "e2bbB9FB-b3fd-120E-0B26-A5f16EAe4a6c",
          timestamp: 1201984049869,
          username: "Angela Lewis",
          price: 5523.1,
          status: "pending",
        },
        {
          order_no: "eFFb1Aad-4a83-fB1d-ffC5-FB7AE8BAAC55",
          timestamp: 1201984049869,
          username: "Patricia Martin",
          price: 13887.9,
          status: "pending",
        },
        {
          order_no: "59bE56d1-9De0-d87f-Af5f-FEA4F4e2fB90",
          timestamp: 1201984049869,
          username: "Richard Williams",
          price: 3866.5,
          status: "success",
        },
        {
          order_no: "22eBBcC3-B826-9d24-69Dc-6e8C9d18fc65",
          timestamp: 1201984049869,
          username: "Brian Smith",
          price: 4235.4,
          status: "pending",
        },
        {
          order_no: "D0c40dEf-0c69-B29d-C6AD-33fedAafA43D",
          timestamp: 1201984049869,
          username: "Deborah Clark",
          price: 6764.2,
          status: "pending",
        },
        {
          order_no: "C89dB99D-D7b4-CaDb-D8dF-c5DdcdbdD258",
          timestamp: 1201984049869,
          username: "Lisa Miller",
          price: 8139.78,
          status: "pending",
        },
        {
          order_no: "F69FBC3D-f1dE-2B3E-d68e-b535FfFBD2Fa",
          timestamp: 1201984049869,
          username: "Timothy Williams",
          price: 8145.9,
          status: "success",
        },
        {
          order_no: "C6C83bAD-4e4F-Dd6C-Ee7E-3Ff3eC9CEbFC",
          timestamp: 1201984049869,
          username: "Jeffrey Davis",
          price: 9391,
          status: "success",
        },
        {
          order_no: "bdEDf85A-7CeA-6eEf-E7aB-d5BDe498Dd9b",
          timestamp: 1201984049869,
          username: "Sandra Thompson",
          price: 7387.8,
          status: "pending",
        },
        {
          order_no: "15105A43-52AC-D5bF-FCc7-fF399BFE45eb",
          timestamp: 1201984049869,
          username: "Shirley Jackson",
          price: 13528,
          status: "pending",
        },
        {
          order_no: "bB6E1663-CbdC-Cd0E-ECB7-D04Dd1173d2C",
          timestamp: 1201984049869,
          username: "Scott White",
          price: 5531.4,
          status: "pending",
        },
        {
          order_no: "5FE7C7b0-C67c-979C-8c6E-cBFA3294d50c",
          timestamp: 1201984049869,
          username: "Lisa Wilson",
          price: 5065.51,
          status: "success",
        },
        {
          order_no: "ebdae765-6FE3-d470-714d-fbEAf2DB147d",
          timestamp: 1201984049869,
          username: "Jeffrey Thompson",
          price: 9970,
          status: "success",
        },
      ];
    },
  },
};
</script>
