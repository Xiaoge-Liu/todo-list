let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function save(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
  render();
}

function addTask(){
  const input=document.getElementById('taskInput');
  if(!input.value.trim()) return;
  tasks.push({text:input.value,done:false});
  input.value='';
  save();
}

function toggle(i){
  tasks[i].done=!tasks[i].done;
  save();
}

function removeTask(i){
  tasks.splice(i,1);
  save();
}

function clearCompleted(){
  tasks=tasks.filter(t=>!t.done);
  save();
}

function render(){
  const list=document.getElementById('taskList');
  list.innerHTML='';
  tasks.forEach((t,i)=>{
    const li=document.createElement('li');
    li.innerHTML=`<span class="${t.done?'done':''}" onclick="toggle(${i})">${t.text}</span><button onclick="removeTask(${i})">删除</button>`;
    list.appendChild(li);
  });
  document.getElementById('count').textContent=tasks.filter(t=>!t.done).length;
}

render();