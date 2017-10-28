//事件按钮一开始无法点击
$(".submit").attr('disabled', true);
$(".submit").addClass('disabled');
//滑动解锁
$('.bar1').slideToUnlock({
    text: '滑动解锁',
    succText: '解锁成功！',
    height: 30,
    width: 490,
    progressColor: '#aaa'
});
/*****************************************************************/
//切换tab事件
function change(value) {
    var tags = document.getElementsByClassName("choseHeader")[0].getElementsByTagName("nav")[0].getElementsByTagName("a");
    var content = document.getElementsByClassName("tabTarget");
    // alert(content[1].innerHTML);

    for (var i = 0; i < tags.length; i++) {
        if (tags[i] === value) {
            tags[i].style.backgroundColor = "#2B2b2b";
            tags[i].style.borderBottom = "3px solid #6CA6CD";
            content[i].style.display = "block";
        } else {
            tags[i].style.backgroundColor = "#454545";
            tags[i].style.borderBottom = "3px #636363 solid";
            content[i].style.display = "none";
        }
    }
}

/****************************************************************/
// 手机号flag
var cellFlag = false;
//邮箱flag
var emailFlag = false;
//密码flag
var passwordFlag = false;
//用户名flag
var userNameFlag = false;
//再次输入密码flag
var repasswordFlag = false;

//判断手机号是否输入正确
function tel() {
    var cellNumber = document.getElementById("phoneNumber").value;
    var cellAction = document.getElementById("phoneError");

    cellNumber = cellNumber.replace(/\s+/g, "");

    if (cellNumber == "") {
        cellFlag = false;
        cellAction.innerText = " ✘输入不能为空！";
    } else if (!isPhone(cellNumber)) {
        cellFlag = false;
        cellAction.innerText = "✘请输入正确的电话号码！";
    } else {
        cellAction.innerText = "✓";
        cellFlag = true;
    }
    //更改样式
    changeCue(cellFlag,cellAction);
}
function isPhone(str) {
    reg = /^1[3|5|7|8]\d{9}$/g
    return reg.test(str)
}

//判断邮箱是否输入正确
function email() {
    var email = document.getElementById("email").value;
    var emailAction = document.getElementById("emailError");

    email = email.replace(/\s+/g, "");

    if (email == "") {
        emailFlag = false;
        emailAction.innerText = " ✘请输入邮箱地址";
    } else if (!isEmail(email)) {
        emailFlag = false;
        emailAction.innerText = " ✘请输入正确邮箱";
    } else {
        emailAction.innerText = "✓";
        emailFlag = true;
    }

    changeCue(emailFlag,emailAction);
}
function isEmail(str) {
    reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g
    return reg.test(str)
}

//判断密码输入是否合法
function password(password) {
    var password = password.value;
    var passwordAction = document.getElementById("passwordError");

    password = password.replace(/\s+/g, "");

    if (password == "") {
        passwordFlag = false;
        passwordAction.innerText = " ✘请输入密码";
    } else if (!isValidPassword(password)) {
        passwordFlag = false;
        passwordAction.innerText = "✘请输入正确的密码";
    } else {
        passwordAction.innerText = "✓";
        passwordFlag = true;
    }

    changeCue(passwordFlag,passwordAction);
}
function isValidPassword(str) {
    if (str.length < 6 || str.length > 20) {
        return false
    }
    if (/[^a-zA-Z0-9_@]/.test(str)) {
        return false
    }
    if (/(^[a-z]+$|^[A-Z]+$|^\d+$|^_+$)/.test(str)) {
        return false
    }
    return true
}

//判断重新输入的密码是否合法
function repassword() {
    var password = document.getElementById("password").value;
    var rePassword = document.getElementById("rePassword").value;
    var rePasswordError = document.getElementById("rePasswordError");

    password = password.replace(/\s+/g, "");
    // alert(password);
    rePassword = rePassword.replace(/\s+/g, "");
    // alert(rePassword);

    //  alert(rePassword === password);
    var x = (rePassword === password);
    // alert(x);
    if (rePassword === "") {
        repasswordFlag = false;
        rePasswordError.innerText = "✘请再次输入密码！";
    }else if(!x){
        repasswordFlag = false;
        rePasswordError.innerText = "✘密码不一致，请重新输入";
    }else{
        repasswordFlag = true;
        rePasswordError.innerText = "✓";
    }

    changeCue(repasswordFlag,rePasswordError);
}

// 判断用户名输入是否合法
function username() {
    var userName = document.getElementById("username").value;
    var userNameAction = document.getElementById("userNameError");

    userName = userName.replace(/\s+/g, "");

    if (userName == "") {
        userNameFlag = false;
        userNameAction.innerText = " ✘请输入用户名";
    } else if (!isValidUsername(userName)) {
        userNameFlag = false;
        userNameAction.innerText = " ✘请不要输入特殊字符";
    } else {
        userNameAction.innerText = "✓";
        userNameFlag = true;
    }

    changeCue(userNameFlag,userNameAction);
}
function isValidUsername(str) {
    reg = /^[0-9a-zA-Z|_]{6,20}$/g
    return reg.test(str)
}

//改变提示语样式
function changeCue(flag,action) {
    action.style.visibility = "visible";
    if(flag) {
        action.className = "";
        action.className = "reminderPass";
    }else{
        action.className = "";
        action.className = "reminderError";
    }
}

/***************************登录或注册*********************/
//登录
function login() {
    if (!((cellFlag && passwordFlag) || (emailFlag && passwordFlag))) {
        alert("请输入正确的登录信息");
    } else {
        alert("登陆成功");
    }
}

//注册
function register() {
    if(!((userNameFlag && emailFlag && passwordFlag && repasswordFlag)||(userNameFlag && cellFlag && passwordFlag && repasswordFlag))){
        alert("请输入正确的注册信息");
    }else{
        alert("注册成功");
    }
}