const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
let modulePromise;
function get3D(){ if(!modulePromise) modulePromise=import(THREE_URL).catch(()=>null); return modulePromise; }

export class Motion3D {
  constructor(){ this.host=null; this.renderer=null; this.scene=null; this.camera=null; this.frame=null; this.resizeObserver=null; this.targets=[]; this.id=0; this.mode=''; this.t0=0; this.step=0; }
  async mount(host){
    this.dispose();
    if(!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.body.classList.contains('reduced-motion')) return;
    const token=++this.id; const T=await get3D();
    if(token!==this.id || !T || !host.isConnected) return;
    try{
      this.host=host; this.mode=host.dataset.three||'hero';
      const renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7)); renderer.setClearColor(0,0); renderer.outputColorSpace=T.SRGBColorSpace;
      this.renderer=renderer; host.appendChild(renderer.domElement); host.classList.add('three-ready'); host.parentElement?.classList.add('has-three');
      this.scene=new T.Scene(); this.scene.fog=new T.FogExp2(0x091624,0.03);
      this.camera=new T.PerspectiveCamera(42,1,.1,100); this.camera.position.set(0,0,10);
      this.scene.add(new T.AmbientLight(0xffffff,1.15));
      const key=new T.DirectionalLight(0xffe1b0,3.7); key.position.set(-4,5,8); this.scene.add(key);
      const fill=new T.PointLight(0x2fa3ff,18,20); fill.position.set(4,-2,5); this.scene.add(fill);
      const rim=new T.PointLight(0xdca65c,24,30); rim.position.set(-4,-1,5); this.scene.add(rim);
      switch(this.mode){
        case 'hero': this.hero(T); break;
        case 'pin': this.pin(T); break;
        case 'celebration': this.celebration(T); break;
        case 'chaos': this.chaos(T); break;
        case 'nodes': this.nodes(T); break;
        case 'skyline': this.skyline(T); break;
        case 'phone': this.phone(T); break;
        case 'chart': this.chart(T); break;
        case 'metrics': this.metrics(T); break;
        case 'network': this.network(T); break;
        case 'shield': this.shield(T); break;
        case 'compare': this.compare(T); break;
        case 'rings': this.rings(T); break;
        case 'pricing': this.pricing(T); break;
        case 'roadmap': this.roadmap(T); break;
        case 'decision': this.decision(T); break;
        default: this.hero(T); break;
      }
      this.resizeObserver=new ResizeObserver(()=>this.resize()); this.resizeObserver.observe(host); this.resize(); this.t0=performance.now(); this.tick();
    }catch(e){ console.warn('Three.js indisponível',e); this.dispose(); }
  }
  addPoints(T,count=100,spread=6,color=0xdba760,size=.045){
    const pos=[]; for(let i=0;i<count;i++) pos.push((Math.random()-.5)*spread,(Math.random()-.5)*spread,(Math.random()-.5)*spread);
    const geo=new T.BufferGeometry(); geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));
    const mat=new T.PointsMaterial({color,size,transparent:true,opacity:.8}); const pts=new T.Points(geo,mat); this.scene.add(pts); return pts;
  }
  pinShape(T,scale=1){
    const s=new T.Shape(); s.moveTo(0,-1.86); s.bezierCurveTo(-.4,-1.42,-1.6,-.31,-1.48,.85); s.bezierCurveTo(-1.33,1.94,-.61,2.27,0,2.27); s.bezierCurveTo(.8,2.27,1.45,1.53,1.48,.7); s.bezierCurveTo(1.5,-.53,.36,-1.59,0,-1.86);
    const hole=new T.Path(); hole.absellipse(0,.81,.49,.64,0,Math.PI*2,false); s.holes.push(hole);
    const geo=new T.ExtrudeGeometry(s,{depth:.35,steps:1,bevelEnabled:true,bevelThickness:.09,bevelSize:.07,bevelSegments:3,curveSegments:48}); geo.center();
    const mesh=new T.Mesh(geo,new T.MeshStandardMaterial({color:0xdba760,metalness:.72,roughness:.22,emissive:0x291504,emissiveIntensity:.12})); mesh.scale.setScalar(scale); return mesh;
  }
  hero(T){ const pin=this.pinShape(T,1.1); pin.rotation.set(-.16,-.48,-.07); this.scene.add(pin); const ring1=new T.Mesh(new T.TorusGeometry(2.4,.04,18,120),new T.MeshStandardMaterial({color:0x6ab7ff,metalness:.4,roughness:.3})); ring1.rotation.x=1.05; const ring2=ring1.clone(); ring2.rotation.y=.85; ring2.scale.setScalar(.72); this.scene.add(ring1,ring2); const stars=this.addPoints(T,140,8,0xffdcb3,.05); this.targets.push({kind:'hero',pin,rings:[ring1,ring2],stars}); this.camera.position.set(0,.1,8.5); }
  pin(T){ const pin=this.pinShape(T,.9); pin.rotation.set(-.1,-.35,-.04); this.scene.add(pin); const halo=new T.Mesh(new T.TorusGeometry(2.1,.03,12,96),new T.MeshStandardMaterial({color:0xdca65c,transparent:true,opacity:.7})); halo.rotation.x=1.2; this.scene.add(halo); this.targets.push({kind:'pin',pin,halo}); this.camera.position.set(0,.2,8.4); }
  celebration(T){ const pin=this.pinShape(T,1); pin.rotation.set(-.12,-.45,-.03); const stars=[]; this.scene.add(pin); for(let i=0;i<22;i++){ const m=new T.Mesh(new T.TetrahedronGeometry(.12+Math.random()*.07),new T.MeshStandardMaterial({color:i%2?0xdba760:0x4bb3ff,metalness:.55,roughness:.3})); m.position.set((Math.random()-.5)*5,(Math.random()-.5)*4,(Math.random()-.5)*2); this.scene.add(m); stars.push(m); } const ring=new T.Mesh(new T.TorusGeometry(2.5,.05,16,100),new T.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.7})); ring.rotation.x=1.05; this.scene.add(ring); this.targets.push({kind:'celebration',pin,ring,stars}); this.camera.position.set(0,.2,8.7); }
  chaos(T){ const group=new T.Group(); const cards=[]; for(let i=0;i<16;i++){ const g=new T.BoxGeometry(.8,.48,.06); const m=new T.MeshStandardMaterial({color:i%4===0?0xdba760:0x1e4d72,metalness:.45,roughness:.34}); const box=new T.Mesh(g,m); box.position.set((Math.random()-.5)*5,(Math.random()-.5)*3,(Math.random()-.5)*2); box.rotation.set(Math.random()*2,Math.random()*2,Math.random()*2); group.add(box); cards.push(box);} const particles=this.addPoints(T,90,6,0xffd8a4,.04); this.scene.add(group); this.targets.push({kind:'chaos',group,cards,particles}); this.camera.position.z=8.8; }
  nodes(T){ const group=new T.Group(), boxes=[]; for(let i=0;i<5;i++){ const geo=new T.BoxGeometry(1.26,.82,.28); const node=new T.Mesh(geo,new T.MeshStandardMaterial({color:i===0?0xdba760:0x224662,metalness:.46,roughness:.35})); node.position.set((i-2)*1.74,0,0); group.add(node); boxes.push(node); const edge=new T.LineSegments(new T.EdgesGeometry(geo),new T.LineBasicMaterial({color:0xdba760,transparent:true,opacity:.55})); node.add(edge); if(i<4){ const tube=new T.Mesh(new T.CylinderGeometry(.035,.035,.52,10),new T.MeshStandardMaterial({color:0xb58d58})); tube.rotation.z=-Math.PI/2; tube.position.set((i-2)*1.74+.88,0,0); group.add(tube); } }
    const orb=new T.Mesh(new T.SphereGeometry(.2,24,24),new T.MeshStandardMaterial({color:0xffe0a2,emissive:0xbd762e,emissiveIntensity:.5})); orb.position.set(-3.48,1,.2); group.add(orb);
    const base=this.addPoints(T,60,5,0x78c6ff,.03); this.scene.add(group); this.targets.push({kind:'nodes',group,boxes,orb,base}); this.camera.position.set(0,.8,10); this.camera.lookAt(0,0,0); }
  skyline(T){ const group=new T.Group(), buildings=[], pins=[]; for(let i=0;i<8;i++){ const h=.8+Math.random()*2.4; const b=new T.Mesh(new T.BoxGeometry(.55,h,.55),new T.MeshStandardMaterial({color:i%3===0?0xdba760:0x1c4463,metalness:.42,roughness:.38})); b.position.set((i-3.5)*.8,h/2-1.8,(Math.random()-.5)*.8); group.add(b); buildings.push(b); if(i%3===0){ const p=new T.Mesh(new T.ConeGeometry(.14,.38,16),new T.MeshStandardMaterial({color:0xffd08b,emissive:0x8c4f11,emissiveIntensity:.2})); p.position.set(b.position.x,h/2-.9,b.position.z); group.add(p); pins.push(p);} }
    const floor=new T.Mesh(new T.CircleGeometry(3.4,48),new T.MeshStandardMaterial({color:0x0c2438,transparent:true,opacity:.45})); floor.rotation.x=-Math.PI/2; floor.position.y=-1.9; group.add(floor); const stars=this.addPoints(T,70,7,0x74b5ff,.035); this.scene.add(group); this.targets.push({kind:'skyline',group,buildings,pins,stars}); this.camera.position.set(0,.4,8.5); }
  phone(T){ const group=new T.Group(); const phone=new T.Mesh(new T.BoxGeometry(1.25,2.25,.17),new T.MeshStandardMaterial({color:0x102e48,metalness:.7,roughness:.26})); group.add(phone); const screen=new T.Mesh(new T.PlaneGeometry(1.02,2),new T.MeshStandardMaterial({color:0x1a4162,emissive:0x0f2940,emissiveIntensity:.18})); screen.position.z=.091; phone.add(screen); const cards=[]; for(let i=0;i<3;i++){ const c=new T.Mesh(new T.BoxGeometry(1.15,.3,.05),new T.MeshStandardMaterial({color:i===0?0xdba760:0xe9f0f7,metalness:.3,roughness:.4})); c.position.set(1.1, .7-i*.6, .2+i*.12); group.add(c); cards.push(c);} this.scene.add(group); this.targets.push({kind:'phone',group,phone,cards}); this.camera.position.set(0,.1,7.1); }
  chart(T){ const group=new T.Group(), bars=[]; for(let i=0;i<7;i++){ const h=.9+Math.abs(Math.sin(i*.85))*2; const mesh=new T.Mesh(new T.BoxGeometry(.56,h,.56),new T.MeshStandardMaterial({color:i===4?0xe0ab68:0x326181,metalness:.55,roughness:.4})); mesh.position.set((i-3)*.9,h/2-1.4,0); group.add(mesh); bars.push(mesh);} const ring=new T.Mesh(new T.TorusGeometry(2.2,.04,12,90),new T.MeshStandardMaterial({color:0x79c8ff,transparent:true,opacity:.8})); ring.rotation.x=1.15; group.add(ring); this.scene.add(group); this.targets.push({kind:'chart',group,bars,ring}); this.camera.position.z=9.5; }
  metrics(T){ const group=new T.Group(), bars=[]; const sphere=new T.Mesh(new T.IcosahedronGeometry(.8,1),new T.MeshStandardMaterial({color:0xdba760,metalness:.72,roughness:.22})); group.add(sphere); for(let i=0;i<6;i++){ const h=.7+Math.random()*1.5; const b=new T.Mesh(new T.BoxGeometry(.22,h,.22),new T.MeshStandardMaterial({color:0x6dbdff,metalness:.4,roughness:.35})); const a=i/6*Math.PI*2; b.position.set(Math.cos(a)*2,h/2-1.1,Math.sin(a)*2); group.add(b); bars.push(b); } const ring=new T.Mesh(new T.TorusKnotGeometry(1.5,.04,80,10),new T.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.55})); group.add(ring); this.scene.add(group); this.targets.push({kind:'metrics',group,sphere,bars,ring}); this.camera.position.set(0,.1,7.8); }
  network(T){ const nodes=[], pos=[]; for(let i=0;i<12;i++){ pos.push((Math.random()-.5)*4.5,(Math.random()-.5)*2.8,(Math.random()-.5)*1.8);} const group=new T.Group(); for(let i=0;i<12;i++){ const n=new T.Mesh(new T.SphereGeometry(.12,18,18),new T.MeshStandardMaterial({color:i%4===0?0xdba760:0x89d1ff,emissive:0x264d6b,emissiveIntensity:.15})); n.position.fromArray(pos,i*3); group.add(n); nodes.push(n); }
    const linePos=[]; for(let i=0;i<11;i++){ linePos.push(...pos.slice(i*3,i*3+3), ...pos.slice((i+1)*3,(i+1)*3+3)); }
    const g=new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(linePos,3)); const lines=new T.LineSegments(g,new T.LineBasicMaterial({color:0xd4a565,transparent:true,opacity:.6})); group.add(lines); const ring=new T.Mesh(new T.TorusGeometry(2.15,.04,14,100),new T.MeshStandardMaterial({color:0x234f78,transparent:true,opacity:.75})); ring.rotation.y=.8; group.add(ring); this.scene.add(group); this.targets.push({kind:'network',group,nodes,lines,ring}); this.camera.position.set(0,.1,7.6); }
  shield(T){ const shape=new T.Shape(); shape.moveTo(0,1.6); shape.lineTo(1.15,.95); shape.lineTo(1.0,-.5); shape.lineTo(0,-1.7); shape.lineTo(-1.0,-.5); shape.lineTo(-1.15,.95); shape.lineTo(0,1.6); const geo=new T.ExtrudeGeometry(shape,{depth:.25,bevelEnabled:true,bevelSize:.06,bevelThickness:.08,curveSegments:12}); geo.center(); const mesh=new T.Mesh(geo,new T.MeshStandardMaterial({color:0xdba760,metalness:.7,roughness:.25})); const check=new T.Mesh(new T.TorusGeometry(.65,.06,12,80,Math.PI*1.2),new T.MeshStandardMaterial({color:0x9ee0ff,metalness:.4,roughness:.35})); check.rotation.set(.2,0,.7); check.position.set(.05,-.1,.25); this.scene.add(mesh,check); const ring=new T.Mesh(new T.TorusGeometry(2.4,.04,14,100),new T.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.35})); ring.rotation.x=1.2; this.scene.add(ring); this.targets.push({kind:'shield',mesh,check,ring}); this.camera.position.set(0,.1,8.4); }
  compare(T){ const group=new T.Group(), left=[], right=[], chips=[]; for(let i=0;i<3;i++){ const l=new T.Mesh(new T.BoxGeometry(.6,.6+.35*i,.6),new T.MeshStandardMaterial({color:0x305f80,metalness:.5,roughness:.35})); l.position.set(-1.8,-1+i*.55,0); group.add(l); left.push(l); const r=new T.Mesh(new T.BoxGeometry(.6,.9+.4*i,.6),new T.MeshStandardMaterial({color:i===2?0xdba760:0x1e405e,metalness:.55,roughness:.33})); r.position.set(1.8,-1+i*.65,0); group.add(r); right.push(r);} for(let i=0;i<6;i++){ const c=new T.Mesh(new T.BoxGeometry(.18,.18,.18),new T.MeshStandardMaterial({color:i%2?0xe8f1f9:0x87d2ff})); c.position.set(-.8+i*.25, Math.sin(i)*.2, .35); group.add(c); chips.push(c);} this.scene.add(group); this.targets.push({kind:'compare',group,left,right,chips}); this.camera.position.z=8.2; }
  rings(T){ const group=new T.Group(); const core=new T.Mesh(new T.IcosahedronGeometry(.75,1),new T.MeshStandardMaterial({color:0xdba760,metalness:.65,roughness:.22})); group.add(core); const rings=[]; [1.2,1.7,2.2].forEach((r,i)=>{ const ring=new T.Mesh(new T.TorusGeometry(r,.05,16,100),new T.MeshStandardMaterial({color:i===1?0x74c2ff:0xffffff,transparent:true,opacity:.65})); ring.rotation.set(i*.6, i*.7,0); group.add(ring); rings.push(ring);}); this.scene.add(group); this.targets.push({kind:'rings',group,core,rings}); this.camera.position.z=7.2; }
  pricing(T){ const group=new T.Group(), cards=[]; for(let i=0;i<3;i++){ const h=1.6+i*.35; const c=new T.Mesh(new T.BoxGeometry(1,h,.18),new T.MeshStandardMaterial({color:i===1?0xdba760:0x234c6d,metalness:.52,roughness:.35})); c.position.set((i-1)*1.5,h/2-1.2,0); group.add(c); cards.push(c);} const base=new T.Mesh(new T.CylinderGeometry(3.1,3.1,.15,40),new T.MeshStandardMaterial({color:0x0f2438,transparent:true,opacity:.45})); base.position.y=-1.8; group.add(base); this.scene.add(group); this.targets.push({kind:'pricing',group,cards,base}); this.camera.position.z=8.1; }
  roadmap(T){ const group=new T.Group(); const points=[new T.Vector3(-2.5,-.7,0), new T.Vector3(-1,.2,0), new T.Vector3(.2,-.1,0), new T.Vector3(1.2,.6,0), new T.Vector3(2.4,.2,0)]; const curve=new T.CatmullRomCurve3(points); const tube=new T.Mesh(new T.TubeGeometry(curve,80,.05,10,false),new T.MeshStandardMaterial({color:0xdba760,metalness:.4,roughness:.35})); group.add(tube); const marks=[]; points.forEach((p,i)=>{ const m=new T.Mesh(new T.SphereGeometry(.16+(i===4?.06:0),18,18),new T.MeshStandardMaterial({color:i===4?0x8fd4ff:0xffffff,emissive:0x153654,emissiveIntensity:.15})); m.position.copy(p); group.add(m); marks.push(m);}); this.scene.add(group); this.targets.push({kind:'roadmap',group,tube,marks}); this.camera.position.set(0,.2,7.3); }
  decision(T){ const group=new T.Group(), cubes=[]; for(let i=0;i<4;i++){ const cube=new T.Mesh(new T.BoxGeometry(.72,.72,.72),new T.MeshStandardMaterial({color:i%2?0xdba760:0x295473,metalness:.55,roughness:.28})); const a=i/4*Math.PI*2; cube.position.set(Math.cos(a)*1.8,Math.sin(a)*.35,Math.sin(a)*1.2); group.add(cube); cubes.push(cube);} const center=new T.Mesh(new T.CylinderGeometry(.08,.08,2.8,12),new T.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.4})); center.rotation.z=Math.PI/2; group.add(center); this.scene.add(group); this.targets.push({kind:'decision',group,cubes,center}); this.camera.position.set(0,.2,7.5); }
  setStep(index){ this.step=Math.max(0,Math.min(4,index)); const n=this.targets.find(t=>t.kind==='nodes'); if(n)n.boxes.forEach((box,i)=>box.material.color.setHex(i===this.step?0xdba760:0x224662)); }
  tick(){
    if(!this.renderer) return;
    const t=(performance.now()-this.t0)/1000;
    for(const o of this.targets){
      if(o.kind==='hero'){ o.pin.rotation.y=-.45+Math.sin(t*.4)*.5; o.pin.position.y=Math.sin(t*.7)*.08; o.rings[0].rotation.z=t*.25; o.rings[1].rotation.x=t*.18; o.stars.rotation.y=t*.04; }
      if(o.kind==='pin'){ o.pin.rotation.y=-.3+Math.sin(t*.5)*.35; o.pin.position.y=Math.sin(t*.7)*.1; o.halo.rotation.z=t*.3; }
      if(o.kind==='celebration'){ o.pin.rotation.y=-.4+Math.sin(t*.4)*.45; o.ring.rotation.z=t*.35; o.stars.forEach((s,i)=>{s.rotation.x+=.01; s.rotation.y+=.015; s.position.y+=Math.sin(t*1.5+i)*.002;}); }
      if(o.kind==='chaos'){ o.group.rotation.y=Math.sin(t*.35)*.35; o.cards.forEach((c,i)=>{c.rotation.x+=.003+i*.00008; c.rotation.y+=.006; c.position.y+=Math.sin(t*1.2+i)*.0022;}); o.particles.rotation.y=t*.06; }
      if(o.kind==='nodes'){ o.group.rotation.y=Math.sin(t*.22)*.08; o.orb.position.x=-3.48+this.step*1.74; o.orb.position.y=.95+Math.sin(t*2.2)*.08; o.base.rotation.y=t*.04; }
      if(o.kind==='skyline'){ o.group.rotation.y=Math.sin(t*.18)*.18; o.pins.forEach((p,i)=>p.position.y+=Math.sin(t*1.8+i)*.002); o.stars.rotation.y=t*.05; }
      if(o.kind==='phone'){ o.group.rotation.y=-.22+Math.sin(t*.5)*.18; o.phone.position.y=Math.sin(t*.9)*.09; o.cards.forEach((c,i)=>{c.position.x=.95+Math.sin(t*1.4+i)*.18; c.rotation.z=Math.sin(t*1.1+i)*.08;}); }
      if(o.kind==='chart'){ o.group.rotation.y=Math.sin(t*.28)*.15; o.bars.forEach((b,i)=>b.scale.y=.9+Math.abs(Math.sin(t*1.1+i*.35))*.25); o.ring.rotation.z=t*.4; }
      if(o.kind==='metrics'){ o.group.rotation.y=t*.18; o.sphere.rotation.x+=.01; o.sphere.rotation.y+=.012; o.bars.forEach((b,i)=>b.scale.y=.9+Math.abs(Math.sin(t*1.6+i))*.3); o.ring.rotation.z=t*.28; }
      if(o.kind==='network'){ o.group.rotation.y=Math.sin(t*.3)*.28; o.group.rotation.x=Math.cos(t*.22)*.1; o.nodes.forEach((n,i)=>n.position.y+=Math.sin(t*1.3+i)*.0016); o.ring.rotation.y=t*.3; }
      if(o.kind==='shield'){ o.mesh.rotation.y=Math.sin(t*.45)*.22; o.check.rotation.z=.7+Math.sin(t)*.05; o.ring.rotation.z=t*.25; }
      if(o.kind==='compare'){ o.group.rotation.y=Math.sin(t*.25)*.16; o.chips.forEach((c,i)=>{c.position.x=-.7+((t*.55+i*.18)%2.4); c.position.y=Math.sin(t*1.8+i)*.16;}); }
      if(o.kind==='rings'){ o.group.rotation.y=t*.18; o.core.rotation.x+=.008; o.core.rotation.y+=.01; o.rings.forEach((r,i)=>r.rotation[(i%2)?'x':'z']+=.003+i*.001); }
      if(o.kind==='pricing'){ o.group.rotation.y=Math.sin(t*.2)*.12; o.cards.forEach((c,i)=>c.position.y=(c.geometry.parameters.height/2-1.2)+Math.sin(t*1.1+i)*.04); }
      if(o.kind==='roadmap'){ o.group.rotation.y=Math.sin(t*.18)*.12; o.marks.forEach((m,i)=>m.scale.setScalar(1+Math.abs(Math.sin(t*1.5+i))*.18)); }
      if(o.kind==='decision'){ o.group.rotation.y=t*.16; o.cubes.forEach((c,i)=>{c.rotation.x+=.007; c.rotation.y+=.009; c.position.y=Math.sin(t*1.3+i)*.18;}); o.center.rotation.y=t*.24; }
    }
    this.renderer.render(this.scene,this.camera); this.frame=requestAnimationFrame(()=>this.tick());
  }
  resize(){ if(!this.host||!this.renderer)return; const w=Math.max(1,this.host.clientWidth),h=Math.max(1,this.host.clientHeight); this.renderer.setSize(w,h,false); this.camera.aspect=w/h; this.camera.updateProjectionMatrix(); }
  dispose(){ this.id++; if(this.frame) cancelAnimationFrame(this.frame); this.frame=null; if(this.resizeObserver) this.resizeObserver.disconnect(); this.resizeObserver=null; if(this.scene){ this.scene.traverse(obj=>{ obj.geometry?.dispose?.(); if(obj.material){ (Array.isArray(obj.material)?obj.material:[obj.material]).forEach(m=>m.dispose?.()); } }); } if(this.renderer){ this.renderer.dispose(); this.renderer.domElement.remove(); try{ this.renderer.forceContextLoss(); }catch(e){} } this.host?.classList.remove('three-ready'); this.host?.parentElement?.classList.remove('has-three'); this.host=this.renderer=this.scene=this.camera=null; this.targets=[]; }
}
