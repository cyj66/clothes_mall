import {request} from './request'

export function getDetail(iid){
    return request({
        url:'/detail',
        params:{iid}
    })
}

export class Goods{
    constructor(itemInfo,columns,services){
        this.title=itemInfo.title;
        this.price=itemInfo.price;
        this.oldPrice=itemInfo.oldPrice;
        this.discount=itemInfo.discount;
        this.columns=columns;
        this.services=services;

        this.desc=itemInfo.desc;
        this.realPrice=itemInfo.lowNowPrice
    }
}

export function getRecommend(){
    return request({
        url:'/recommend'
    })
}