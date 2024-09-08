<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const apiUrlBase = 'https://todolist-api.hexschool.io'
const router = useRouter()
const nickname = ref('')
const activeCategory = ref('all')
const data = ref([])
const newTodoItem = ref('')
const editTodoItem = ref({
  id: '',
  content: ''
})

// 取得token
const getToken = () => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('todoToken='))
    ?.split('=')[1]
  return token
}

// 驗證使用者身份
const checkout = async () => {
  try {
    const token = getToken()

    if (token) {
      const res = await axios.get(`${apiUrlBase}/users/checkout`, {
        headers: {
          Authorization: token
        }
      })
      nickname.value = res.data.nickname
    } else {
      alert('身份驗證失敗，請重新登入')
      router.push('login')
    }
  } catch (error) {
    alert('身份驗證失敗，請重新登入')
    router.push('login')
  }
}

// 登出
const signout = async () => {
  try {
    await checkout()
    const token = getToken()
    const res = await axios.post(`${apiUrlBase}/users/sign_out`, null, {
      headers: {
        Authorization: token
      }
    })
    alert(res.data.message)

    // 設定token到期時間
    const now = new Date()
    const expire = now.setMinutes(now.getMinutes() - 1)

    // 刪除token
    document.cookie = `todoToken=${token}; expires=${new Date(expire).toUTCString()}`

    // 回登入頁
    router.push('/login')
  } catch (error) {
    alert(error.response.data.message)
  }
}

// 取得所有待辦事項
const getTodos = async () => {
  try {
    await checkout()
    const token = getToken()
    const res = await axios.get(`${apiUrlBase}/todos`, {
      headers: {
        Authorization: token
      }
    })
    data.value = res.data.data
  } catch (error) {
    alert(error.response.data.message)
  }
}

// 新增待辦事項
const addTodo = async () => {
  try {
    if (newTodoItem.value === '') {
      return
    }
    await checkout()
    const token = getToken()
    const res = await axios.post(
      `${apiUrlBase}/todos/`,
      {
        content: newTodoItem.value
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
    // 情除新增待辦事項值
    newTodoItem.value = ''

    // 重新取得待辦事項
    await getTodos()
  } catch (error) {
    console.log(error)
  }
}

// 修改待辦事項
const updateTodo = async (id) => {
  const index = data.value.findIndex((todo) => todo.id === id)
  editTodoItem.value.id = id
  editTodoItem.value.content = data.value[index].content
}

// 重置修改待辦事項項目
const resetEditTodoItem = () => {
  editTodoItem.value = {
    id: '',
    content: ''
  }
}

// 取消修改代辦事項
const cancelUpdate = () => {
  resetEditTodoItem()
}

// 確認修改代辦事項
const confirmUpdate = async () => {
  try {
    await checkout()
    const token = getToken()
    const res = await axios.put(
      `${apiUrlBase}/todos/${editTodoItem.value.id}`,
      {
        content: editTodoItem.value.content
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
    alert(res.data.message)
    resetEditTodoItem()
    await getTodos()
  } catch (error) {
    alert(error.response.data.message)
  }
}

// 刪除待辦事項
const deleteTodo = async (id) => {
  try {
    await checkout()
    const token = getToken()
    const res = await axios.delete(`${apiUrlBase}/todos/${id}`, {
      headers: {
        Authorization: token
      }
    })
    alert(res.data.message)
    await getTodos()
  } catch (error) {
    alert(error.response.data.message)
  }
}

// 變更待辦事項狀態
const updateTodoStatus = async (id) => {
  try {
    await checkout()
    const token = getToken()
    const res = await axios.patch(`${apiUrlBase}/todos/${id}/toggle`, null, {
      headers: {
        Authorization: token
      }
    })
    alert(res.data.message)
    await getTodos()
  } catch (error) {
    alert(error.response.data.message)
  }
}

// 切換分頁（全部、待完成、已完成）
const switchCategory = (category) => {
  activeCategory.value = category
}

// 計算待辦事項未完成數
const notFinishCount = computed(() => {
  return data.value.filter((todo) => todo.status === false).length
})

// 過濾資料
const filterData = computed(() => {
  if (activeCategory.value === 'notFinished') {
    return data.value.filter((todo) => !todo.status)
  } else if (activeCategory.value === 'finished') {
    return data.value.filter((todo) => todo.status)
  } else {
    return data.value
  }
})

// 登入後直接取得所有待辦事項
onMounted(async () => {
  await getTodos()
})
</script>
<template>
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"
            ><span>{{ nickname }} 的待辦</span></a
          >
        </li>
        <li><a href="#" @click.prevent="signout">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="newTodoItem" />
          <a href="#" type="button" @click.prevent="addTodo">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div v-if="data.length === 0">
          <p class="noDataMsg">目前尚無待辦事項</p>
          <img
            src="https://github.com/hexschool/2022-web-layout-training/blob/main/todolist/empty%201.png?raw=true"
            alt=""
          />
        </div>
        <div class="todoList_list" v-else>
          <ul class="todoList_tab">
            <li>
              <a
                href="#"
                :class="{ active: activeCategory == 'all' }"
                @click.prevent="switchCategory('all')"
                >全部</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: activeCategory == 'notFinished' }"
                @click.prevent="switchCategory('notFinished')"
                >待完成</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: activeCategory == 'finished' }"
                @click.prevent="switchCategory('finished')"
                >已完成</a
              >
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="todo in filterData" :key="todo.id">
                <label class="todoList_label">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    :checked="todo.status"
                    @click="updateTodoStatus(todo.id)"
                  />
                  <span v-if="editTodoItem.id !== todo.id" @dblclick="updateTodo(todo.id)">{{
                    todo?.content
                  }}</span>
                  <span v-else>
                    <input type="text" v-model="editTodoItem.content" />
                  </span>
                </label>
                <a href="#" @click.prevent="updateTodo(todo.id)" v-if="editTodoItem.id !== todo.id">
                  <i class="fa-regular fa-pen-to-square"></i>
                </a>
                <a href="#" @click.prevent="deleteTodo(todo.id)" v-if="editTodoItem.id !== todo.id">
                  <i class="fa fa-times"></i>
                </a>
                <a href="#" @click.prevent="cancelUpdate()" v-if="editTodoItem.id === todo.id">
                  <i class="fa-solid fa-xmark"></i>
                </a>
                <a href="#" @click.prevent="confirmUpdate()" v-if="editTodoItem.id === todo.id">
                  <i class="fa-solid fa-check"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ notFinishCount }} 個待完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
