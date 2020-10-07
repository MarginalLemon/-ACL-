import random
pr_ls=[]  #存放进程
current_time = 0 #当前时间
time_piece = 1 #时间片
def create_pr():
    '创建进程'
    global pr_ls #全局变量
    while True:
        print("请输入要创建的进程信息(结束输入q):")
        pid = input("PID:")
        if pid == 'q':
            return 
        count = input("分配彩票数(不超过100张)：")
        if count == 'q':
            return 
        arrivet_time = input("到达时间：")
        if arrivet_time == 'q':
            return
        zz_time = input("周转时间：")
        if zz_time == 'q':
            return
        pr={} #建立字典存放一个进程信息
        pr['PID'] = pid
        pr['count'] = int(count)
        pr['arrivet_time'] = int(arrivet_time)
        pr['zz_time'] = int(zz_time)
        pr['need_time'] = int(zz_time) #创建时，所需时间等于周转时间
        pr_ls.append(pr) #将进程放入进程列表
def sort():
    '按照到达时间排序'
    '写了但没用上，因为是抽奖没必要排序，说明彩票调度可以减少一部分排序所需的带宽'
    pr_ls.sort(key = lambda x:x['arrivet_time'])

def display(ls):
    '打印进程信息'
    print("PID\t\t" + "count\t\t" + "arrivet_time\t\t"+"zz_time\t\t"+"need_time\t\t")
    for pr in ls:
        print(pr['PID']+"\t\t"+str(pr['count'])+"\t\t"+str(pr['arrivet_time'])+"\t\t\t"+str(pr['zz_time'])+"\t\t"+str(pr['need_time']))
    print(' ') #空行

def sum(pr_ls):
    "计算当前彩票总数"
    sum = 0
    for i in pr_ls:
        sum += i['count']
    return sum

def lottery_scheduling_algorithm():
    '彩票调度算法'
    global pr_ls #全局变量
    global current_time #全局变量
    ls = []       #当前列表
    while len(pr_ls) != 0:
        '将到达进程塞进当前列表'
        for i in range(len(pr_ls)):
            if pr_ls[i]['arrivet_time'] == current_time:
                ls.append(pr_ls[i])
        '运行一个时间片'
        current_time +=time_piece #当前时间
        if len(ls) == 0:  #当前队列无进程
            continue
        else:
            totalticks = sum(ls) #总票数
            winner = random.randint(1,totalticks) #抽奖环节
            print("当前时间："+str(current_time)+" 抽奖范围：1 - "+str(totalticks) + " 中奖数字："+str(winner))
            '看看是哪个幸运鹅'
            counter = 0 #累计票额
            pr = 0
            while pr<len(ls):
                counter += ls[pr]['count']
                if counter >= winner:
                    '中奖了！更新进程信息'
                    ls[pr]['need_time'] -= 1 #更新当前列表
                    if ls[pr]['need_time'] < 1: 
                        '进程完成杀死进程'
                        i = pr_ls.index(ls[pr]) #定位总表位置
                        ls.pop(pr)
                        pr_ls.pop(i)
                    break
                pr +=1
            if(len(ls) != 0):
                print("当前队列中进程信息：")
                display(ls)
    print("\n调度结束，当前无进程！")


def main():
    create_pr()  #创建进程并分配彩票
    #sort() 不需要排序 
    lottery_scheduling_algorithm()  #彩票调度

if __name__ == '__main__':
    main()
