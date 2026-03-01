const customers = document.querySelector('.customers');
const slides = document.querySelectorAll('.customer');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let index = 0;
function showSlide(){
    customers.style.transform = `translateX(-${index * 100}%)`;
    updateButtons();
}
prevBtn.disabled = true;
prevBtn.style.opacity = "0.4";
prevBtn.style.cursor = "not-allowed";
function updateButtons(){
    if(index === 0){
        prevBtn.disabled = true;
        
    }else{
        prevBtn.disabled = false;
        prevBtn.style.opacity = "1";
        prevBtn.style.cursor = "pointer";
    }

    if(index === slides.length - 1){
        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.4";
        nextBtn.style.cursor = "not-allowed";
    }else{
        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";
    }
}

nextBtn.onclick = () => {
    if(index < slides.length - 1){
        index++;
        showSlide();
    }
}

prevBtn.onclick = () => {
    if(index > 0){
        index--;
        showSlide();
    }
}
