function hideAll(){
    document.querySelectorAll('section').forEach(x=>x.style.display='none');
}
export function displayCalendar(section){
    hideAll();
    section.style.display = 'block';
}