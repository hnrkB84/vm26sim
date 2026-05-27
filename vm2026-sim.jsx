import { useState, useCallback } from "react";

// ===================== DATA =====================

const FLAG = {
  "Argentina":"🇦🇷","Brazil":"🇧🇷","France":"🇫🇷","England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "Spain":"🇪🇸","Germany":"🇩🇪","Portugal":"🇵🇹","Netherlands":"🇳🇱",
  "Belgium":"🇧🇪","Croatia":"🇭🇷","Italy":"🇮🇹","Morocco":"🇲🇦",
  "Serbia":"🇷🇸","Switzerland":"🇨🇭","Denmark":"🇩🇰","Poland":"🇵🇱",
  "USA":"🇺🇸","Canada":"🇨🇦","Mexico":"🇲🇽","Ecuador":"🇪🇨",
  "Uruguay":"🇺🇾","Colombia":"🇨🇴","Chile":"🇨🇱","Peru":"🇵🇪",
  "Japan":"🇯🇵","South Korea":"🇰🇷","Iran":"🇮🇷","Saudi Arabia":"🇸🇦",
  "Australia":"🇦🇺","Senegal":"🇸🇳","Cameroon":"🇨🇲","Ghana":"🇬🇭",
  "Tunisia":"🇹🇳","Nigeria":"🇳🇬","South Africa":"🇿🇦","Egypt":"🇪🇬",
  "Sweden":"🇸🇪","Ukraine":"🇺🇦","Czech Republic":"🇨🇿","Turkey":"🇹🇷",
  "Hungary":"🇭🇺","Costa Rica":"🇨🇷","Qatar":"🇶🇦","New Zealand":"🇳🇿",
  "Venezuela":"🇻🇪","Jamaica":"🇯🇲","Paraguay":"🇵🇾","Panama":"🇵🇦",
};

const RATING = {
  "Argentina":95,"Brazil":91,"France":92,"England":88,"Spain":90,
  "Germany":87,"Portugal":89,"Netherlands":87,"Belgium":84,"Croatia":82,
  "Italy":85,"Morocco":78,"Serbia":81,"Switzerland":82,"Denmark":83,
  "Poland":80,"USA":79,"Canada":78,"Mexico":77,"Ecuador":74,
  "Uruguay":81,"Colombia":79,"Chile":73,"Peru":72,"Japan":78,
  "South Korea":76,"Iran":72,"Saudi Arabia":70,"Australia":73,
  "Senegal":76,"Cameroon":70,"Ghana":72,"Tunisia":71,"Nigeria":73,
  "South Africa":67,"Egypt":70,"Sweden":76,"Ukraine":77,
  "Czech Republic":76,"Turkey":79,"Hungary":74,"Costa Rica":68,
  "Qatar":65,"New Zealand":66,"Venezuela":70,"Jamaica":66,
  "Paraguay":71,"Panama":68,
};

const PLAYERS = {
  "Argentina":["Messi","Di María","De Paul","J. Álvarez","E. Martínez","Mac Allister"],
  "Brazil":["Vinicius Jr","Rodrygo","Endrick","Casemiro","Militão","Savinho"],
  "France":["Mbappé","Griezmann","Camavinga","Tchouaméni","Dembélé","Maignan"],
  "England":["Bellingham","Saka","Kane","Foden","Palmer","Alexander-Arnold"],
  "Spain":["Yamal","Pedri","Morata","Rodri","L. Williams","Grimaldo"],
  "Germany":["Musiala","Wirtz","Havertz","Kimmich","Gnabry","Rüdiger"],
  "Portugal":["B. Fernandes","B. Silva","R. Leão","Rúben Dias","D. Jota","Ronaldo"],
  "Netherlands":["Gakpo","Depay","F. de Jong","Van Dijk","Dumfries","X. Simons"],
  "Belgium":["De Bruyne","Lukaku","Doku","Trossard","Courtois","Onana"],
  "Croatia":["Modrić","Kovačić","Gvardiol","Vlašić","Perišić","Budimir"],
  "Italy":["Barella","Chiesa","Retegui","Donnarumma","Scamacca","Jorginho"],
  "Morocco":["Hakimi","En-Nesyri","Ziyech","Saïss","Amrabat","Boufal"],
  "Serbia":["Vlahović","Milinković-S.","Kostić","Tadić","Mitrović","Lukić"],
  "Switzerland":["Xhaka","Embolo","Akanji","Shaqiri","Vargas","Sommer"],
  "Denmark":["Eriksen","Höjbjerg","Dolberg","Christensen","Braithwaite","Wind"],
  "Poland":["Lewandowski","Zieliński","Szczęsny","Grosicki","Bednarek","Frankowski"],
  "USA":["Pulisic","Reyna","Adams","McKennie","Weah","Turner"],
  "Canada":["Davies","David","Osorio","Eustáquio","Buchanan","Johnston"],
  "Mexico":["H. Lozano","Jiménez","Antuna","Guardado","Ochoa","Sánchez"],
  "Japan":["Kubo","Mitoma","Ito","Maeda","Morita","Doan"],
  "South Korea":["Son","Lee Kang-In","Hwang H-C","Kim Min-Jae","Cho G-S","Lee J-S"],
  "Senegal":["Mané","Sarr","Koulibaly","Diatta","Mendy","Diallo"],
  "Uruguay":["Cavani","Suárez","Valverde","Bentancur","De Arrascaeta","Núñez"],
  "Colombia":["James","L. Díaz","Córdoba","Arias","Cuadrado","Borré"],
  "Sweden":["Isak","Kulusevski","Forsberg","Ekdal","Elanga","Claesson"],
  "Turkey":["Çalhanoğlu","Güler","Demiral","Akaydin","Yilmaz","Muldur"],
  "Ukraine":["Mudryk","Zinchenko","Malinovskyi","Yarmolenko","Dovbyk","Lunin"],
  "Nigeria":["Osimhen","Lookman","Ndidi","Iheanacho","Omeruo","Nwabali"],
  "Egypt":["M. Salah","Trezeguet","El-Nenni","Hegazy","El-Shenawy","Hamdi"],
  "Morocco":["Hakimi","En-Nesyri","Ziyech","Saïss","Amrabat","Boufal"],
};

function getPlayers(team) {
  if (PLAYERS[team]) return PLAYERS[team];
  const s = team.split(" ")[0];
  return [`${s} A`,`${s} B`,`${s} C`,`${s} D`,`${s} E`];
}

const INITIAL_GROUPS = {
  A:["Brazil","Serbia","Switzerland","Cameroon"],
  B:["England","USA","Iran","Ecuador"],
  C:["Argentina","Poland","Saudi Arabia","Mexico"],
  D:["France","Denmark","Tunisia","Australia"],
  E:["Spain","Germany","Japan","Costa Rica"],
  F:["Portugal","Uruguay","Ghana","South Korea"],
  G:["Belgium","Croatia","Morocco","Canada"],
  H:["Netherlands","Senegal","Colombia","Qatar"],
  I:["Italy","Turkey","Chile","Peru"],
  J:["Sweden","Hungary","Egypt","New Zealand"],
  K:["Ukraine","Czech Republic","Venezuela","Jamaica"],
  L:["South Africa","Nigeria","Paraguay","Panama"],
};

const ALL_TEAMS = Object.values(INITIAL_GROUPS).flat();

// ===================== ENGINE =====================

function poisson(lambda) {
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= Math.random(); } while (p > L);
  return k - 1;
}

function getRating(name, host) {
  return (RATING[name] || 70) + (name === host ? 5 : 0);
}

function scorers(team, n) {
  const pl = getPlayers(team);
  return Array.from({length: n}, () => pl[Math.floor(Math.random() * pl.length)]);
}

function simMatch(a, b, host) {
  const rA = getRating(a, host), rB = getRating(b, host);
  const d = rA - rB;
  const lA = Math.max(0.2, 1.2 * Math.exp(d / 50));
  const lB = Math.max(0.2, 1.2 * Math.exp(-d / 50));
  const gA = poisson(lA), gB = poisson(lB);
  return { gA, gB, sA: scorers(a, gA), sB: scorers(b, gB) };
}

function simKO(a, b, host) {
  const r = simMatch(a, b, host);
  let winner, pens = false;
  if (r.gA !== r.gB) {
    winner = r.gA > r.gB ? a : b;
  } else {
    pens = true;
    const rA = getRating(a, host), rB = getRating(b, host);
    winner = Math.random() < rA / (rA + rB) ? a : b;
  }
  return { ...r, winner, pens };
}

function simGroups(host) {
  const out = {};
  for (const [letter, teams] of Object.entries(INITIAL_GROUPS)) {
    const tbl = {};
    teams.forEach(t => tbl[t] = {pts:0,w:0,d:0,l:0,gf:0,ga:0,p:0});
    const matches = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i+1; j < teams.length; j++) {
        const r = simMatch(teams[i], teams[j], host);
        matches.push({home:teams[i], away:teams[j], ...r});
        tbl[teams[i]].p++; tbl[teams[j]].p++;
        tbl[teams[i]].gf += r.gA; tbl[teams[i]].ga += r.gB;
        tbl[teams[j]].gf += r.gB; tbl[teams[j]].ga += r.gA;
        if (r.gA > r.gB) { tbl[teams[i]].pts+=3; tbl[teams[i]].w++; tbl[teams[j]].l++; }
        else if (r.gB > r.gA) { tbl[teams[j]].pts+=3; tbl[teams[j]].w++; tbl[teams[i]].l++; }
        else { tbl[teams[i]].pts++; tbl[teams[i]].d++; tbl[teams[j]].pts++; tbl[teams[j]].d++; }
      }
    }
    const sorted = Object.entries(tbl).sort((a,b) => {
      if (b[1].pts !== a[1].pts) return b[1].pts - a[1].pts;
      const gd = (b[1].gf-b[1].ga) - (a[1].gf-a[1].ga);
      if (gd !== 0) return gd;
      return b[1].gf - a[1].gf;
    });
    out[letter] = {table: sorted, matches};
  }
  return out;
}

function best8Thirds(groups) {
  return Object.values(groups)
    .map(g => ({name: g.table[2][0], ...g.table[2][1]}))
    .sort((a,b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      const gd = (b.gf-b.ga)-(a.gf-a.ga);
      if (gd !== 0) return gd;
      return b.gf - a.gf;
    })
    .slice(0,8).map(t => t.name);
}

function simKnockout(groups, host) {
  const teams = [];
  Object.values(groups).forEach(g => { teams.push(g.table[0][0]); teams.push(g.table[1][0]); });
  best8Thirds(groups).forEach(n => teams.push(n));
  // Shuffle
  for (let i = teams.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [teams[i],teams[j]] = [teams[j],teams[i]];
  }
  const NAMES = ["Sextondelsfinal","Åttondelsfinal","Kvartsfinal","Semifinal"];
  const rounds = [];
  let current = teams, sfLosers = [];
  while (current.length > 2) {
    const matches = [], winners = [], losers = [];
    for (let i = 0; i < current.length; i += 2) {
      const r = simKO(current[i], current[i+1], host);
      matches.push({home:current[i], away:current[i+1], ...r});
      winners.push(r.winner);
      losers.push([current[i],current[i+1]].find(t => t !== r.winner));
    }
    rounds.push({name: NAMES[rounds.length] || "Runda", matches});
    if (current.length === 4) sfLosers = losers;
    current = winners;
  }
  const fm = {home:current[0], away:current[1], ...simKO(current[0],current[1],host)};
  rounds.push({name:"Final", matches:[fm]});
  let thirdMatch = null;
  if (sfLosers.length === 2) {
    thirdMatch = {home:sfLosers[0], away:sfLosers[1], ...simKO(sfLosers[0],sfLosers[1],host)};
  }
  return {
    rounds, thirdMatch,
    winner: fm.winner,
    runnerUp: [fm.home,fm.away].find(t => t !== fm.winner),
    third: thirdMatch?.winner,
    fourth: thirdMatch ? [thirdMatch.home,thirdMatch.away].find(t=>t!==thirdMatch.winner) : null,
  };
}

function runSim(host) {
  const groups = simGroups(host);
  const knockout = simKnockout(groups, host);
  return {groups, knockout};
}

// ===================== UI =====================

const f = (name) => FLAG[name] || "🏳";

function TeamBadge({name, bold}) {
  return (
    <span style={{fontWeight: bold ? 700 : 400}}>
      {f(name)} {name}
    </span>
  );
}

function MatchRow({home, away, gA, gB, sA, sB, pens, winner, ko}) {
  const [open, setOpen] = useState(false);
  const homeWin = ko && winner === home;
  const awayWin = ko && winner === away;
  return (
    <div style={{borderBottom:"1px solid #1e293b", padding:"6px 10px"}}>
      <div
        onClick={() => setOpen(!open)}
        style={{display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontSize:13}}
      >
        <span style={{flex:1, textAlign:"right", fontWeight: homeWin?700:400, color: homeWin?"#4ade80":"#cbd5e1"}}>
          <TeamBadge name={home} bold={homeWin}/>
        </span>
        <span style={{
          fontFamily:"'Courier New', monospace", fontWeight:700, fontSize:15,
          background:"#1e293b", padding:"2px 8px", borderRadius:4,
          color: "#f8fafc", minWidth:52, textAlign:"center"
        }}>
          {gA} – {gB}
        </span>
        <span style={{flex:1, fontWeight: awayWin?700:400, color: awayWin?"#4ade80":"#cbd5e1"}}>
          <TeamBadge name={away} bold={awayWin}/>
        </span>
        {pens && <span style={{fontSize:10, color:"#64748b", marginLeft:4}}>e.f.s.</span>}
        <span style={{color:"#475569", fontSize:11}}>{open?"▲":"▼"}</span>
      </div>
      {open && (gA > 0 || gB > 0) && (
        <div style={{display:"flex", marginTop:4, fontSize:11, color:"#64748b"}}>
          <div style={{flex:1, textAlign:"right", paddingRight:30}}>
            {sA.length > 0 ? sA.join(", ") : "–"}
          </div>
          <div style={{flex:1, paddingLeft:30}}>
            {sB.length > 0 ? sB.join(", ") : "–"}
          </div>
        </div>
      )}
      {open && gA === 0 && gB === 0 && (
        <div style={{textAlign:"center", fontSize:11, color:"#475569", marginTop:4}}>Inga mål</div>
      )}
    </div>
  );
}

function GroupCard({letter, data}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border:"1px solid #1e293b", borderRadius:8, overflow:"hidden",
      background:"#0f172a", marginBottom:12
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          background:"#1e3a5f", padding:"8px 14px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          cursor:"pointer"
        }}
      >
        <span style={{fontWeight:700, color:"#93c5fd", fontSize:13, letterSpacing:1}}>GRUPP {letter}</span>
        <span style={{color:"#64748b", fontSize:11}}>{open ? "▲ dölj matcher" : "▼ visa matcher"}</span>
      </div>
      <div style={{padding:10}}>
        <table style={{width:"100%", fontSize:12, borderCollapse:"collapse"}}>
          <thead>
            <tr style={{color:"#475569", borderBottom:"1px solid #1e293b"}}>
              <th style={{textAlign:"left", padding:"4px 2px", fontWeight:500}}>Lag</th>
              <th style={{textAlign:"center", padding:"4px 4px"}}>S</th>
              <th style={{textAlign:"center", padding:"4px 4px"}}>V</th>
              <th style={{textAlign:"center", padding:"4px 4px"}}>O</th>
              <th style={{textAlign:"center", padding:"4px 4px"}}>F</th>
              <th style={{textAlign:"center", padding:"4px 4px"}}>+/-</th>
              <th style={{textAlign:"center", padding:"4px 4px", fontWeight:700, color:"#93c5fd"}}>P</th>
            </tr>
          </thead>
          <tbody>
            {data.table.map(([name, s], i) => (
              <tr key={name} style={{
                borderBottom:"1px solid #0f172a",
                background: i < 2 ? "rgba(74,222,128,0.06)" : i === 2 ? "rgba(251,191,36,0.06)" : "transparent"
              }}>
                <td style={{padding:"5px 2px", color: i<2?"#4ade80":i===2?"#fbbf24":"#94a3b8"}}>
                  {f(name)} {name}
                </td>
                <td style={{textAlign:"center", color:"#64748b"}}>{s.p}</td>
                <td style={{textAlign:"center", color:"#94a3b8"}}>{s.w}</td>
                <td style={{textAlign:"center", color:"#94a3b8"}}>{s.d}</td>
                <td style={{textAlign:"center", color:"#94a3b8"}}>{s.l}</td>
                <td style={{textAlign:"center", color: (s.gf-s.ga)>0?"#4ade80":(s.gf-s.ga)<0?"#f87171":"#64748b"}}>
                  {s.gf-s.ga > 0 ? "+" : ""}{s.gf-s.ga}
                </td>
                <td style={{textAlign:"center", fontWeight:700, color:"#f8fafc"}}>{s.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {open && (
          <div style={{marginTop:10}}>
            {data.matches.map((m,i) => (
              <MatchRow key={i} {...m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VMSim() {
  const [result, setResult] = useState(null);
  const [host, setHost] = useState("USA");
  const [tab, setTab] = useState("groups");
  const [medals, setMedals] = useState(null);
  const [simming, setSimming] = useState(false);

  const simulate = useCallback(() => {
    setResult(runSim(host));
    setTab("groups");
    setMedals(null);
  }, [host]);

  const simMany = useCallback((n) => {
    setSimming(true);
    setTimeout(() => {
      const c = {};
      ALL_TEAMS.forEach(t => c[t] = {gold:0,silver:0,bronze:0,fourth:0});
      for (let i = 0; i < n; i++) {
        const r = runSim(host);
        const {winner,runnerUp,third,fourth} = r.knockout;
        if (winner) c[winner].gold++;
        if (runnerUp) c[runnerUp].silver++;
        if (third) c[third].bronze++;
        if (fourth) c[fourth].fourth++;
      }
      const sorted = Object.entries(c)
        .filter(([,v]) => v.gold+v.silver+v.bronze > 0)
        .sort((a,b) => {
          if (b[1].gold !== a[1].gold) return b[1].gold - a[1].gold;
          if (b[1].silver !== a[1].silver) return b[1].silver - a[1].silver;
          return b[1].bronze - a[1].bronze;
        });
      setMedals({table:sorted, n});
      setTab("medals");
      setSimming(false);
    }, 50);
  }, [host]);

  const ko = result?.knockout;

  return (
    <div style={{
      minHeight:"100vh", background:"#020817", color:"#f8fafc",
      fontFamily:"'Segoe UI', system-ui, sans-serif", padding:"0 0 60px"
    }}>
      {/* Header */}
      <div style={{
        background:"linear-gradient(135deg, #0a1628 0%, #0f2a4a 100%)",
        borderBottom:"1px solid #1e3a5f", padding:"20px 16px 16px",
        textAlign:"center"
      }}>
        <div style={{fontSize:32, marginBottom:4}}>⚽</div>
        <h1 style={{margin:0, fontSize:20, fontWeight:800, color:"#f8fafc", letterSpacing:2}}>
          VM 2026 SIMULATOR
        </h1>
        <p style={{margin:"4px 0 0", color:"#64748b", fontSize:12}}>
          Illustrativa grupper — uppdatera med verkliga lottningsresultat
        </p>
      </div>

      {/* Controls */}
      <div style={{
        display:"flex", gap:10, alignItems:"center", flexWrap:"wrap",
        padding:"14px 16px", background:"#0a1628", borderBottom:"1px solid #1e293b"
      }}>
        <div style={{display:"flex", alignItems:"center", gap:8}}>
          <span style={{fontSize:12, color:"#64748b", fontWeight:500}}>🏟 Värdland:</span>
          <select
            value={host}
            onChange={e => setHost(e.target.value)}
            style={{
              background:"#1e293b", border:"1px solid #334155", borderRadius:6,
              color:"#f8fafc", padding:"5px 8px", fontSize:13
            }}
          >
            {ALL_TEAMS.sort().map(t => (
              <option key={t} value={t}>{f(t)} {t}</option>
            ))}
          </select>
        </div>
        <button
          onClick={simulate}
          style={{
            marginLeft:"auto", background:"#16a34a", color:"#fff",
            border:"none", borderRadius:8, padding:"9px 20px",
            fontWeight:700, fontSize:14, cursor:"pointer", letterSpacing:0.5
          }}
        >
          ▶ Simulera VM
        </button>
      </div>

      {/* Content */}
      <div style={{maxWidth:700, margin:"0 auto", padding:"0 12px"}}>
        {!result && (
          <div style={{textAlign:"center", padding:"60px 20px", color:"#334155"}}>
            <div style={{fontSize:60, marginBottom:16}}>🏆</div>
            <p style={{fontSize:16, color:"#475569"}}>Välj värdland och klicka <strong style={{color:"#4ade80"}}>Simulera VM</strong></p>
            <p style={{fontSize:13}}>Du ser hela turneringen — gruppspel, slutspel och målskyttar</p>
          </div>
        )}

        {result && (
          <>
            {/* Tabs */}
            <div style={{display:"flex", gap:0, borderBottom:"1px solid #1e293b", marginTop:16}}>
              {[
                {id:"groups", label:"Gruppspel"},
                {id:"knockout", label:"Slutspel"},
                {id:"medals", label:"Medaljliga"},
              ].map(({id,label}) => (
                <button key={id} onClick={() => setTab(id)} style={{
                  background:"transparent", border:"none", cursor:"pointer",
                  padding:"10px 16px", fontSize:13, fontWeight:600,
                  color: tab===id ? "#4ade80" : "#64748b",
                  borderBottom: tab===id ? "2px solid #4ade80" : "2px solid transparent",
                  marginBottom:-1, transition:"all 0.15s"
                }}>
                  {label}
                </button>
              ))}
            </div>

            {/* GROUPS TAB */}
            {tab === "groups" && (
              <div style={{marginTop:16}}>
                <p style={{fontSize:11, color:"#334155", marginBottom:12}}>
                  🟢 Vidare direkt &nbsp; 🟡 Möjlig trea &nbsp; Klicka på en grupp för matcher + målskyttar
                </p>
                {Object.entries(result.groups).map(([letter, data]) => (
                  <GroupCard key={letter} letter={letter} data={data} />
                ))}
              </div>
            )}

            {/* KNOCKOUT TAB */}
            {tab === "knockout" && (
              <div style={{marginTop:16}}>
                {/* Podium */}
                <div style={{
                  background:"linear-gradient(135deg, #0a2218 0%, #0a1628 100%)",
                  border:"1px solid #166534", borderRadius:10, padding:16,
                  textAlign:"center", marginBottom:20
                }}>
                  <div style={{fontSize:13, color:"#4ade80", fontWeight:700, letterSpacing:2, marginBottom:12}}>
                    SLUTRESULTAT
                  </div>
                  <div style={{display:"flex", justifyContent:"center", gap:24, flexWrap:"wrap"}}>
                    {[
                      {medal:"🥇", label:"Mästare", name:ko.winner, color:"#fbbf24"},
                      {medal:"🥈", label:"Tvåa", name:ko.runnerUp, color:"#94a3b8"},
                      {medal:"🥉", label:"Trea", name:ko.third, color:"#cd7c3a"},
                    ].map(({medal,label,name,color}) => name && (
                      <div key={medal}>
                        <div style={{fontSize:28}}>{medal}</div>
                        <div style={{fontSize:11, color:"#475569", marginTop:2}}>{label}</div>
                        <div style={{fontSize:14, fontWeight:700, color, marginTop:2}}>
                          {f(name)} {name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rounds */}
                {ko.rounds.map((round, i) => (
                  <div key={i} style={{marginBottom:16}}>
                    <div style={{
                      fontSize:11, fontWeight:700, color:"#3b82f6",
                      letterSpacing:2, marginBottom:8, textTransform:"uppercase"
                    }}>
                      {round.name}
                    </div>
                    <div style={{border:"1px solid #1e293b", borderRadius:8, overflow:"hidden", background:"#0f172a"}}>
                      {round.matches.map((m,j) => (
                        <MatchRow key={j} {...m} ko={true} />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Bronsmatch */}
                {ko.thirdMatch && (
                  <div style={{marginBottom:16}}>
                    <div style={{
                      fontSize:11, fontWeight:700, color:"#cd7c3a",
                      letterSpacing:2, marginBottom:8
                    }}>
                      BRONSMATCH
                    </div>
                    <div style={{border:"1px solid #1e293b", borderRadius:8, overflow:"hidden", background:"#0f172a"}}>
                      <MatchRow {...ko.thirdMatch} ko={true} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MEDALS TAB */}
            {tab === "medals" && (
              <div style={{marginTop:16}}>
                <p style={{fontSize:13, color:"#64748b", marginBottom:12}}>
                  Simulera flera VM för att se sannolikheter per nation.
                </p>
                <div style={{display:"flex", gap:10, marginBottom:16}}>
                  {[100, 1000].map(n => (
                    <button
                      key={n}
                      onClick={() => simMany(n)}
                      disabled={simming}
                      style={{
                        background: n===100 ? "#1d4ed8" : "#7c3aed",
                        color:"#fff", border:"none", borderRadius:8,
                        padding:"9px 18px", fontWeight:700, fontSize:13,
                        cursor:simming?"not-allowed":"pointer",
                        opacity:simming?0.6:1
                      }}
                    >
                      Simulera {n}×
                    </button>
                  ))}
                  {simming && (
                    <span style={{color:"#64748b", fontSize:13, alignSelf:"center"}}>Kör simuleringar…</span>
                  )}
                </div>

                {medals && (
                  <>
                    <p style={{fontSize:12, color:"#475569", marginBottom:8}}>
                      Baserat på {medals.n} simuleringar — värdland: {f(host)} {host} (+5 rating)
                    </p>
                    <table style={{width:"100%", fontSize:13, borderCollapse:"collapse"}}>
                      <thead>
                        <tr style={{color:"#475569", borderBottom:"1px solid #1e293b", fontSize:11}}>
                          <th style={{textAlign:"left", padding:"6px 4px"}}>#</th>
                          <th style={{textAlign:"left", padding:"6px 4px"}}>Lag</th>
                          <th style={{textAlign:"center"}}>🥇 Guld</th>
                          <th style={{textAlign:"center"}}>🥈 Silver</th>
                          <th style={{textAlign:"center"}}>🥉 Brons</th>
                          <th style={{textAlign:"center", color:"#334155"}}>4:a</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medals.table.map(([name, s], i) => (
                          <tr key={name} style={{borderBottom:"1px solid #0f172a"}}>
                            <td style={{padding:"6px 4px", color:"#334155", fontSize:11}}>{i+1}</td>
                            <td style={{padding:"6px 4px", color:"#cbd5e1"}}>{f(name)} {name}</td>
                            <td style={{textAlign:"center", color:"#fbbf24", fontWeight:s.gold>0?700:400}}>
                              {s.gold > 0
                                ? `${s.gold} (${(s.gold/medals.n*100).toFixed(1)}%)`
                                : "–"}
                            </td>
                            <td style={{textAlign:"center", color:"#94a3b8"}}>
                              {s.silver > 0 ? `${s.silver}` : "–"}
                            </td>
                            <td style={{textAlign:"center", color:"#cd7c3a"}}>
                              {s.bronze > 0 ? `${s.bronze}` : "–"}
                            </td>
                            <td style={{textAlign:"center", color:"#334155"}}>
                              {s.fourth > 0 ? s.fourth : "–"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
                {!medals && !simming && (
                  <p style={{color:"#334155", fontSize:13}}>Klicka på en knapp ovan för att starta.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
