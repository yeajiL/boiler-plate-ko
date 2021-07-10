const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const {User} = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://yeaji:1111@cluster0.8m5w1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false

}).then(() => console.log("MongoDB Connected...."))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! hihihi')
})

app.post('/register', (req,res) => {
    // 회원가입할때 필요한 정보들을 client 에서 가져오면
    // 그것들을 db에 넣어준다
    const user = new User(req.body)
    user.save((err,userInfo) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({    //status(200) -> 성공했다
            success : true
        })
    })
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})