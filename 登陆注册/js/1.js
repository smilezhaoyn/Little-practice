
let inputs = Array.from(document.getElementsByTagName('input'));

let d = '';
let m = '';

let re = {
    qq:/^[1-9]\d{4,10}&/,
    email:/^[A-Za-z]\w{5,18}@[1-9A-Za-z]{2,8}(\.(com|cn|net){1,2})$/,
    phon:/^1[3456789]\d{9}$/,
    day:/^(\d+)\D+(0?[1-9]|1[0-2])\D+(0?[1-9]|[1-2][0-9]|3[0-1])\D*$/
}

let arr = [];
inputs.forEach((e,i) => {
    arr.push(false);
    e.Name = e.className;

    e.oninput = function(){
        if(re[this.Name].test(this.value)){
            
            //判断年月日
            if(this.Name === 'day'){
                this.value.replace(re.day,function($0,$1,$2,$3){
                    d = `${$1}/${$2}/${$3} `;
                    m = $2*1;
                })
                let time = new Date(d);
                let M = time.getMonth() +1;
                let nowDate = new Date();
                if(m == M && time < nowDate ){
                    console.log(m == M && time < nowDate)
                    this.classList.remove('nook');
                    this.classList.add('ok');
                    arr[i] = true;
                }else{
                    this.classList.remove('ok');
                    this.classList.add('nook');
                    arr[i] = false;
                }

                // let time = new Date(this.value)
                // // console.log(time)
                // let M = time.getMonth()+1;
            }else{
                this.classList.remove('nook');
                this.classList.add('ok');
                arr[i] = true;
            }



        }else{
            this.classList.remove('ok');
            this.classList.add('nook');
            arr[i] = false;
        }
    }
    btn.disabled = !arr.every(e => e);
    btn.className = !arr.every(e =>e)?'bnd':'nd';
});
