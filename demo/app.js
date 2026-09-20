const data = {
  clinic:{title:"Clinic Workspace",copy:"Location-specific operations for this clinic.",metrics:[["08","appointments"],["03","waiting"],["05","seen"],["01","staff"]],items:[["DAY","Today's schedule"],["Q","Live patient queue"],["PT","Patient list"],["₱","Clinic billing"]]},
  patients:{title:"Patients",copy:"Patients for the selected clinic.",metrics:[["124","active"],["05","seen today"],["02","new"],["03","follow-up"]],items:[["MS","Maria Santos"],["JD","Juan Dela Cruz"],["AR","Ana Reyes"]]},
  appointments:{title:"Appointments",copy:"Doctor schedule for the selected clinic.",metrics:[["08","today"],["04","confirmed"],["03","waiting"],["01","pending"]],items:[["10:30","Maria Santos"],["11:00","Juan Dela Cruz"],["11:30","Ana Reyes"]]},
  queue:{title:"Queue",copy:"Front-desk waiting list for this location.",metrics:[["03","waiting"],["07m","average"],["01","with doctor"],["05","completed"]],items:[["01","Juan Dela Cruz"],["02","Ana Reyes"],["03","Carlo Mendoza"]]},
  records:{title:"Medical Records",copy:"Doctor-access patient history and visit timeline.",metrics:[["124","records"],["09","updated"],["04","today"],["01","doctor"]],items:[["TL","Visit timeline"],["RX","Prescription history"],["NT","Clinical notes"]]},
  billing:{title:"Billing",copy:"Location-level charges and payment status.",metrics:[["₱8.4K","today"],["06","paid"],["02","pending"],["08","invoices"]],items:[["PAID","Consultation #1008"],["DUE","Consultation #1009"],["NEW","Consultation #1010"]]},
  staff:{title:"Staff Workspace",copy:"Front-desk tools for the assigned clinic.",metrics:[["01","staff"],["08","appointments"],["03","waiting"],["02","messages"]],items:[["REG","Register patient"],["BOOK","Book appointment"],["QUEUE","Manage queue"]]},
  "shared-patients":{title:"Shared Doctor Patient View",copy:"Doctor-level view across Clinic A and Clinic B. Staff remain location-scoped.",metrics:[["248","patients"],["09","seen today"],["14","appointments"],["02","locations"]],items:[["A","Clinic A patients"],["B","Clinic B patients"],["ALL","Combined timeline"]]},
  prescriptions:{title:"Prescriptions",copy:"Unified prescription history for the doctor across both clinics.",metrics:[["07","today"],["23","this week"],["02","draft"],["PDF","ready"]],items:[["RX","Recent prescriptions"],["FU","Follow-ups"],["HIST","Patient medication history"]]},
  reports:{title:"Combined Reports",copy:"Compare workload and activity across the two clinic locations.",metrics:[["14","visits"],["02","clinics"],["09","patients seen"],["₱14K","combined"]],items:[["A","Clinic A report"],["B","Clinic B report"],["CMP","Compare locations"]]},
  settings:{title:"Practice Settings",copy:"Configure both clinic locations and staff access.",metrics:[["02","clinics"],["02","staff"],["01","doctor"],["03","roles"]],items:[["HRS","Clinic hours"],["STAFF","Staff assignments"],["ROLE","Permissions"]]}
};

const panel=document.getElementById("panel"),scrim=document.getElementById("scrim");
function openPanel(module,clinic){
  const d=data[module]||data.clinic;
  const clinicLabel=clinic==="a"?"Clinic A":clinic==="b"?"Clinic B":"All Clinics";
  document.getElementById("panel-code").textContent=clinicLabel.toUpperCase();
  document.getElementById("panel-title").textContent=d.title;
  document.getElementById("panel-copy").textContent=(clinic&&clinic!=="all"?clinicLabel+" · ":"")+d.copy;
  document.getElementById("panel-body").innerHTML='<div class="metric-grid">'+d.metrics.map(x=>'<div class="metric"><strong>'+x[0]+'</strong><span>'+x[1]+'</span></div>').join("")+'</div>'+d.items.map(x=>'<div class="item"><i>'+x[0]+'</i><div><strong>'+x[1]+'</strong><small>Demo workspace</small></div></div>').join("");
  panel.classList.add("open");panel.setAttribute("aria-hidden","false");scrim.classList.add("show");
}
function close(){panel.classList.remove("open");panel.setAttribute("aria-hidden","true");scrim.classList.remove("show")}
document.querySelectorAll("[data-module]").forEach(b=>b.addEventListener("click",()=>openPanel(b.dataset.module,b.dataset.clinicTarget||"all")));
document.getElementById("close").addEventListener("click",close);scrim.addEventListener("click",close);
document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});

const cards={a:document.querySelector(".clinic-a"),b:document.querySelector(".clinic-b")};
document.querySelectorAll(".switch-btn").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".switch-btn").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
  const c=btn.dataset.clinic;
  if(c==="all"){cards.a.classList.remove("dim","focus");cards.b.classList.remove("dim","focus")}
  else{
    const other=c==="a"?"b":"a";
    cards[c].classList.add("focus");cards[c].classList.remove("dim");
    cards[other].classList.add("dim");cards[other].classList.remove("focus");
  }
}));