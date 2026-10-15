(() => {
const audio=document.getElementById('audio');
const tracks=[...document.querySelectorAll('.track')];
const playButton=document.getElementById('toggle');
const toast=document.getElementById('toast');
let current=-1,noticeTimer;
const timeText=value=>{if(!Number.isFinite(value))return '0:00';return Math.floor(value/60)+':'+String(Math.floor(value%60)).padStart(2,'0')};
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>toast.classList.remove('show'),2500)}
function refreshButtons(){playButton.textContent=audio.paused?'▶':'Ⅱ';playButton.setAttribute('aria-label',audio.paused?'Phát nhạc':'Tạm dừng');tracks.forEach((track,index)=>{const button=track.querySelector('.play');button.textContent=index===current&&!audio.paused?'Ⅱ':'▶'})}
function chooseTrack(index,autoplay=true){if(!tracks.length)return;current=(index+tracks.length)%tracks.length;const track=tracks[current];audio.src=track.dataset.audio;document.getElementById('nowTitle').textContent=track.dataset.title;document.getElementById('nowArtist').textContent=track.dataset.artist;document.getElementById('nowCover').src=track.querySelector('img').src;document.getElementById('seek').value=0;document.getElementById('elapsed').textContent='0:00';document.getElementById('length').textContent='0:00';if(autoplay)audio.play().then(refreshButtons).catch(()=>{refreshButtons();notify('Không thể phát bản nghe thử lúc này. Hãy thử lại nhé.')});else refreshButtons()}
function playTrack(index){if(index===current&&audio.src){if(audio.paused)audio.play().then(refreshButtons).catch(()=>notify('Không thể phát bản nghe thử lúc này.'));else audio.pause()}else chooseTrack(index,true);refreshButtons()}
tracks.forEach((track,index)=>track.querySelector('.play').addEventListener('click',()=>playTrack(index)));
playButton.addEventListener('click',()=>{if(current<0){chooseTrack(0,true);return}if(audio.paused)audio.play().then(refreshButtons).catch(()=>notify('Không thể phát bản nghe thử lúc này.'));else audio.pause()});
document.getElementById('heroPlay').addEventListener('click',()=>chooseTrack(current<0?0:current,true));
document.getElementById('playlistPlay').addEventListener('click',()=>chooseTrack(0,true));
document.getElementById('prev').addEventListener('click',()=>chooseTrack(current<=0?tracks.length-1:current-1,true));
document.getElementById('next').addEventListener('click',()=>chooseTrack(current<0?0:current+1,true));
document.getElementById('shuffle').addEventListener('click',()=>{let index=Math.floor(Math.random()*tracks.length);if(tracks.length>1&&index===current)index=(index+1)%tracks.length;chooseTrack(index,true)});
document.getElementById('volume').addEventListener('input',event=>audio.volume=Number(event.target.value));audio.volume=.75;
audio.addEventListener('play',refreshButtons);audio.addEventListener('pause',refreshButtons);audio.addEventListener('ended',()=>chooseTrack(current+1,true));
audio.addEventListener('timeupdate',()=>{document.getElementById('elapsed').textContent=timeText(audio.currentTime);document.getElementById('length').textContent=timeText(audio.duration);document.getElementById('seek').value=audio.duration?audio.currentTime/audio.duration*100:0});
document.getElementById('seek').addEventListener('input',event=>{if(audio.duration)audio.currentTime=Number(event.target.value)/100*audio.duration});
let filter='all';
function filterTracks(){const query=document.getElementById('search').value.trim().toLocaleLowerCase('vi');let count=0;tracks.forEach(track=>{const text=(track.dataset.title+' '+track.dataset.artist+' '+track.dataset.genre).toLocaleLowerCase('vi');const visible=(filter==='all'||track.dataset.genre===filter)&&text.includes(query);track.hidden=!visible;if(visible)count++});document.getElementById('empty').hidden=count>0}
document.getElementById('search').addEventListener('input',filterTracks);
document.querySelectorAll('.chip').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('.chip').forEach(chip=>chip.classList.toggle('active',chip===button));filterTracks()}));
})();
