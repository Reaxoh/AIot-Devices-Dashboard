const loadingLogo   = document.getElementById("loadingLogo");
const myId          = document.getElementById("myId");
const myPasswd      = document.getElementById("myPasswd");
const errorText     = document.getElementById("errorText");
const loginButton   = document.getElementById("loginButton");

window.addEventListener("load", onLoad);

document.addEventListener("keydown", async (event) => {
    console.log("Event code:", event.code);
    if (event.code === "Enter" || event.code === "NumpadEnter") {
        await pushEnter();
    }
});

function onLoad() {
    showErrorText  (false);
    showLoadingLogo(false);
}

loginButton.addEventListener("click", pushEnter);

async function pushEnter(){
    showErrorText  (false);
    showLoadingLogo(true);

    await sleep(1000);

    if(myId.value === "" || myPasswd.value === "") {
        showErrorText  (true, "帳號或密碼不得空白");
        showLoadingLogo(false);
        
    } else {
        let reqJson = {
            "Name":   "checkIdPasswd",
            "Id":      myId.    value,
            "Passwd":  myPasswd.value
        }

        checkIdPasswd(reqJson);
    }
}

function showLoadingLogo(bool1) {
    if(bool1){
        console.log("Show Loading Logo.");
        loadingLogo.classList.add("spinner-border");

    } else if (!bool1) {
        console.log("Remove Loading Logo.");
        loadingLogo.classList.remove("spinner-border");

    } else {
        console.log("Show Loading Logo ERROR.");
    }
}

function showErrorText(bool1, text) {
    if(bool1){
        console.log("Show Error Text.");
        errorText.innerText = text;

    } else if (!bool1) {
        console.log("Remove Error Text.");
        errorText.innerHTML = "&nbsp;";

    } else {
        console.log("Show Error Text ERROR.");
    }
}

function checkIdPasswd(reqJson) {
    let request = new XMLHttpRequest();
    request.open("POST", window.location.origin + "/data/checkIdPasswd", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.send(JSON.stringify(reqJson));

    request.addEventListener("load", () => {
        console.log("Heroku Msg[POST Json]:", request.responseText);

        try {
            const resJson = JSON.parse(request.responseText);
            if(resJson["Error"] == null) {
                window.location.href = "/home";
            } else {
                showErrorText(true, "帳號或密碼錯誤");
            }
        }catch (e) {
                showErrorText(true, "伺服器錯誤");
        }

        showLoadingLogo(false);
    });
}

async function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}
