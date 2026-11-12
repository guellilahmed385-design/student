(()=>{
  const button=document.getElementById("accountButton");
  const dialog=document.getElementById("accountDialog");
  const form=document.getElementById("accountForm");
  const status=document.getElementById("accountStatus");
  const submit=document.getElementById("accountSubmit");
  const modeButton=document.getElementById("accountMode");
  const title=document.getElementById("accountTitle");
  const email=document.getElementById("accountEmail");
  const password=document.getElementById("accountPassword");
  const signOut=document.getElementById("accountSignOut");
  const config=window.STUDYMATE_SUPABASE_CONFIG||{};
  const validConfig=/^https:\/\//.test(config.url||"")&&!!config.anonKey;
  const keys=["sm_tasks","sm_cards","sm_sessions","sm_flashcard_module"];
  const defaults={sm_tasks:"[]",sm_cards:"[]",sm_sessions:"0",sm_flashcard_module:'"algebra1"'};
  let client=null,user=null,mode="signin",syncTimer=0,loadingRemote=false;
  const message=(text,error=false)=>{status.textContent=text;status.classList.toggle("error",error)};
  const currentData=()=>Object.fromEntries(keys.map(key=>[key,(()=>{try{return JSON.parse(localStorage.getItem(key)??defaults[key])}catch{return JSON.parse(defaults[key])}})()]));
  const applyData=(data)=>{loadingRemote=true;try{for(const key of keys)localStorage.setItem(key,JSON.stringify(data?.[key]??JSON.parse(defaults[key])))}finally{loadingRemote=false}window.dispatchEvent(new Event("studymate:data-restored"))};
  const saveCloud=async()=>{
    if(!client||!user||loadingRemote)return;
    const {error}=await client.from("studymate_data").upsert({user_id:user.id,payload:currentData(),updated_at:new Date().toISOString()},{onConflict:"user_id"});
    if(error)message("Mise à jour non synchronisée : "+error.message,true);
  };
  const scheduleSync=()=>{if(!client||!user||loadingRemote)return;clearTimeout(syncTimer);syncTimer=setTimeout(saveCloud,700)};
  const originalSet=Storage.prototype.setItem;
  Storage.prototype.setItem=function(key,value){originalSet.call(this,key,value);if(keys.includes(key))scheduleSync()};
  const paintUser=()=>{button.textContent=user?"Compte · "+(user.email||"connecté"):"Se connecter";button.setAttribute("aria-label",user?"Compte connecté":"Créer un compte ou se connecter");signOut.hidden=!user;modeButton.hidden=!!user;submit.hidden=!!user;email.disabled=!!user;password.disabled=!!user};
  async function loadUserData(sessionUser){
    user=sessionUser;paintUser();if(!user)return;
    const pending=(()=>{try{return JSON.parse(localStorage.getItem("sm_pending_signup")||"null")}catch{return null}})();
    const {data,error}=await client.from("studymate_data").select("payload").eq("user_id",user.id).maybeSingle();
    if(error){message("تعذر تحميل بيانات الحساب: "+error.message,true);return}
    if(data?.payload){applyData(data.payload);localStorage.setItem("sm_account_owner",user.id)}
    else if(pending&&pending.email===user.email&&Date.now()-pending.at<86400000){
      const {error:writeError}=await client.from("studymate_data").upsert({user_id:user.id,payload:pending.payload},{onConflict:"user_id"});
      if(writeError){message("تعذر حفظ تقدمك الأول: "+writeError.message,true);return}
      localStorage.removeItem("sm_pending_signup");localStorage.setItem("sm_account_owner",user.id);applyData(pending.payload);
    }else{
      const owner=localStorage.getItem("sm_account_owner");
      const initial=owner===user.id?currentData():Object.fromEntries(keys.map(key=>[key,JSON.parse(defaults[key])]));
      applyData(initial);localStorage.setItem("sm_account_owner",user.id);await saveCloud();
    }
    message("Connecté · tes tâches et cartes se synchronisent automatiquement.");
  }
  if(button&&dialog){
    button.addEventListener("click",()=>{dialog.showModal();paintUser();if(!validConfig)message("Le service de comptes doit d’abord être configuré par le propriétaire du site.",true)});
    dialog.querySelector("[data-close]").addEventListener("click",()=>dialog.close());
    modeButton.addEventListener("click",()=>{mode=mode==="signin"?"signup":"signin";title.textContent=mode==="signin"?"Connexion":"Créer un compte";submit.textContent=mode==="signin"?"Se connecter":"Créer mon compte";modeButton.textContent=mode==="signin"?"Créer un compte":"J’ai déjà un compte";message("")});
    signOut.addEventListener("click",async()=>{if(!client)return;const oldId=user?.id;await client.auth.signOut();user=null;if(localStorage.getItem("sm_account_owner")===oldId){for(const key of keys)localStorage.removeItem(key);localStorage.removeItem("sm_account_owner");window.dispatchEvent(new Event("studymate:data-restored"))}paintUser();message("Déconnecté.")});
    form.addEventListener("submit",async event=>{
      event.preventDefault();if(!client){message("Le service de comptes n’est pas configuré.",true);return}
      submit.disabled=true;message(mode==="signin"?"Connexion…":"Création du compte…");
      try{
        if(mode==="signup"){
          const pending={email:email.value.trim().toLowerCase(),payload:currentData(),at:Date.now()};
          localStorage.setItem("sm_pending_signup",JSON.stringify(pending));
          const {data,error}=await client.auth.signUp({email:email.value.trim(),password:password.value});
          if(error)throw error;
          if(data.session)await loadUserData(data.user);
          else message("Vérifie ton e-mail pour confirmer le compte, puis connecte-toi.");
        }else{
          const {data,error}=await client.auth.signInWithPassword({email:email.value.trim(),password:password.value});
          if(error)throw error;await loadUserData(data.user);
        }
      }catch(error){message(error.message||"Erreur de connexion.",true)}
      finally{submit.disabled=false}
    });
  }
  if(!validConfig){paintUser();return}
  if(!window.supabase?.createClient){message("Le module de connexion n’a pas pu se charger.",true);return}
  client=window.supabase.createClient(config.url,config.anonKey);
  client.auth.onAuthStateChange((event,session)=>{if(event==="SIGNED_IN"&&session?.user)loadUserData(session.user);if(event==="SIGNED_OUT"){user=null;paintUser()}});
  client.auth.getSession().then(({data})=>{if(data.session?.user)loadUserData(data.session.user);else paintUser()});
})();
