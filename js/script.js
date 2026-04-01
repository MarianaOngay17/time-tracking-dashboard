 var dataJson;
document.addEventListener('DOMContentLoaded', async function(){

    const filterActive = document.querySelector('.active').textContent;   
    dataJson = await getData();

    asignarHoras(filterActive)
    asignarHorasPrevias(filterActive)

    const filters = document.querySelectorAll('.card__filter');   

    filters.forEach(filter => {
        filter.addEventListener('click', function(e){

            const currentfilterActive = document.querySelector('.active');   

            currentfilterActive.classList.remove('active');
            filter.classList.add('active');

            asignarHoras(filter.textContent)
            asignarHorasPrevias(filter.textContent)
        });
    });


});

//HORAS
function asignarHoras(filter){
    const cardhours = document.querySelectorAll('.card__hours');  

    cardhours.forEach(card => {

        switch(card.id){
            case 'work-hour':
                card.textContent =  getHoras("Work", filter);
                break;
            case 'play-hour':
                card.textContent =  getHoras("Play", filter);
                break;
            case 'study-hour':
                card.textContent =  getHoras("Study", filter);
                break;
            case 'exercise-hour':
                card.textContent =  getHoras("Exercise", filter);
                break;
            case 'social-hour':
                card.textContent =  getHoras("Social", filter);
                break;
            case 'selfcare-hour':
                card.textContent =  getHoras("Self Care", filter);
                break;
        }

    });

}

function getHoras(title, filter)
{
    const element = dataJson.find(item => item.title === title);
    var current;
    switch(filter){
        case 'Daily':
            current = element.timeframes.daily.current;
            break;
        case 'Weekly':
            current = element.timeframes.weekly.current;
            break;
        case 'Monthly':
            current = element.timeframes.monthly.current;
            break;
    }
    return current + "hrs";
}

//HORAS PREVIAS
function asignarHorasPrevias(filter){
    const cardlasthours = document.querySelectorAll('.card__last-hours');  

    cardlasthours.forEach(card => {

        switch(card.id){
            case 'work-last-hour':
                card.textContent =  getHorasPrevias("Work", filter);
                break;
            case 'play-last-hour':
                card.textContent =  getHorasPrevias("Play", filter);
                break;
            case 'study-last-hour':
                card.textContent =  getHorasPrevias("Study", filter);
                break;
            case 'exercise-last-hour':
                card.textContent =  getHorasPrevias("Exercise", filter);
                break;
            case 'social-last-hour':
                card.textContent =  getHorasPrevias("Social", filter);
                break;
            case 'selfcare-last-hour':
                card.textContent =  getHorasPrevias("Self Care", filter);
                break;
        }

    });

}

function getHorasPrevias(title, filter)
{
    const element = dataJson.find(item => item.title === title);
    var current;
    switch(filter){
        case 'Daily':
            current = "Yesterday - " +element.timeframes.daily.previous + "hrs";
            break;
        case 'Weekly':
            current = "Last Week - " + element.timeframes.weekly.previous + "hrs";
            break;
        case 'Monthly':
            current = "Last Month - " + element.timeframes.monthly.previous + "hrs";
            break;
    }
    return current;
}

async function getData(){
    const response = await fetch('../data.json');

    if (!response.ok) {
        console.log('Oops! Something went wrong.');
        return;
    }

    return await response.json();
}