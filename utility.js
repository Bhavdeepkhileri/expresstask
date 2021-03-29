
function aInLanguage(Obj){
    let array=Obj['languages'];
    const result = array.filter(word => word.includes('a')||word.includes('A'));
    return result;
}

function concatLanguage(Obj){
    let array=Obj['languages'];
    array=array.concat(Obj['dialects']);
    return array;
}
function countryCode(Obj)
{
    let templength=Obj['phoneNumber'].length-10;
    let temp='';
    for(let i=0; i<templength;i++)
    {
        temp+=Obj['phoneNumber'][i];
    }
    return temp;
}
function phoneNumber(Obj)
{

    let temp='';
    let templength=Obj['phoneNumber'].length-10;
    for(let i=templength;i<Obj['phoneNumber'].length;i++)
    {
        temp+=Obj['phoneNumber'][i];
    }
    return temp;
}
function numberModification(Obj)
{
    let n1=''+Obj['number1'];
    let n2=''+Obj['number2'];
    let temp='';
    for(let i=0; i<n1.length;i++)
    {
        if(i%2==0)
        {
            temp+=n1[i];
            temp+=n2[i];
        }
        else
        {
            temp+= +n1[i]*+n2[i];
        }
    }
    return temp;
}
module.exports={
    aInLanguage,
    concatLanguage,
    countryCode,
    phoneNumber,
    numberModification
}