const $=id=>document.getElementById(id);
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const flashcardDecks = {"algebra1":[{"q":"Quand a-t-on A ⊆ B ?","a":"Quand tout élément de A appartient aussi à B."},{"q":"Quelle différence entre A ∪ B et A ∩ B ?","a":"A ∪ B contient les éléments de A ou B ; A ∩ B contient ceux communs aux deux."},{"q":"Quelles propriétés définissent une relation d’équivalence ?","a":"Elle est réflexive, symétrique et transitive."},{"q":"Que forme l’ensemble des classes d’équivalence d’une relation ?","a":"Une partition de l’ensemble : les classes sont disjointes et leur union est tout l’ensemble."},{"q":"Dans la division euclidienne de a par b > 0, quelles sont les contraintes sur r ?","a":"Il existe un unique q et r tels que a = bq + r et 0 ≤ r < b."},{"q":"Que dit l’identité de Bézout pour a et b ?","a":"Il existe u,v ∈ ℤ tels que au + bv = pgcd(a,b)."},{"q":"Quels sont les trois axiomes principaux d’un groupe (G,*) ?","a":"La loi est associative, possède un élément neutre et chaque élément a un inverse."},{"q":"Quelle différence clé entre un anneau et un corps ?","a":"Dans un corps, tout élément non nul possède un inverse multiplicatif ; ce n’est pas exigé pour tous les éléments d’un anneau."}],"algorithms":[{"q":"Qu’est-ce qu’un algorithme ?","a":"Une suite finie et ordonnée d’instructions qui résout un problème à partir de données."},{"q":"À quoi sert une variable ?","a":"À nommer un emplacement où une valeur peut être stockée et modifiée pendant l’exécution."},{"q":"Quelle différence entre affectation et comparaison ?","a":"L’affectation donne une valeur à une variable ; la comparaison teste si deux valeurs satisfont une relation."},{"q":"Quand utiliser une structure Si / Sinon ?","a":"Pour choisir quelles instructions exécuter selon qu’une condition est vraie ou fausse."},{"q":"Quelle différence entre Pour et Tant que ?","a":"Pour convient souvent quand le nombre d’itérations est connu ; Tant que répète tant qu’une condition reste vraie."},{"q":"Comment parcourir tous les éléments d’un tableau T de taille n ?","a":"Faire varier un indice de 0 à n−1 (ou de 1 à n selon la convention) et traiter T[indice]."},{"q":"Qu’est-ce qu’une fonction en algorithmique ?","a":"Un sous-programme qui reçoit éventuellement des paramètres et renvoie un résultat."},{"q":"Comment vérifier à la main un algorithme avec une boucle ?","a":"Suivre, à chaque itération, les valeurs des variables et vérifier la condition d’arrêt."}],"analysis1":[{"q":"Qu’est-ce qu’un majorant d’un ensemble A ⊂ ℝ ?","a":"Un réel M tel que x ≤ M pour tout x ∈ A."},{"q":"Qu’est-ce que la borne supérieure sup(A) ?","a":"Le plus petit des majorants de A, lorsqu’il existe."},{"q":"Que signifie que (uₙ) converge vers ℓ ?","a":"Pour tout ε > 0, il existe N tel que n ≥ N implique |uₙ−ℓ| < ε."},{"q":"Quel théorème garantit la convergence d’une suite croissante ?","a":"Toute suite croissante et majorée converge vers sa borne supérieure."},{"q":"Quelle est la condition de continuité de f en a ?","a":"f(a) est définie et lim(x→a) f(x) = f(a)."},{"q":"Quelle limite définit la dérivée f′(a) ?","a":"lim(h→0) [f(a+h)−f(a)]/h, si cette limite existe."},{"q":"Que représente géométriquement f′(a) ?","a":"La pente de la tangente à la courbe de f au point d’abscisse a."},{"q":"Comment dériver un produit f·g ?","a":"(fg)′ = f′g + fg′."}],"architecture":[{"q":"Combien de bits contient un octet ?","a":"8 bits."},{"q":"Qu’est-ce qu’une variable booléenne ?","a":"Une variable qui ne prend que deux valeurs : vrai/faux, souvent codées 1/0."},{"q":"À quoi sert une table de vérité ?","a":"À donner la sortie d’une fonction logique pour chaque combinaison possible des entrées."},{"q":"Que renvoient les portes ET, OU et NON ?","a":"ET vaut 1 si toutes les entrées valent 1 ; OU si au moins une vaut 1 ; NON inverse l’entrée."},{"q":"Énonce une loi de De Morgan.","a":"¬(A ∧ B) = ¬A ∨ ¬B ; de même ¬(A ∨ B) = ¬A ∧ ¬B."},{"q":"Qu’est-ce qu’un circuit combinatoire ?","a":"Un circuit dont les sorties dépendent seulement des entrées présentes, sans mémoire d’état."},{"q":"Quelle différence entre circuit combinatoire et séquentiel ?","a":"Un circuit séquentiel possède un état mémorisé ; ses sorties dépendent aussi de l’historique."},{"q":"Quelles sont les grandes étapes d’un cycle d’instruction ?","a":"Lire l’instruction, la décoder, l’exécuter, puis passer à la suivante."}],"electrostatique":[{"q":"Comment s’écrit la norme de la force de Coulomb entre deux charges ponctuelles ?","a":"F = (1/(4πε₀))·|q₁q₂|/r², dirigée selon la droite qui relie les charges."},{"q":"Comment définir le champ électrique E créé en un point ?","a":"E = F/q₀ pour une charge test positive q₀ placée en ce point."},{"q":"Quel principe permet de calculer le champ créé par plusieurs charges ?","a":"Le principe de superposition : E_total = Σ E_i."},{"q":"Que dit le théorème de Gauss en électrostatique ?","a":"Le flux de E à travers une surface fermée vaut Q_int/ε₀."},{"q":"Quel lien relie champ électrique et potentiel V ?","a":"E = −grad(V) ; le champ pointe vers les potentiels décroissants."},{"q":"Quelle énergie potentielle possède une charge q au potentiel V ?","a":"E_p = qV, en choisissant la référence d’énergie correspondante."},{"q":"Quel est le champ à l’intérieur d’un conducteur à l’équilibre électrostatique ?","a":"Il est nul ; le conducteur est équipotentiel et les charges excédentaires résident sur sa surface."},{"q":"Pourquoi le potentiel est-il constant sur un conducteur à l’équilibre ?","a":"À l’équilibre E est nul dans le conducteur ; aucune différence de potentiel ne subsiste entre ses points."}],"mecanique":[{"q":"Comment obtenir la vitesse à partir du vecteur position r(t) ?","a":"v(t) = dr/dt."},{"q":"Comment obtenir l’accélération à partir de la vitesse ?","a":"a(t) = dv/dt = d²r/dt²."},{"q":"Quelle est l’expression de l’accélération dans la base de Frenet ?","a":"a = (d|v|/dt)·u_t + (|v|²/R)·u_n."},{"q":"Que relie la deuxième loi de Newton ?","a":"Dans un référentiel galiléen, ΣF_ext = m a pour un point matériel de masse constante."},{"q":"Quel théorème relie travail et énergie cinétique ?","a":"La variation d’énergie cinétique entre deux positions égale le travail de la résultante des forces."},{"q":"Qu’est-ce qu’un référentiel galiléen ?","a":"Un référentiel où le principe d’inertie et les lois de Newton s’appliquent sans force d’inertie."},{"q":"Qu’appelle-t-on force centrale ?","a":"Une force dirigée à tout instant selon la droite reliant le point matériel à un centre fixe."},{"q":"Quelle quantité se conserve sous une force centrale ?","a":"Le moment cinétique par rapport au centre est conservé ; le mouvement reste plan."}]};
let sessions=Number(localStorage.getItem("sm_sessions")||0),tasks=read("sm_tasks",[]),cards=read("sm_cards",[]);
if(cards.some(card=>!card.module)){cards=cards.map(card=>card.module?card:{...card,module:"personal"});localStorage.setItem("sm_cards",JSON.stringify(cards))}
let selectedModule=read("sm_flashcard_module","algebra1");if(!flashcardDecks[selectedModule]&&selectedModule!=="personal")selectedModule="algebra1";
let duration=25*60,seconds=duration,tick=null,current=0,mode="focus";
function getActiveCards(){const study=(flashcardDecks[selectedModule]||[]).map(card=>({...card,kind:"study"}));const custom=cards.map((card,index)=>({...card,kind:"custom",storageIndex:index})).filter(card=>card.module===selectedModule);return [...study,...custom]}
const saveTasks=()=>localStorage.setItem("sm_tasks",JSON.stringify(tasks));
const saveCards=()=>localStorage.setItem("sm_cards",JSON.stringify(cards));
const flashcardModule=$("flashcardModule");flashcardModule.value=selectedModule;flashcardModule.onchange=()=>{selectedModule=flashcardModule.value;localStorage.setItem("sm_flashcard_module",JSON.stringify(selectedModule));current=0;renderCard()};
function renderStats(){const done=tasks.filter(t=>t.done).length;$("sessions").textContent=sessions;$("completedTasks").textContent=done;$("taskSummary").textContent=tasks.length?done+" of "+tasks.length+" tasks completed":"Add your first task";$("totalCards").textContent=Object.values(flashcardDecks).reduce((sum,deck)=>sum+deck.length,0)+cards.length;$("taskCount").textContent=tasks.length+" task"+(tasks.length===1?"":"s");const pct=tasks.length?Math.round(done/tasks.length*100):0;$("progressText").textContent=pct+"%";$("progressBar").style.width=pct+"%";}
function renderTasks(){const list=$("taskList");list.replaceChildren();$("emptyTasks").hidden=tasks.length>0;tasks.forEach((task,index)=>{const li=document.createElement("li");li.className="task-item"+(task.done?" done":"");const cb=document.createElement("input");cb.type="checkbox";cb.checked=!!task.done;cb.setAttribute("aria-label","Mark task complete");cb.onchange=()=>{tasks[index].done=cb.checked;saveTasks();renderTasks();renderStats()};const label=document.createElement("span");label.textContent=task.text;const del=document.createElement("button");del.className="task-delete";del.textContent="×";del.setAttribute("aria-label","Delete task");del.onclick=()=>{tasks.splice(index,1);saveTasks();renderTasks();renderStats()};li.append(cb,label,del);list.append(li)});renderStats();}
$("taskForm").onsubmit=e=>{e.preventDefault();const text=$("taskInput").value.trim();if(!text)return;tasks.push({text,done:false});$("taskInput").value="";saveTasks();renderTasks();};
function showTime(){const m=Math.floor(seconds/60),s=seconds%60;$("timer").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");$("timerMode").textContent=mode==="focus"?"TIME TO FOCUS":"TAKE A BREATHER";}
function stopTimer(){clearInterval(tick);tick=null;}
function selectMode(name,mins){stopTimer();mode=name;duration=mins*60;seconds=duration;document.querySelectorAll(".preset").forEach(b=>b.classList.toggle("active",Number(b.dataset.minutes)===mins));$("startTimer").innerHTML="▶ &nbsp; "+(name==="focus"?"Start focus":"Start break");showTime();}
document.querySelectorAll(".preset").forEach(b=>b.onclick=()=>selectMode(Number(b.dataset.minutes)===25?"focus":"break",Number(b.dataset.minutes)));
$("startTimer").onclick=()=>{if(tick)return;tick=setInterval(()=>{if(seconds>0){seconds--;showTime()}else{stopTimer();if(mode==="focus"){sessions++;localStorage.setItem("sm_sessions",String(sessions));renderStats();}alert(mode==="focus"?"Focus session complete! Take a short break.":"Break finished. Ready for another focus session?");selectMode("focus",25)}},1000)};
$("pauseTimer").onclick=stopTimer;$("addTime").onclick=()=>{duration+=5*60;seconds+=5*60;showTime()};$("resetTimer").onclick=()=>{stopTimer();seconds=duration;showTime()};
function renderCard(){const deck=getActiveCards(),total=deck.length,card=deck[current]||null;$("cardCount").textContent=total+" card"+(total===1?"":"s");$("cardPosition").textContent=total?(current+1)+" / "+total:"0 / 0";$("flashQuestion").textContent=card?card.q:"No personal cards yet. Create one below.";$("flashAnswer").textContent=card?card.a:"";$("flashAnswer").hidden=true;$("showAnswer").hidden=!card;$("showAnswer").textContent="Reveal answer ↓";$("deleteCard").hidden=!card||card.kind!=="custom";}
$("flashcardForm").onsubmit=e=>{e.preventDefault();const q=$("questionInput").value.trim(),a=$("answerInput").value.trim();if(!q||!a)return;cards.push({q,a,module:selectedModule});current=getActiveCards().length;current--;$("questionInput").value="";$("answerInput").value="";saveCards();renderCard();renderStats()};
$("showAnswer").onclick=()=>{$("flashAnswer").hidden=false;$("showAnswer").textContent="Answer revealed ✓"};
$("nextCard").onclick=()=>{const total=getActiveCards().length;if(total){current=(current+1)%total;renderCard()}};
$("prevCard").onclick=()=>{const total=getActiveCards().length;if(total){current=(current-1+total)%total;renderCard()}};
$("deleteCard").onclick=()=>{const card=getActiveCards()[current];if(!card||card.kind!=="custom")return;cards.splice(card.storageIndex,1);current=Math.min(current,Math.max(0,getActiveCards().length-1));saveCards();renderCard();renderStats()};
$("todayLabel").textContent=new Intl.DateTimeFormat(undefined,{weekday:"long",month:"long",day:"numeric"}).format(new Date()).toUpperCase();
showTime();renderTasks();renderCard();renderStats();

// Share the app with classmates.
const shareButton = $("shareApp");
if (shareButton) {
  let shareFeedbackTimer;
  const copyShareLink = async (url) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      return true;
    }
    const field = document.createElement("textarea");
    field.value = url;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } finally {
      field.remove();
    }
    return copied;
  };
  const showShareFeedback = (label) => {
    clearTimeout(shareFeedbackTimer);
    shareButton.textContent = label;
    shareFeedbackTimer = setTimeout(() => {
      shareButton.textContent = "↗ Share StudyMate";
    }, 2200);
  };
  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: "StudyMate — Your study space",
      text: "A free study workspace with a focus timer, tasks and flashcards.",
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showShareFeedback("✓ Shared");
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    try {
      if (await copyShareLink(shareData.url)) {
        showShareFeedback("✓ Link copied");
        return;
      }
    } catch (error) {
      // Fall through to the manual copy prompt.
    }
    window.prompt("Copy your StudyMate link:", shareData.url);
  });
}

window.addEventListener("studymate:data-restored",()=>{
  tasks=read("sm_tasks",[]);
  cards=read("sm_cards",[]);
  sessions=Number(localStorage.getItem("sm_sessions")||0);
  selectedModule=read("sm_flashcard_module","algebra1");
  if(!flashcardDecks[selectedModule]&&selectedModule!=="personal")selectedModule="algebra1";
  flashcardModule.value=selectedModule;
  current=0;
  renderTasks();renderCard();renderStats();
});
