module.exports = (thefunc)=>(req,resp,next)=>{
    Promise.resolve(thefunc(req,resp,next)).catch(next)
}