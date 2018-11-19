

(function(){

    class goods {

        constructor(ele,price,index){

            // this.ele = document.getElementsByTagName(ele)[0];  //获取到li
            this.ele = ele;
            // console.log(this.ele)
            this.i = this.ele.getElementsByTagName('i');  //获取到i 加 减
            // console.log(this.i)
            this.em = this.ele.getElementsByTagName('em')[0];  //获取em
            // console.log(this.em)
            this.strong = this.ele.getElementsByTagName('strong');
            this.price =this.strong[0]; //单价
            this.subtotal = this.strong[1];  //小计
            this.num =0;
            this.pri = price;
            this.xiaoji = 0; //小计
            this.index = index;
            // this.info = document.getElementById('info').getElementsByTagName('em');
            // this.total = this.info[0];  //合计
            // console.log(this.total)
            this.he = 0;
            this.page();
            
        }
        //事件
        init(){
            //点击--
            this.i[0].onclick = () =>{
                this.remove();
                // this.heji();
                this.page();

            }
            //点击++
            this.i[1].onclick = () => {
                this.add();
                // this.heji();
                this.page();
                
            }


        }

        //点击++ 的时候
        add(){
            // console.log(this.num)
            this.num ++;
           return this.num;
           
        }
        // 点击 -- 的时候
        remove(){
            this.num --;
            if(this.num <=0){
                this.num = 0;
            }
        }
        //将得到的数据 添加的页面中
        page(){
            this.xiaoJ();
            this.heji();
            // this.qiuhe();
            Nice.prototype.init.call(new Nice,this.heji());
            this.em.innerHTML = this.num;
            this.price.innerHTML = this.pri + '元';
            this.subtotal.innerHTML = this.xiaoji + '元';
             
        }
        //小计的和
        xiaoJ(){
            this.xiaoji = this.num * this.pri;
            return this.xiaoji;
        }

        //商品共合计 

        heji(){
            heji[this.index] = this.num;
            huafei[this.index] = this.xiaoji;
            zuida[this.index] = (this.num === 0) ? 0:this.pri; 

            return {
                heji,
                huafei,
                zuida
            }
        
        }



    }


    class Nice {
       constructor(){
        this.info = document.getElementById('info').getElementsByTagName('em');
       }

       init(a){
        
        this.qiuhe(a);
        this.Ahtml();

       }
       //求和
       qiuhe(a){
        this.he = a.heji.reduce(function(t,e){
            return t+e;
        },0);
        console.log(this.he)

        this.he1 = a.huafei.reduce(function(t,e){
            return t+e;
        },0);

        this.max = Math.max(...a.zuida);
        // console.log(this.max)
    }

    Ahtml(){
        this.info[0].innerHTML = this.he ;  //合计
        this.info[1].innerHTML = this.he1;  //花费  
        this.info[2].innerHTML = this.max; 
    }

       
    }
        let lis = document.getElementsByTagName('li');
        let arr = [12.5,10.5,8.5,8,14.5];
        let heji = [];
        let huafei = [];
        let zuida = [];

        arr.forEach( (e,i) => {
            let p = new goods(lis[i],e,i);
            p.init();
            heji[i] = 0;
            huafei[i] =0;
            zuida[i] = 0;
            
        });
    
    

    window.goods = goods;
    
    
    //reduce()
})();