
// Loader
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('hide'),1900));

// Cursor
const cur=document.getElementById('cursor');
const ring=document.getElementById('cursor-ring');
document.addEventListener('mousemove',e=>{
  cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';
  ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px';
});

// Nav scroll
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>60));

// Year
document.getElementById('yr').textContent=new Date().getFullYear();

// Form
document.getElementById('sb').addEventListener('click', async () => {
  const n = document.getElementById('nm').value.trim();
  const e = document.getElementById('em').value.trim();
  const m = document.getElementById('msg').value.trim();

  const form = document.getElementById('cf');
  const ty = document.getElementById('ty');
  const err = document.getElementById('err');
  const btn = document.getElementById('sb');

  ty.style.display = 'none';
  err.style.display = 'none';

  if (!n || !e || !m) {
    err.textContent = 'Please fill in your name, email and message.';
    err.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.innerHTML = 'Sending...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        Accept: 'application/json'
      }
    });

    const result = await response.json();

    if (response.ok) {
      ty.style.display = 'block';
      form.reset();

      setTimeout(() => {
        ty.style.display = 'none';
      }, 4000);
    } else {
      err.textContent = result.errors?.map(x => x.message).join(', ') || 'Message not sent.';
      err.style.display = 'block';
    }
  } catch (error) {
    err.textContent = 'Something went wrong. Please try again.';
    err.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
  }
});

// Scroll reveal
const io=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
      io.unobserve(e.target);
    }
  });
},{threshold:0.08});

document.querySelectorAll('.exp-item,.proj-card,.bc,.ci,.stag,.pl').forEach((el,i)=>{
  el.style.opacity='0';
  el.style.transform='translateY(24px)';
  el.style.transition=`opacity 0.55s ${(i%8)*0.06}s ease, transform 0.55s ${(i%8)*0.06}s ease`;
  io.observe(el);
});
