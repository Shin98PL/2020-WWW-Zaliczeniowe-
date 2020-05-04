/** Zapisuje w pamięci, który raport ma wywołać, po czym przechodzi na strone raportu. */
function toRaport(num)
{
    localStorage.setItem("rapNum",num);
    location.replace("raport.html")
}

/** Funkcja onload głównej strony. Tworzy tablice wyników i wyświetla je. */
function mainPageFun()
{
    if(localStorage.getItem("wyniki") == null)
    {
        localStorage.setItem("wyniki","[]"); /** Jeżeli w pamięci nie ma miejsca na wyniki. */
    }

    const wyn = JSON.parse(localStorage.getItem("wyniki"));
    let tab = "<table><tr><th>Lp</th><th>Data</th><th>Wynik</th><th>Raport</th></tr>"
    for(let i = 0; i < wyn.length; i++)
    {
        tab += "<tr>";
        let x = i + 1;
        tab += "<td>" + x + "</td>";
        tab += "<td>" + wyn[i].date + "</td>";
        tab += "<td>" + wyn[i].score + "</td>";
        if(wyn[i].isLong)
        {
            tab += "<td><a onclick=\"toRaport(" + i +")\" href=\"javascript:void(0);\">GO</a></td>";
        }
        else tab += "<td> None </td>";
        tab += "<tr>";
    }
    tab += "</table>";
    document.getElementById("lista").innerHTML = tab;
}

/** Przygotowuje nowy quiz */
function starter()
{
    localStorage.setItem("time","0");
    localStorage.setItem("que","0");
    const answerSample = {
        "odp": "",
        "hint": false
    }
    let ans = [];
    for(let i = 0; i < test.exercises.length; i++)
    {
        ans.push(answerSample);
    }
    localStorage.setItem("answers",JSON.stringify(ans));
}