export class CookieHandler {
    setCookie(cname, cvalue, exdays) {
        const d= new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname) {
        let name = cname+"=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i=0; i< ca.length; i++) {
            let c=ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }

    logCookies() {
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        ca.forEach((entry) => console.log(entry) );
    }

    clearTop10() {
        this.setCookie("topTen", "", 365);
    }

    setTop10(newHighScore) {
        let top10 = this.getTop10();
        let newTop10 = [];
        let scoreIndex = 0;
        while (scoreIndex < top10.length && top10[scoreIndex].score > newHighScore.score) {newTop10.push(top10[scoreIndex++]);}
        if (scoreIndex < 9) { newTop10.push(newHighScore); }
        while(newTop10.length < 10 && scoreIndex< (top10.length-1)) {newTop10.push(top10[scoreIndex++]);}
        let top10Str = "";
        let first = true;
        newTop10.forEach((entry) => {
            if (first) { first = false; }
            else top10Str += "~";
            top10Str += entry.playerName + ","+entry.comment+","+entry.score+","+entry.date;
        })
        this.setCookie("topTen", top10Str, 365);
    }

    getTop10() {
        let top10 = this.getCookie("topTen").split('~');
        let list = [];
        top10.forEach((entry) => {
            let elements = entry.split(',');
            let date = elements[3];
            if ( isNaN(elements[3]) ) { date = new Date(); }
            else {
                date = new Date();
                date.setTime(elements[3]);
            }
            list.push(new HighScore(elements[0], elements[1], elements[2], date) );
        })
        list.sort((a, b) => a.score - b.score);
        return list;
    }
}

export class HighScore {
    constructor(playerName, comment, score, date) {
        this.playerName = playerName;
        this.comment = comment;
        this.score = score;
        if (date != null) { 
            this.date = date.valueOf(); 
        }
        else {
            this.date = new Date().valueOf();
        }
    }
}