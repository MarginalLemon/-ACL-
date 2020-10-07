def main():
    '初始界面'
    s = '0'
    while s != '2':
        print('_'*30)
        print('欢迎使用DBMS身份验证模拟系统！')
        print('{:—^26}'.format('选项'))
        print('1.登录OS')
        print('2.退出')
        s = input('请输入功能序号：')
        if s == '1':
            main2()
        elif s == '2':
            print('已退出DBMS身份验证模拟系统，感谢您的使用!')
       
def main2():
    '登录OS'
    while 1:
        print('_'*30)
        userName = input('请输入OS用户名：')
        password = input('请输入密码：')
        try:
            fo = open('C:\\...\OSuser.txt','r')
        except:
            print('打开文件错误！')
        else:
            osls = fo.readlines()
            fo.close()
            '处理文件中的数据'
            OS_userls = [] #用户列表
            for i in osls:
                i = i.split(' '3)#分割成列表
                OS_user = {} #用户字典
                OS_user['userName'] = i[0]
                OS_user['password'] = i[1][0:-1]
                OS_userls.append(OS_user)
            print(OS_userls)
            '查找用户名并验证密码是否正确'
            flag = 0 #验证成功置1
            for i in OS_userls:
                if userName == i['userName'] and password == i['password']:
                    print('验证成功！')
                    flag = 1
                    break
            if flag == 1:
                main3()
                break
            else:
                print('验证失败！')
    

def main3():
    '自适应数据库登录'
    print('请选择登录数据库的方式')
    s = '0'
    
    
    while s != '3':
        print('{:—^26}'.format('选项'))
        print('1.OS验证')
        print('2.DBMS验证')
        print('3.退出数据库登陆界面')
        s = input('请输入功能序号：')
        if s == '1':
            print('验证成功！OS用户权限：增 删 改 查')
        elif s == '2':
            main4()
        elif s == '3':
            print('已退出！')
            break
        else:
            print('功能号不存在，请重新输入！')

def main4():
    'DBMS登录'
    print('_'*30)
    userName = input('请输入DB用户名：')
    password = input('请输入密码：')
    try:
        fo = open('C:\\..DBuser.txt','r')
    except:
        print('打开文件错误！')
    else:
        dbls = fo.readlines()
        fo.close()
        '处理文件中的数据'
        DB_userls = [] #用户列表
        for i in dbls:
            i = i.split(' ')#分割成列表
            DB_user = {} #用户字典
            DB_user['userName'] = i[0]
            DB_user['password'] = i[1]
            DB_user['a'] = i[2][0:-1] #权限 增删改查 1/0
            DB_userls.append(DB_user)
        print(DB_userls)
        '查找用户名并验证密码是否正确'
        flag = 0 #验证成功置1
        for i in DB_userls:
            if userName == i['userName'] and password == i['password']:
                str = ''#权限内容
                if i['a'][0] == '1':str = str+'增 '
                if i['a'][1] == '1':str = str+'删 '
                if i['a'][2] == '1':str = str+'改 '
                if i['a'][3] == '1':str = str+'查 '
                print('验证成功！用户权限：'+str)
                flag = 1
                break
        if flag != 1:
            print('验证失败！')

if __name__ == '__main__':
    main()
