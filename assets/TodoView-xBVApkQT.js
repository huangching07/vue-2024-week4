import{u as N,r as m,g as L,h as S,c as o,a as s,t as _,i as r,w as b,v as D,n as C,F as E,j as O,o as i,k as g}from"./index-lL3Rn2-a.js";import{a as d}from"./axios-BimPEqV4.js";const P={id:"todoListPage",class:"bg-half"},j={class:"todo_sm"},q={href:"#"},R={class:"conatiner todoListPage vhContainer"},W={class:"todoList_Content"},G={class:"inputBox"},H={key:0},J={key:1,class:"todoList_list"},K={class:"todoList_tab"},Q={class:"todoList_items"},X={class:"todoList_item"},Y={class:"todoList_label"},Z=["checked","onClick"],tt=["onDblclick"],et={key:1},st=["onClick"],at=["onClick"],nt={class:"todoList_statistics"},v="https://todolist-api.hexschool.io",rt={__name:"TodoView",setup(ot){const y=N(),$=m(""),p=m("all"),u=m([]),k=m(""),n=m({id:"",content:""}),c=()=>{var t;return(t=document.cookie.split("; ").find(a=>a.startsWith("todoToken=")))==null?void 0:t.split("=")[1]},h=async()=>{try{const e=c();if(e){const t=await d.get(`${v}/users/checkout`,{headers:{Authorization:e}});$.value=t.data.nickname}else alert("身份驗證失敗，請重新登入"),y.push("login")}catch{alert("身份驗證失敗，請重新登入"),y.push("login")}},z=async()=>{try{await h();const e=c(),t=await d.post(`${v}/users/sign_out`,null,{headers:{Authorization:e}});alert(t.data.message);const a=new Date,l=a.setMinutes(a.getMinutes()-1);document.cookie=`todoToken=${e}; expires=${new Date(l).toUTCString()}`,y.push("/login")}catch(e){alert(e.response.data.message)}},f=async()=>{try{await h();const e=c(),t=await d.get(`${v}/todos`,{headers:{Authorization:e}});u.value=t.data.data}catch(e){alert(e.response.data.message)}},A=async()=>{try{if(k.value==="")return;await h();const e=c(),t=await d.post(`${v}/todos/`,{content:k.value},{headers:{Authorization:e}});k.value="",await f()}catch(e){console.log(e)}},T=async e=>{const t=u.value.findIndex(a=>a.id===e);n.value.id=e,n.value.content=u.value[t].content},x=()=>{n.value={id:"",content:""}},F=()=>{x()},I=async()=>{try{await h();const e=c(),t=await d.put(`${v}/todos/${n.value.id}`,{content:n.value.content},{headers:{Authorization:e}});alert(t.data.message),x(),await f()}catch(e){alert(e.response.data.message)}},M=async e=>{try{await h();const t=c(),a=await d.delete(`${v}/todos/${e}`,{headers:{Authorization:t}});alert(a.data.message),await f()}catch(t){alert(t.response.data.message)}},U=async e=>{try{await h();const t=c(),a=await d.patch(`${v}/todos/${e}/toggle`,null,{headers:{Authorization:t}});alert(a.data.message),await f()}catch(t){alert(t.response.data.message)}},w=e=>{p.value=e},B=L(()=>u.value.filter(e=>e.status===!1).length),V=L(()=>p.value==="notFinished"?u.value.filter(e=>!e.status):p.value==="finished"?u.value.filter(e=>e.status):u.value);return S(async()=>{await f()}),(e,t)=>(i(),o("div",P,[s("nav",null,[t[7]||(t[7]=s("h1",null,[s("a",{href:"#"},"ONLINE TODO LIST")],-1)),s("ul",null,[s("li",j,[s("a",q,[s("span",null,_($.value)+" 的待辦",1)])]),s("li",null,[s("a",{href:"#",onClick:r(z,["prevent"])},"登出")])])]),s("div",R,[s("div",W,[s("div",G,[b(s("input",{type:"text",placeholder:"請輸入待辦事項","onUpdate:modelValue":t[0]||(t[0]=a=>k.value=a)},null,512),[[D,k.value]]),s("a",{href:"#",type:"button",onClick:r(A,["prevent"])},t[8]||(t[8]=[s("i",{class:"fa fa-plus"},null,-1)]))]),u.value.length===0?(i(),o("div",H,t[9]||(t[9]=[s("p",{class:"noDataMsg"},"目前尚無待辦事項",-1),s("img",{src:"https://github.com/hexschool/2022-web-layout-training/blob/main/todolist/empty%201.png?raw=true",alt:""},null,-1)]))):(i(),o("div",J,[s("ul",K,[s("li",null,[s("a",{href:"#",class:C({active:p.value=="all"}),onClick:t[1]||(t[1]=r(a=>w("all"),["prevent"]))},"全部",2)]),s("li",null,[s("a",{href:"#",class:C({active:p.value=="notFinished"}),onClick:t[2]||(t[2]=r(a=>w("notFinished"),["prevent"]))},"待完成",2)]),s("li",null,[s("a",{href:"#",class:C({active:p.value=="finished"}),onClick:t[3]||(t[3]=r(a=>w("finished"),["prevent"]))},"已完成",2)])]),s("div",Q,[s("ul",X,[(i(!0),o(E,null,O(V.value,a=>(i(),o("li",{key:a.id},[s("label",Y,[s("input",{class:"todoList_input",type:"checkbox",checked:a.status,onClick:l=>U(a.id)},null,8,Z),n.value.id!==a.id?(i(),o("span",{key:0,onDblclick:l=>T(a.id)},_(a==null?void 0:a.content),41,tt)):(i(),o("span",et,[b(s("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=l=>n.value.content=l)},null,512),[[D,n.value.content]])]))]),n.value.id!==a.id?(i(),o("a",{key:0,href:"#",onClick:r(l=>T(a.id),["prevent"])},t[10]||(t[10]=[s("i",{class:"fa-regular fa-pen-to-square"},null,-1)]),8,st)):g("",!0),n.value.id!==a.id?(i(),o("a",{key:1,href:"#",onClick:r(l=>M(a.id),["prevent"])},t[11]||(t[11]=[s("i",{class:"fa fa-times"},null,-1)]),8,at)):g("",!0),n.value.id===a.id?(i(),o("a",{key:2,href:"#",onClick:t[5]||(t[5]=r(l=>F(),["prevent"]))},t[12]||(t[12]=[s("i",{class:"fa-solid fa-xmark"},null,-1)]))):g("",!0),n.value.id===a.id?(i(),o("a",{key:3,href:"#",onClick:t[6]||(t[6]=r(l=>I(),["prevent"]))},t[13]||(t[13]=[s("i",{class:"fa-solid fa-check"},null,-1)]))):g("",!0)]))),128))]),s("div",nt,[s("p",null,_(B.value)+" 個待完成項目",1)])])]))])])]))}};export{rt as default};
