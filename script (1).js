// reveal on scroll
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
  document.querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el));

  // count-up stats
  function countUp(el){
    const target=+el.dataset.count, suffix=el.dataset.suffix||'';
    const dur=1400, t0=performance.now();
    function tick(now){
      const p=Math.min((now-t0)/dur,1);
      const ease=1-Math.pow(1-p,3);
      el.textContent=Math.round(target*ease)+ (p===1?'':'');
      if(p<1){requestAnimationFrame(tick)} else {el.innerHTML=target+(suffix?'<small>'+suffix+'</small>':'')}
    }
    requestAnimationFrame(tick);
  }
  const sObs=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('[data-count]').forEach(countUp);sObs.unobserve(e.target)}})},{threshold:.4});
  const sb=document.getElementById('statsBand'); if(sb) sObs.observe(sb);

  // hero report animation
  const rObs=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){
    const ring=document.getElementById('ringFill'), num=document.getElementById('ringNum');
    const score=92, circ=339.3;
    ring.style.transition='stroke-dashoffset 1.5s cubic-bezier(.2,.7,.2,1)';
    ring.style.strokeDashoffset=circ-(circ*score/100);
    let t0=performance.now();
    (function tk(now){const p=Math.min((now-t0)/1500,1);num.textContent=Math.round(score*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tk)})(t0);
    document.querySelectorAll('.fill').forEach(f=>{setTimeout(()=>f.style.width=f.dataset.w+'%',200)});
    rObs.unobserve(e.target);
  }})},{threshold:.4});
  const rc=document.getElementById('reportCard'); if(rc) rObs.observe(rc);

  // faq accordion
  document.querySelectorAll('.qa .q').forEach(b=>{
    b.addEventListener('click',()=>{
      const qa=b.parentElement, a=qa.querySelector('.a'), open=qa.classList.contains('open');
      document.querySelectorAll('.qa.open').forEach(o=>{o.classList.remove('open');o.querySelector('.a').style.maxHeight=null});
      if(!open){qa.classList.add('open');a.style.maxHeight=a.scrollHeight+'px'}
    });
  });
