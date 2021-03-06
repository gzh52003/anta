const express = require('express');
const router  = express.Router();
const mongo   = require('../../utils/mongo');
const {formatData} = require('../../utils/tools');

router.get('/', async (req, res) => {
    let {page=1,size=10,sort="add_time",total=1} = req.query;
    const skip = (page-1)*size; //0
    const limit = size*1; //10

    
    // 处理排序参数
    sort = sort.split(',');// ['price'],['price','-1']
    // 查询所有商品
    const result = await mongo.find('goods',{},{skip,limit,sort,total})

    res.send(formatData({data:result}));
})

router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    try{
        const result = await mongo.remove('goods',{_id:id})
        res.send(formatData())
    }catch(err){
        res.send(formatData({code:0}));
    }
})
router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    try{
        const result = await mongo.find('goods',{_id:id})
        res.send(formatData({data:result[0]}))
    }catch(err){
        res.send(formatData({code:0}));
    }
})
router.get('/:id/inv',async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    const result = await mongo.find('goods',{_id:id},{
    });
    res.send(formatData({data:{inv:result[0].inv,num:result[0].num}}));
})
router.post('/dis',async (req,res)=>{

    let {tag} = req.body;
 
    const result = await mongo.find('goods',{tag});
    console.log(1,'result')
    res.send(formatData({data:{result}}));
})

module.exports = router;