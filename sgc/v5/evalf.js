
//SGC Calculate Engine from Scratch

//SGC V4.7.3 for Scratch 的计算引擎
//初始化
const funs=['sin','cos','tan','asin','acos','atan','csc','sec','cot','acsc','asec','acot','sinh','cosh','tanh','asinh','acosh','atanh','csch','sech','coth','acsch','asech','acoth','abs','floor','ceil','gamma','ln','log','logbase','arg','conjugate','Re','Im','erf','erfc','sgn','round','factor','li','sqrt','cbrt','allroots','degree','zeta','psi','beta','ltw','min','max','Ei','Si','Ci','if','and','or','not','mod','shi','chi','sinc','kint','eint','sfnint','cfnint','lambertW','lngamma','FresnelS','FresnelC','arcsin','arccos','arctan','arccsc','arcsec','arccot','arsinh','arcosh','artanh','arcsch','arsech','arcoth','digamma','logb','SinIntegral','CosIntegral','ExpIntegral','EllipticK','EllipticE','Derivative','exp','alog','str','diff','case','ifelse','gcd','lcm','item','length','substr','listlength','sinhIntegral','coshIntegral','num','sum','prod','int']
const ops=['+','-','*','/','^','!','(',')','=','<','>','<=','>=',',']
const standardOps=['+','-','*','/','^','!','=','<','>','<=','>=',',']
var definedFunc=[];
var diffvar=0;
var mainSym=[];//符号总表
var mainNum=[0,0,0,0,0];//操作数总表，x,y,z,t,?
var result_=[];
var resultStack_=[];
var symbolStack_=[];
var mainDefinedFunction=[];//自定义函数总表
var VarName=[];//全局变量名
var VarValue=[];//全局变量值
var VarInArray=[];//自由变量在变量中的位置
var FreeVar=[];//自由变量

function reset(){
    definedFunc=[];
    diffvar=0;
    mainSym=[];
    mainNum=[0,0,0,0,0];
    result_=[];
    resultStack_=[];
    symbolStack_=[];
    VarName=[];
    VarValue=[];
    VarInArray=[];
    FreeVar=[];
    mainDefinedFunction=[];
}
reset()
const sym_value=[1,1,2,2,3,3,
    4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,4,4,0,0,0,4,4,4,4,4,4,4,4,0,0,-1,-1,4,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,4,4,4]
const sym_=['+','-','*','/','^','!',
    'sin','cos','tan','asin','acos','atan','csc','sec','cot','acsc','asec','acot','sinh','cosh','tanh','asinh','acosh','atanh','csch','sech','coth','acsch','asech','acoth','abs','floor','ceil','gamma','ln','log','logbase','arg','conjugate','Re','Im','erf','erfc','sgn','psi','Isprime','prime','round','factor','$Γ','li','sqrt','cbrt','allroots','zeta','ltW',',','beta','degree','<','>','=','min','max','si','ei','Ci','dint','dder','if','>','<','and','or','not','&','|','mod','shi','chi','sinc','kint','eint','sfnint','cfnint','lngamma','FresnelC','FresnelS','item','substr','listlength','==','<=','>=','!=','diff','prod','sum']

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && !isNaN(value);
}
function isTrueNumeric(value) {
    return !isNaN(parseFloat(value)) && !isNaN(value);
}
function isIExp(x)
{
    return (ops.includes(x)||funs.includes(x)||(isNumeric(x))||definedFunc.includes(x)||x==='Pi')
}
function splitInput(inexp)
{
    splitResult=[];
    k=0;
    temp_="";
    while(k<inexp.length)
    {
        if('+-*/^!()=<>[]&,'.includes(inexp.charAt(k)))
        {
            if(temp_!=''){
                splitResult.push(temp_);
            }
            temp_=''
            splitResult.push(inexp.charAt(k));
        }else{
            temp_ += inexp.charAt(k)
        }
        k++;
    }
    if(temp_!=''){
        splitResult.push(temp_);
    }
    return splitResult
}

function checkExpression(splitResult){
    k=0;
    while(k<splitResult.length)
    {
        index=splitResult[k];
        if(!(isIExp(index))){
            //既不是数也不是函数、运算符.
            //可能是xsin这类简写，可能是2x这类简写.
            //拆分：
            substr=Array.from(index);
            splitResult.splice(k, 1);
            while(substr.length>0)
            {
                tempindex=substr.join('');
                temp_=tempindex
                while(!(tempindex.length==1||(isIExp(tempindex))))
                {
                    tempindex=temp_.substring(0, temp_.length-1)
                    temp_=tempindex
                }
                splitResult.splice(k, 0, tempindex);
                k++;
                u=0;
                while(u<tempindex.length)
                {
                    substr.splice(0, 1);
                    u++;
                }
            }
            k-=1;
        }
        k++;
    }
    k=0;
    error=false;
    while(k<splitResult.length-1)
    {
        index=splitResult[k];
        if(!(isIExp(index)) && !(ops.includes(splitResult[k+1])) && splitResult[k+1]!=')'){
            splitResult.splice(k+1, 0, '*');
            k++;
        }
        if(index==')' && (funs.includes(splitResult[k+1]))){
            splitResult.splice(k+1, 0, '*');
            k++;
        }
        if((isNumeric(index)) && splitResult[k+1]=='('){
            splitResult.splice(k+1, 0, '*');
            k++;
        }
        if((isNumeric(index)) && !(ops.includes(splitResult[k+1]))){
            splitResult.splice(k+1, 0, '*');
            k++;
        }
        if(standardOps.includes(index) && standardOps.includes(splitResult[k+1])){
            //语法错误：两个运算符连续使用
            error=true;
        }
        k++;
    }
    index=splitResult[splitResult.length-1]
    if((standardOps.includes(index) && !('!'.includes(index)))||(funs.includes(index))){
            //语法错误：末尾未完结的运算符
            error=true;
        }
    if(error){
        return 'error'
    }else{
        return splitResult;
    }
}
var calc_subVar=[];
var calc_includeXorY=[];
const adv=['prod','diff','sum','int','fsolve'];

var i_=0;

function sym()
{
    if(symbolStack_.length==0 || symbolStack_[0]==='(')
    {
        symbolStack_.unshift(expr[i_]);
    }else{
        if(funs.includes(expr[i_])||definedFunc.includes(expr[i_]))
        {
            _k=4;
        }else{
            _k=sym_value[sym_.indexOf(expr[i_])];
        }
        if(funs.includes(symbolStack_[0])||definedFunc.includes(symbolStack_[0]))
        {
            _t=4;
        }else{
            _t=sym_value[sym_.indexOf(symbolStack_[0])];
        }
        if(_k>_t)
        {
            symbolStack_.unshift(expr[i_]);
        }else{
            resultStack_.unshift(symbolStack_[0]);
            symbolStack_.shift();
            sym();
        }
    }
}
function toRPN(expr_,nest)
{
    expr=expr_;
    if(!nest){
        calc_subVar=[];
        calc_includeXorY=[];
    }
    if(expr.includes('prod') || expr.includes('diff') || 
        expr.includes('sum') || expr.includes('int') || expr.includes('fsolve'))
    {
        SubExprStack=[];
        TempExprStack=[];
        depth=1;
        exp_i=0;
        while(exp_i<=expr.length-1)
        {
            expr_i++;
            if(adv.includes(expr[expr_i]))
            {
                exp_i+=2;
                while(!(
                    exp_i>expr.length-1 || (depth=0 && expr[expr_i]==')') || (depth=1 && expr[expr_i]==',')
                ))
                {
                    SubExprStack.push(expr[expr_i])
                    if(expr[expr_i]=='(')
                    {
                        depth++;
                    }else{
                    if(expr[expr_i]==')')
                    {
                        depth--;
                    }
                    }
                    expr.splice(exp_i,1);
                }
                exp_x=expr[expr_i+1]
                while(SubExprStack.includes(exp_x))
                {
                    SubExprStack.splice(SubExprStack.indexOf(exp_x),1,'diff_var'+diffvar)
                }
                expr.splice(exp_i+1,1,'diff_var'+diffvar)
                mainSym.push(expr[exp_i+1]+'_add');
                mainNum.push(null);
                mainSym.push(mainNum.length-1);
                diffvar++;
                j_=0
                while(j_<=SubExprStack.length-1)
                {
                    expr.splice(exp_i,0,SubExprStack[SubExprStack.length-1])
                    SubExprStack.pop()
                }
                exp_i -=2;
            }
        }
    }
    resultStack_=[];
    symbolStack_=[];
    i_=0
    while(i_<=expr.length-1)
    {
        if(expr[i_]==='e'){expr[i_]=Math.E;}
        if(expr[i_]==='EulerGamma'){expr[i_]=0.577215664901533;}
        if(expr[i_]==='π' || expr[i_]==='Pi'){expr[i_]=Math.PI;}
        if(expr[i_]==='true' || expr[i_]==='false'){expr[i_]=(expr[i_]==='true')}
        if(isTrueNumeric(expr[i_])){expr[i_]=parseFloat(expr[i_])}
        if('+-*/^!<=>==&'.includes(expr[i_])||funs.includes(expr[i_])||definedFunc.includes(expr[i_])||['and','or'].includes(expr[i_]))
        {
            sym();
        }else{
            if(!(ops.includes(expr[i_])||funs.includes(expr[i_])||definedFunc.includes(expr[i_])))
            {
                resultStack_.unshift(expr[i_])
            }else{
                if(expr[i_]==='(')
                {
                    symbolStack_.unshift('(')
                }else{
                    if(expr[i_]===',')
                    {
                        if(symbolStack_.includes('('))
                        {
                            while(!(symbolStack_[0]==='('))
                            {
                                resultStack_.unshift(symbolStack_[0])
                                symbolStack_.shift()
                            }
                        }else{
                            //错误的逗号，例如 5,2)
                            break;
                        }
                    }else{
                        if(expr[i_]===')')
                        {
                            if(symbolStack_.includes('('))
                            {
                                while(!(symbolStack_[0]==='('))
                                {
                                    resultStack_.unshift(symbolStack_[0])
                                    symbolStack_.shift()
                                }
                                symbolStack_.shift()
                            }else{
                                //缺少(
                                break;
                            }
                        }else{
                                //未知元素
                                break;
                        }
                    }
                }
            }
        }
        i_++;
    }
    return (symbolStack_.reverse().concat(resultStack_)).reverse()
}
function createNewVar(Name,Value)
{
    VarName.push(Name)
    if(Value===null){
        VarValue.push(1)//默认值为1
    }else{
        VarValue.push(Value)
    }
    //SGC原版还有添加变量属性...
}
var _Nums=[];//操作数
var _Syms=[];//符号
var _tempstack=[];
var _x=[];var _y=[];var _z=[];var _t=[];
var _VarAdd=[];var _VarName=[];var _VarStackAdd=[];
var _Func_VarAdd=[];var _Func_VarName=[];var _Func_VarStackAdd=[];
var _Temp_Var=[];var _Temp_Var_Add=[];
function AddElement(i)
{
    _Syms.push(_tempstack[_tempstack.length-1-i])
    _tempstack.splice(_tempstack.length-1-i,1)
}
function compileExpression(RPNexpression)
{
    _Nums=[];//操作数
    _Syms=[];//符号
    _tempstack=[];
    _x=[];_y=[];_z=[];_t=[];
    _VarAdd=[];_VarName=[];_VarStackAdd=[];
    _Func_VarAdd=[];_Func_VarName=[];_Func_VarStackAdd=[];
    _Temp_Var=[];_Temp_Var_Add=[];
    result_=RPNexpression;
    i_=0;
    sym_i=0;
    while(i_<=result_.length-1)
    {
        _stackIn=result_[i_]
        if(_stackIn==='x'){
            _Nums.push('')
            _tempstack.push('x')
            _x.push(i_)
        }else{
        if(_stackIn==='y'){
            _Nums.push('')
            _tempstack.push('y')
            _y.push(i_)
        }else{
        if(_stackIn==='z'){
            _Nums.push('')
            _tempstack.push('z')
            _z.push(i_)
        }else{
        if(_stackIn==='_t_'){
            _Nums.push('')
            _tempstack.push('_t_')
            _t.push(i_)
        }else{
        if(_stackIn.toString().includes('_diff_var')){
            _Nums.push('');
            _tempstack.push(_stackIn);
        }else{
        if(!(isIExp(_stackIn)))
        {
            if(_stackIn.toString().includes('_var_'))
            {
                _Nums.push('')
                _tempstack.push(_stackIn)
            }else{
                _Nums.push('')
                _tempstack.push(i_)
                _VarName.push(_stackIn)
                _VarStackAdd.push(i_)
                if(!(VarName.includes(_stackIn)))
                {
                    createNewVar(_stackIn,null)
                }
                _VarAdd.push(VarName.indexOf(_stackIn))
            }
        }else{
        if(isNumeric(_stackIn))
        {
            _Nums.push(_stackIn)
            _tempstack.push(i_)
        }else{
            sym_i++;
            if('+-*/^<=>==&|'.includes(_stackIn)||_stackIn==='and'||_stackIn==='or')
            {
                _Syms.push(_stackIn);
                AddElement(1);
                AddElement(0);
                _Nums.push('');
                _Syms.push(_Nums.length-1);
                _tempstack.push(_Nums.length-1);
            }else{
                if(definedFunc.includes(_stackIn))
                {
                    //用户自定义函数
                    _Syms.push(_stackIn);
                    _Syms.push('?'+mainDefinedFunction[mainDefinedFunction.indexOf(_stackIn)+1]);
                    _Syms.push('?'+mainDefinedFunction[mainDefinedFunction.indexOf(_stackIn)+2]);
                    _Syms.push('?'+mainDefinedFunction[mainDefinedFunction.indexOf(_stackIn)+3]);
                    _Syms.push('?'+mainDefinedFunction[mainDefinedFunction.indexOf(_stackIn)+4]);
                    let __j=mainDefinedFunction[mainDefinedFunction.indexOf(_stackIn)+1]-1;
                    let _t_j=__j
                    let _u=0
                    while(_u<=_t_j)
                    {
                        AddElement(__j)
                        __j--;
                        _u++;
                    }
                    _Nums.push('');
                    _Syms.push(_Nums.length-1);
                    _tempstack.push(_Nums.length-1);
                }else{
                    //处理一元函数，如sin
                    _Syms.push(_stackIn);
                    AddElement(0);
                    _Nums.push('');
                    _Syms.push(_Nums.length-1);
                    _tempstack.push(_Nums.length-1);
                }
            }
        }
        }
        }
        }
        }
        }
        }
        i_++;
    }
    _Syms.unshift(sym_i);
    if(sym_i==0)
    {
        if(['x','y','z','_t_'].includes(_stackIn) || _stackIn.toString().includes('_diff_var')|| _stackIn.toString().includes('_var_'))
        {
            _Syms[0]=-1;
            _Syms.push(_stackIn);
        }
    }
}
function moveCompiledExpressionToMainArray()
{
    address_=[mainSym.length];//解析开始位置
    stat=mainNum.length
    mainNum=mainNum.concat(_Nums);
    mainSym.push(_Syms[0]);
    i_=1
    while(i_<=_Syms.length-1)
    {
        if(!isTrueNumeric(_Syms[i_]))
        {
            if(['x','y','z','_t_'].includes(_Syms[i_]))
            {
                mainSym.push(['x','y','z','_t_'].indexOf(_Syms[i_]));
            }else{
                if(_Syms[i_].includes('_diff_var')||_Syms[i_].includes('_var_'))
                {
                    mainSym.push(mainSym[1+mainSym.indexOf(_Syms[i_]+'_add')]);
                }else{
                    if(_Syms[i_].charAt(0)=='?')
                    {
                        mainSym.push(Number(_Syms[i_].substring(1,_Syms[i_].length)));
                    }else{
                        mainSym.push(_Syms[i_]);
                    }
                }
            }
        }else{
            mainSym.push(stat+_Syms[i_])
        }
        i_++;
    }
    mainNum.push(VarInArray.length)
    i_=0
    while(i_<_VarStackAdd.length)
    {
        FreeVar.push(stat+_VarStackAdd[i_])
        i_++;
    }
    VarInArray=VarInArray.concat(_VarAdd)
    mainNum.push(FreeVar.length-1)
    address_[1]=mainNum.length-1
    return address_
}
function NewFunction(func_expr)
{
    expr=splitInput(func_expr);
    funcName=expr[0]
    definedFunc.push(expr[0]);
    expr.shift();
    UserFunc_Var=[];
    while(!(expr[0]=='='))
    {
        if(!('(,)'.includes(expr[0])))
        {
            UserFunc_Var.push(expr[0])
        }
        expr.shift();
    }
    expr.shift();
    expr=checkExpression(expr)
    if(0==0 /* 函数定义式合法？ */)
    {
        TempStart=mainSym.length
        funci=0
        while(funci<=UserFunc_Var.length-1){
            while(expr.includes(UserFunc_Var[funci]))
            {
                expr[expr.indexOf(UserFunc_Var[funci])]='_var_'+diffvar
            }
            mainSym.push('_var_'+diffvar+'_add')
            mainNum.push(null)
            mainSym.push(mainNum.length-1)
            diffvar++;
            funci++;
        }
        compileExpression(toRPN(expr),0)
        temp_=moveCompiledExpressionToMainArray()
        mainDefinedFunction.push(funcName)
        mainDefinedFunction.push(UserFunc_Var.length)
        mainDefinedFunction.push(temp_[0])//开始位置
        mainDefinedFunction.push(temp_[1])//计算结束位置
        mainDefinedFunction.push(TempStart)
    }
}
function NewVariable(var_expr)
{
    expr=splitInput(var_expr);
    VarName_=expr[0]
    expr.shift();
    expr.shift();
    expr=checkExpression(expr)
    compileExpression(toRPN(expr),0)
    createNewVar(VarName_,RPNEvalf(moveCompiledExpressionToMainArray()))
}
function RPNEvalf(add,temp)
{
    let st_=add[0];
    let ed_=add[1];
    let _i=mainNum[ed_-1];
    let j_=0;
    while(j_<=mainNum[ed_])
    {
        mainNum[FreeVar[_i]]=VarValue[VarInArray[_i]];
        _i++;
        j_++;
    }
    let f_=0
    let i_=st_+1
    let result_=0
    while(f_<mainSym[st_])
    {
        let op=mainSym[i_]
        if(definedFunc.includes(op))
        {
            let __i=mainSym[i_+4]
            let _t=i_+5
            let _k=0
            while(_k<mainSym[i_+1])
            {
                mainNum[mainSym[__i+1]]=mainNum[mainSym[_t]]
                _k++;
                _t++;
                __i+=2
            }
            mainNum[mainSym[i_+mainSym[i_+1]+5]]=RPNEvalf([mainSym[i_+2],mainSym[i_+3]],i_)
            i_+=mainSym[i_+1]+6
        }else{
            if(op.length==1){
                let arg1 = mainNum[mainSym[i_ + 1]];
                let arg2 = mainNum[mainSym[i_ + 2]];
                switch (op) {
                    case '+': mainNum[mainSym[i_ + 3]] = arg1 + arg2; break;
                    case '-': mainNum[mainSym[i_ + 3]] = arg1 - arg2; break;
                    case '*': mainNum[mainSym[i_ + 3]] = arg1 * arg2; break;
                    case '/': mainNum[mainSym[i_ + 3]] = arg1 / arg2; break;
                    case '^': mainNum[mainSym[i_ + 3]] = Math.pow(arg1, arg2); break;
                }
                i_ += 4;
            }else{
                let arg = mainNum[mainSym[i_ + 1]];
                switch (op) {
                    case 'sin': mainNum[mainSym[i_ + 2]] = Math.sin(arg); break;
                    case 'cos': mainNum[mainSym[i_ + 2]] = Math.cos(arg); break;
                    case 'tan': mainNum[mainSym[i_ + 2]] = Math.tan(arg); break;
                    case 'abs': mainNum[mainSym[i_ + 2]] = Math.abs(arg); break;
                    case 'log': mainNum[mainSym[i_ + 2]] = Math.log10(arg); break;
                    case 'ln': mainNum[mainSym[i_ + 2]] = Math.log(arg); break;
                    case 'asin': mainNum[mainSym[i_ + 2]] = Math.asin(arg); break;
                    case 'acos': mainNum[mainSym[i_ + 2]] = Math.acos(arg); break;
                    case 'atan': mainNum[mainSym[i_ + 2]] = Math.atan(arg); break;
                }
                i_ += 3;
            }
        }
        f_++;
    }
    result_=mainNum[ed_-2]
    if(mainSym[st_]==-1){
        result_=mainNum[mainSym[st_+1]]
    }
    i_=temp
    return result_
}
function calculate(expression)
{
    compileExpression(toRPN(checkExpression(splitInput(expression))),0)
    return RPNEvalf(moveCompiledExpressionToMainArray())
}



//NewVariable('a=0');
NewFunction('f(u)=u');

//NewFunction('g(x,y,z)=x*y-z');
mainNum[0]=0;
console.log(calculate('1'));
console.log(mainSym, mainNum)
console.log(mainDefinedFunction)
