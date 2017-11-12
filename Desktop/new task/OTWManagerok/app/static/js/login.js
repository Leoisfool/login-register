/****************************全局变量区域*************************/
var inputFlag = false;      //判断用户是否输入了合法的登陆账号
var passwordFlag = false;   //判断用户是否输入了合法的密码
var inputType;  //输入类型
/****************************滑动解锁*****   ********************/

$('.bar1').slideToUnlock({
    text: '滑动解锁',
    succText: '解锁成功！',
    height: 40,
    width: 315,
    progressColor: '#aaa',
    succColor:'#40E0D0'
});
/*****************************************************************/
//模拟输入框聚焦事件，失焦事件在相应名称的函数中
function addBorderStyle(a){
    a.classList.add("input");
}
/***************************检验用户输入信息******************************/
function user(){
    var userError = document.getElementById("userError");   //用户输入提示
    var user = document.getElementById("user");
    user.parentNode.classList.remove("input");  // 移除聚焦样式
    var flag = true;

    var userKey = user.value.replace(/\s+/g,"");    //去掉字符串的所有空格
    var tel = /^1[3|5|7|8]\d{9}$/g;     //电话号码正则表达式
    var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;   //邮箱
    var username = /^[\u4E00-\u9FA5A-Za-z0-9_@!#$]+$/;    //用户名（中文，数字，包括下划线）
    // alert(userKey);

    //判断用户输入所属类型
    if(userKey == ""){
//        userError.innerHTML = "输入不能为空哦";
    }else if(tel.test(userKey)){
//        userError.innerHTML = "这是一个电话号码";
        inputType = "phone";
        inputFlag = true;
    }else if(email.test(userKey)){
//        userError.innerHTML = "这是一个邮箱地址";
        inputType = "email";
        inputFlag = true;
    }else if(username.test(userKey)){
//        userError.innerHTML = "这是一个用户名";
        inputType = "username";
        inputFlag = true;
    }else{
//        userError.innerHTML = "请输入正确的登陆信息";
    }

    userError.style.paddingBottom = "4px";
    changeCue(flag,userError);
}
/****************************检验用户输入的密码****************************/ 
function password(a){
    var flag = true;
    var password = document.getElementById("password"); 
    password.parentNode.classList.remove("input");  //当失去焦点时去除边框样式

    password = password.value.replace(/\s+/g,"");

    var passwordError = document.getElementById("passwordError");

    var patt = /^[a-zA-Z0-9@_]{6,40}$/;   //密码为6-40位字母数字以及@_ 
   

    if(password === ""){
        passwordFlag = false;
        passwordError.innerHTML = "<p>&nbsp;</p>";
    }else if(patt.test(password)){
        passwordFlag = true;
        passwordError.innerHTML = "<p>&nbsp;</p>";
    }
    else{
        passwordFlag = false;
        passwordError.innerHTML = "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>您输入的密码可能含有非法字符";
    }

    passwordError.style.paddingBottom = "4px";
    changeCue(flag,passwordError);
}
/****************************************************************/

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
    var user = document.getElementById("user").value.replace(/\s+/g,"");
    var password = document.getElementById("password").value.replace(/\s+/g,"");

    if (!(inputFlag&&passwordFlag)) {
        alert("请输入正确的登录信息");
    } else {
        if(inputType === "email"){
            var email = user;
            var phone = "";
            username = "";
        }else if(inputType === "phone"){
            var email = "";
            var phone = user;
            username = "";
        }else if(inputType === "username"){
            var email = "";
            var phone = "";
            username = user;
        }

        // alert("email:"+email+";phone:"+phone+";username"+username);
        $.ajax({
            type: 'POST',
            async: true,
            url: "/login", //要访问的后台地址
            data: {
                username: username,
                phone: phone,
                email: email,
                password: password,
            }, //要发送的数据
            success: function (data) {
                alert(data.msg);
//                alert("用户类型:"+data.type);
            },
            error: function (data) {
                alert('error');
                alert(data.status);
                alert(data.readyState);
                //alert(textStatus);
            }
        });
    }
}