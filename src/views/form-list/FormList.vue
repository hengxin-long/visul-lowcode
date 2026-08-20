<template>
  <div class="form-body">
    <div class="form-nav">
      <div class="nav">
        <ul>
          <li v-for="v in 4">
            <span class="title">已发布</span>
            <span class="count"> 24</span>
          </li>
        </ul>
      </div>
      <div class="filter">
        <el-icon>
          <Search />
        </el-icon>
        <el-input class="search" type="search" placeholder="搜索表单名称" />
        <el-button>筛选</el-button>
      </div>
    </div>
    <div class="form-table">
      <el-table :data="tableData" style="width: 100%" max-height="320">
        <el-table-column type="selection" width="40" />
        <el-table-column fixed prop="date" label="表单名称" min-width="350" />
        <el-table-column prop="name" label="状态" width="120" />
        <el-table-column prop="state" label="创建时间" width="200" />
        <el-table-column prop="city" label="最后修改" width="200" />
        <el-table-column prop="address" label="数据量" width="200" />
        <el-table-column prop="address" label="操作" width="200" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]
</script>

<style scoped lang="scss">
.form-body {
  width: 100%;
  margin-top: 20px;
}

.form-table {
  width: 100%;
  margin-top: 15px;
}

.form-nav {
  display: flex;
  justify-content: space-between;
  height: 50px;

  .nav,
  .filter {
    flex: 0.25;
    padding: 5px;
  }

  .nav {
    border-radius: 8px;
    background-color: rgb(233, 233, 233);
  }

  .filter {
    display: flex;
    gap: 10px;
    align-items: center;

    .search {
      vertical-align: middle;
    }

    el-button {

      width: 50px;
    }
  }

  .nav ul {
    display: flex;
    gap: 8px;
    width: 100%;
    height: 100%;

    li {
      flex: 1;
      height: 100%;
      border-radius: 6px;
      text-align: center;
      line-height: 40px;

      .title {
        font-size: 13px;
      }

      .count {
        font-size: 12px;
      }
    }

    li:hover {
      background-color: #fff;

      .title {
        font-size: 15px;
        color: $vlcpColor;
        font-weight: 600;
      }

      .count {
        font-size: 13px;
      }
    }
  }
}
</style>