/** Wypisuje pełny raport rozwiązania. */
function viewRaport()
{
    let num = parseInt(localStorage.getItem("rapNum"));
    let wyn = JSON.parse(localStorage.getItem("wyniki"))[num];
    let rap = "<h1>Rozwiązanie z dnia: " + wyn.date + "</h1><br>"
    rap += "<mark>Wynik końcowy:</mark> " + wyn.score + "<br>";
    rap += "<mark>Czas:</mark> " + wyn.time + "<br>";
    rap += "<mark>Poprawne:</mark> " + wyn.correct + "<br>";
    rap += "<mark>Błędne:</mark> " + wyn.wrong + "<br>";
    rap += "<mark>Użyto podpowiedzi:</mark> " + wyn.hints + "<br><br>";
    rap += "<mark>Odpowiedzi:</mark><br> <table>";
    rap += "<tr><th>Zadanie</th><th>Odpowiedź</th><th>Podpowiedź</th><th>Kara</th></tr>";
    for(let i = 0; i < wyn.answers.length; i++)
    {
        rap +="<tr>";
        let x = i+1;
        rap += "<td>" + x + "</td>";
        rap += "<td>" + wyn.answers[i].answer + "</td>";
        let rest = "0";
        if(wyn.answers[i].hint)
        {
            rest = "+" + test.exercises[i].hint.penalty;
        }
        rap += "<td>" + rest + "</td>";
        rest = "0";
        if(!wyn.answers[i].cor)
        {
            rest = "+" + test.exercises[i].penalty;
        }
        rap += "<td>" + rest + "</td>";
        rap +="<tr>";
    }
    rap +="</table>"
    document.getElementById("pelnyRaport").innerHTML = rap;
}