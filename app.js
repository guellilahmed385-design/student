const $=id=>document.getElementById(id);
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
let sessions=Number(localStorage.getItem("sm_sessions")||0),tasks=read("sm_tasks",[]),cards=read("sm_cards",[]);
let duration=25*60,seconds=duration,tick=null,current=0,mode="focus";
const saveTasks=()=>localStorage.setItem("sm_tasks",JSON.stringify(tasks));
const saveCards=()=>localStorage.setItem("sm_cards",JSON.stringify(cards));
function renderStats(){const done=tasks.filter(t=>t.done).length;$("sessions").textContent=sessions;$("completedTasks").textContent=done;$("taskSummary").textContent=tasks.length?done+" of "+tasks.length+" tasks completed":"Add your first task";$("totalCards").textContent=cards.length;$("taskCount").textContent=tasks.length+" task"+(tasks.length===1?"":"s");const pct=tasks.length?Math.round(done/tasks.length*100):0;$("progressText").textContent=pct+"%";$("progressBar").style.width=pct+"%";}
function renderTasks(){const list=$("taskList");list.replaceChildren();$("emptyTasks").hidden=tasks.length>0;tasks.forEach((task,index)=>{const li=document.createElement("li");li.className="task-item"+(task.done?" done":"");const cb=document.createElement("input");cb.type="checkbox";cb.checked=!!task.done;cb.setAttribute("aria-label","Mark task complete");cb.onchange=()=>{tasks[index].done=cb.checked;saveTasks();renderTasks();renderStats()};const label=document.createElement("span");label.textContent=task.text;const del=document.createElement("button");del.className="task-delete";del.textContent="×";del.setAttribute("aria-label","Delete task");del.onclick=()=>{tasks.splice(index,1);saveTasks();renderTasks();renderStats()};li.append(cb,label,del);list.append(li)});renderStats();}
$("taskForm").onsubmit=e=>{e.preventDefault();const text=$("taskInput").value.trim();if(!text)return;tasks.push({text,done:false});$("taskInput").value="";saveTasks();renderTasks();};
function showTime(){const m=Math.floor(seconds/60),s=seconds%60;$("timer").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");$("timerMode").textContent=mode==="focus"?"TIME TO FOCUS":"TAKE A BREATHER";}
function stopTimer(){clearInterval(tick);tick=null;}
function selectMode(name,mins){stopTimer();mode=name;duration=mins*60;seconds=duration;document.querySelectorAll(".preset").forEach(b=>b.classList.toggle("active",Number(b.dataset.minutes)===mins));$("startTimer").innerHTML="▶ &nbsp; "+(name==="focus"?"Start focus":"Start break");showTime();}
document.querySelectorAll(".preset").forEach(b=>b.onclick=()=>selectMode(Number(b.dataset.minutes)===25?"focus":"break",Number(b.dataset.minutes)));
$("startTimer").onclick=()=>{if(tick)return;tick=setInterval(()=>{if(seconds>0){seconds--;showTime()}else{stopTimer();if(mode==="focus"){sessions++;localStorage.setItem("sm_sessions",String(sessions));renderStats();}alert(mode==="focus"?"Focus session complete! Take a short break.":"Break finished. Ready for another focus session?");selectMode("focus",25)}},1000)};
$("pauseTimer").onclick=stopTimer;$("resetTimer").onclick=()=>{stopTimer();seconds=duration;showTime()};
function renderCard(){const total=cards.length;$("cardCount").textContent=total+" card"+(total===1?"":"s");$("cardPosition").textContent=total?(current+1)+" / "+total:"0 / 0";$("flashQuestion").textContent=total?cards[current].q:"Your first question goes here.";$("flashAnswer").textContent=total?cards[current].a:"";$("flashAnswer").hidden=true;$("showAnswer").hidden=!total;$("deleteCard").hidden=!total;}
$("flashcardForm").onsubmit=e=>{e.preventDefault();const q=$("questionInput").value.trim(),a=$("answerInput").value.trim();if(!q||!a)return;cards.push({q,a});current=cards.length-1;$("questionInput").value="";$("answerInput").value="";saveCards();renderCard();renderStats()};
$("showAnswer").onclick=()=>{$("flashAnswer").hidden=false;$("showAnswer").textContent="Answer revealed ✓"};
$("nextCard").onclick=()=>{if(cards.length){current=(current+1)%cards.length;renderCard()}};
$("prevCard").onclick=()=>{if(cards.length){current=(current-1+cards.length)%cards.length;renderCard()}};
$("deleteCard").onclick=()=>{if(!cards.length)return;cards.splice(current,1);current=Math.max(0,Math.min(current,cards.length-1));saveCards();renderCard();renderStats()};
$("todayLabel").textContent=new Intl.DateTimeFormat(undefined,{weekday:"long",month:"long",day:"numeric"}).format(new Date()).toUpperCase();
showTime();renderTasks();renderCard();renderStats();

// Share the app with classmates.
const shareButton = $("shareApp");
if (shareButton) {
  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: "StudyMate — Your study space",
      text: "A free study workspace with a focus timer, tasks and flashcards.",
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareData.url);
        shareButton.textContent = "✓ Link copied";
        setTimeout(() => shareButton.textContent = "↗ Share StudyMate", 2200);
      } else {
        window.prompt("Copy your StudyMate link:", shareData.url);
      }
    } catch (error) {
      if (error.name !== "AbortError") window.prompt("Copy your StudyMate link:", shareData.url);
    }
  });
}
