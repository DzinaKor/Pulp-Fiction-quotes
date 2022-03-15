let dataArray = [];
const langData = {
    btn_text:{
        en: 'Push the button',
        ru: 'Нажмите на кнопку'
    }
}
const quote = document.querySelector('.quote');
const langBtn = document.querySelector('.lang_btn');
const btnPush = document.querySelector('.b_push');

const randomQuote = ()=>{
    quote.innerHTML = '';
    const q = Math.floor(Math.random() * dataArray.length);
    const QText = document.createElement('div');
    QText.classList.add('quote_text');
    if(langBtn.innerHTML === 'en')
        QText.innerHTML = dataArray[q]['text'];
    else
        QText.innerHTML = dataArray[q]['text_ru'];
    const QAuthor = document.createElement('div');
    QAuthor.classList.add('quote_author');
	if(langBtn.innerHTML === 'en')
        QAuthor.innerHTML = dataArray[q]['author'];
	else
        QAuthor.innerHTML = dataArray[q]['author_ru'];
    quote.appendChild(QText);
    quote.appendChild(QAuthor);
   // quote.innerHTML = dataArray[q]['text']
   const ShakeImg = document.querySelector('.shake-img');
   ShakeImg.classList.add('fshake-img');
   setTimeout(()=>{ 
        ShakeImg.classList.remove('fshake-img');
   }, 500);
}

const setDefaultLang = ()=>{
    const currentLang = readLS();
    if( currentLang === 'en') {
        langBtn.innerHTML = 'ru';
        toggleLang();
    }else if( currentLang === 'ru'){
        langBtn.innerHTML = 'en';
        toggleLang();
    }
}

async function getQuotes() {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    dataArray = await res.json();
    await setDefaultLang();
    await randomQuote();
    //    console.log(dataArray);
}

const readLS = ()=>{
    const lang = localStorage.getItem('DKQuotesLang');
    if(lang === undefined || lang === null)		return '';
    return lang;
}
const saveLS = (lang)=>{
    localStorage.setItem('DKQuotesLang', lang);
}

const toggleLang = ()=>{
    if(langBtn.innerHTML === 'en'){
        saveLS('ru');
        langBtn.innerHTML = 'ru';
        btnPush.innerHTML = langData.btn_text.ru;
    }else if(langBtn.innerHTML === 'ru'){
        saveLS('en');
        langBtn.innerHTML = 'en';
        btnPush.innerHTML = langData.btn_text.en;
    }
    randomQuote();
}

btnPush.addEventListener('click', event => {
    randomQuote();
});
langBtn.addEventListener('click', event => {
    toggleLang();
});

getQuotes();
