/* ─────────────────────────────
   1. CUSTOM CURSOR
───────────────────────────── */
const cDot=document.getElementById('c-dot'),cRing=document.getElementById('c-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function animC(){
  cDot.style.left=mx+'px';cDot.style.top=my+'px';
  rx+=(mx-rx)*.11;ry+=(my-ry)*.11;
  cRing.style.left=rx+'px';cRing.style.top=ry+'px';
  requestAnimationFrame(animC);
})();

/* ─────────────────────────────
   2. PROGRESS BAR
───────────────────────────── */
const pb=document.getElementById('progress-bar');
window.addEventListener('scroll',()=>{
  pb.style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';
},{passive:true});

/* ─────────────────────────────
   3. HEADER SHRINK + BACK TO TOP
───────────────────────────── */
const hdr=document.getElementById('site-hdr'),btt=document.getElementById('btt');
window.addEventListener('scroll',()=>{
  hdr.classList.toggle('scrolled',window.scrollY>80);
  btt.classList.toggle('show',window.scrollY>500);
},{passive:true});

/* ─────────────────────────────
   4. HAMBURGER
───────────────────────────── */
const hbg=document.getElementById('hbg'),nm=document.getElementById('nav-menu');
hbg.addEventListener('click',()=>{
  const o=nm.classList.toggle('open');
  hbg.classList.toggle('active',o);
  hbg.setAttribute('aria-expanded',o);
});

/* ─────────────────────────────
   5. ACTIVE NAV
───────────────────────────── */
const secs=document.querySelectorAll('section[id]');
const nls=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let c='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-150)c=s.id;});
  nls.forEach(a=>{a.classList.remove('active');if(a.getAttribute('href')==='#'+c)a.classList.add('active');});
},{passive:true});

/* ─────────────────────────────
   6. TYPED TEXT
───────────────────────────── */
const roles=['Full Stack Web Apps','React Frontends','Node.js Backends','Android Apps in Kotlin','C++ Solutions','Python Scripts','MERN Stacks'];
let ri=0,ci=0,del=false;
const tel=document.getElementById('typed');
function typeIt(){
  const w=roles[ri];
  tel.textContent=del?w.slice(0,ci--):w.slice(0,ci++);
  if(!del&&ci===w.length+1){del=true;setTimeout(typeIt,1900);return;}
  if(del&&ci===0){del=false;ri=(ri+1)%roles.length;}
  setTimeout(typeIt,del?50:85);
}
typeIt();

/* ─────────────────────────────
   7. SCROLL REVEAL
───────────────────────────── */
const revEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');revIO.unobserve(e.target);}});
},{threshold:.1});
revEls.forEach(el=>revIO.observe(el));

/* ─────────────────────────────
   8. SKILL BARS
───────────────────────────── */
const bars=document.querySelectorAll('.sbar-wrap');
const barIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const f=e.target.querySelector('.sbar-fill');
      setTimeout(()=>{f.style.width=e.target.dataset.pct+'%';},200);
      barIO.unobserve(e.target);
    }
  });
},{threshold:.5});
bars.forEach(b=>barIO.observe(b));

/* ─────────────────────────────
   9. 3D TILT ON PROJECT CARDS
───────────────────────────── */
document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*22;
    const y=-((e.clientY-r.top)/r.height-.5)*22;
    card.style.transform=`perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateZ(12px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)';
  });
});

/* ─────────────────────────────
   10. 3D TILT ON ABOUT PHOTO
───────────────────────────── */
const aboutFrame=document.getElementById('about-frame');
const aboutTilt=document.getElementById('about-tilt');
if(aboutTilt){
  aboutTilt.addEventListener('mousemove',e=>{
    const r=aboutTilt.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*18;
    const y=-((e.clientY-r.top)/r.height-.5)*18;
    aboutFrame.style.transform=`perspective(900px) rotateY(${x}deg) rotateX(${y}deg)`;
  });
  aboutTilt.addEventListener('mouseleave',()=>{
    aboutFrame.style.transform='perspective(900px) rotateY(0deg) rotateX(0deg)';
  });
}

/* ─────────────────────────────
   11. CONTACT FORM
───────────────────────────── */
function handleForm(e){
  e.preventDefault();
  const btn=document.getElementById('send-btn'),txt=document.getElementById('send-txt');
  btn.disabled=true;txt.textContent='SENDING…';
  setTimeout(()=>{
    txt.textContent='✓ SENT!';btn.style.background='linear-gradient(135deg,#34d399,#059669)';
    document.getElementById('cform').reset();
    setTimeout(()=>{txt.textContent='SEND MESSAGE ✦';btn.style.background='';btn.disabled=false;},3000);
  },1500);
}

/* ══════════════════════════════════════════
   12. THREE.JS — GLOBAL PARTICLE BACKGROUND
══════════════════════════════════════════ */
(function initBgScene(){
  const canvas=document.getElementById('bg-canvas');
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
  renderer.setSize(window.innerWidth,window.innerHeight);

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1000);
  camera.position.z=3;

  /* Particle field */
  const count=1800;
  const geo=new THREE.BufferGeometry();
  const positions=new Float32Array(count*3);
  const colors=new Float32Array(count*3);
  const sizes=new Float32Array(count);

  for(let i=0;i<count;i++){
    positions[i*3]=(Math.random()-.5)*20;
    positions[i*3+1]=(Math.random()-.5)*20;
    positions[i*3+2]=(Math.random()-.5)*12;
    const r=Math.random();
    if(r<.5){colors[i*3]=0;colors[i*3+1]=.94;colors[i*3+2]=1;}       // cyan
    else if(r<.75){colors[i*3]=1;colors[i*3+1]=.24;colors[i*3+2]=.67;} // pink
    else{colors[i*3]=.48;colors[i*3+1]=.37;colors[i*3+2]=.65;}          // purple
    sizes[i]=Math.random()*.8+.2;
  }

  geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  geo.setAttribute('size',new THREE.BufferAttribute(sizes,1));

  const mat=new THREE.PointsMaterial({size:.045,vertexColors:true,transparent:true,opacity:.65,sizeAttenuation:true});
  const pts=new THREE.Points(geo,mat);
  scene.add(pts);

  /* Wireframe icosahedron */
  const icoGeo=new THREE.IcosahedronGeometry(2.5,1);
  const icoMat=new THREE.MeshBasicMaterial({color:0x00f0ff,wireframe:true,transparent:true,opacity:.04});
  const ico=new THREE.Mesh(icoGeo,icoMat);
  scene.add(ico);

  /* Floating torus */
  const torGeo=new THREE.TorusGeometry(1.2,.015,8,80);
  const torMat=new THREE.MeshBasicMaterial({color:0xff3cac,transparent:true,opacity:.12});
  const tor=new THREE.Mesh(torGeo,torMat);
  tor.rotation.x=Math.PI*.3;
  scene.add(tor);

  let mouseX=0,mouseY=0;
  document.addEventListener('mousemove',e=>{
    mouseX=(e.clientX/window.innerWidth-.5)*.4;
    mouseY=(e.clientY/window.innerHeight-.5)*.4;
  });

  window.addEventListener('resize',()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  });

  let t=0;
  function animate(){
    requestAnimationFrame(animate);
    t+=.004;
    pts.rotation.y+=.0005;
    pts.rotation.x+=.0002;
    ico.rotation.y=t*.15;
    ico.rotation.x=t*.08;
    tor.rotation.z=t*.06;
    camera.position.x+=(mouseX-camera.position.x)*.02;
    camera.position.y+=(-mouseY-camera.position.y)*.02;
    camera.lookAt(scene.position);
    renderer.render(scene,camera);
  }
  animate();
})();

/* ══════════════════════════════════════════
   13. THREE.JS — PROFILE RING (Hero)
══════════════════════════════════════════ */
(function initProfileScene(){
  const canvas=document.getElementById('profile-canvas');
  const w=340,h=340;
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(w,h);

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(50,1,.1,100);
  camera.position.z=4.5;

  /* Spinning torus ring */
  const torusGeo=new THREE.TorusGeometry(1.55,.025,16,120);
  const torusMat=new THREE.MeshBasicMaterial({color:0x00f0ff,transparent:true,opacity:.9});
  const torus=new THREE.Mesh(torusGeo,torusMat);
  scene.add(torus);

  /* Second ring offset */
  const torus2=new THREE.Mesh(
    new THREE.TorusGeometry(1.7,.012,8,100),
    new THREE.MeshBasicMaterial({color:0xff3cac,transparent:true,opacity:.5})
  );
  torus2.rotation.x=Math.PI*.25;
  scene.add(torus2);

  /* Third ring */
  const torus3=new THREE.Mesh(
    new THREE.TorusGeometry(1.85,.008,8,100),
    new THREE.MeshBasicMaterial({color:0xa78bfa,transparent:true,opacity:.3})
  );
  torus3.rotation.y=Math.PI*.35;
  scene.add(torus3);

  /* Orbiting dots */
  const dotGeo=new THREE.SphereGeometry(.045,8,8);
  const orbitDots=[];
  const dotColors=[0x00f0ff,0xff3cac,0xffd700,0x34d399,0xa78bfa,0xffffff];
  for(let i=0;i<6;i++){
    const dot=new THREE.Mesh(dotGeo,new THREE.MeshBasicMaterial({color:dotColors[i]}));
    scene.add(dot);
    orbitDots.push({mesh:dot,angle:(i/6)*Math.PI*2,radius:1.55+Math.random()*.15,speed:.8+Math.random()*.4,tilt:Math.random()*.6-.3});
  }

  /* Particle halo */
  const haloCount=200;
  const hGeo=new THREE.BufferGeometry();
  const hPos=new Float32Array(haloCount*3);
  for(let i=0;i<haloCount;i++){
    const ang=Math.random()*Math.PI*2;
    const rad=1.4+Math.random()*.6;
    hPos[i*3]=Math.cos(ang)*rad;
    hPos[i*3+1]=(Math.random()-.5)*.4;
    hPos[i*3+2]=Math.sin(ang)*rad;
  }
  hGeo.setAttribute('position',new THREE.BufferAttribute(hPos,3));
  const hMat=new THREE.PointsMaterial({color:0x00f0ff,size:.025,transparent:true,opacity:.4});
  scene.add(new THREE.Points(hGeo,hMat));

  let t=0,mx2=0,my2=0;
  const profileCard=document.querySelector('.profile-3d-wrap');
  if(profileCard){
    profileCard.addEventListener('mousemove',e=>{
      const r=profileCard.getBoundingClientRect();
      mx2=((e.clientX-r.left)/r.width-.5)*1.5;
      my2=-((e.clientY-r.top)/r.height-.5)*1.5;
    });
    profileCard.addEventListener('mouseleave',()=>{mx2=0;my2=0;});
  }

  function animProfile(){
    requestAnimationFrame(animProfile);
    t+=.012;
    torus.rotation.z=t;
    torus.rotation.x=Math.sin(t*.3)*.5;
    torus2.rotation.z=-t*.7;
    torus2.rotation.y=t*.4;
    torus3.rotation.x=t*.5;
    torus3.rotation.z=t*.3;
    orbitDots.forEach((d,i)=>{
      d.angle+=d.speed*.01;
      d.mesh.position.x=Math.cos(d.angle)*d.radius;
      d.mesh.position.y=Math.sin(d.angle*1.3)*d.tilt;
      d.mesh.position.z=Math.sin(d.angle)*d.radius;
    });
    scene.rotation.y+=(mx2-scene.rotation.y)*.05;
    scene.rotation.x+=(my2-scene.rotation.x)*.05;
    renderer.render(scene,camera);
  }
  animProfile();
})();

/* ══════════════════════════════════════════
   14. THREE.JS — SKILLS FLOATING GEOMETRIES
══════════════════════════════════════════ */
(function initSkillsScene(){
  const canvas=document.getElementById('skills-canvas');
  const section=document.getElementById('skills');
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false});
  renderer.setPixelRatio(1);

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(60,1,.1,100);
  camera.position.z=6;

  const shapes=[];
  const geoTypes=[
    new THREE.OctahedronGeometry(.3),
    new THREE.TetrahedronGeometry(.28),
    new THREE.IcosahedronGeometry(.25,0),
    new THREE.BoxGeometry(.35,.35,.35),
    new THREE.TorusGeometry(.22,.06,6,20),
  ];
  const shapeColors=[0x00f0ff,0xff3cac,0xa78bfa,0xffd700,0x34d399];

  for(let i=0;i<14;i++){
    const gi=i%geoTypes.length;
    const mesh=new THREE.Mesh(
      geoTypes[gi],
      new THREE.MeshBasicMaterial({color:shapeColors[gi],wireframe:true,transparent:true,opacity:.25+Math.random()*.2})
    );
    mesh.position.set((Math.random()-.5)*14,(Math.random()-.5)*8,(Math.random()-.5)*4);
    mesh.userData={rx:Math.random()*.012-.006,ry:Math.random()*.012-.006,rz:Math.random()*.008-.004,vy:(Math.random()-.5)*.003};
    scene.add(mesh);
    shapes.push(mesh);
  }

  function resize(){
    const w=section.offsetWidth,h=section.offsetHeight;
    renderer.setSize(w,h);
    camera.aspect=w/h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize',resize);

  function animSkills(){
    requestAnimationFrame(animSkills);
    shapes.forEach(m=>{
      m.rotation.x+=m.userData.rx;
      m.rotation.y+=m.userData.ry;
      m.rotation.z+=m.userData.rz;
      m.position.y+=m.userData.vy;
      if(m.position.y>5||m.position.y<-5)m.userData.vy*=-1;
    });
    renderer.render(scene,camera);
  }
  animSkills();
})();