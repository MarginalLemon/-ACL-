window.onload = function(){
    //启动时加载
    updateFile();//动态更新文件
    updateUser();//动态更新用户表
    updateButtonClick();//按钮点击触发
}

var aclList = new Array();//多文件acl列表
var acl1 = new Array();//acl表
var acl2 = new Array();//acl2表
var acl3 = new Array();//acl3表
var userList = ["u1","u2","u3"];//初始化3个用户


function createAclFactor(userName,r,w,x){
    //acl元素构造函数
    var aclFactor = new Object();
    aclFactor.userName = userName;
    aclFactor.r = r;
    aclFactor.w = w;
    aclFactor.x = x;
    return aclFactor;
}
function createFile(fileName,acl)
{
    var newFile = new Object();
    newFile.fileName = fileName;
    newFile.acl = acl;
    return newFile;
}

function deepClone(target) {
    // 定义一个深拷贝函数  接收目标target参数
    
    let result;// 定义一个变量
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
         // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
         // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if(target.constructor===RegExp){
            result = target;
        }else {
         // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
     // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
     // 返回最终结果
    return result;
}

//默认添加 acl表内容
var uf1 = createAclFactor('u1','1','1','1');
var uf2 = createAclFactor('u2','0','0','0');
var uf3 = createAclFactor('u3','1','1','0');
acl1.push(uf1,uf2,uf3);
acl2.push(deepClone(uf1),deepClone(uf2),deepClone(uf3));
acl3.push(deepClone(uf1),deepClone(uf2),deepClone(uf3));
//创建文件对象
var f1 = createFile('file1',acl1);
var f2 = createFile('file2',acl2);
var f3 = createFile('file3',acl3);
aclList.push(f1,f2,f3);

function createFileDiv(file){
    //创建一个文件夹小框框
    var fileNode = document.createElement("div");//框框
    fileNode.setAttribute("class","picturediv");

    var imgNode = document.createElement("img");//图
    imgNode.setAttribute("src","img/file2.jpg");

    var spanNode = document.createElement("span");//选项
    var inputNode = document.createElement("input");
    inputNode.setAttribute("type","radio");
    inputNode.setAttribute("name","file");
    inputNode.setAttribute("value",file.fileName);
    var text = document.createTextNode(file.fileName);
    spanNode.appendChild(inputNode);
    spanNode.appendChild(text);

    fileNode.appendChild(imgNode);
    fileNode.appendChild(spanNode);

    return fileNode;
}

function createUserDiv(userName){
    //创建一个用户小框框
    var userNode = document.createElement("div");//框框
    userNode.setAttribute("class","picturediv");

    var imgNode = document.createElement("img");//图
    imgNode.setAttribute("src","img/timg2.jpg");

    var spanNode = document.createElement("span");//选项
    var inputNode = document.createElement("input");
    inputNode.setAttribute("type","radio");
    inputNode.setAttribute("name","user");
    inputNode.setAttribute("value",userName);
    var text = document.createTextNode(userName);
    spanNode.appendChild(inputNode);
    spanNode.appendChild(text);

    userNode.appendChild(imgNode);
    userNode.appendChild(spanNode);

    return userNode;
}

function updateFile(){
    //更新文件图标1
    var fileView = document.getElementById("fileView");
    if(!fileView)return;//对于没有需求的页面不加载
    fileView.innerHTML = "";//清空
    for(let i=0;i<aclList.length;i++){
        var fileNode = createFileDiv(aclList[i]);
        fileView.appendChild(fileNode);
    }
    //更新更新文件图标2
    var fileView = document.getElementById("fileView2");
    if(!fileView)return;//对于没有需求的页面不加载
    fileView.innerHTML = "";//清空
    for(let i=0;i<aclList.length;i++){
        var fileNode = createFileDiv(aclList[i]);
        fileView.appendChild(fileNode);
    }
}
function updateUser(){
    //更新用户图标
    var userView = document.getElementById('userView');
    if(!userView)return;
    userView.innerHTML = "";
    for(let i=0;i<userList.length;i++){
        var userNode = createUserDiv(userList[i]);
        userView.appendChild(userNode);
    }
    //更新用户图标2
    var userView = document.getElementById('userView2');
    if(!userView)return;
    userView.innerHTML = "";
    for(let i=0;i<userList.length;i++){
        var userNode = createUserDiv(userList[i]);
        userView.appendChild(userNode);
    }
}
function verify(){
    //权限验证
    //获取选中文件名
    var fileList = document.getElementById('fileView').childNodes;
    var fileName = "";
    for(let i=0;i<fileList.length;i++){
        if(fileList[i].lastChild.firstChild.checked == true){
            fileName = fileList[i].lastChild.firstChild.getAttribute('value');
            break;
        }
    }
    var acl;//aclList列表对应的acl
    for(let i=0;i<aclList.length;i++){
        if(aclList[i].fileName == fileName){
            acl = aclList[i].acl;
        }
    }
    //获取用户名
    var userLs = document.getElementById('userView').childNodes;
    var userName = "";
    for(let i=0;i<userLs.length;i++){
        if(userLs[i].lastChild.firstChild.checked == true){
            userName = userLs[i].lastChild.firstChild.getAttribute('value');
        }
    }
    //查acl表
    var vlist;//对应用户权限信息
    for(let i=0;i<acl.length;i++){

        if(acl[i].userName == userName){
            vlist = acl[i];
        }
    }
    //获取权限并对比
    var v = document.getElementById("verify").childNodes;
    var r = v[1].checked;
    var w = v[3].checked;
    var x = v[5].checked;
    if(r<=vlist.r && w<=vlist.w && x<=vlist.x){
        window.location.assign("#succeed");
    }
    else{
        window.location.assign("#failing");
    }
    
}

function alterFile(){
    //增删文件

    var af = document.getElementById('alterFile').childNodes;
    var mf = -1  //新增文件1 删除文件0
    var fileName = af[1].value;//文件名
    console.log( af);
    console.log(af[4].childNodes[1].checked)
    if(af[4].childNodes[1].checked == true){
        mf = 1; 
    }
    else if(af[7].childNodes[1].checked == true){
        mf = 0;
    }

    if(mf == -1){
        document.getElementById('fileHint').innerHTML = 'Please select an action！';
        return;
    }
    else if(fileName == ''){
        document.getElementById('fileHint').innerHTML = 'Please enter a file name！';
        return;
    }

    var n = -1//file 在aclList中的下标
    for(let i=0;i<aclList.length;i++){
        if(fileName == aclList[i].fileName){
            n = i;
            break;
        }
    }

    if(mf == 1){
        //增
        if(n != -1){
            document.getElementById('fileHint').innerHTML = fileName +' already exists!';
            return;
        }
        else{
            var acl = new Array();
            document.getElementById('fileHint').innerHTML = 'The file is created successfully. By default, only the root user can operate this file.';
            console.log(1);
            for(let i=0;i<userList.length;i++){
                var a = createAclFactor(userList[i],'0','0','0');
                acl.push(a);
            }
            aclList.push(createFile(fileName,acl));
            console.log(aclList);
            updateFile();
        }
    }
    else{
        //删
        if(n == -1){
            document.getElementById('fileHint').innerHTML = 'Cannot find '+ fileName +' ！';
            return;
        }
        else{
            document.getElementById('fileHint').innerHTML = fileName +' successfully deleted！';
            aclList.splice(n,1);
            updateFile();
        }
    }
    //本地存储
    //setItem("",);
}

function alterUser(){
    //增删用户
    var au = document.getElementById('alterUser').childNodes;
    var mu = -1  //新增用户1 删除用户0
    var userName = au[1].value;//用户名
    if(au[4].childNodes[1].checked == true){
        mu = 1; 
    }
    else if(au[7].childNodes[1].checked == true){
        mu = 0;
    }
    if(mu == -1){
        document.getElementById('userHint').innerHTML = 'Please select an action！';
        return;
    }
    else if(userName == ''){
        document.getElementById('userHint').innerHTML = 'Please enter the user name！';
        return;
    }

    var n = -1//user 在userList中的下标
    for(let i=0;i<userList.length;i++){
        if(userName == userList[i]){
            n = i;
            break;
        }
    }

    if(mu == 1){
        //增
        if(n != -1){
            document.getElementById('userHint').innerHTML = userName +' already exists!';
            return;
        }
        else{
            var acl_factor = createAclFactor(userName,'0','0','0');//默认权限置0
            document.getElementById('userHint').innerHTML = 'User created successfully! No permission by default!';
            //将acl_factor添加到每个file的acl表中
            for(let i=0;i<aclList.length;i++){
                aclList[i].acl.push(deepClone(acl_factor));
            }
            userList.push(userName);//添加文件名
            console.log(aclList);
            console.log(userList);
            updateUser();//刷新
        }
    }
    else{
        //删
        if(n == -1){
            document.getElementById('userHint').innerHTML = 'Cannot find '+ userName +' ！';
            return;
        }
        else{
            document.getElementById('userHint').innerHTML = userName +' successfully deleted！';
            userList.splice(n,1); //user表清除
            //找到cal表中该user的位置 j
            var j = -1;
            for(let i=0;i<aclList[0].acl.length;i++){
                if(userName == aclList[0].acl[i].userName){
                    j = i;
                }
            }
            console.log('j '+j)
            //每个file的acl中清除对应用户的权限信息
            for(let i=0;i<aclList.length;i++){
                aclList[i].acl.splice(j,1);
            }

            console.log(aclList);
            console.log(userList);

            updateUser();
        }
    }
}

function alterPermissions(){
    //权限验证
    //获取选中文件名
    var fileList = document.getElementById('fileView2').childNodes;
    var fileName = "";
    for(let i=0;i<fileList.length;i++){
        if(fileList[i].lastChild.firstChild.checked == true){
            fileName = fileList[i].lastChild.firstChild.getAttribute('value');
            break;
        }
    }
    var acl;//aclList列表对应的acl
    for(let i=0;i<aclList.length;i++){
        if(aclList[i].fileName == fileName){
            acl = aclList[i].acl;
        }
    }
    //获取用户名
    var userLs = document.getElementById('userView2').childNodes;
    var userName = "";
    for(let i=0;i<userLs.length;i++){
        if(userLs[i].lastChild.firstChild.checked == true){
            userName = userLs[i].lastChild.firstChild.getAttribute('value');
        }
    }
    //查acl表
    var vlist;//对应用户权限信息
    for(let i=0;i<acl.length;i++){

        if(acl[i].userName == userName){
            vlist = acl[i];
        }
    }
    //获取权限
    var v = document.getElementById("modifyPermissions").childNodes;
    var r = v[1].checked;
    var w = v[3].checked;
    var x = v[5].checked;

    //重新赋值
    vlist.r = r;
    vlist.w = w;
    vlist.x = x;
    //弹出提示
    alert("重置权限成功！");
}

function updateButtonClick(){
    //按钮点击触发
    //验证权限
    document.getElementById("submit").onclick = verify;
    //增删文件
    document.getElementById('mf').onclick = alterFile;
    //增删用户
    document.getElementById('mu').onclick = alterUser;
    //更改权限
    document.getElementById('modify').onclick = alterPermissions;
}


