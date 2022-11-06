let yes = ["ใช่", "เคย", "มี"];
let no = ["ไม่", "ป่าว"];

let symptom = 0;
let round = 0;
let is_continue = true;
let st_time = true;
let finish = false
let symptom_text = shuffle(["ปวดศรีษะ ครั่นเนื้อครั่นตัว ปวดเมื่อยตามตัว", "จับไข้หนาวสั่น", "หรือเคยเข้าไปในดงมาลาเรีย"]);
function getBotResponse(input) {
    console.log(tokenizer(input));
    if(st_time){
        st_time = false;
        return "แล้วเคยมีอาการ" + symptom_text[round] + "หรือป่าวคะ";
    }
    while(round < 2){
        if(tokenizer(input) == "no"){
            round = round + 1;
            return "เคยมีอาการ" + symptom_text[round] + "หรือป่าวคะ";
        }
        else if(tokenizer(input) == "yes"){
            symptom = 1
            round = round + 1;
            if(round < 2){
                return "เคยมีอาการ" + symptom_text[round] + "หรือป่าวคะ";
            }
            else{
                return "มีอาการอะไรเพิ่มเติมหรือป่าวคะ บอกมาได้เลยค่ะ";
            }
        }
        else{
            return "ลองพิมพ์ใหม่อีกครั้งค่ะ"
        }
    }

    if(tokenizer(input) == "no"){
        finish = true;
        return diagnosis();
    }
    else if(tokenizer(input) == "yes"){
        symptom = symptom + 1
        finish = true;
        return diagnosis();
    }
    else{
        return "ลองพิมพ์ใหม่อีกครั้งค่ะ"
    }
}

function diagnosis(){
    if(isMalaria()){
        return "ผลการวินิจฉัยคือ คนไข้มีโอกาศจะเป็นโรค มาลาเรีย ค่ะ\nแนะนำให้พบเเพทย์เพื่อวินิจฉัยและรักษาโรคในลำดับถัดไปค่ะ";
    }
    else{
        return "สบายใจได้ค่ะ จากการวินิจฉัย คุณไม่มีอาการใดๆค่ะ";
    }
}

function isMalaria(diagnose){
    if(symptom > 0){
        return true;
    }
    return false;
}

function tokenizer(input){
    for(let i=0; i<input.length-2; i++){
        sub_str = "";
        sub_str += input[i] + input[i+1] + input[i+2];
        for(let s=0; s<2; s++){
            if(sub_str == yes[s] || sub_str[0] + sub_str[1] == "มี"){
                return "yes";
            }
            else if(sub_str == no[s]){
                return "no";
            }
        } 

    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }