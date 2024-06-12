const express= require('express');
// const bootstrap = require('bootstrap');
const app = express();
const port = 8080;
// const {v4:uuidv4}= require('uuid');
const methodoverride= require('method-override');

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodoverride('_method'));
app.use(express.urlencoded({extended:true}));

let Datas= [{
    form_no: "1a", username: "dev", Email:"devakdjila@gmail.com", 
    number: "734345345" , address: "dcbidsknckds",
    GitHub: "/GitHub/devnaagar ", LinkedIn:" /linkedIn/devnaagar", skills: ["javascript","CSS"] , 
    educations: ["12 pass ","10 pass"], Experience: ["none "],Projects: ["newapi ", "amazon clone"],
    Postofresp:["leader "], Achivements:[" goldmedal"], Hobbies: [" games"]
}];
    

app.get("/resume",(req,res)=>{
    res.render('index.ejs', {Datas});
})

// app.get("/resume/edit",(req,res)=>{
//     res.render('form.ejs');
// })
//add form data to resume
// app.post("/resume", (req,res)=>{
//     let {username,Email,number,address}= req.body;
//     let id = uuidv4();
//     Datas.push({id,username,Email,number,address});
//     res.redirect('/resume')
// })

//edit
function updateArrayField(data, field, value) {
    if (value) {
        data[field] = value.split(",").map(item => item.trim());
    }
}
app.get("/resume/:form_no/edit", (req,res)=>{
    let {form_no}=req.params;
    let data = Datas.find((p) => form_no === p.form_no);
    res.render("form.ejs",{Datas});
    
})
app.patch("/resume/:form_no",(req,res)=>{
    let {form_no}=req.params;
    let newcont=req.body;
    let index = Datas.findIndex((p) => form_no === p.form_no);
    Datas[index] = { ...Datas[index], ...newcont };
    updateArrayField(Datas[index], 'skills', newcont.skills);
    updateArrayField(Datas[index], 'educations', newcont.educations);
    updateArrayField(Datas[index], 'Experience', newcont.Experience);
    updateArrayField(Datas[index], 'Projects', newcont.Projects);
    updateArrayField(Datas[index], 'Postofresp', newcont.Postofresp);
    updateArrayField(Datas[index], 'Achivements', newcont.Achivements);
    updateArrayField(Datas[index], 'Hobbies', newcont.Hobbies);
    
    res.redirect("/resume");
})

//download

app.listen(port ,()=>{
    console.log(`The port number is : ${port}`);
})