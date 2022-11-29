const asyncHandler = require('express-async-handler')
const BasicQA = require('../models/BasicQA')
const DataSecurity = require('../models/DataSecurityQA')
const DDOS = require('../models/DDOS')



exports.SaveBasicAnswer=asyncHandler(async(req,res)=>{
    const basicAnswer= BasicQA.create({
        userId:req.user.id,
        Answers:req.body.Answers
        
    })
    res.status(200).send('ANSWER SAVE SUCCESSFULLY')
})
exports.SaveDataSecurityAnswer=asyncHandler(async(req,res)=>{
    const dataAnswer= DataSecurity.create({
        userId:req.user.id,
        Answers:req.body.Answers
        
        
    })
    res.status(200).send('ANSWER SAVE SUCCESSFULLY')
})
// exports.SaveDataSecurityAnswer=asyncHandler(async(req,res)=>{
//     const dataAnswer= DataSecurity.create({
//         userId:req.user.id,
//         Answers:req.body.Answers
        
//     })
//     res.status(200).send('ANSWER SAVE SUCCESSFULLY')
// })
exports.SaveDDOSAnswer=asyncHandler(async(req,res)=>{
    const dataAnswer= DDOS.create({
        userId:req.user.id,
        Answers:req.body.Answers
        
    })
    res.status(200).send('ANSWER SAVE SUCCESSFULLY')
})
exports.getBasicQScore=asyncHandler((async(req,res)=>{
    const basicRisk= await BasicQA.find({userId:req.user.id})
    const length=basicRisk.length;
    const data = basicRisk[length-1]
    if(!data){
        res.status(200).json({
            success:true,
            data:{
                data:{
                    Answers:[]
                }
            }
        })
    }else{
    res.status(200).send({
        success:"true",
        length:length,
        data:{
           data
        }
    })}
}))
exports.SecondLastgetBasicQScore=asyncHandler((async(req,res)=>{
    const basicRisk= await BasicQA.find({userId:req.user.id})
    const length=basicRisk.length;
    const data = basicRisk[length-2]
    if(!data){
        res.status(200).json({
            success:true,
            data:{
                data:{
                    Answers:[]
                }
            }
        })
    }else{
    res.status(200).send({
        success:"true",
        length:length,
        data:{
           data
        }
    })}
}))
exports.SecondLastgetSecurityQScore=asyncHandler((async(req,res)=>{
    const basicRisk= await DataSecurity.find({userId:req.user.id})
    const length=basicRisk.length;
    const data = basicRisk[length-2]
    if(!data){
        res.status(200).json({
            success:true,
            data:{
                data:{
                    Answers:[]
                }
            }
        })
    }else{
    res.status(200).send({
        success:"true",
        length:length,
        data:{
           data
        }
    })}
}))
exports.SecondLastDDOS=asyncHandler((async(req,res)=>{
    const basicRisk= await DDOS.find({userId:req.user.id})
    const length=basicRisk.length;
    const data = basicRisk[length-2]
    if(!data){
        res.status(200).json({
            success:true,
            data:{
                data:{
                    Answers:[]
                }
            }
        })
    }else{
    res.status(200).send({
        success:"true",
        length:length,
        data:{
           data
        }
    })}
}))
exports.getSecurityQScore=asyncHandler((async(req,res)=>{
    const SecurityRisk= await DataSecurity.find({userId:req.user.id})
    const length=SecurityRisk.length;
    const data = SecurityRisk[length-1]
    if(!data){
        res.status(200).json({
            success:true,
            data:{
                data:{
                    Answers:[]
                }
            }
        })
    }else{
    res.status(200).send({
        success:"true",
        length:length,
        data:{
           data
        }
    })}
}))
exports.getDDOSScore=asyncHandler((async(req,res)=>{
    const DDOSRisk= await DDOS.find({userId:req.user.id})
    const length=DDOSRisk.length;
    const data = DDOSRisk[length-1]
    if(!data){
        res.status(200).json({
            success:true,
            data:{
                data:{
                    Answers:[]
                }
            }
        })
    }else{
    res.status(200).send({
        success:"true",
        length:length,
        data:{
           data
        }
    })}
}))