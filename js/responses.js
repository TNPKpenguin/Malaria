let yes = ["ใช่", "เคย", "มี"];
let no = ["ไม่", "ป่าว"];

let symptom = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let round = 0;
let is_continue = true;
let st_time = true;
let finish = false
let symptom_text = ["ไม่ค่อยรู้สึกตัว ปวดศีรษะมาก อาเจียนรุนแรง", "คอแข็ง กระหม่อมโปร่งตึงในเด็กเล็ก", "หรือเคยเข้าไปในดงมาลาเรีย", "ถูกสุนัขหรือแมวกัดหรือข่วน กลัวน้ำ กลัวลม", "แขนขาอ่อนแรง อัมพาตฉับพลัน", "เหงื่อออก ตัวเย็น กระสับกระส่าย ชีพจรเบาเร็ว", "มีไข้นานเกิน 1 เดือน", "ไอและน้ำหนักตัวลดฮวบ", "ปวดข้อนิ้วมือ 2 ข้าง ผมร่วง", "จับไข้หนาวสั่นวันเว้นวันและเคยไปในดงมาลาเรีย", "มีจุดแดงที่เยื่อบุตา ใต้เล็บ", "มีจุดแดงจ้ำเขียวขึ้นตามตัว หรือ มีก้อนบวมข้างคอ"];
function getBotResponse(input) {
    console.log(tokenizer(input));
    if(st_time){
        st_time = false;
        return "แล้วเคยมีอาการ" + symptom_text[round] + "อย่างใดอย่างหนึ่งหรือป่าวคะ";
    }
    while(is_continue){
        if(tokenizer(input) == "no"){
            if(round < 1){
                round = 4;
            }
            if(round >= 1){
                round = round + 1;
            }
            if(round > 11){
                is_continue = false
                return "มีอาการอะไรเพิ่มเติมหรือป่าวคะ บอกมาได้เลยค่ะ";
            }
            return "เคยมีอาการ" + symptom_text[round] + "หรือป่าวคะ";
        }
        else if(tokenizer(input) == "yes"){
            symptom[round] = 1;
            if(round < 1){
                round = round + 1;
                return "เคยมีอาการ" + symptom_text[round] + "หรือป่าวคะ";
            }
            else{
                is_continue = false;
                return "มีอาการอะไรเพิ่มเติมหรือป่าวคะ บอกมาได้เลยค่ะ";
            }
        }
        else{
            return "ลองพิมพ์ใหม่อีกครั้งค่ะ"
        }
    }
    if(diagnosis() == "สบายใจได้ค่ะ จากการวินิจฉัย คุณไม่มีอาการใดๆค่ะ"){
        finish = true;
        return diagnosis();
    }
    else if(tokenizer(input) == "no"){
        finish = true;
        return "ผลการวินิจฉัยคือ คนไข้มีโอกาศจะเป็นโรค " + diagnosis() + "ค่ะ\nแนะนำให้พบเเพทย์เพื่อวินิจฉัยและรักษาโรคในลำดับถัดไปค่ะ      ***แหล่งรักษาพยาบาล  โรงพยาบาลหัวเฉียว คลีนิกหัวเฉียว***";
    }
    else if(tokenizer(input) != "yes" && tokenizer(input) != "no"){
        finish = true;
        return "ผลการวินิจฉัยคือ คนไข้มีโอกาศจะเป็นโรค " + diagnosis() + "ค่ะ\nแนะนำให้พบเเพทย์เพื่อวินิจฉัยและรักษาโรคในลำดับถัดไปค่ะ      ***แหล่งรักษาพยาบาล  โรงพยาบาลหัวเฉียว คลีนิกหัวเฉียว***";
    }
    else{
        return "ลองพิมพ์ใหม่อีกครั้งค่ะ"
    }
}

function diagnosis(){
    if(compare([1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])){
        return "เยื้อหุ้มสมองอักเสบ เลือดออกในสมอง ฝีในสมอง";
    }
    else if(compare([1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0])){
        return "มาลาเรียขึ้นสมอง";
    }
    else if(compare([1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])){
        return "โรคพิษสุนัขบ้า";
    }
    else if(compare([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])){
        return "อาจเป็นสมองอักเสบ, เล็บโตสไปโรซิส หรือสาเหตุร้ายแรงอื่นๆ";
    }
    else if(compare([0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0])){
        return "ภายใน 24 ชั้วโมง อาจเป็นโปลิโอหรือไขสันหลังอักเสบ";
    }
    else if(compare([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0])){
        return "ช็อก";
    }
    else if(compare([0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0])){
        return "วัณโรคปอด";
    }
    else if(compare([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0])){
        return "เอสแอลอี";
    }
    else if(compare([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0])){
        return "มาลาเรียเรื้อรัง";
    }
    else if(compare([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0])){
        return "เยื่อบุหัวใจอักเสบเรื้องรัง";
    }
    else if(compare([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0])){
        return "ภายใน 3 วัน อาจเป็นมะเร็งเม็ดเลือดขาว มะเร็งต่อมน้ำเหลือง";
    }
    else if(compare([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])){
        return "สบายใจได้ค่ะ จากการวินิจฉัย คุณไม่มีอาการใดๆค่ะ";
    }
    else{
        return "ลักษณะอาการไม่แน่ชัดควรปรึกษาแพทย์ค้ะ";
    }
}

function compare(diagnose){
    for(let i=0; i<12; i++){
        if(symptom[i] != diagnose[i]){
            return false;
        }
    }
    return true;
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