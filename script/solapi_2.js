const api_key = 'NCSJTUHVWWQ0EWKT'
const api_secret = 'AU16IKRS7CVUPXXWOWP3ECGMEFBB7VCQ'

function getAuthorization(){
    let salt = getSalt();
    let date = getDate();
    let value = date + salt;
    let signature = getSignature(value, api_secret);
    let authoriztion = 'HMAC-SHA256 apiKey='+api_key+', date='+date+', salt='+salt+', signature='+signature;
    return authoriztion;
}

function getSalt(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 30; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function getDate(){
    let today = new Date();
    return today.toISOString();
}

function getSignature(value, key){
    let signature = CryptoJS.HmacSHA256(value, key);
    return signature;
}

var request;

function getPlusfriend(pfid){
    let url = 'https://api.solapi.com/kakao/v1/plus-friends/' + pfid;

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('GET', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);
    request.send();
}

function getPlusfriends(){
    let url = 'https://api.solapi.com/kakao/v1/plus-friends';

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('GET', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);
    request.send();
}

function getTemplate(templateId){
    let url = 'https://api.solapi.com/kakao/v1/templates/' + templateId;

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('GET', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);
    request.send();
}

function getTemplates(){
    let url = 'https://api.solapi.com/kakao/v1/templates';

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('GET', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);
    request.send();
}
function btn_sendMessage() {
    let name = document.getElementById('name').value;
    let tel = document.getElementById('tel').value;
    let btn_url = "pico44.dothome.co.kr/ss/index.html"
    let templateId = "KA01TP2204270359062990pX1pOWjX99";
    let pfid = "KA01PF22041206411o33TFWW9Sl71Ppp";
    let 행사명 = " 달구벌 관등놀이";
    let 예매번호 = 648234;
    let 관람번호 = 1241234;
    let 관람일시 = "22일";
    let 행사정보안내 = "행사 정보 안내";
    let 좌석 = "증장천왕";
    let 티켓수 = "3매";
    행사정보안내.toString();

    if (name == "") {
        alert("성함을 입력해주세요");
        return;
    }
    if (tel == "") {
        alert("전화번호를 입력해세요");
        return;
    }
    if (frm.confirm.checked == true) {



        console.log(name);
        console.log(tel);
        console.log(btn_url);
        console.log(templateId);

        sendMessage(name, tel, btn_url, pfid, templateId, 행사명, 예매번호, 관람일시, 좌석, 티켓수, 행사정보안내);
    } else {
        alert("개인정보 수집에 동의해 주세요.");

    }

}


function sendMessage(name, tel, btn_url, pfid, templateId, 행사명, 예매번호, 관람일시, 좌석, 티켓수, 행사정보안내){
    let url = 'https://api.solapi.com/messages/v4/send';

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);

    // var message = '{"message": {"to": "'+tel+'","from": "01033528779","text": "'+행사명+ '\n예매완료\n'+name+"고객님,\n"+"예매가 완료되었습니다.\n\n" +"-상품명: "+행사명+"\n-예매번호: "+예매번호 +"\n-관람일시: "+관람일시+"\n-예매좌석: "+좌석+"\n-티켓 수: "+티켓수+"\n\n*주의사항*\n"+"우천시 환불은 불가합니다.\n"+"행사 3일 전까지 환불 가능합니다.\n\n"+행사명+"를\n 이용해주셔서 감사합니다."+'","type": "ATA","kakaoOptions": {"pfId": "'+pfid+'","templateId": "'+templateId+'","buttons": [{"buttonType": "WL","buttonName": "예매 상세 내역 보기","linkMo": "http://'+btn_url+'", "linkPc":"http://'+btn_url+'"}]}}}';
    var message = {
        "message": {
            "to": tel,
            "from": "01033528779",
            "text": "안녕하세요,"+행사명+"입니다.\n 저희 행사에 관심 주셔서 감사합니다!\n\n"+name+"고객님, 신청하신 행사 정보\n 관련해서 알려드립니다:)\n"+행사정보안내+"\n"+행사명+"에 오셔서 좋은 추억 만들고 가시길 바랍니다.\n소중한 인연들과 함께 풍등에 희망을 담아 하늘 높이 날려 볼까요?\n행사에 참여하고 싶은 분들은 아래 예매하러 가기를 눌러주세요.",
            "kakaoOptions": {
                "pfId": pfid,
                "templateId": templateId,
                "buttons": [{
                    "buttonType": "WL",
                    "buttonName": "예매하러 가기",
                    "linkMo": "http://"+btn_url,
                    "linkPc":"http://"+btn_url}]}}};

    var message=JSON.stringify(message);

    // var message = '{"message": {"to": "'+tel+'","from": "01033528779","text": "합니다.\n\n"+행사명+"를\n 이용해주셔서 감사합니다."+"type": "ATA","kakaoOptions": {"pfId": "'+pfid+'","templateId": "'+templateId+'","buttons": [{"buttonType": "WL","buttonName": "링크테스트","linkMo": "https://'+btn_url+'", "linkPc":"https://'+btn_url+'"}]}}}';

    request.send(message);
    return;
    console.log(message);
}
function requestResult(){
    if(request.readyState == XMLHttpRequest.DONE){
        // alert(request.responseText);
        alert("알림톡을 신청해주셔서 감사합니다.");
    }
}