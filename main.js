var test = {
    "intro": "Sprawdź się!",
    "exercises": [
        {
            "question": "26 + 7 * 12",
            "answer": "110",
            "hint": {
                "text": "a)45 b)100 c)110 d)396",
                "penalty": 6
            },
            "penalty": 20
        },
        {
            "question": " 1 * (-2) + (-3) * 4 - 5 * (-6)",
            "answer": "16",
            "hint": {
                "text": "a)1 b)16 c)21 d)-21",
                "penalty": 10
            },
            "penalty": 25
        },
        {
            "question": "12 + 33 - 9 - 45:5 + 18 + 27 - 48:4",
            "answer": "60",
            "hint": null,
            "penalty": 30
        },
        {
            "question": "169 + 14 * (-13) + 49",
            "answer": "36",
            "hint": {
                "text": "Wzór skróconego mnożenia.",
                "penalty": 15
            },
            "penalty": 35
        },
        {
            "question": "1 + 2 + 3 + 4 + ... + 98 + 99 + 100",
            "answer": "5050",
            "hint": {
                "text": "Można połączyć liczby w pary, bedzie wtedy 50 razy 101",
                "penalty": 20
            },
            "penalty": 40
        }
    ]
};
function toRaport(num) {
    localStorage.setItem("rapNum", num);
    location.replace("raport.html");
}
function mainPageFun() {
    if (localStorage.getItem("wyniki") == null) {
        localStorage.setItem("wyniki", "[]");
    }
    var wyn = JSON.parse(localStorage.getItem("wyniki"));
    var tab = "<table><tr><th>Lp</th><th>Data</th><th>Wynik</th><th>Raport</th></tr>";
    for (var i = 0; i < wyn.length; i++) {
        tab += "<tr>";
        var x = i + 1;
        tab += "<td>" + x + "</td>";
        tab += "<td>" + wyn[i].date + "</td>";
        tab += "<td>" + wyn[i].score + "</td>";
        if (wyn[i].isLong) {
            tab += "<td><a onclick=\"toRaport(" + i + ")\" href=\"javascript:void(0);\">GO</a></td>";
        }
        else
            tab += "<td> None </td>";
        tab += "<tr>";
    }
    tab += "</table>";
    document.getElementById("lista").innerHTML = tab;
}
function starter() {
    localStorage.setItem("time", "0");
    localStorage.setItem("que", "0");
    var answerSample = {
        "odp": "",
        "hint": false
    };
    var ans = [];
    for (var i = 0; i < test.exercises.length; i++) {
        ans.push(answerSample);
    }
    localStorage.setItem("answers", JSON.stringify(ans));
}
function corrFormat(inp) {
    if (inp == "")
        return true;
    if (inp == "-0")
        return false;
    if (inp.length > 1 && inp[0] == "-")
        inp = inp.substring(1);
    if (inp.length != 1 && inp[0] == '0')
        return false;
    return /^\d+$/.test(inp);
}
function timer() {
    var tim = localStorage.getItem("time");
    var time = parseInt(tim);
    time += 1;
    document.getElementById("zegar").innerHTML = "" + time;
    localStorage.setItem("time", time.toString());
    setTimeout("timer()", 1000);
}
function falseHint(numb) {
    var place = document.getElementById("hint");
    if (test.exercises[numb].hint != null) {
        place.innerHTML = "Koszt podpowiedzi: +" + test.exercises[numb].hint.penalty + "s";
    }
    else {
        place.innerHTML = "Brak podpowiedzi";
        document.getElementById("hinter").style.visibility = "hidden";
    }
}
function trueHint(numb) {
    var place = document.getElementById("hint");
    place.innerHTML = test.exercises[numb].hint.text;
    document.getElementById("hinter").style.visibility = "hidden";
}
function clickHint() {
    var num = parseInt(localStorage.getItem("que"));
    var ans = JSON.parse(localStorage.getItem("answers"));
    ans[num].hint = true;
    localStorage.setItem("answers", JSON.stringify(ans));
    trueHint(num);
}
function writeQuestion() {
    var num = parseInt(localStorage.getItem("que"));
    var place = document.getElementById("pytanie");
    var nr = num + 1;
    place.innerHTML = "<b>Pytanie " + nr + " z " + test.exercises.length + "</b><br>" + test.exercises[num].question;
    document.getElementById("kara").innerHTML = "Za błedną odpowiedź: +" + test.exercises[num].penalty + "s";
    var val = JSON.parse(localStorage.getItem("answers"))[num];
    var inp = document.getElementById("odp");
    inp.value = val.odp;
    if (val.hint) {
        trueHint(num);
    }
    else
        falseHint(num);
}
function prevClick() {
    var prevBut = document.getElementById("prevQue");
    var ans = JSON.parse(localStorage.getItem("answers"));
    var pyt = parseInt(localStorage.getItem("que"));
    var inp = document.getElementById("odp").value;
    if (pyt == 0) {
        document.getElementById("komunikat").innerHTML = "To jest pierwsze pytanie.";
    }
    else if (!corrFormat(inp)) {
        document.getElementById("komunikat").innerHTML = "Nieprawidłowy format odpowiedzi.";
    }
    else {
        ans[pyt].odp = inp;
        localStorage.setItem("answers", JSON.stringify(ans));
        pyt--;
        localStorage.setItem("que", pyt.toString());
        location.reload();
    }
}
function nextClick() {
    var nextBut = document.getElementById("nextQue");
    var ans = JSON.parse(localStorage.getItem("answers"));
    var pyt = parseInt(localStorage.getItem("que"));
    var inp = document.getElementById("odp").value;
    if (pyt == test.exercises.length - 1) {
        document.getElementById("komunikat").innerHTML = "To jest ostatnie pytanie.";
    }
    else if (!corrFormat(inp)) {
        document.getElementById("komunikat").innerHTML = "Nieprawidłowy format odpowiedzi.";
    }
    else {
        ans[pyt].odp = inp;
        localStorage.setItem("answers", JSON.stringify(ans));
        pyt++;
        localStorage.setItem("que", pyt.toString());
        location.reload();
    }
}
function queMaker() {
    var introSt = test.intro;
    var intro = document.getElementById("intro");
    intro.innerHTML = introSt;
    writeQuestion();
    timer();
}
function cancelQuiz() {
    localStorage.removeItem("answers");
    location.replace("index.html");
}
function stopper() {
    var inp = document.getElementById("odp").value;
    if (!corrFormat(inp)) {
        document.getElementById("komunikat").innerHTML = "Nieprawidłowy format odpowiedzi.";
        return;
    }
    var ans = JSON.parse(localStorage.getItem("answers"));
    var pyt = parseInt(localStorage.getItem("que"));
    ans[pyt].odp = inp;
    localStorage.setItem("answers", JSON.stringify(ans));
    var czyMozna = true;
    for (var i = 0; i < ans.length; i++) {
        if (ans[i].odp == "") {
            czyMozna = false;
            break;
        }
    }
    if (!czyMozna) {
        document.getElementById("komunikat").innerHTML = "Nie odpowiedziano na wszystkie pytania";
    }
    else {
        location.replace("finish.html");
    }
}
function makeRaport() {
    if (localStorage.getItem("answers") == null)
        return null;
    var raport = {
        isLong: true,
        date: "",
        time: parseInt(localStorage.getItem("time")),
        correct: 0,
        wrong: 0,
        hints: 0,
        answers: [],
        score: parseInt(localStorage.getItem("time"))
    };
    var ans = JSON.parse(localStorage.getItem("answers"));
    localStorage.removeItem("answers");
    for (var i = 0; i < ans.length; i++) {
        var odp = {
            answer: ans[i].odp,
            hint: ans[i].hint,
            cor: ans[i].odp == test.exercises[i].answer
        };
        raport.answers.push(odp);
        if (odp.hint) {
            raport.hints++;
            raport.score += test.exercises[i].hint.penalty;
        }
        if (odp.cor) {
            raport.correct++;
        }
        else {
            raport.wrong++;
            raport.score += test.exercises[i].penalty;
        }
    }
    var dzis = new Date();
    var dzien = dzis.getDate();
    var mies = dzis.getMonth() + 1;
    var rok = dzis.getFullYear();
    raport.date += dzien + "/" + mies + "/" + rok;
    return raport;
}
function loader() {
    var rap = makeRaport();
    if (rap == null) {
        document.getElementById("czas").innerHTML = "Brak wyniku";
    }
    else {
        document.getElementById("czas").innerHTML = rap.score.toString();
        var str = "";
        str += "Czas: " + rap.time + " sekund<br>";
        str += "<mark>Poprawne:</mark> " + rap.correct + "<br>";
        str += "<mark>Błędne:</mark> " + rap.wrong + "<br>";
        str += "<mark>Użyto podpowiedzi:</mark> " + rap.hints;
        document.getElementById("raport").innerHTML = str;
        localStorage.setItem("raport", JSON.stringify(rap));
    }
}
function saveRaport() {
    var rap = JSON.parse(localStorage.getItem("raport"));
    var wyn = JSON.parse(localStorage.getItem("wyniki"));
    wyn.push(rap);
    localStorage.setItem("wyniki", JSON.stringify(wyn));
    location.replace("index.html");
}
function shortRaport() {
    var rap = JSON.parse(localStorage.getItem("raport"));
    var wyn = JSON.parse(localStorage.getItem("wyniki"));
    var sh = {
        isLong: false,
        date: rap.date,
        score: rap.score
    };
    wyn.push(sh);
    localStorage.setItem("wyniki", JSON.stringify(wyn));
    location.replace("index.html");
}
function viewRaport() {
    var num = parseInt(localStorage.getItem("rapNum"));
    var wyn = JSON.parse(localStorage.getItem("wyniki"))[num];
    var rap = "<h1>Rozwiązanie z dnia: " + wyn.date + "</h1><br>";
    rap += "<mark>Wynik końcowy:</mark> " + wyn.score + "<br>";
    rap += "<mark>Czas:</mark> " + wyn.time + "<br>";
    rap += "<mark>Poprawne:</mark> " + wyn.correct + "<br>";
    rap += "<mark>Błędne:</mark> " + wyn.wrong + "<br>";
    rap += "<mark>Użyto podpowiedzi:</mark> " + wyn.hints + "<br><br>";
    rap += "<mark>Odpowiedzi:</mark><br> <table>";
    rap += "<tr><th>Zadanie</th><th>Odpowiedź</th><th>Podpowiedź</th><th>Kara</th></tr>";
    for (var i = 0; i < wyn.answers.length; i++) {
        rap += "<tr>";
        var x = i + 1;
        rap += "<td>" + x + "</td>";
        rap += "<td>" + wyn.answers[i].answer + "</td>";
        var rest = "0";
        if (wyn.answers[i].hint) {
            rest = "+" + test.exercises[i].hint.penalty;
        }
        rap += "<td>" + rest + "</td>";
        rest = "0";
        if (!wyn.answers[i].cor) {
            rest = "+" + test.exercises[i].penalty;
        }
        rap += "<td>" + rest + "</td>";
        rap += "<tr>";
    }
    rap += "</table>";
    document.getElementById("pelnyRaport").innerHTML = rap;
}
