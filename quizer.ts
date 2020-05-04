/** Sprawdza poprawność wpisanej wartości (czy liczba). */
function corrFormat(inp)
{
    if(inp == "")return true;
    if(inp == "-0")return false;
    if(inp.length >1 && inp[0] == "-")inp = inp.substring(1);
    if(inp.length != 1 &&  inp[0] == '0')return false;
    return /^\d+$/.test(inp);
}

/** Odlicza czas */
function timer()
{
    let tim = localStorage.getItem("time");
    let time = parseInt(tim);
    time += 1;
    document.getElementById("zegar").innerHTML = `${time}`;
    localStorage.setItem("time",time.toString());
    setTimeout("timer()",1000);
}

/** Zmienia interfejs podpowiedzi wyświetlając informacje o karze. */
function falseHint(numb)
{
    let place = document.getElementById("hint");
    if(test.exercises[numb].hint != null)
    {
        place.innerHTML = "Koszt podpowiedzi: +" + test.exercises[numb].hint.penalty +"s";
    }
    else
    {
        place.innerHTML = "Brak podpowiedzi";
        document.getElementById("hinter").style.visibility = "hidden";
    }
}

/** Zmienia interfejs podpowiedzi, wyświetlając ją oraz ukrywając przycisk. */
function trueHint(numb)
{
    let place = document.getElementById("hint");
    place.innerHTML = test.exercises[numb].hint.text;
    document.getElementById("hinter").style.visibility = "hidden";
}

/** Zapisuje informacje o użytej podpowiedzi i wywołuje trueHint() */
function clickHint()
{
    let num = parseInt(localStorage.getItem("que"));
    let ans = JSON.parse(localStorage.getItem("answers"));
    ans[num].hint = true;
    localStorage.setItem("answers",JSON.stringify(ans));
    trueHint(num);
}

/** Wyświetla wszystkie informacje o pytaniu i ustawia interfejs podpowiedzi. */
function writeQuestion()
{
    let num = parseInt(localStorage.getItem("que"));
    let place = document.getElementById("pytanie");
    let nr = num + 1;
    place.innerHTML = "<b>Pytanie " + nr + " z " + test.exercises.length + "</b><br>"+ test.exercises[num].question;
    document.getElementById("kara").innerHTML = "Za błedną odpowiedź: +" + test.exercises[num].penalty +"s";
    let val = JSON.parse(localStorage.getItem("answers"))[num];
    const inp: HTMLInputElement = document.getElementById("odp") as HTMLInputElement;
    inp.value =val.odp;
    if(val.hint)
    {
        trueHint(num);
    }
    else falseHint(num);
}

/** Funkcja wywoławcza w przypadku próby powrotu do porzedniego pytania. */
function prevClick(){
    const prevBut =document.getElementById("prevQue");
    let ans = JSON.parse(localStorage.getItem("answers"));
    let pyt = parseInt(localStorage.getItem("que"));
    let inp = (<HTMLInputElement>document.getElementById("odp")).value;
    if(pyt == 0)
    {
        document.getElementById("komunikat").innerHTML = "To jest pierwsze pytanie.";
    }
    else if(!corrFormat(inp))
    {
        document.getElementById("komunikat").innerHTML = "Nieprawidłowy format odpowiedzi.";
    }
    else
    {
        ans[pyt].odp = inp;
        localStorage.setItem("answers",JSON.stringify(ans));
        pyt--;
        localStorage.setItem("que",pyt.toString());
        location.reload();
    }
}

/** Funkcja wywoławcza w przypadku próby przejścia do następnego pytania. */
function nextClick(){
    const nextBut =document.getElementById("nextQue");
    let ans = JSON.parse(localStorage.getItem("answers"));
    let pyt = parseInt(localStorage.getItem("que"));
    let inp = (<HTMLInputElement>document.getElementById("odp")).value;
    if(pyt == test.exercises.length - 1)
    {
        document.getElementById("komunikat").innerHTML = "To jest ostatnie pytanie.";
    }
    else if(!corrFormat(inp))
    {
        document.getElementById("komunikat").innerHTML = "Nieprawidłowy format odpowiedzi.";
    }
    else
    {
        ans[pyt].odp = inp;
        localStorage.setItem("answers",JSON.stringify(ans));
        pyt++;
        localStorage.setItem("que",pyt.toString());
        location.reload();

    }
}

/** Funkcja przygotowująca pełny interfejs w przypadku onload quizer. */
function queMaker()
{
    const introSt = test.intro;
    const intro =document.getElementById("intro");
    intro.innerHTML = introSt;
    writeQuestion();
    timer();
}

/** Przy wywołaniu wraca do strony startowej i czyści pamięć z odpowiedzi aktualnego quizu */
function cancelQuiz()
{
    localStorage.removeItem("answers");
    location.replace("index.html");
}

/** Sprawdza czy quiz został poprawnie zakończony, a jeżeli tak to przechodzi na stronę końcową. */
function stopper()
{
    let inp = (<HTMLInputElement>document.getElementById("odp")).value;
    if(!corrFormat(inp))
    {
        document.getElementById("komunikat").innerHTML = "Nieprawidłowy format odpowiedzi.";
        return;
    }
    let ans = JSON.parse(localStorage.getItem("answers"));
    let pyt = parseInt(localStorage.getItem("que"));
    ans[pyt].odp = inp;
    localStorage.setItem("answers",JSON.stringify(ans));
    let czyMozna = true;
    for(let i = 0; i < ans.length; i++)
    {
        if(ans[i].odp=="")
        {
            czyMozna=false;
            break;
        }
    }
    if(!czyMozna)
    {
        document.getElementById("komunikat").innerHTML = "Nie odpowiedziano na wszystkie pytania";
    }
    else
    {
        location.replace("finish.html");
    }
}