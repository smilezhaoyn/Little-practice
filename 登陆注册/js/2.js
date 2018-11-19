let inputs = Array.from(document.getElementsByTagName('input'));
let btn = document.getElementById('btn');
let m = 0;
let d = '';
let re = {
    qq:/^[1-9]\d{4,10}$/,
    email:/^[A-Za-z]\w{5,18}@[1-9A-Za-z]{2,8}(\.(com|cn|net){1,2})$/,
    phon:/^1[3456789]\d{9}$/,
    day:/^(\d+)(-|\/|年)+(0?[1-9]|1[0-2])(-|\/|月)+(0?[1-9]|[1-2][0-9]|3[0-1])(日){0,1}$/
}

let arr = [];
inputs.forEach((e,i) => {
    arr.push(false);
    e.Name = e.className;
    e.oninput = function(){
        if(re[this.Name].test(this.value)){
            console.log(this.Name === 'day')
            if(this.Name === 'day'){
                this.value.replace(re.day,function($0,$1,$2,$3,$4,$5,$6){
                    // console.log($1)
                    // console.log($1,$3,$5)
                    m = $3 *1;  //得到填写时候的月数
                    d = `${$1}/${$3}/${$5}`;  //得到填写时候的年月日
                    // console.log(m)
                });
                let time = new Date(d);
                let M = time.getMonth() +1;
                // console.log(M)

                let nowDate = new Date();

                if(m == M && time < nowDate){
                    this.classList.remove('nook');
                    this.classList.add('ok');
                    arr[i] = true;
                }else{
                    this.classList.remove('ok');
                    this.classList.add('nook');
                    arr[i] = false;
                }
            }else{
                this.classList.remove('nook');
                this.classList.add('ok');
                arr[i] = true;
            }
            // console.log(this.value);
            
        }else{
            this.classList.remove('ok');
            this.classList.add('nook');
            arr[i] = false;
        }

        disabled = !arr.every( e => e);   //设置初始值为false(every判断全部一样不一样，全部一样则为true)
        btn.className = !arr.every(e => e) ?'bnd' : 'nd';

    }
    // console.log(arr)
});





