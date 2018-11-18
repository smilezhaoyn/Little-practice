

//懒加载
data.push(...data);
// console.log(data)
//重绘的方法
function redraw(data){  
    let list = document.getElementById('list');
    let html = '';
    data.forEach( (e,i) => {
        html += `
        <li>
        <img data-src="${e.img}" alt="">
        <span>${e.title}</span>
        <span>${e.time}</span>
        <span>${e.hot}</span>
        <span>${e.price}</span>
        </li>
        `;
    });

    list.innerHTML = html;
}
redraw(data);
//以上是重绘，将数据填充到页面中
let lis = list.getElementsByTagName('li');
let timer = null;
// console.log(lis)
let Vis = window.innerHeight;  //获得可视区的高度

//滚轮事件
loading();//先调用一次loading事件是因为刚开始有在可视区范围的

window.onscroll = function(){  //这里用定时器是怕刷新频率过大，加载吧出来
    clearInterval(timer);
    timer = setTimeout(() => {
        loading();
    },50);
}

//懒加载（外加图片看有没有坏的）
function loading(){  

    for(let i =0;i<lis.length;i++){
        // console.log(lis.length);
        let lisH = lis[i].getBoundingClientRect().top;  //获取每一个li到顶部的距离
        let imgs = lis[i].getElementsByTagName('img')[0];  //获取每一个li下边的img元素
        // console.log(imgs)
        // console.log(imgs.dataset.src)
        // console.log(lisH) 
        if(lisH <= Vis){  //当lis的每一个到顶部的距离小于可视区范围时候，让他显示
            if(imgs.dataset.src){
                let newImg = new Image;  //新建一个img
                newImg.src = imgs.dataset.src;
                newImg.onload = function(){
                    imgs.src = imgs.dataset.src;
                    imgs.style.opacity = 1;
                    setTimeout(() => {
                        imgs.dataset.src = '';
                    },50);
                }
                newImg.onerror = function(){
                    imgs.src = './img/timg.jpg';
                    imgs.style.opacity = 1;
                    setTimeout(() => {
                        imgs.dataset.src = '';
                    },50);
                }
            }
    
        }
    }


}

let btns = Array.from(document.querySelectorAll('.header a'));
// console.log(btns)
//排序从大到小
function sortingM(e){
    data.sort((a,b) => {
        let kk = e.dataset.kk;
        // console.log(kk === 'time')
        if(kk === 'time'){
            return b[kk].replace(/-/g,'') -a[kk].replace(/-/g,'');
        }else{
            return b[kk] - a[kk];
        }  
    });

}

//从小到大

function sortingS(e){
    data.sort((a,b) => {
        let kk = e.dataset.kk;
        // console.log(kk === 'time')
        if(kk === 'time'){
            return a[kk].replace(/-/g,'') -b[kk].replace(/-/g,'');
        }else{
            return a[kk] - b[kk];
        }  
    });

}

let prev = btns[0];//存一个自己
// console.log(prev)
//点击各自按钮排序
btns.forEach((e,i) => {
    e.onoff = true;
    e.onclick = function(){
        if(prev !=e){
            // console.log(prev.children[0])
            prev.children[0].classList.remove('bg');
            prev.children[1].classList.remove('bg');
        }
        if(this.onoff){
            sortingM(e);
            this.children[0].classList.add('bg');
            this.children[1].classList.remove('bg');
        }else{
            sortingS(e);
            this.children[1].classList.add('bg');
            this.children[0].classList.remove('bg');
        }
        this.onoff = !this.onoff;
        prev = this;

         
        redraw(data);
        loading();
    }

});

//搜索

let txt = document.getElementById('txt'),  //搜索框的id
sele = document.getElementById('sele'), //下拉框的ID
inte1 = document.getElementById('inte1'), //区间1
inte2 = document.getElementById('inte2'),//区间1
search = document.getElementById('search'), //搜索
reset = document.getElementById('reset');//重置

search.onclick = function(){
    let con = txt.value.trim();  //获取txt的内容，并去除首位空格
    if(!txt.value && !inte1.value && !inte2.value ){//&& !sele.value
        if(!con){
            alert('请输出内容');
            return;
        }
    }

    let re = new RegExp('^(huawei|hua|华|hw|为)$','i');
    let d = data.filter((e) => {
        console.log(sele.value === 'price' )
        if(sele.value === 'price' || sele.value === ''){
            if(inte1.value != '' && inte2.value != ''){
                console.log(e['price'])
                return e[sele.value] >= inte1.value  &&  e[sele.value] <=  inte2.value;
            }else if(inte1.value != '' && inte2.value == ''){
                return e[sele.value] >= inte1.value;
            }else if(inte1.value == '' && inte2.value != ''){
                return e[sele.value] <= inte2.value;
            }
        }

        if(re.test(con)){
            return e[sele.value].includes('HUAWEI');
        }

        return new RegExp(con,'i').test(''+e[sele.value]);
    });
    redraw(d);
    loading();
}

reset.onclick = function(){
    txt.value = '';
    inte1.value = '';
    inte2.value = '';
    // redraw(data);

}