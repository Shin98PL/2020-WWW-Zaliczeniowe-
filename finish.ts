/** Tworzy nowy raport ostatniego rozwiązania. */
function makeRaport()
{
    if(localStorage.getItem("answers") == null)return null;
    let raport = {
        isLong: true,
        date: "",
        time: parseInt(localStorage.getItem("time")),
        correct: 0,
        wrong: 0,
        hints: 0,
        answers: [],
        score: parseInt(localStorage.getItem("time"))
    };
    const ans = JSON.parse(localStorage.getItem("answers"));
    localStorage.removeItem("answers");
    for(let i = 0; i < ans.length; i++)
    {
        let odp ={
            answer: ans[i].odp,
            hint: ans[i].hint,
            cor: ans[i].odp==test.exercises[i].answer
        }
        raport.answers.push(odp);
        if(odp.hint)
        {
            raport.hints++;
            raport.score += test.exercises[i].hint.penalty;
        }
        if(odp.cor)
        {
            raport.correct++;
        }
        else
        {
            raport.wrong++;
            raport.score += test.exercises[i].penalty;
        }
    }
    let dzis = new Date();
    let dzien = dzis.getDate();
    let mies = dzis.getMonth() + 1;
    let rok = dzis.getFullYear();
    raport.date += dzien + "/" + mies + "/" + rok;
    return raport;
}

/** Funkcja onload gdy zakończono quiz */
function loader()
{
    let rap = makeRaport();
    if(rap == null)
    {
        document.getElementById("czas").innerHTML = "Brak wyniku"
    }
    else
    {
        document.getElementById("czas").innerHTML = rap.score.toString();
        let str = "";
        str += "Czas: " + rap.time + " sekund<br>";
        str += "<mark>Poprawne:</mark> " + rap.correct + "<br>";
        str += "<mark>Błędne:</mark> " + rap.wrong + "<br>";
        str += "<mark>Użyto podpowiedzi:</mark> " + rap.hints;
        document.getElementById("raport").innerHTML = str;
        localStorage.setItem("raport",JSON.stringify(rap));
    }
}

/** Zapisuje pełny raport w pamięci. */
function saveRaport()
{
    let rap = JSON.parse(localStorage.getItem("raport"));
    let wyn = JSON.parse(localStorage.getItem("wyniki"));
    wyn.push(rap);
    localStorage.setItem("wyniki",JSON.stringify(wyn));
    location.replace("index.html");
}

/** Zapisuje raport skrótowy(data,wynik) w pamięci. */
function shortRaport()
{
    let rap = JSON.parse(localStorage.getItem("raport"));
    let wyn = JSON.parse(localStorage.getItem("wyniki"));
    let sh = {
        isLong: false,
        date: rap.date,
        score: rap.score
    }
    wyn.push(sh);
    localStorage.setItem("wyniki",JSON.stringify(wyn));
    location.replace("index.html");
}