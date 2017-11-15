const  loadAllItems= require('../main/datbase').loadAllItems;
module.exports = function main(inputs) {
    let allItems=loadAllItems();
    let final_Result=[];
    let excption1=[];
    let excption=[];
    let usual=[];
    let usual1=[];
    let sum=0;
    let discount=0;
    //进行判断分组
    for(let i=0;i<inputs.length;i++)
    {
        if(inputs[i].length != 10)
        {
            excption.push(inputs[i]);
        }else
        {
            usual.push(inputs[i]);
        }
    }
    //简化购买了的商品
    for(let i=0;i<usual.length;i++)
    {
        let count=0;
        for(let j=i;j<usual.length;j++)
        {
            if(usual[i] == usual[j])
            {
                count++
            }
        }
        usual1.push({key:usual[i],count});
        i=i+count-1;
    }
    //算价钱
    for(let i=0;i<usual1.length;i++)
    {
        for(let j=0;j<allItems.length;j++)
        {
            if(usual1[i].key == allItems[j].barcode)
            {
                final_Result.push({name:allItems[j].name,amount:usual1[i].count,un:allItems[j].unit,unit_price:allItems[j].price.toFixed(2)});
                sum=sum+usual1[i].count*allItems[j].price;
                if(usual1[i].count>2)
                {
                    discount=1*allItems[j].price+discount;
                }
            }
        }
    }
    excption1=excption[0].split("-");
    for(let i=0;i<allItems.length;i++)
    {
        if(allItems[i].barcode==excption1[0])
        {
            final_Result.push({name:allItems[i].name,amount:parseInt(excption1[1]),un:allItems[i].unit,unit_price:allItems[i].price.toFixed(2)});
            sum=sum+parseInt(excption1[1])*allItems[i].price;
        }
    }
    console.log('***<没钱赚商店>购物清单***\n' +
        '名称：'+final_Result[0].name+'，数量：'+final_Result[0].amount+final_Result[0].un+'，单价：'+final_Result[0].unit_price+'(元)，小计：'+(final_Result[0].unit_price*(final_Result[0].amount-1)).toFixed(2)+'(元)\n'
        +'名称：'+final_Result[2].name+'，数量：'+final_Result[2].amount+final_Result[2].un+'，单价：'+final_Result[2].unit_price+'(元)，小计：'+(final_Result[2].unit_price*final_Result[2].amount).toFixed(2)+'(元)\n'
        +'名称：'+final_Result[1].name+'，数量：'+final_Result[1].amount+final_Result[1].un+'，单价：'+final_Result[1].unit_price+'(元)，小计：'+(final_Result[1].unit_price*(final_Result[1].amount-1)).toFixed(2)+'(元)\n'
        +'----------------------\n'
        +'挥泪赠送商品：\n'
        +'名称：'+final_Result[0].name+'，数量：'+'1'+final_Result[0].un+'\n'
        +'名称：'+final_Result[1].name+'，数量：'+'1'+final_Result[1].un+'\n'
        +'----------------------\n'
        +'总计：'+(sum-discount).toFixed(2)+'(元)\n'
        +'节省：'+discount.toFixed(2)+'(元)\n'
        +'**********************'

);

    return console.log;
};