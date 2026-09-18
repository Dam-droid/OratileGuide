const form=document.querySelector("#form"),list=document.querySelector("#list"),count=document.querySelector("#count");
let tasks=JSON.parse(localStorage.tasks||"[]"),filter="all";

function save(){localStorage.tasks=JSON.stringify(tasks)}
function render(){list.innerHTML="";
    tasks.filter(t=>filter==="all"||filter==="active"&&!t.done||filter==="done"&&t.done).forEach(t=>{let li=document.createElement("li");
        li.innerHTML=`<input type="checkbox" ${t.done?"checked":""}><span class="${t.done?"done":""}">${t.text}</span><small class="priority">${t.priority}</small><button>Delete</button>`;
        li.querySelector("input").onchange=()=>{t.done=!t.done;save();render()};
        li.querySelector("button").onclick=()=>{tasks=tasks.filter(x=>x.id!==t.id);
            save();
            render()};
            list.append(li)});
            count.textContent=`${tasks.filter(t=>!t.done).length} active task(s)`}

form.onsubmit=e=>{e.preventDefault();
    tasks.push({id:Date.now(),text:text.value.trim(),priority:priority.value,done:false});
    form.reset();save();render()};
    document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;
        render()});
        render();
